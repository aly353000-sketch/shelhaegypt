import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s, l];
}

async function recolorImage(inputPath, outputPath, config = {}) {
  const { maxYRatio = 0.85, minYRatio = 0.05, minXRatio = 0.0, maxXRatio = 1.0 } = config;
  console.log(`Processing ${inputPath}...`);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height, channels } = metadata;

  const rawBuffer = await image.raw().toBuffer();
  const outputBuffer = Buffer.from(rawBuffer);

  const mask = new Float32Array(width * height);
  const isLogoText = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    const yNorm = y / height;
    if (yNorm < minYRatio || yNorm > maxYRatio) continue;

    for (let x = 0; x < width; x++) {
      const xNorm = x / width;
      if (xNorm < minXRatio || xNorm > maxXRatio) continue;

      const i = y * width + x;
      const idx = i * channels;
      const r = rawBuffer[idx];
      const g = rawBuffer[idx + 1];
      const b = rawBuffer[idx + 2];

      const [h, s, l] = rgbToHsl(r, g, b);

      // Yellow fabric detection with soft falloff
      if (h >= 28 && h <= 62 && s >= 0.42 && r >= 120 && g >= 80 && b <= 95 && (r - b) >= 55) {
        // Calculate confidence
        let confidence = 1.0;
        if (s < 0.52) confidence *= (s - 0.42) / 0.10;
        if (r - b < 70) confidence *= (r - b - 55) / 15;
        mask[i] = Math.max(0, Math.min(1.0, confidence));
      }
    }
  }

  // Detect dark logo text within the shirt
  for (let y = 2; y < height - 2; y++) {
    const yNorm = y / height;
    if (yNorm < minYRatio || yNorm > maxYRatio) continue;

    for (let x = 2; x < width - 2; x++) {
      const i = y * width + x;
      if (mask[i] > 0.5) continue;

      const idx = i * channels;
      const r = rawBuffer[idx];
      const g = rawBuffer[idx + 1];
      const b = rawBuffer[idx + 2];
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

      if (brightness < 60) {
        let shirtNeighbors = 0;
        for (let dy = -3; dy <= 3; dy += 2) {
          for (let dx = -3; dx <= 3; dx += 2) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              if (mask[ny * width + nx] > 0.5) shirtNeighbors++;
            }
          }
        }
        if (shirtNeighbors >= 4) {
          isLogoText[i] = 1;
        }
      }
    }
  }

  // Smooth blur mask for feathered natural edges (eliminates jagged cutoffs)
  const smoothedMask = new Float32Array(mask);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      if (mask[i] > 0 || mask[i-1] > 0 || mask[i+1] > 0 || mask[i-width] > 0 || mask[i+width] > 0) {
        let sum = 0;
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            sum += mask[(y + dy) * width + (x + dx)];
            count++;
          }
        }
        smoothedMask[i] = sum / count;
      }
    }
  }

  // Apply rich royal Egyptian Burgundy (نبيتي ملكي شيك وفخم)
  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const m = smoothedMask[i];

    if (isLogoText[i]) {
      // Crisp white logo on shirt
      outputBuffer[idx] = 250;
      outputBuffer[idx + 1] = 250;
      outputBuffer[idx + 2] = 250;
    } else if (m > 0.02) {
      const origR = rawBuffer[idx];
      const origG = rawBuffer[idx + 1];
      const origB = rawBuffer[idx + 2];

      // Luminance from original fabric preserves 100% of folds, highlights & shadows
      const L = (origR * 0.299 + origG * 0.587 + origB * 0.114) / 255;

      // Authentic Egyptian Corporate Burgundy tone (Pantone 19-1617 / Deep Maroon Wine):
      // Rich red wine with subtle purple-blue depth, never brown, never neon pink
      const burgR = Math.min(255, Math.round(Math.pow(L, 1.05) * 175 + 28));
      const burgG = Math.min(255, Math.max(0, Math.round(Math.pow(L, 1.25) * 20 + 3)));
      const burgB = Math.min(255, Math.max(0, Math.round(Math.pow(L, 1.10) * 44 + 8)));

      // Alpha blend with original for smooth feathered transition
      outputBuffer[idx] = Math.round(origR * (1 - m) + burgR * m);
      outputBuffer[idx + 1] = Math.round(origG * (1 - m) + burgG * m);
      outputBuffer[idx + 2] = Math.round(origB * (1 - m) + burgB * m);
    }
  }

  await sharp(outputBuffer, {
    raw: { width, height, channels }
  })
  .jpeg({ quality: 96 })
  .toFile(outputPath);

  console.log(`Saved enhanced burgundy image: ${outputPath}`);
}

async function run() {
  const images = [
    // Mover with thumbs up in front of truck
    { file: 'FB_IMG_1793231452308_0ab5f981.jpg', config: { maxYRatio: 0.85, minYRatio: 0.15 } },
    // Movers entering apartment
    { file: 'FB_IMG_1793231464813_9511a619.jpg', config: { maxYRatio: 0.58, minYRatio: 0.10 } },
    // Movers loading padded truck
    { file: 'FB_IMG_1793231476208_41a90506.jpg', config: { maxYRatio: 0.70, minYRatio: 0.12 } },
    // Movers wrapping sofa
    { file: 'FB_IMG_1793231467366_63b0c79d.jpg', config: { maxYRatio: 0.60, minYRatio: 0.10 } },
    // Movers wrapping refrigerator
    { file: 'FB_IMG_1793231470105_de0eabc7.jpg', config: { maxYRatio: 0.60, minYRatio: 0.10 } },
    // Movers carrying boxes into rooms
    { file: 'FB_IMG_1793231473308_f92e10a1.jpg', config: { maxYRatio: 0.60, minYRatio: 0.10 } },
    // Poster: worker wrapping armchair
    { file: 'FB_IMG_1793231490425_52bf60f2.jpg', config: { maxYRatio: 0.65, minYRatio: 0.15 } },
    // Poster: hydraulic winch with truck and worker
    { file: 'FB_IMG_1793231505624_3f6ca3c9.jpg', config: { maxYRatio: 0.80, minYRatio: 0.30 } },
  ];

  for (const { file, config } of images) {
    const input = path.join('public/assets/aistudio_backup', file);
    const output = path.join('public/assets/aistudio', file);
    if (fs.existsSync(input)) {
      await recolorImage(input, output, config);
    }
  }
}

run().catch(console.error);
