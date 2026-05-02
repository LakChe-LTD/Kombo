import { Link } from 'react-router-dom';
import { ChevronRight, Play, Star, Check, AlertCircle, ChevronLeft, X, ShoppingBag, Truck, Shield, Headphones, Zap, Battery, Smartphone, Wind, Droplets } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// ─────────────────────────────────────────────────────────────────────────────
// COMBO DATA — hardcoded now. When backend is ready, replace with:
//   const [combos, setCombos] = useState([]);
//   useEffect(() => { fetch('/api/combos').then(r=>r.json()).then(setCombos) }, []);
// ─────────────────────────────────────────────────────────────────────────────
const COMBOS = [
  {
    id: 'smart-combo-1',
    name: 'Smart Combo Pack',
    tagline: 'Style · Tech · Luxury — All In One',
    totalPrice: 55000,
    originalPrice: 105000,
    badge: '🔥 BEST SELLER',
    stockLeft: 15,
    items: [
      {
        name: 'Smart Watch Pro',
        badge: 'SMART WATCH',
        individualPrice: 25000,
        images: ['/images/watch1.avif', '/images/watch2.avif', '/images/watch3.avif', '/images/watch4.avif'],
      },
      {
        name: 'Bluetooth Audio Glasses',
        badge: 'AUDIO GLASSES',
        individualPrice: 18000,
        images: ['/images/glasses1.avif', '/images/glasses2.avif', '/images/glasses3.avif', '/images/glasses4.avif'],
      },
      {
        name: 'Premium Bracelet',
        badge: 'BRACELET',
        individualPrice: 12000,
        images: ['/images/bracelet1.avif', '/images/bracelet2.avif', '/images/bracelet3.avif'],
      },
    ],
  },
  // Add more combos here — UI renders automatically, no code changes needed
];

// Hero slides — load from backend /api/combos/hero when ready
const HERO_SLIDES = [
  { image: '/images/glasses3.avif',  accent: 'from-[#1a0a2e] via-[#16213e] to-[#0f3460]', tag: 'See the World Differently' },
  { image: '/images/glasses4.avif',  accent: 'from-[#0f0c29] via-[#302b63] to-[#24243e]', tag: 'Fashion Meets Function' },
  { image: '/images/watch3.avif',    accent: 'from-[#0d1b2a] via-[#1b2838] to-[#2d1b69]', tag: 'Time, Redefined' },
  { image: '/images/watch4.avif',    accent: 'from-[#0a0a1a] via-[#1a1040] to-[#0f2040]', tag: 'Precision on Your Wrist' },
  { image: '/images/bracelet1.avif', accent: 'from-[#1a0f0a] via-[#2a1a10] to-[#3d2010]', tag: 'Elegance Reimagined' },
  { image: '/images/bracelet2.avif', accent: 'from-[#1a0a0f] via-[#251020] to-[#1a0a2e]', tag: 'Wear Your Story' },
  { image: '/images/glasses1.avif',  accent: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]', tag: 'The Complete Look' },
];

// Store settings — load from backend /api/settings when ready
const WHATSAPP = 'https://wa.me/2348000000000';
const VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
const VIDEO_THUMB = '/images/hero_image.avif';

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const FEATURES = [
  { Icon: Zap,        title: 'Advanced Technology',      desc: 'Latest chipsets and sensors for seamless performance' },
  { Icon: Battery,    title: 'Long Battery Life',        desc: '7–10 days of battery on a single charge' },
  { Icon: Shield,     title: 'Premium Build',            desc: 'Aerospace-grade materials built to last' },
  { Icon: Smartphone, title: 'Smart Integration',        desc: 'Works with iOS and Android seamlessly' },
  { Icon: Wind,       title: 'Lightweight',              desc: 'Engineered for all-day comfort' },
  { Icon: Droplets,   title: 'Water Resistant',          desc: 'IP68 rated for water and dust resistance' },
];

const TESTIMONIALS = [
  { name: 'Aisha Mohammed', location: 'Lagos',  rating: 5, text: 'The Smart Combo completely transformed my daily routine. The build quality is exceptional!' },
  { name: 'Chukwu Okafor',  location: 'Abuja',  rating: 5, text: 'Best purchase this year. Fast delivery, excellent service, and amazing products.' },
  { name: 'Zainab Hassan',  location: 'Ilorin', rating: 5, text: 'Love the features and premium feel. Worth every naira. Highly recommended!' },
];

const FAQS = [
  { q: 'What is included in the Smart Combo package?',       a: 'The Smart Combo includes one Smart Watch Pro, one pair of Bluetooth Audio Glasses, and one Premium Bracelet — each with a charging cable, user manual, and warranty documentation.' },
  { q: 'What is the warranty period?',                       a: "All products come with a 1-year manufacturer's warranty. Extended options are available at checkout." },
  { q: 'Do you deliver to all states in Nigeria?',           a: 'Yes, nationwide. Ilorin 2–3 days, other states 5–7 business days. COD only available in Ilorin.' },
  { q: 'What payment methods are available?',                a: 'OPay, PalmPay, Nigerian Bank Transfer. Ilorin customers can also use Cash on Delivery.' },
  { q: 'Can I return the products?',                         a: '14-day return policy for unused items in original packaging.' },
  { q: 'Are there any hidden charges?',                      a: 'None. All prices include VAT. Delivery fees shown before payment.' },
];

export default function Index() {
  const [currentHeroIdx, setCurrentHeroIdx]     = useState(0);
  const [heroTransitioning, setHeroTransitioning] = useState(false);
  const [showVideoModal, setShowVideoModal]       = useState(false);
  const [itemImgIdxs, setItemImgIdxs]            = useState<Record<string, number>>({});
  const manualRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Countdown — replace PROMO_END with backend value when ready
  const PROMO_END = useRef(Date.now() + 5 * 86400000 + 12 * 3600000 + 30 * 60000);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 45 });

  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, PROMO_END.current - Date.now());
      setTimeLeft({
        days:    Math.floor(d / 86400000),
        hours:   Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000) / 60000),
        seconds: Math.floor((d % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Hero auto-rotate
  useEffect(() => {
    const id = setInterval(() => goToSlide((p) => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Product image auto-rotate
  useEffect(() => {
    const ids: ReturnType<typeof setInterval>[] = [];
    COMBOS.forEach((combo, ci) =>
      combo.items.forEach((item, ii) => {
        if (item.images.length <= 1) return;
        const key = `${ci}_${ii}`;
        ids.push(setInterval(() => {
          if (!manualRef.current[key])
            setItemImgIdxs((p) => ({ ...p, [key]: ((p[key] ?? 0) + 1) % item.images.length }));
        }, 3000 + ii * 500));
      })
    );
    return () => ids.forEach(clearInterval);
  }, []);

  // Auto-show video modal
  useEffect(() => {
    const id = setTimeout(() => setShowVideoModal(true), 1000);
    return () => clearTimeout(id);
  }, []);

  const goToSlide = (v: number | ((p: number) => number)) => {
    setHeroTransitioning(true);
    setTimeout(() => { setCurrentHeroIdx(typeof v === 'function' ? v : () => v); setHeroTransitioning(false); }, 400);
  };

  const getImg = (ci: number, ii: number) => itemImgIdxs[`${ci}_${ii}`] ?? 0;
  const setImg = (ci: number, ii: number, v: number | ((p: number) => number)) => {
    const key = `${ci}_${ii}`;
    if (manualRef.current[key]) clearTimeout(manualRef.current[key]);
    (manualRef.current as any)[key] = setTimeout(() => { delete (manualRef.current as any)[key]; }, 6000);
    setItemImgIdxs((p) => ({ ...p, [key]: typeof v === 'function' ? v(p[key] ?? 0) : v }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ── VIDEO MODAL ─────────────────────────────── */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-primary/40 shadow-2xl"
               style={{ background: 'rgba(8,8,20,0.97)' }}>
            <button onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-full aspect-video bg-black">
              <iframe className="w-full h-full" src={VIDEO_URL} title="Smart Combo Demo"
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-white/10">
              <p className="text-sm text-white/50">Smart Combo — Product Demo</p>
              <button onClick={() => setShowVideoModal(false)}
                className="text-sm px-4 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[96vh] flex items-center">
        {HERO_SLIDES.map((slide, idx) => (
          <div key={idx} className="absolute inset-0"
            style={{ opacity: idx === currentHeroIdx ? (heroTransitioning ? 0 : 1) : 0, transition: 'opacity 600ms ease-in-out', pointerEvents: idx === currentHeroIdx ? 'auto' : 'none' }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent}`} />
            <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 65%)' }} />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 65%)' }} />
            <div className="absolute inset-0 opacity-[0.035]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,215,0,1) 0px, rgba(255,215,0,1) 1px, transparent 1px, transparent 56px)' }} />
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
            <div
              className="absolute right-0 top-0 h-full w-1/2 md:w-[45%]"
              style={{ opacity: heroTransitioning ? 0 : 1, transform: heroTransitioning ? 'translateX(20px)' : 'translateX(0)', transition: 'opacity 600ms ease-in-out, transform 600ms ease-in-out' }}>
              <img src={slide.image} alt="product" className="w-full h-full object-cover"
                style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,0.95) 20%, transparent 100%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 15%, rgba(6,6,20,0.6) 100%)' }} />
            </div>
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}

        {/* Arrows */}
        <button onClick={() => goToSlide((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary/30 border border-white/15 hover:border-primary/60 backdrop-blur-md transition-all group">
          <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white" />
        </button>
        <button onClick={() => goToSlide((p) => (p + 1) % HERO_SLIDES.length)}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary/30 border border-white/15 hover:border-primary/60 backdrop-blur-md transition-all group">
          <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === currentHeroIdx ? 'w-8 h-[3px] bg-primary' : 'w-[5px] h-[5px] bg-white/30 hover:bg-white/60'}`} />
          ))}
        </div>

        {/* Tag pill */}
        <div className="absolute top-8 right-16 z-20">
          <span className="text-[10px] tracking-[0.22em] uppercase font-bold px-4 py-2 rounded-full backdrop-blur-md border border-primary/25 text-primary/85"
            style={{ background: 'rgba(255,215,0,0.05)' }}>
            {HERO_SLIDES[currentHeroIdx].tag}
          </span>
        </div>
        <div className="absolute bottom-10 right-8 z-20 text-white/25 text-[11px] tracking-widest">
          0{currentHeroIdx + 1} / 0{HERO_SLIDES.length}
        </div>

        {/* Copy */}
        <div className="container-premium section-padding py-32 relative z-10 w-full">
          <div className="max-w-[560px] space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-[11px] tracking-[0.28em] uppercase font-bold text-primary/80">Limited Time Offer</span>
            </div>
            <h1 className="text-5xl md:text-[4.5rem] font-black leading-[1.03] tracking-tight text-white"
              style={{ textShadow: '0 6px 48px rgba(0,0,0,0.55)' }}>
              Wear the<br /><span className="gradient-text">Future.</span>
            </h1>
            <p className="text-[15px] text-white/60 leading-relaxed max-w-[420px]">
              Smart Watch · Audio Glasses · Premium Bracelet —<br />
              three premium pieces, one unbeatable promo price.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-[2.8rem] md:text-5xl font-black text-primary leading-none">₦55,000</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm text-white/35 line-through">₦105,000</span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25 whitespace-nowrap">
                  PROMO — SAVE 48%
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/45 pt-1">
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" /> 4.9 / 5 from 2,500+ buyers
              </span>
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-primary animate-pulse" /> Only 15 units left
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/checkout"
                className="btn-primary flex items-center justify-center gap-2 group text-[15px] px-8 py-3.5 font-bold">
                <ShoppingBag className="w-4 h-4" />
                Order Now
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2 text-[15px] px-7 py-3.5">
                Order on WhatsApp
              </a>
            </div>
            <p className="text-[11px] text-white/30 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-primary/60" />
              Free nationwide delivery · 14-day returns · 1-year warranty
            </p>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────── */}
      <div className="border-y border-primary/15" style={{ background: 'rgba(0,0,0,0.35)' }}>
        <div className="container-premium section-padding py-4">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-3">
            {[
              { Icon: Truck,      text: 'Free Nationwide Delivery' },
              { Icon: Shield,     text: '1-Year Warranty' },
              { Icon: Check,      text: '14-Day Returns' },
              { Icon: Headphones, text: '24/7 WhatsApp Support' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-[12px] text-white/45">
                <Icon className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                <span className="font-medium tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COUNTDOWN ───────────────────────────────── */}
      <section className="border-b border-primary/10" style={{ background: 'rgba(255,215,0,0.03)' }}>
        <div className="container-premium section-padding py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-primary/70 font-bold">⚡ Flash Promo</p>
              <p className="text-lg font-bold text-white">Price goes back to ₦105,000 when timer hits zero</p>
              <p className="text-sm text-white/40">Only {COMBOS[0].stockLeft} combo packs left at this price</p>
            </div>
            <div className="flex items-center gap-2">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hrs',  value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="text-center glass-card px-4 py-3 rounded-xl min-w-[56px] border border-primary/20">
                    <div className="text-2xl font-black text-primary tabular-nums leading-none mb-1">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/35">{item.label}</div>
                  </div>
                  {i < 3 && <span className="text-primary/35 font-bold text-xl">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PREMIUM COMBO ───────────────────────── */}
      <section className="section-padding py-24">
        <div className="container-premium">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-bold mb-3">What you get</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Our Premium Combo</h2>
            <p className="text-white/50 max-w-xl mx-auto text-[15px] leading-relaxed">
              Everything you need in one powerful bundle — crafted for the modern Nigerian.
            </p>
          </div>

          <div className="space-y-14">
            {COMBOS.map((combo, ci) => {
              const saving    = combo.originalPrice - combo.totalPrice;
              const savePct   = Math.round((saving / combo.originalPrice) * 100);
              const itemTotal = combo.items.reduce((s, it) => s + it.individualPrice, 0);
              return (
                <div key={combo.id} className="rounded-3xl overflow-hidden border border-primary/20"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>

                  {/* Combo header */}
                  <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/15"
                    style={{ background: 'linear-gradient(to right, rgba(255,215,0,0.06), transparent, rgba(255,140,0,0.03))' }}>
                    <div>
                      <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 mb-2">
                        {combo.badge}
                      </span>
                      <h3 className="text-2xl font-black text-white">{combo.name}</h3>
                      <p className="text-sm text-white/45 mt-0.5">{combo.tagline}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black text-primary">{fmt(combo.totalPrice)}</span>
                        <span className="text-sm text-white/30 line-through">{fmt(combo.originalPrice)}</span>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                        YOU SAVE {fmt(saving)} ({savePct}% OFF)
                      </span>
                    </div>
                  </div>

                  {/* Product sliders */}
                  <div className="p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
                      {combo.items.map((item, ii) => {
                        const imgIdx = getImg(ci, ii);
                        const total  = item.images.length;
                        return (
                          <div key={ii} className="group flex flex-col items-center text-center">
                            <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/20 mb-4">
                              {item.badge}
                            </span>

                            {/* Image slider */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 bg-black/30 mb-4 cursor-pointer"
                              onClick={() => setImg(ci, ii, (p) => (p + 1) % total)}>
                              {item.images.map((src, imgI) => (
                                <img key={imgI} src={src} alt={`${item.name} ${imgI + 1}`}
                                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                                  style={{ opacity: imgI === imgIdx ? 1 : 0, transform: imgI === imgIdx ? 'scale(1)' : 'scale(1.04)' }} />
                              ))}

                              {total > 1 && (<>
                                <button onClick={(e) => { e.stopPropagation(); setImg(ci, ii, (p) => (p - 1 + total) % total); }}
                                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-primary/70 border border-white/10 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                                  <ChevronLeft className="w-4 h-4 text-white" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setImg(ci, ii, (p) => (p + 1) % total); }}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-primary/70 border border-white/10 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                                  <ChevronRight className="w-4 h-4 text-white" />
                                </button>
                              </>)}

                              {total > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                  {item.images.map((_, dotI) => (
                                    <button key={dotI} onClick={(e) => { e.stopPropagation(); setImg(ci, ii, dotI); }}
                                      className={`rounded-full transition-all duration-500 ${dotI === imgIdx
                                        ? 'w-5 h-[3px] bg-primary shadow-[0_0_8px_rgba(255,215,0,0.9)]'
                                        : 'w-[5px] h-[5px] bg-white/35 hover:bg-white/65'}`} />
                                  ))}
                                </div>
                              )}

                              <div className="absolute top-3 right-3 text-[10px] text-white/45 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full z-10">
                                {imgIdx + 1}/{total}
                              </div>
                            </div>

                            <h4 className="text-base font-bold text-white mb-1">{item.name}</h4>
                            <p className="text-xs text-white/40">
                              Individual value: <span className="text-white/60 font-semibold">{fmt(item.individualPrice)}</span>
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Price breakdown + CTA */}
                    <div className="rounded-2xl border border-primary/15 overflow-hidden" style={{ background: 'rgba(255,215,0,0.015)' }}>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Breakdown */}
                        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-primary/10">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-5">Price Breakdown</p>
                          <div className="space-y-3">
                            {combo.items.map((item, ii) => (
                              <div key={ii} className="flex items-center justify-between text-[13px]">
                                <span className="text-white/60 flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                                  {item.name}
                                </span>
                                <span className="text-white/50 tabular-nums">{fmt(item.individualPrice)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-dashed border-white/10 mt-5 pt-5 space-y-2">
                            <div className="flex justify-between text-[13px] text-white/30">
                              <span>If bought separately</span>
                              <span className="line-through tabular-nums">{fmt(itemTotal)}</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-white text-[15px]">Combo Price</span>
                              <span className="text-2xl font-black text-primary tabular-nums">{fmt(combo.totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                              <span className="text-emerald-400">Your savings</span>
                              <span className="text-emerald-400 font-bold tabular-nums">− {fmt(saving)}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-2">Total Combo Price</p>
                            <div className="text-5xl font-black text-primary leading-none mb-1">{fmt(combo.totalPrice)}</div>
                            <p className="text-[11px] text-white/30 line-through">{fmt(combo.originalPrice)} original price</p>
                            <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-amber-400/80">
                              <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                              Only {combo.stockLeft} packs remaining
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Link to="/checkout"
                              className="btn-primary w-full flex items-center justify-center gap-2 group py-3.5 font-bold">
                              <ShoppingBag className="w-4 h-4" />
                              Order This Combo
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                              className="btn-secondary w-full flex items-center justify-center gap-2 py-3">
                              Order via WhatsApp
                            </a>
                            <p className="text-[11px] text-white/30 flex items-center justify-center gap-1.5 pt-1">
                              <Check className="w-3.5 h-3.5 text-primary/60" />
                              Free delivery · 14-day returns · Warranty included
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEMO VIDEO ──────────────────────────────── */}
      <section className="section-padding py-20" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="container-premium">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-bold mb-3">Watch It Live</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">See It In Action</h2>
            <p className="text-white/45 max-w-md mx-auto text-[15px]">Watch how the Smart Combo transforms your daily lifestyle</p>
          </div>

          {/* Video thumbnail — real image instead of blank gold box */}
          <button onClick={() => setShowVideoModal(true)}
            className="relative w-full rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300 group block"
            style={{ aspectRatio: '16/7' }}>
            <img src={VIDEO_THUMB} alt="Smart Combo video preview"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-[0_0_40px_rgba(255,215,0,0.4)]">
                <Play className="w-8 h-8 text-black ml-1" />
              </div>
              <span className="text-white/70 text-sm font-medium group-hover:text-white/90 transition-colors">Click to play</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-lg">Smart Combo — Product Demo</p>
                <p className="text-white/50 text-sm">See all 3 products in action</p>
              </div>
              <span className="hidden sm:flex items-center gap-2 text-white/40 text-xs">
                <Play className="w-3 h-3" /> 2:30 min
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────── */}
      <section className="section-padding py-24">
        <div className="container-premium">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-bold mb-3">Built different</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">Premium Features</h2>
            <p className="text-white/45 max-w-md mx-auto text-[15px]">Cutting-edge technology meets premium craftsmanship</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ Icon, title, desc }, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/8 hover:border-primary/30 transition-colors group"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{title}</h3>
                <p className="text-[13px] text-white/45 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────── */}
      <section className="section-padding py-20" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="container-premium">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-bold mb-3">Our promise</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">Why Choose Smart Combo?</h2>
            <p className="text-white/45 max-w-md mx-auto text-[15px]">We stand behind every product with genuine commitment to your satisfaction</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { Icon: Check,      title: 'Authentic Products',       desc: 'Genuine, original items sourced directly from manufacturers. No fakes, no compromises.' },
              { Icon: Truck,      title: 'Fast Nationwide Delivery', desc: 'Ilorin gets delivery in 2–3 days. Every other state in 5–7 business days.' },
              { Icon: Shield,     title: 'Secure Payment',           desc: 'OPay, PalmPay, Bank Transfer — multiple trusted options with full buyer protection.' },
              { Icon: Headphones, title: 'Expert Support',           desc: '24/7 customer care via WhatsApp. Real people, real solutions, anytime.' },
            ].map(({ Icon, title, desc }, idx) => (
              <div key={idx} className="flex items-start gap-5 p-7 rounded-2xl border border-white/8 hover:border-primary/25 transition-colors"
                style={{ background: 'rgba(255,255,255,0.015)' }}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{title}</h3>
                  <p className="text-[13px] text-white/45 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────── */}
      <section className="section-padding py-24">
        <div className="container-premium">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-bold mb-3">Social proof</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">Customer Love Stories</h2>
            <p className="text-white/45 max-w-md mx-auto text-[15px]">Real reviews from verified buyers across Nigeria</p>
          </div>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}</div>
            <span className="text-2xl font-black text-white">4.9</span>
            <span className="text-white/35 text-sm">from 2,500+ verified buyers</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-7 rounded-2xl border border-white/8 hover:border-primary/20 transition-colors flex flex-col"
                style={{ background: 'rgba(255,255,255,0.015)' }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                </div>
                <p className="text-[14px] text-white/65 leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/8">
                  <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-sm font-black text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">{t.name}</p>
                    <p className="text-[11px] text-white/35">{t.location}, Nigeria</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="section-padding py-20" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="container-premium">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-bold mb-3">Got questions?</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">Frequently Asked Questions</h2>
            <p className="text-white/45 max-w-md mx-auto text-[15px]">Everything you need to know before ordering</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}
                  className="border border-white/8 rounded-xl px-0 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.015)' }}>
                  <AccordionTrigger className="hover:no-underline px-6 py-4 text-left hover:bg-white/5 transition-colors">
                    <span className="font-semibold text-[14px] text-white/90 pr-4">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[13px] text-white/50 px-6 pb-5 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="text-center text-sm text-white/30 mt-8">
              Still have questions?{' '}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors underline underline-offset-2">
                Chat with us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section className="section-padding py-24">
        <div className="container-premium">
          <div className="relative rounded-3xl overflow-hidden border border-primary/25 px-8 md:px-16 py-16 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.05) 0%, transparent 50%, rgba(255,140,0,0.04) 100%)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute inset-0 -z-10"
              style={{ background: 'radial-gradient(ellipse at center top, rgba(255,215,0,0.05) 0%, transparent 65%)' }} />

            <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-bold mb-4">Don't miss out</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to Upgrade?</h2>
            <p className="text-white/45 text-lg max-w-lg mx-auto mb-2">
              Join 2,500+ Nigerians already rocking the Smart Combo lifestyle.
            </p>
            <p className="text-primary/70 text-sm font-semibold mb-10">
              ⚡ Promo price ends soon — only {COMBOS[0].stockLeft} packs left
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/checkout"
                className="btn-primary text-base px-10 py-4 flex items-center justify-center gap-2 group font-bold">
                <ShoppingBag className="w-5 h-5" />
                Order Now — ₦55,000
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2">
                Order on WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/30">
              {['Free nationwide delivery', '14-day returns', '1-year warranty', '30-day money-back guarantee'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-primary/50" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}