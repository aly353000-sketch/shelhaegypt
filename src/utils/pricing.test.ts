import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMovingQuote } from './pricing';
import { calculatePackagingTotal } from '../data/packagingCatalog';

test('3 rooms and 1 truck inside Cairo costs 4000 to 7000 EGP with 5 workers', () => {
  const quote = calculateMovingQuote({
    propertyType: 'apartment',
    roomsCount: 3,
    trucksCount: 1,
    fromFloor: 2,
    toFloor: 2,
    fromArea: 'مدينة نصر',
    toArea: 'التجمع الخامس',
    isGovernorate: false,
    needsWinch: false,
    acUnitsCount: 0,
    needsDismantling: false,
    needsPackaging: false,
    needsAppliancesTechnician: false,
    needsKitchenDismantling: false,
  });

  assert.equal(quote.minPrice, 4000);
  assert.equal(quote.maxPrice, 7000);
  assert.equal(quote.trucksCount, 1);
  assert.equal(quote.crewCount, 5);
  assert.equal(quote.crewBreakdown.baseCrew, 5);
  assert.equal(quote.recommendedWinch, false);
});

test('AC units cost 800 EGP per unit as requested', () => {
  const quote = calculateMovingQuote({
    propertyType: 'apartment',
    roomsCount: 3,
    trucksCount: 1,
    fromFloor: 2,
    toFloor: 2,
    fromArea: 'المعادي',
    toArea: 'الشيخ زايد',
    isGovernorate: false,
    needsWinch: false,
    acUnitsCount: 2, // 2 * 800 = 1600 EGP
    needsDismantling: false,
    needsPackaging: false,
    needsAppliancesTechnician: false,
    needsKitchenDismantling: false,
  });

  // Base 4000 + 1600 = 5600, 7000 + 1600 = 8600
  assert.equal(quote.minPrice, 5600);
  assert.equal(quote.maxPrice, 8600);
  assert.equal(quote.crewBreakdown.technicians, 1);
});

test('Hydraulic Winch costs 2,500 EGP base as requested', () => {
  const quoteWithWinch = calculateMovingQuote({
    propertyType: 'apartment',
    roomsCount: 3,
    trucksCount: 1,
    fromFloor: 3,
    toFloor: 2,
    fromArea: 'مدينة نصر',
    toArea: 'مصر الجديدة',
    isGovernorate: false,
    needsWinch: true, // 2500 EGP
    acUnitsCount: 0,
    needsDismantling: false,
    needsPackaging: false,
    needsAppliancesTechnician: false,
    needsKitchenDismantling: false,
  });

  // Base 4000 + 2500 = 6500, 7000 + 2500 = 9500
  assert.equal(quoteWithWinch.minPrice, 6500);
  assert.equal(quoteWithWinch.maxPrice, 9500);
  assert.equal(quoteWithWinch.recommendedWinch, true);
});

test('Packaging catalog calculation correctly totals materials and adds to quote', () => {
  // Carton 40*40*60 is 50 EGP (x4 = 200)
  // Bubble 60m is 230 EGP (x1 = 230)
  // Stretch 2kg is 250 EGP (x1 = 250)
  // Total materials = 680 EGP
  const materials = {
    'box-40-40-60': 4,
    'bubble-60m': 1,
    'stretch-2kg': 1,
  };
  const totalMaterials = calculatePackagingTotal(materials);
  assert.equal(totalMaterials, 680);

  const quote = calculateMovingQuote({
    propertyType: 'apartment',
    roomsCount: 3,
    trucksCount: 1,
    fromFloor: 2,
    toFloor: 2,
    fromArea: 'المعادي',
    toArea: 'التجمع',
    isGovernorate: false,
    needsWinch: false,
    acUnitsCount: 0,
    needsDismantling: false,
    needsPackaging: false,
    needsAppliancesTechnician: false,
    needsKitchenDismantling: false,
    packagingItems: materials,
  });

  // Base 4000 + 680 = 4680 -> rounded to nearest 50 = 4700
  // Base 7000 + 680 = 7680 -> rounded to nearest 50 = 7700
  assert.equal(quote.minPrice, 4700);
  assert.equal(quote.maxPrice, 7700);
  assert.equal(quote.packagingMaterialsCost, 680);
  assert.equal(quote.packagingItemsCount, 6);
});
