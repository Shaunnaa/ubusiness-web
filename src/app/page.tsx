"use client"

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Animated Counter Hook
───────────────────────────────────────────── */
function useCounter(target: number, duration: number = 2000, start: boolean = false): number {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [start, target, duration]);
  
  return count;
}

/* ─────────────────────────────────────────────
   Intersection Observer Hook
───────────────────────────────────────────── */
function useInView(threshold: number = 0.3): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  
  return [ref, inView] as const;
}

/* ─────────────────────────────────────────────
   Stat Item Component
───────────────────────────────────────────── */
interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}

function StatItem({ value, suffix, label, inView }: StatItemProps) {
  const count = useCounter(value, 2000, inView);
  return (
    <div className="flex flex-col items-center text-center py-6 px-8">
      <span className="font-playfair text-[clamp(40px,5vw,56px)] font-bold text-brand-gold">
        {count}{suffix}
      </span>
      <span className="text-[#a7f3d0] dark:text-brand-gold/80 text-[13px] tracking-[0.25em] uppercase font-medium mt-2.5">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
export default function HomePage() {
  const [statsRef, statsInView] = useInView(0.4);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // --- ADD THIS PORTION ---
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Small delay so the background loads first
    const timer = setTimeout(() => setShowPopup(true), 0);
    return () => clearTimeout(timer);
  }, []);
  // -------------------------

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const articles = [
    { tag: "SME Strategy", title: "3 กลยุทธ์ SME ที่ช่วยเพิ่มกำไรอย่างยั่งยืน", excerpt: "เจาะลึกแนวทางที่ผู้ประกอบการ SME สามารถนำไปปรับใช้เพื่อเพิ่มรายได้และลดต้นทุนได้จริง", date: "10 มิ.ย. 2568" },
    { tag: "Internal Audit", title: "Internal Audit: Why It's Your First Line of Defence", excerpt: "An effective internal audit function protects assets, ensures compliance, and surfaces risks before they become crises.", date: "22 พ.ค. 2568" },
    { tag: "Tax Planning", title: "วางแผนภาษีอย่างถูกกฎหมาย ลดภาระได้จริง", excerpt: "เทคนิคการวางแผนภาษีที่ถูกต้องตามกฎหมายสำหรับนิติบุคคลและผู้ประกอบการรายบุคคล", date: "5 พ.ค. 2568" },
  ];

  const industries = [
    { icon: <svg viewBox="0 0 48 48" fill="none" width="40" height="40" className="text-brand-gold"><path d="M8 36V18l16-10 16 10v18H8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><rect x="18" y="26" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="16" r="3" stroke="currentColor" strokeWidth="2"/></svg>, title: "FMCG", desc: "สินค้าอุปโภคบริโภคเคลื่อนเร็ว ตั้งแต่ Supply Chain จนถึงการวิเคราะห์ Margin" },
    { icon: <svg viewBox="0 0 48 48" fill="none" width="40" height="40" className="text-brand-gold"><rect x="6" y="14" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="2.5"/><path d="M14 14V10a2 2 0 012-2h16a2 2 0 012 2v4" stroke="currentColor" strokeWidth="2.5"/><path d="M6 22h36" stroke="currentColor" strokeWidth="2"/><path d="M18 32h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, title: "Retail", desc: "วิเคราะห์ประสิทธิภาพสาขา ควบคุมสต็อก และเพิ่มกำไรต่อตารางเมตร" },
    { icon: <svg viewBox="0 0 48 48" fill="none" width="40" height="40" className="text-brand-gold"><path d="M6 30h36M10 30l4-10h20l4 10" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><circle cx="14" cy="34" r="4" stroke="currentColor" strokeWidth="2.5"/><circle cx="34" cy="34" r="4" stroke="currentColor" strokeWidth="2.5"/><path d="M18 20h12" stroke="currentColor" strokeWidth="2"/></svg>, title: "Automotive", desc: "บริหาร Dealer Network, After-Sales และโครงสร้างต้นทุนอุตสาหกรรมยานยนต์" },
    { icon: <svg viewBox="0 0 48 48" fill="none" width="40" height="40" className="text-brand-gold"><circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="2.5"/><path d="M10 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M20 28l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>, title: "Family Business", desc: "วางแผนสืบทอดกิจการ กำกับดูแลธุรกิจครอบครัว และบริหารความขัดแย้ง" },
  ];

  const expertiseCards = [
    { icon: <svg viewBox="0 0 48 48" fill="none" width="40" height="40" className="text-brand-gold"><path d="M24 6l18 10v16L24 42 6 32V16L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M24 6v36M6 16l18 10 18-10" stroke="currentColor" strokeWidth="2"/></svg>, title: "Commercial Excellence", desc: "เสริมศักยภาพการแข่งขันด้วยกลยุทธ์ที่ขับเคลื่อนด้วยข้อมูล เพิ่ม Revenue และ Profit, ขยาย Market Share อย่างยั่งยืน" },
    { icon: <svg viewBox="0 0 48 48" fill="none" width="40" height="40" className="text-brand-gold"><rect x="8" y="8" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="2.5"/><path d="M16 24h16M16 30h10M16 18h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="34" cy="18" r="3" stroke="currentColor" strokeWidth="2"/></svg>, title: "Financial Integrity", desc: "บัญชีที่โปร่งใส ตรวจสอบได้ ตามมาตรฐานสากล TFRS พร้อมระบบควบคุมภายในที่แข็งแกร่ง" },
    { icon: <svg viewBox="0 0 48 48" fill="none" width="40" height="40" className="text-brand-gold"><path d="M8 36l10-12 8 6 8-14 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="38" cy="12" r="4" stroke="currentColor" strokeWidth="2.5"/></svg>, title: "Proven Results", desc: "ผลลัพธ์ที่วัดได้จริงในทุกโปรเจกต์ ด้วยประสบการณ์ที่สั่งสมมากกว่า 3 ทศวรรษในตลาดไทย" },
  ];

  return (
    <>
      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>

      {/* ─── POP-UP MODAL ─── */}
      {showPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          {/* Backdrop Blur */}
          <div className="absolute inset-0 bg-brand-greenDark/80 backdrop-blur-sm animate-in fade-in duration-500" />
          
          {/* Modal Box */}
          <div className="relative bg-white dark:bg-brand-darkElevated p-8 max-w-[450px] w-full shadow-2xl border-b-4 border-brand-gold text-center animate-in zoom-in slide-in-from-bottom-4 duration-500">
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-4" />
            <h2 className="font-playfair text-2xl font-bold text-brand-greenDark dark:text-white mb-3">
              เว็บไซต์อยู่ระหว่างพัฒนา
            </h2>
            <h3 className="font-thai text-m font-bold text-brand-greenDark dark:text-white mb-3">
              (Demo version)
            </h3>
            <p className="font-thai text-s text-gray-600 dark:text-gray-400  leading-relaxed mb-8">
              ยินดีต้อนรับสู่ APL Accountancy & U Business Adviser <br/>
              พันธมิตรเพื่อการเติบโตอย่างยั่งยืนของคุณ
            </p>
            
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-brand-green text-white dark:bg-brand-gold dark:text-brand-greenDark py-3 px-8 font-extrabold text-s tracking-[0.1em] uppercase transition-all hover:bg-brand-greenDark dark:hover:bg-brand-goldLight"
            >
              เข้าสู่เว็บไซต์
            </button>
          </div>
        </div>
      )}

      {/* Page Root */}
      <div className="font-thai overflow-x-hidden transition-colors duration-[400ms] bg-white dark:bg-brand-dark">
        
        {/* ══════════════ HERO ══════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          <div 
            className="absolute inset-0 transition-colors duration-[400ms]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')" }} 
          />
          <div
            className="absolute inset-0 transition-colors duration-[400ms]
            bg-[linear-gradient(135deg,rgba(0,30,20,0.90)_0%,rgba(0,40,25,0.76)_60%,rgba(0,20,15,0.93)_100%)]
            dark:bg-[linear-gradient(135deg,rgba(0,10,6,0.96)_0%,rgba(0,20,12,0.88)_60%,rgba(0,5,3,0.97)_100%)]"
          />

          <div
            className={`relative z-10 max-w-[1152px] mx-auto px-12 pt-32 pb-60 transition-all duration-1000 ease-in-out ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-brand-gold" />
              <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-semibold">
                APL Accountancy · U Business Adviser
              </span>
            </div>

            <h1 className="font-playfair text-[clamp(40px,7vw,88px)] font-extrabold leading-[1.1] max-w-[800px] bg-[linear-gradient(135deg,#ffffff_40%,#C9A84C_100%)] bg-clip-text text-transparent mb-6">
              Strategic Partner<br />
              <span className="text-brand-gold" style={{ WebkitTextFillColor: "#C9A84C" }}>for Profitable</span> Growth
            </h1>

            <p className="text-[#d1fae5] text-lg leading-[1.85] max-w-[580px] font-light mb-10">
              ด้วยประสบการณ์กว่า <strong className="text-white font-semibold">30 ปี</strong>{" "}
              ของ APL Accountancy และ U Business Adviser เราคือพันธมิตรที่ไว้วางใจได้
              ในการยกระดับธุรกิจของคุณด้วยมาตรฐานบริษัทมหาชน
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="/contact" 
                className="bg-brand-gold text-brand-greenDark px-8 py-4 font-bold text-xs tracking-[0.1em] uppercase no-underline inline-flex items-center gap-2 transition-all duration-300 hover:gap-4 hover:shadow-[0_0_32px_rgba(201,168,76,0.45)] group"
              >
                เริ่มต้นกับเรา
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="/about" 
                className="border border-white/40 text-white px-8 py-4 font-bold text-xs tracking-[0.1em] uppercase no-underline inline-flex items-center transition-all duration-300 hover:bg-white hover:text-brand-greenDark"
              >
                เกี่ยวกับเรา
              </a>
            </div>
          </div>

          <div className="absolute bottom-[220px] left-1/2 flex flex-col items-center gap-2 animate-[bounceSlow_2.2s_ease-in-out_infinite]">
            <span className="text-[#6ee7b7] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-[1px] h-8 bg-brand-gold" />
          </div>
        </section>

        {/* ══════════════ EXPERTISE CARDS ══════════════ */}
        <section className="relative z-20 -mt-[120px] px-12 max-w-[1152px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertiseCards.map((card, i) => (
              <div 
                key={i} 
                className="group p-8 border-b-4 border-brand-gold transition-all duration-[400ms] cursor-pointer bg-white dark:bg-brand-darkElevated shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-2.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
              >
                <div className="mb-5">{card.icon}</div>
                <h3 className="font-notoThai text-brand-greenDark dark:text-gray-100 text-xl font-bold mb-3 transition-colors duration-[400ms]">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-[1.75] mb-5 transition-colors duration-[400ms]">
                  {card.desc}
                </p>
                <a 
                  href="#services" 
                  className="text-brand-gold no-underline text-[11px] font-bold tracking-[0.2em] uppercase inline-flex items-center gap-1.5 transition-all duration-300 group-hover:gap-3"
                >
                  Read More
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ TRUST STATS ══════════════ */}
        <section 
          ref={statsRef} 
          className="mt-16 py-10 px-12 transition-colors duration-[400ms] bg-brand-green dark:bg-brand-greenDark"
        >
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3">
            <StatItem value={30} suffix="+" label="Years Experience" inView={statsInView} />
            <div className="md:border-l md:border-r border-white/10">
              <StatItem value={30} suffix="+" label="Years Expertise" inView={statsInView} />
            </div>
            <div className="flex flex-col items-center text-center py-6 px-8">
              <span className="font-playfair text-brand-gold text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.2]">Public Co.</span>
              <span className="font-playfair text-brand-gold text-[clamp(28px,3.5vw,44px)] font-bold">Standard</span>
              <span className="text-[#a7f3d0] text-[13px] tracking-[0.25em] uppercase font-medium mt-2.5">Quality Assurance</span>
            </div>
          </div>
        </section>

        {/* ══════════════ INDUSTRIES ══════════════ */}
        <section className="py-12 px-12 transition-colors duration-[400ms] bg-gray-50 dark:bg-brand-dark">
          <div className="max-w-[1152px] mx-auto">
            <div className="mb-16 max-w-[580px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-10 bg-brand-gold" />
                <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-semibold">Industries</span>
              </div>
              <h2 className="font-playfair text-brand-greenDark dark:text-gray-100 text-[clamp(26px,3vw,38px)] font-bold leading-[1.35] transition-colors duration-[400ms]">
                ความเชี่ยวชาญที่ครอบคลุม<br />หลากหลายอุตสาหกรรม
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-4 leading-[1.75] transition-colors duration-[400ms]">
                เราทำงานร่วมกับธุรกิจหลากหลายประเภท ด้วยความเข้าใจเชิงลึกในแต่ละอุตสาหกรรม
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((ind, i) => (
                <div 
                  key={i} 
                  className="group relative p-8 transition-all duration-[400ms] cursor-pointer overflow-hidden bg-white dark:bg-brand-darkElevated border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
                >
                  <div className="mb-5">{ind.icon}</div>
                  <h3 className="font-notoThai text-brand-greenDark dark:text-gray-100 text-lg font-bold mb-2.5 transition-colors duration-[400ms]">
                    {ind.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-[1.75] transition-colors duration-[400ms]">{ind.desc}</p>
                  
                  <div className="absolute top-0 right-0 w-[52px] h-[52px] bg-[linear-gradient(225deg,#C9A84C_0%,transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ LATEST INSIGHTS ══════════════ */}
        <section className="py-16 px-12 transition-colors duration-[400ms] bg-[#f8f6f1] dark:bg-brand-dark">
          <div className="max-w-[1152px] mx-auto">
            <div className="flex justify-between items-end mb-14 flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-10 bg-brand-gold" />
                  <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-semibold">Latest Insights</span>
                </div>
                <h2 className="font-playfair text-brand-greenDark dark:text-gray-100 text-[clamp(26px,3vw,38px)] font-bold transition-colors duration-[400ms]">
                  บทความ & ความรู้
                </h2>
              </div>
              <a 
                href="#insights" 
                className="text-brand-gold no-underline text-xs font-bold tracking-[0.2em] uppercase border-b-2 border-brand-gold pb-1 inline-flex items-center gap-1.5"
              >
                ดูทั้งหมด →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {articles.map((art, i) => (
                <a 
                  key={i} 
                  href="#insights" 
                  className="group overflow-hidden no-underline flex flex-col transition-all duration-300 bg-white dark:bg-brand-darkElevated shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
                >
                  <div className="h-[6px] bg-brand-gold transition-all duration-300 group-hover:h-[10px]" />
                  <div className="p-8 flex flex-col flex-1">
                    <span className="text-brand-gold text-[10px] font-bold tracking-[0.1em] uppercase mb-3.5 block">
                      {art.tag}
                    </span>
                    <h3 className="font-notoThai text-brand-greenDark dark:text-gray-100 text-lg font-bold leading-[1.45] mb-3 transition-colors duration-[400ms]">
                      {art.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-[1.75] flex-1 transition-colors duration-[400ms]">{art.excerpt}</p>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-gray-400 dark:text-gray-500 text-xs transition-colors duration-[400ms]">{art.date}</span>
                      <span className="text-brand-gold text-xs font-bold tracking-[0.15em] uppercase">อ่านต่อ →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FINAL CTA ══════════════ */}
        <section className="py-16 px-12 relative overflow-hidden transition-colors duration-[400ms] bg-brand-green dark:bg-brand-greenDark">
          <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full border-2 border-brand-gold opacity-10 dark:opacity-15" />
          <div className="absolute -bottom-20 -left-20 w-[280px] h-[280px] rounded-full border-2 border-brand-gold opacity-10 dark:opacity-15" />

          <div className="relative z-10 max-w-[720px] mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-brand-gold" />
              <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-semibold">เริ่มต้นวันนี้</span>
              <div className="h-[1px] w-12 bg-brand-gold" />
            </div>

            <h2 className="font-playfair text-white text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.2] mb-6">
              พร้อมยกระดับธุรกิจ<br />
              <span className="text-brand-gold">ของคุณหรือยัง?</span>
            </h2>

            <p className="text-[#a7f3d0] text-[17px] leading-[1.85] mb-12">
              ปรึกษาผู้เชี่ยวชาญของเราฟรี ไม่มีข้อผูกมัด เราพร้อมช่วยวิเคราะห์
              และวางแผนที่เหมาะสมกับธุรกิจของคุณ
            </p>

            <a 
              href="/contact" 
              className="bg-brand-gold text-brand-dark px-12 py-5 font-bold text-s tracking-[0.1em] uppercase no-underline inline-flex items-center gap-3 transition-all duration-300 hover:gap-6 hover:shadow-[0_0_48px_rgba(201,168,76,0.55)] group"
            >
              ติดต่อเราเลย
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

      </div>
    </>
  );
}