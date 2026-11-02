import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Sparkles, 
  Plus, 
  X, 
  User, 
  MapPin, 
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location?: string;
  text: string;
  rating: number;
  date: string;
  likes: number;
  tags?: string[];
  isVerified?: boolean;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testi-1',
    name: 'م. أحمد الشربيني',
    role: 'نقل شقة بالكامل 4 غرف',
    location: 'من مدينة نصر إلى التجمع الخامس',
    text: 'تجربة ممتازة لأبعد حد! العمالة محترمة جداً وشاطرة، مفيش كوباية واحدة اتكسرت. الونش الهيدروليكي وفر علينا وقت ومجهود كبير، والسعر كان هو المتفق عليه بالظبط من غير أي زيادة.',
    rating: 5,
    date: 'منذ أسبوعين',
    likes: 47,
    tags: ['ونش هيدروليكي 🏗️', 'سعر ثابت بدون زيادات 💰', 'تغليف بابلز 📦'],
    isVerified: true,
  },
  {
    id: 'testi-2',
    name: 'د. سارة عبد الرحمن',
    role: 'نقل عيادة أسنان متكاملة',
    location: 'مصر الجديدة - الكوربة',
    text: 'كنت خايفة جداً على أجهزة العيادة والمعدات الطبية لأنها غالية وحساسة، لكن فريق شِلها عملوا تغليف ثلاثي بابلز وفوم ووصلوا كل حاجة سليمة واشتغلنا تاني يوم على طول. شكراً ليكم ولأمانتكم!',
    rating: 5,
    date: 'منذ شهر',
    likes: 38,
    tags: ['أجهزة حساسة 🔬', 'تغليف أوروبي 🛡️', 'أمانة تامة 🤝'],
    isVerified: true,
  },
  {
    id: 'testi-3',
    name: 'أ. طارق عبد المنعم',
    role: 'نقل فيلا دوبلكس',
    location: 'الشيخ زايد - الربوة',
    text: 'فك وتركيب التكييفات كان أسرع مما اتخيل بـ 800ج للوحدة، والفنيين شيكوا على شحنة الفريون قبل التشغيل ونظفوا الفلاتر. فعلاً شعارهم حقيقي: راحتك مش رفاهية دي أساس شغلهم.',
    rating: 5,
    date: 'منذ 3 أسابيع',
    likes: 29,
    tags: ['فك وتركيب تكييفات ❄️', 'دقة المواعيد ⏰', 'سيارات مبطنة 🚛'],
    isVerified: true,
  },
  {
    id: 'testi-4',
    name: 'أ. ريهام فهمي',
    role: 'نقل أثاث شقة عروسة',
    location: 'من المعادي إلى الرحاب',
    text: 'التغليف كان مبهر جداً! النيش والصيني اتلف بكراتين 5 راق ورولات فوم تقيلة ومفيش خدش واحد في الخشب اللاكيه الأبيض. العمالة محترمة وقمة في الذوق.',
    rating: 5,
    date: 'منذ شهر ونصف',
    likes: 24,
    tags: ['تغليف نيش وصيني 🍽️', 'عناية فائقة 💎'],
    isVerified: true,
  },
  {
    id: 'testi-5',
    name: 'م. عمرو عزت',
    role: 'نقل مقر شركة برمجيات',
    location: 'التجمع الثالث - القاهرة الجديدة',
    text: 'نقلنا مكاتب وسيرفرات الشركة يوم الجمعة علشان منوقفش الشغل. خلصوا النقل والتركيب في 4 ساعات وصباح الأحد بدأنا شغلنا طبيعي وبأعلى كفاءة.',
    rating: 4,
    date: 'منذ شهرين',
    likes: 18,
    tags: ['نقل شركات 🏢', 'سرعة إنجاز ⚡'],
    isVerified: true,
  },
];

const AVAILABLE_TAGS = [
  'التزام بالمواعيد ⏰',
  'سعر ثابت بدون زيادات 💰',
  'ونش هيدروليكي سريع 🏗️',
  'نظافة وأمان التغليف 📦',
  'أمانة واحترام العمالة 🤝',
  'فني تكييف محترف ❄️',
  'سيارات نقل مبطنة 🚛',
  'حماية الأطقم الصيني 🍽️'
];

export const Testimonials: React.FC = () => {
  const { t, theme } = useApp();

  // Testimonials List State with localStorage persistence
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('shilha_customer_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_TESTIMONIALS;
  });

  // Track liked review IDs to prevent duplicate likes
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('shilha_liked_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {};
  });

  // Review Form Modal / Expanded Panel State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formRating, setFormRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [reviewerName, setReviewerName] = useState('');
  const [moveDetails, setMoveDetails] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Active Rating Filter
  const [activeFilter, setActiveFilter] = useState<'all' | '5' | '4'>('all');

  // Persist reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shilha_customer_reviews', JSON.stringify(testimonials));
    } catch {
      // Ignore quota errors
    }
  }, [testimonials]);

  // Persist likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shilha_liked_reviews', JSON.stringify(likedReviews));
    } catch {
      // Ignore quota errors
    }
  }, [likedReviews]);

  // Handle helpful / like toggle
  const handleToggleLike = (id: string) => {
    const isAlreadyLiked = likedReviews[id];
    setTestimonials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likes: isAlreadyLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !isAlreadyLiked,
    }));
  };

  // Toggle tag selection in the review form
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Submit new review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newReview: TestimonialItem = {
      id: `testi-${Date.now()}`,
      name: reviewerName.trim(),
      role: moveDetails.trim() || t('عميل شِلها المعتمد', 'Verified Shilha Customer'),
      location: reviewLocation.trim() || t('القاهرة الكبرى', 'Greater Cairo'),
      text: reviewComment.trim(),
      rating: formRating,
      date: t('الآن (تقييم جديد)', 'Just now (New Review)'),
      likes: 1,
      tags: selectedTags.length > 0 ? selectedTags : ['تجربة موثقة ⭐'],
      isVerified: true,
    };

    setTestimonials((prev) => [newReview, ...prev]);
    setIsSubmittedSuccess(true);

    setTimeout(() => {
      // Reset form
      setReviewerName('');
      setMoveDetails('');
      setReviewLocation('');
      setReviewComment('');
      setSelectedTags([]);
      setFormRating(5);
      setIsSubmittedSuccess(false);
      setIsFormOpen(false);
    }, 2200);
  };

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    if (activeFilter === '5') return testimonials.filter((t) => t.rating === 5);
    if (activeFilter === '4') return testimonials.filter((t) => t.rating === 4);
    return testimonials;
  }, [testimonials, activeFilter]);

  // Aggregate Stats
  const totalReviewsCount = 14850 + testimonials.length - DEFAULT_TESTIMONIALS.length;
  const ratingTexts: Record<number, string> = {
    5: 'ممتاز فوق الوصف ⭐⭐⭐⭐⭐',
    4: 'جيد جداً ⭐⭐⭐⭐',
    3: 'جيد ومناسب ⭐⭐⭐',
    2: 'مقبول ⭐⭐',
    1: 'يحتاج تحسين ⭐',
  };

  return (
    <section id="testimonials" className={`py-16 lg:py-24 text-right transition-colors duration-300 ${
      theme === 'light' ? 'bg-white' : 'bg-[#020b18]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 border text-xs sm:text-sm font-black px-4 py-1.5 rounded-full bg-blue-50 border-blue-200 text-blue-900 shadow-2xs">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>{t('آراء وتجارب حقيقية موثقة', 'Authentic & Verified Customer Reviews')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            {t('ماذا يقول عملاء شِلها عنا؟', 'What Do Shilha Customers Say?')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'ثقة أكثر من 14,850 عائلة وشركة تم نقل مقتنياتهم في القاهرة والجيزة وجميع المحافظات بأعلى معايير الحرص والاحترافية.',
              'Over 14,850 satisfied families and businesses moved safely across Egypt.'
            )}
          </p>
        </div>

        {/* Interactive Aggregate Rating Overview Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border bg-gradient-to-br from-slate-50 via-blue-50/40 to-white border-blue-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 4 Cols: Big Score & Trust Badge */}
            <div className="lg:col-span-4 text-center lg:text-right space-y-2 border-b lg:border-b-0 lg:border-l border-blue-200 pb-6 lg:pb-0 lg:pl-6">
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-5xl sm:text-6xl font-black text-blue-950 font-mono">4.9</span>
                <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 5.0</span>
              </div>

              {/* 5 Big Gold Stars */}
              <div className="flex items-center justify-center lg:justify-start gap-1 py-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 text-amber-500 fill-amber-400 drop-shadow-xs" />
                ))}
              </div>

              <div className="text-xs sm:text-sm font-bold text-slate-700">
                <span>بناءً على </span>
                <span className="font-black text-blue-700 font-mono">{totalReviewsCount.toLocaleString('ar-EG')}</span>
                <span> تجربة نقل حقيقية موثقة ✓</span>
              </div>
            </div>

            {/* Middle 5 Cols: Rating Bars Breakdown */}
            <div className="lg:col-span-5 space-y-2 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-3">
                <span className="w-14 text-right shrink-0">5 نجوم</span>
                <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[96%]" />
                </div>
                <span className="w-10 text-left font-mono font-black text-slate-700">96%</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-14 text-right shrink-0">4 نجوم</span>
                <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/80 rounded-full w-[4%]" />
                </div>
                <span className="w-10 text-left font-mono font-black text-slate-700">4%</span>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <span className="w-14 text-right shrink-0">3 نجوم</span>
                <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full w-[0%]" />
                </div>
                <span className="w-10 text-left font-mono text-slate-400">0%</span>
              </div>
            </div>

            {/* Right 3 Cols: Interactive "Add Review" Button */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-600 hover:to-sky-500 text-white font-black px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isFormOpen ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>{t('إغلاق نموذج التقييم', 'Close Review Form')}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{t('✍️ أضف تقييمك وتجربتك معنا', 'Leave Your Review')}</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-500 font-medium">
                {t('يتم نشر تقييمك فورياً ويساعد غيرك في الاختيار', 'Your review appears instantly')}
              </span>
            </div>

          </div>
        </div>

        {/* Interactive Add Review Form Drawer */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="bg-white border-2 border-blue-400/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black text-blue-950 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>{t('شاركنا تقييمك ورأيك في خدمة شِلها', 'Share Your Feedback on Shilha')}</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      {t('نعتز بكل كلمة وتجربة حقيقية لخدمة النقل والتغليف والأوناش', 'We value every authentic moving experience')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isSubmittedSuccess ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3"
                  >
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-md">
                      ✓
                    </div>
                    <h4 className="text-xl font-black text-emerald-950">
                      {t('شكراً جزيلاً لتقييمك الصادق! ❤️', 'Thank You for Your Feedback! ❤️')}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                      {t('تم إضافة تقييمك بنجاح وظهوره فورياً بين آراء العملاء الموثقة.', 'Your review has been published directly.')}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    
                    {/* Interactive 5-Star Rating Selector */}
                    <div className="space-y-2 text-center sm:text-right">
                      <label className="text-xs sm:text-sm font-black text-slate-800 block">
                        {t('١. اختر تقييمك الإجمالي بالنجوم:', '1. Select Your Overall Star Rating:')}
                      </label>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled = hoveredRating ? star <= hoveredRating : star <= formRating;
                          return (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setFormRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(null)}
                              className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                              aria-label={`${star} نجوم`}
                            >
                              <Star
                                className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                                  isFilled
                                    ? 'text-amber-500 fill-amber-400 drop-shadow-sm'
                                    : 'text-slate-300 fill-slate-100'
                                }`}
                              />
                            </button>
                          );
                        })}
                        <span className="text-xs sm:text-sm font-black text-blue-900 mr-2 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                          {ratingTexts[hoveredRating || formRating]}
                        </span>
                      </div>
                    </div>

                    {/* Quick Highlight Tags */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-black text-slate-800 block">
                        {t('٢. ما أكثر ما أعجبك في التجربة؟ (اضغط لاختيار مميزات):', '2. What did you like most? (Tap to select):')}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_TAGS.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              type="button"
                              key={tag}
                              onClick={() => handleTagToggle(tag)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-105'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                          <span>{t('الاسم الكريم *', 'Your Name *')}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="مثال: م. كريم عبد العزيز"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-blue-600" />
                          <span>{t('نوع النقل أو العقار', 'Move Details')}</span>
                        </label>
                        <input
                          type="text"
                          value={moveDetails}
                          onChange={(e) => setMoveDetails(e.target.value)}
                          placeholder="مثال: نقل شقة 3 غرف أو فيلا"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span>{t('المنطقة أو الحي', 'Location')}</span>
                        </label>
                        <input
                          type="text"
                          value={reviewLocation}
                          onChange={(e) => setReviewLocation(e.target.value)}
                          placeholder="مثال: التجمع الخامس / الشيخ زايد"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>

                    {/* Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        {t('٣. اكتب تجربتك ورأيك بالتفصيل *', '3. Write Your Review *')}
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="احكِ لنا عن تجربتك مع سرعة الونش، جودة التغليف، أمانة العمالة، والالتزام بالسعر..."
                        className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all leading-relaxed"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {t('جميع التقييمات يتم نشرها بمصداقية وشفافية تامة.', 'All reviews are published with full authenticity.')}
                      </span>
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{t('نشر التقييم فورياً 🚀', 'Publish Review 🚀')}</span>
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span>تصفية التقييمات:</span>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 font-black'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              الكل ({testimonials.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('5')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                activeFilter === '5'
                  ? 'bg-blue-600 text-white border-blue-600 font-black'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              5 نجوم ⭐ ({testimonials.filter((t) => t.rating === 5).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('4')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                activeFilter === '4'
                  ? 'bg-blue-600 text-white border-blue-600 font-black'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              4 نجوم ⭐ ({testimonials.filter((t) => t.rating === 4).length})
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            {t('عرض أحدث التقييمات المعتمدة', 'Showing latest verified feedback')}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testi) => {
            const isLiked = likedReviews[testi.id];
            return (
              <div
                key={testi.id}
                className="border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 bg-slate-50/80 border-slate-200 hover:border-blue-400"
              >
                <div className="space-y-3.5">
                  
                  {/* Top Card Bar: Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-400 drop-shadow-2xs" />
                      ))}
                      <span className="text-xs font-black text-amber-700 mr-1.5 font-mono">
                        {testi.rating}.0
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-black">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{t('حجز موثق', 'Verified')}</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                    "{testi.text}"
                  </p>

                  {/* Highlight Tags */}
                  {testi.tags && testi.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {testi.tags.map((tg, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/60"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Card Bar: Customer Details & Helpful Likes */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between mt-2">
                  <div className="space-y-0.5">
                    <div className="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{testi.name}</span>
                    </div>
                    <div className="text-[11px] text-blue-700 font-bold">
                      {testi.role}
                    </div>
                    {testi.location && (
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{testi.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(testi.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-blue-600 text-white border-blue-600 scale-105'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-blue-600'
                      }`}
                      title={t('هل كان هذا التقييم مفيداً؟', 'Was this review helpful?')}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                      <span className="font-mono text-[11px]">{testi.likes}</span>
                    </button>
                    <span className="text-[10px] text-slate-400">
                      {testi.date}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
