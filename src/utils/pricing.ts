/**
 * Pricing and quote estimation logic for Shilha Moving Company (شركة شِلها لنقل وتغليف الأثاث)
 * 
 * Rules:
 * 1. Base cost for 3 rooms + 1 truck anywhere in Cairo: 4000 to 7000 EGP.
 * 2. Each truck comes with 5 workers by default (كل سيارة معاها 5 عمال).
 * 3. Additional truck adds 5000 EGP and automatically includes 5 workers (5000 ج.م للسيارة والـ 5 عمال معاً).
 * 4. Furniture dismantling & assembly (فك وتركيب): +300 EGP per room.
 * 5. Packaging (تغليف): +400 EGP per room. Packing 3 rooms adds 2 workers (+2 عمال لكل 3 غرف تغليف).
 * 6. AC dismantling/assembly: 800 EGP per unit + 1 specialist technician (سعر فك و تركيب التكييف ٨٠٠).
 * 7. Hydraulic Winch service: 1,700 EGP (زود سعر خدمة الونش ل ١٧٠٠) and strictly optional.
 * 8. Packaging materials & cartons added to total cost dynamically without exposing unit prices to the client.
 */

import { calculatePackagingTotal } from '../data/packagingCatalog';

export type PropertyType = 'apartment' | 'villa' | 'office' | 'clinic';

export interface QuoteRequest {
  propertyType: PropertyType;
  roomsCount: number; // 1, 2, 3, 4, 5+
  trucksCount?: number; // 1, 2, 3... default 1 (or 2 for villas)
  fromFloor: number; // 0 for ground
  toFloor: number; // 0 for ground
  fromArea: string;
  toArea: string;
  isGovernorate: boolean;
  needsWinch: boolean;
  acUnitsCount: number; // فك وتركيب تكييف (800 EGP/unit + tech)
  needsDismantling?: boolean; // فك وتركيب غرف الأثاث
  dismantleRoomsCount?: number; // 300 EGP per room
  needsPackaging?: boolean; // تغليف
  packedRoomsCount?: number; // 400 EGP per room (3 rooms adds 2 workers)
  needsVipPackaging?: boolean;
  needsAppliancesTechnician?: boolean; // فك وتركيب أجهزة وشاشات ونجف (500 EGP + tech)
  needsKitchenDismantling?: boolean; // فك وتركيب مطابخ (600 EGP)
  packagingItems?: Record<string, number>; // كراتين ومواد تغليف مختارة تضاف للتوتال بدون إظهار الأسعار الفردية
}

export interface CrewBreakdown {
  baseCrew: number;
  packingCrew: number;
  technicians: number;
  extraRoomCrew: number;
  totalCrew: number;
}

export interface QuoteEstimate {
  minPrice: number;
  maxPrice: number;
  recommendedWinch: boolean;
  trucksCount: number;
  crewCount: number;
  crewBreakdown: CrewBreakdown;
  dismantleRoomsCount: number;
  packedRoomsCount: number;
  packagingMaterialsCost: number;
  packagingItemsCount: number;
  estimatedHours: string;
  whatsappMessage: string;
}

export function calculateMovingQuote(req: QuoteRequest): QuoteEstimate {
  // Determine trucks count: default 1 (or 2 for villas / 5+ rooms if not explicitly specified)
  const defaultTrucks = (req.propertyType === 'villa' || req.roomsCount >= 5) ? 2 : 1;
  const trucksCount = req.trucksCount !== undefined && req.trucksCount > 0 ? req.trucksCount : defaultTrucks;

  // Base range for 3-room apartment with 1 truck anywhere in Cairo = 4000 to 7000 EGP
  let minBase = 4000;
  let maxBase = 7000;

  // Property type adjustment (apartment is standard reference)
  if (req.propertyType === 'villa') {
    minBase += 1500;
    maxBase += 2000;
  } else if (req.propertyType === 'office') {
    minBase += 500;
    maxBase += 800;
  } else if (req.propertyType === 'clinic') {
    minBase += 700;
    maxBase += 1000;
  }

  // Room adjustment from baseline of 3 rooms (500 EGP per room diff)
  const roomDiff = req.roomsCount - 3;
  minBase += roomDiff * 500;
  maxBase += roomDiff * 500;

  // Additional trucks: +5000 EGP per additional truck beyond the first (includes truck + 5 workers)
  const extraTrucks = Math.max(0, trucksCount - 1);
  const extraTrucksCost = extraTrucks * 5000;
  minBase += extraTrucksCost;
  maxBase += extraTrucksCost;

  // Furniture dismantling & assembly: +300 EGP per room
  let dismantleRooms = 0;
  if (req.dismantleRoomsCount !== undefined) {
    dismantleRooms = Math.max(0, req.dismantleRoomsCount);
  } else if (req.needsDismantling) {
    dismantleRooms = req.roomsCount;
  }
  const dismantleCost = dismantleRooms * 300;
  minBase += dismantleCost;
  maxBase += dismantleCost;

  // Furniture packaging: +400 EGP per room
  let packedRooms = 0;
  if (req.packedRoomsCount !== undefined) {
    packedRooms = Math.max(0, req.packedRoomsCount);
  } else if (req.needsPackaging || req.needsVipPackaging) {
    packedRooms = req.roomsCount;
  }
  const packagingCost = packedRooms * 400;
  minBase += packagingCost;
  maxBase += packagingCost;

  // AC dismantling & assembly: 800 EGP per unit (سعر فك و تركيب التكييف ٨٠٠)
  if (req.acUnitsCount > 0) {
    const acCost = req.acUnitsCount * 800;
    minBase += acCost;
    maxBase += acCost;
  }

  // Appliances / electrician technician (screens, chandeliers, heaters): 500 EGP (optional)
  if (req.needsAppliancesTechnician) {
    minBase += 500;
    maxBase += 500;
  }

  // Kitchen dismantling & assembly: 600 EGP (optional)
  if (req.needsKitchenDismantling) {
    minBase += 600;
    maxBase += 600;
  }

  // Hydraulic winch (strictly optional - 1,700 EGP base per user request)
  const includeWinch = Boolean(req.needsWinch);
  if (includeWinch) {
    const winchFloors = Math.max(req.fromFloor, req.toFloor);
    // Base 1,700 EGP, with minor floor increment if higher than floor 4
    const winchCost = 1700 + Math.max(0, winchFloors - 4) * 100;
    minBase += winchCost;
    maxBase += winchCost;
  }

  // Packaging materials added dynamically without exposing unit prices to client
  let packagingMaterialsCost = 0;
  let packagingItemsCount = 0;
  if (req.packagingItems) {
    packagingMaterialsCost = calculatePackagingTotal(req.packagingItems);
    packagingItemsCount = Object.values(req.packagingItems).reduce((sum, count) => sum + (count > 0 ? count : 0), 0);
    minBase += packagingMaterialsCost;
    maxBase += packagingMaterialsCost;
  }

  // Outside Cairo / Governorates travel
  if (req.isGovernorate) {
    minBase += 2500;
    maxBase += 2500;
  }

  // Ensure reasonable minimum bounds
  const minPrice = Math.max(2500, Math.round(minBase / 50) * 50);
  const maxPrice = Math.max(minPrice + 1000, Math.round(maxBase / 50) * 50);

  // Crew calculation:
  // 1. Each truck comes with 5 workers by default (كل سيارة معاها 5 عمال)
  const baseCrew = trucksCount * 5;

  // 2. Packaging: packing 3 rooms adds 2 workers (ال ٣ غرف تغليف بنزود ٢ عمال)
  const packingCrew = packedRooms > 0 ? Math.round((packedRooms / 3) * 2) : 0;

  // 3. Technicians: AC tech and electrical tech
  const technicians = (req.acUnitsCount > 0 ? 1 : 0) + (req.needsAppliancesTechnician ? 1 : 0);

  // 4. Extra room helper for single truck with large apartment
  const extraRoomCrew = req.roomsCount >= 4 && trucksCount === 1 ? 1 : 0;

  const totalCrew = baseCrew + packingCrew + technicians + extraRoomCrew;

  const crewBreakdown: CrewBreakdown = {
    baseCrew,
    packingCrew,
    technicians,
    extraRoomCrew,
    totalCrew,
  };

  const estimatedHours = req.propertyType === 'villa' || trucksCount > 1
    ? '5 - 7 ساعات'
    : req.roomsCount >= 4
    ? '4 - 6 ساعات'
    : req.roomsCount >= 3
    ? '3 - 5 ساعات'
    : '2 - 3 ساعات';

  const propertyLabels: Record<PropertyType, string> = {
    apartment: 'شقة سكنية',
    villa: 'فيلا / دوبلكس',
    office: 'مكتب / شركة',
    clinic: 'عيادة / مركز طبي',
  };

  const packagingNote = packagingItemsCount > 0 
    ? `\n• خامات وكراتين تغليف مخصصة: نعم (${packagingItemsCount} قطعة مختارة مضافة للإجمالي)` 
    : '';

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، عايز استفسار وحجز عرض سعر نقل عفش من شركة شِلها (مع خصم 10%):\n` +
    `• نوع العقار: ${propertyLabels[req.propertyType]}\n` +
    `• عدد الغرف: ${req.roomsCount} غرف\n` +
    `• سيارات النقل: ${trucksCount} سيارة مبطنة (${trucksCount * 5} عمال أساسي)\n` +
    `• فك وتركيب الأثاث: ${dismantleRooms > 0 ? `${dismantleRooms} غرفة (+${dismantleCost} ج.م)` : 'غير مطلوب'}\n` +
    `• تغليف الأثاث بالبابلز والكرتون: ${packedRooms > 0 ? `${packedRooms} غرفة (+${packagingCost} ج.م مع ${packingCrew} عمال تغليف إضافيين)` : 'غير مطلوب'}${packagingNote}\n` +
    `• فك وتركيب تكييفات: ${req.acUnitsCount > 0 ? `${req.acUnitsCount} أجهزة (مع فني تكييف متخصص بسعر 800 ج.م/جهاز)` : 'غير مطلوب'}\n` +
    `• فني أجهزة وكهرباء: ${req.needsAppliancesTechnician ? 'مطلوب (+فني كهرباء)' : 'غير مطلوب'}\n` +
    `• فك وتركيب مطبخ: ${req.needsKitchenDismantling ? 'مطلوب' : 'غير مطلوب'}\n` +
    `• ونش هيدروليكي: ${includeWinch ? 'نعم مطلوب (1,700 ج.م)' : 'غير مطلوب (نقل يدوي/مصعد)'}\n` +
    `• من: ${req.fromArea} (الدور ${req.fromFloor})\n` +
    `• إلى: ${req.toArea} (الدور ${req.toFloor})\n` +
    `• إجمالي طاقم العمل: ${totalCrew} عمال وفنيين محترفين\n` +
    `• التكلفة التقديرية بالموقع: ${minPrice.toLocaleString('ar-EG')} - ${maxPrice.toLocaleString('ar-EG')} ج.م\n` +
    `برجاء تأكيد الموعد والمعاينة المجانية.`
  );

  return {
    minPrice,
    maxPrice,
    recommendedWinch: includeWinch,
    trucksCount,
    crewCount: totalCrew,
    crewBreakdown,
    dismantleRoomsCount: dismantleRooms,
    packedRoomsCount: packedRooms,
    packagingMaterialsCost,
    packagingItemsCount,
    estimatedHours,
    whatsappMessage,
  };
}
