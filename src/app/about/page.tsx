"use client"

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Scroll Reveal Hook
───────────────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.15
): readonly [React.RefObject<T>, boolean] {
  // 1. Initialize with null as usual
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // 2. Capture ref.current safely
    const element = ref.current;
    if (!element) return;

    const obs = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setVisible(true); 
          obs.disconnect(); 
        } 
      },
      { threshold }
    );
    
    obs.observe(element);
    
    return () => obs.disconnect();
  }, [threshold]);
  
  // 3. Cast the ref to satisfy the return type without | null
  // This tells TypeScript: "Trust me, this is a standard React RefObject"
  return [ref as React.RefObject<T>, visible] as const;
}

/* ─────────────────────────────────────────────
   Reveal Wrapper
───────────────────────────────────────────── */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

function Reveal({ children, delay = 0, style = {}, className = "" }: RevealProps) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const Icons = {
  Professionalism: () => <svg viewBox="0 0 48 48" fill="none" width="36" height="36"><rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2.5"/><path d="M16 20h16M16 26h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="34" cy="14" r="5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/><path d="M32 14l1.5 1.5L36 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Integrity: () => <svg viewBox="0 0 48 48" fill="none" width="36" height="36"><path d="M24 6l4 8 9 1.3-6.5 6.3 1.5 9L24 26l-8 4.6 1.5-9L11 15.3l9-1.3z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M18 34l-6 6M24 36v6M30 34l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  Growth: () => <svg viewBox="0 0 48 48" fill="none" width="36" height="36"><path d="M8 36l10-12 8 6 8-14 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="38" cy="10" r="5" stroke="currentColor" strokeWidth="2.5"/><path d="M36 10h4M38 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  Strategic: () => <svg viewBox="0 0 48 48" fill="none" width="36" height="36"><circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5"/><circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/><path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  Empower: () => <svg viewBox="0 0 48 48" fill="none" width="32" height="32"><path d="M24 10v28M16 20l8-10 8 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 38h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  Integrate: () => <svg viewBox="0 0 48 48" fill="none" width="32" height="32"><circle cx="16" cy="24" r="8" stroke="currentColor" strokeWidth="2.5"/><circle cx="32" cy="24" r="8" stroke="currentColor" strokeWidth="2.5"/><path d="M22 18c1.5 2 2 4 2 6s-.5 4-2 6M26 18c-1.5 2-2 4-2 6s.5 4 2 6" stroke="currentColor" strokeWidth="1.8"/></svg>,
  Profit: () => <svg viewBox="0 0 48 48" fill="none" width="32" height="32"><path d="M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8z" stroke="currentColor" strokeWidth="2.5"/><path d="M24 16v2.5c-2.5 0-4.5 1.5-4.5 3.5S21.5 25 24 25.5c2.5.5 4.5 2 4.5 4s-2 3.5-4.5 3.5V35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M21 16h6M21 33h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
};

/* ─────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────── */
export default function AboutPage() {
  
  // Reusable section label component tailored for Tailwind
  const SectionLabel = ({ text, center = false, colorClass = "text-brand-gold" }: { text: string, center?: boolean, colorClass?: string }) => (
    <div className={`flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-semibold mb-4 before:content-[''] before:block before:w-10 before:h-px before:bg-current ${center ? 'justify-center' : ''} ${colorClass}`}>
      <span>{text}</span>
    </div>
  );

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Page Root Wrapper */}
      <div className="font-thai leading-[1.7] overflow-x-hidden transition-colors duration-300 bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100 min-h-screen">
        
        {/* ═══════════════════════════════════════
            SECTION 1 · HERO BANNER
        ═══════════════════════════════════════ */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')" }} 
          />
          {/* Theme-aware overlay */}
          <div className="absolute inset-0 transition-colors duration-300 bg-brand-green/70 dark:bg-black/75" />
          {/* Gold left accent */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-brand-gold/60 to-transparent" />

          <div className="relative z-10 text-center max-w-[800px] px-8 pt-[100px] pb-16 animate-[heroFade_1.1s_ease_forwards]">
            <SectionLabel text="About Us" center colorClass="text-brand-gold" />

            <h1 className="font-playfair text-[clamp(32px,5.5vw,64px)] font-extrabold leading-[1.2] text-white mb-6">
              รากฐานที่มั่นคง<br />
              <span className="text-brand-gold">สู่กลยุทธ์การเติบโต</span><br />
              ที่ไม่สิ้นสุด
            </h1>

            <p className="text-white/75 text-[17px] leading-[1.85] max-w-[560px] mx-auto">
              จากรากฐานด้านบัญชีที่มั่นคงกว่า 30 ปี สู่ที่ปรึกษาธุรกิจที่ขับเคลื่อนการเติบโตอย่างยั่งยืน
            </p>

            {/* Gold divider */}
            <div className="mx-auto mt-8 w-20 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 · HERITAGE
        ═══════════════════════════════════════ */}
        <section className="py-16 px-12 transition-colors duration-300 bg-gray-50 dark:bg-brand-darkElevated">
          <div className="max-w-[1152px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              
              {/* Image side */}
              <Reveal delay={0}>
                <div className="relative w-full max-w-[500px] mx-auto md:max-w-none">
                  <div className="w-full pb-[110%] relative overflow-hidden rounded-sm">
                    <img
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                      alt="Heritage"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Tint overlay */}
                    <div className="absolute inset-0 transition-colors duration-300 bg-brand-green/15 dark:bg-brand-dark/40" />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 z-10 animate-[floatBadge_4s_ease-in-out_infinite]">
                    <div 
                      className="w-[130px] h-[130px] rounded-full border-[3px] border-brand-gold flex flex-col items-center justify-center relative before:content-[''] before:absolute before:inset-[6px] before:rounded-full before:border before:border-brand-gold/35 bg-white dark:bg-[#1a1a1a] shadow-[0_16px_48px_rgba(0,0,0,0.15)] dark:shadow-[0_0_40px_rgba(201,168,76,0.2)] transition-colors duration-300"
                    >
                      <span className="font-playfair text-[36px] font-extrabold text-brand-gold leading-none">30</span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-brand-green dark:text-emerald-400 font-semibold mt-1 transition-colors">Years of</span>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-brand-green dark:text-emerald-400 font-semibold transition-colors">Excellence</span>
                    </div>
                  </div>

                  {/* Gold frame accent */}
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-t-[3px] border-l-[3px] border-brand-gold rounded-sm" />
                  <div className="absolute bottom-3 right-3 w-[60px] h-[60px] border-b-[3px] border-r-[3px] border-brand-gold rounded-sm" />
                </div>
              </Reveal>

              {/* Story side */}
              <Reveal delay={0.15}>
                <div>
                  <SectionLabel text="Our Heritage" colorClass="text-brand-gold" />

                  <h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.25] text-brand-greenDark dark:text-white mb-6 transition-colors duration-300">
                    สามทศวรรษแห่งความ<br />
                    <span className="text-brand-gold">ไว้วางใจและความเชี่ยวชาญ</span>
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 mb-5 leading-[1.85] transition-colors duration-300">
                    APL Accountancy ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะยกระดับมาตรฐานการบัญชีและการตรวจสอบในประเทศไทย
                    ตลอดกว่า <strong className="text-brand-gold">30 ปี</strong> เราได้รับความไว้วางใจจากธุรกิจขนาดกลางถึงขนาดใหญ่
                    ด้วยความโปร่งใสและความแม่นยำที่เป็นมาตรฐานระดับบริษัทมหาชน
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-[1.85] transition-colors duration-300">
                    วันนี้ ด้วยการก่อตั้ง <strong className="text-brand-green dark:text-emerald-400 transition-colors">U Business Adviser</strong> เราได้ขยายพันธกิจออกไปสู่การเป็น
                    พันธมิตรเชิงกลยุทธ์ที่ครบวงจร — นำประสบการณ์ด้านการเงินมาผสานกับกลยุทธ์ธุรกิจเชิงพาณิชย์
                    เพื่อสร้างการเติบโตที่มั่นคงและยั่งยืนให้กับลูกค้าของเรา
                  </p>

                  {/* Timeline */}
                  <div className="flex flex-col gap-0">
                    {[
                      { year: "1996s", label: "ก่อตั้ง APL Accountancy", desc: "เริ่มต้นให้บริการบัญชีและตรวจสอบ" },
                      { year: "2005s", label: "ขยายสู่ที่ปรึกษาธุรกิจ", desc: "รับงานกำกับดูแลองค์กร ฟื้นฟูกิจการ และ Internal Audit" },
                      { year: "Present", label: "U Business Adviser", desc: "พันธมิตรกลยุทธ์เชิงพาณิชย์แบบครบวงจร" },
                    ].map((item, i, arr) => (
                      <div key={i} className="flex gap-5 relative">
                        {/* Line */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-brand-gold shrink-0 mt-1" />
                          {i < arr.length - 1 && <div className="w-[2px] flex-1 min-h-[32px] transition-colors duration-300 bg-gray-200 dark:bg-gray-800" />}
                        </div>
                        <div className={`${i < arr.length - 1 ? 'pb-6' : 'pb-0'}`}>
                          <span className="text-[11px] text-brand-gold font-bold tracking-[0.15em] uppercase">{item.year}</span>
                          <p className="text-gray-900 dark:text-gray-200 font-semibold text-[15px] mt-0.5 transition-colors duration-300">{item.label}</p>
                          <p className="text-gray-500 dark:text-gray-500 text-[13px] transition-colors duration-300">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 3 · THE SYNERGY
        ═══════════════════════════════════════ */}
        <section className="py-16 px-12 transition-colors duration-300 bg-white dark:bg-brand-dark">
          <div className="max-w-[1152px] mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <SectionLabel text="The Synergy" center colorClass="text-brand-gold" />
                <h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold text-brand-greenDark dark:text-white transition-colors duration-300">
                  Science of Control &{" "}
                  <span className="text-brand-gold">Art of Growth</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-[560px] mx-auto transition-colors duration-300">
                  ความเป็นเลิศเกิดจากการผสานสองศาสตร์เข้าด้วยกัน — ความแม่นยำของตัวเลข และพลังของกลยุทธ์
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Box A — Science of Control */}
              <Reveal delay={0} className="flex-1">
                <div
                  className="p-12 flex-1 transition-all duration-300 hover:-translate-y-1.5 border-b-[4px] border-brand-gold bg-brand-green dark:bg-[#0d1a14] shadow-[0_16px_48px_rgba(0,77,64,0.25)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="mb-7 text-brand-gold">
                    <svg viewBox="0 0 64 64" fill="none" width="56" height="56">
                      <rect x="4" y="4" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="2.5"/>
                      <rect x="34" y="4" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="2.5" opacity="0.5"/>
                      <rect x="4" y="34" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="2.5" opacity="0.5"/>
                      <rect x="34" y="34" width="26" height="26" rx="2" stroke="currentColor" strokeWidth="2.5"/>
                      <path d="M10 17h14M10 22h10M40 17h14M40 22h10M10 47h14M10 52h10M40 47h14M40 52h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    </svg>
                  </div>

                  <div className="inline-block bg-brand-gold/15 border border-brand-gold/30 px-3.5 py-1 rounded-sm mb-4">
                    <span className="text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase">Box A</span>
                  </div>

                  <h3 className="font-playfair text-white text-[26px] font-bold mb-4 leading-[1.3]">
                    Science of Control
                  </h3>
                  <p className="text-white/65 leading-[1.85] mb-7">
                    ความแม่นยำของตัวเลข ระบบควบคุมภายใน และการตรวจสอบที่โปร่งใส
                    คือรากฐานที่ทำให้ธุรกิจดำเนินไปอย่างมั่นคง ปราศจากความเสี่ยง
                  </p>
                  {["Financial Reporting (TFRS)", "Internal Audit & Control", "Regulatory Compliance", "Risk Management"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span className="text-white/75 text-[14px]">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Connector */}
              <div className="flex items-center justify-center shrink-0 px-2 py-4 md:py-0">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <div className="w-[2px] h-10 md:w-10 md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-transparent to-brand-gold" />
                  <div 
                    className="w-10 h-10 rounded-full border-2 border-brand-gold flex items-center justify-center bg-white dark:bg-brand-darkElevated transition-colors"
                  >
                    <span className="text-brand-gold text-[18px] font-bold">+</span>
                  </div>
                  <div className="w-[2px] h-10 md:w-10 md:h-[2px] bg-gradient-to-t md:bg-gradient-to-l from-transparent to-brand-gold" />
                </div>
              </div>

              {/* Box B — Art of Growth */}
              <Reveal delay={0.15} className="flex-1">
                <div
                  className="p-12 flex-1 transition-all duration-300 hover:-translate-y-1.5 border border-brand-gold/30 dark:border-brand-gold/20 border-b-[4px] border-b-brand-green bg-[#faf8f0] dark:bg-[#1a2010] shadow-[0_16px_48px_rgba(184,134,11,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="mb-7 text-brand-gold">
                    <svg viewBox="0 0 64 64" fill="none" width="56" height="56">
                      <path d="M8 52L28 28l12 10 16-26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M44 12h8v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="28" cy="28" r="4" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="52" r="3" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>

                  <div 
                    className="inline-block px-3.5 py-1 rounded-sm mb-4 border bg-brand-green/10 dark:bg-emerald-400/10 border-brand-green/20 dark:border-emerald-400/20"
                  >
                    <span className="text-brand-green dark:text-emerald-400 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors">Box B</span>
                  </div>

                  <h3 className="font-playfair text-brand-greenDark dark:text-white text-[26px] font-bold mb-4 leading-[1.3] transition-colors duration-300">
                    Art of Growth
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-[1.85] mb-7 transition-colors duration-300">
                    กลยุทธ์เชิงพาณิชย์ที่ขับเคลื่อนด้วยข้อมูล ช่วยให้ธุรกิจค้นพบโอกาสใหม่
                    ขยายตลาด และสร้างความได้เปรียบทางการแข่งขันที่ยั่งยืน
                  </p>
                  {["Commercial Strategy", "Revenue Optimization", "Market Expansion", "Business Transformation"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green dark:bg-emerald-400 shrink-0 transition-colors" />
                      <span className="text-gray-600 dark:text-gray-400 text-[14px] transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Result bar */}
            <Reveal delay={0.25}>
              <div 
                className="mt-8 p-[28px_48px] text-center rounded-sm bg-gradient-to-br from-brand-green to-[#006d55] dark:from-[#1a2820] dark:to-[#0d1a14] transition-colors duration-300"
              >
                <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-semibold">The Result</span>
                <p className="text-white text-[clamp(16px,2vw,22px)] font-playfair font-semibold mt-2 leading-[1.5]">
                  พันธมิตรที่ทำให้ธุรกิจของคุณ "มั่นคง" และ "เติบโต" พร้อมกันในเวลาเดียวกัน
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 · VISION, MISSION & VALUES
        ═══════════════════════════════════════ */}
        <section className="py-16 px-12 transition-colors duration-300 bg-gray-50 dark:bg-brand-darkElevated">
          <div className="max-w-[1152px] mx-auto">
            {/* Vision */}
            <Reveal>
              <div className="mb-20">
                <SectionLabel text="Vision" center colorClass="text-brand-gold" />

                <div 
                  className="max-w-[800px] mx-auto text-center p-12 border border-brand-gold/20 dark:border-brand-gold/10 border-l-[6px] border-l-brand-gold relative transition-all duration-300 bg-white dark:bg-brand-dark shadow-[0_8px_40px_rgba(184,134,11,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                >
                  {/* Large quote mark */}
                  <span className="absolute -top-6 left-8 font-playfair text-[120px] leading-none text-brand-gold opacity-15">
                    "
                  </span>
                  <p className="font-playfair text-[clamp(18px,2.5vw,28px)] font-semibold leading-[1.6] text-brand-greenDark dark:text-white relative z-10 transition-colors duration-300">
                    เป็นที่ปรึกษาธุรกิจชั้นนำที่ผสานความเชี่ยวชาญด้านการเงิน
                    และกลยุทธ์เชิงพาณิชย์ เพื่อสร้างการเติบโตที่มั่นคงและยั่งยืน
                    ให้กับธุรกิจทุกขนาดในประเทศไทย
                  </p>
                  <div className="mx-auto mt-6 w-[60px] h-[2px] bg-brand-gold" />
                </div>
              </div>
            </Reveal>

            {/* Mission */}
            <Reveal delay={0.1}>
              <div className="mb-20">
                <div className="text-center mb-10">
                  <SectionLabel text="Mission" center colorClass="text-brand-gold" />
                  <h2 className="font-playfair text-[clamp(24px,3vw,36px)] font-bold text-brand-greenDark dark:text-white transition-colors duration-300">
                    พันธกิจของเรา
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { Icon: Icons.Empower, title: "Empowering", colorClass: "text-brand-green dark:text-emerald-400", desc: "เสริมพลังให้ผู้ประกอบการด้วยข้อมูลเชิงลึกและกลยุทธ์ที่ปฏิบัติได้จริง" },
                    { Icon: Icons.Integrate, title: "Integrating", colorClass: "text-brand-gold", desc: "บูรณาการความรู้ด้านการเงินและธุรกิจเพื่อสร้างโซลูชันที่ครบวงจร" },
                    { Icon: Icons.Profit, title: "Driving Profit", colorClass: "text-yellow-600 dark:text-yellow-400", desc: "ขับเคลื่อนผลกำไรที่วัดได้จริงผ่านกลยุทธ์ที่ปรับให้เข้ากับธุรกิจของคุณ" },
                  ].map((m, i) => (
                    <div 
                      key={i} 
                      className="p-[32px_28px] rounded-sm transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-dark shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_0_0_1px_#2a3d33,0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(0,77,64,0.12)] dark:hover:shadow-[0_0_0_1px_#d4a843,0_0_28px_rgba(212,168,67,0.18),0_12px_40px_rgba(0,0,0,0.5)]"
                    >
                      <div className={`mb-5 transition-colors duration-300 ${m.colorClass}`}>
                        <m.Icon />
                      </div>
                      <h3 className="font-playfair text-[20px] font-bold text-brand-greenDark dark:text-white mb-3 transition-colors duration-300">
                        {m.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-[1.75] transition-colors duration-300">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Core Values P-I-G-S */}
            <Reveal delay={0.2}>
              <div className="text-center mb-10">
                <SectionLabel text="Core Values" center colorClass="text-brand-gold" />
                <h2 className="font-playfair text-[clamp(24px,3vw,36px)] font-bold text-brand-greenDark dark:text-white transition-colors duration-300">
                  P · I · G · S — ค่านิยมองค์กร
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { letter: "P", Icon: Icons.Professionalism, label: "Professionalism", thai: "ความเป็นมืออาชีพ", desc: "ส่งมอบงานที่มีคุณภาพสูงสุด ด้วยมาตรฐานระดับสากลในทุกขั้นตอน", colorClass: "text-brand-gold", borderClass: "border-t-brand-gold" },
                  { letter: "I", Icon: Icons.Integrity, label: "Integrity", thai: "ความซื่อสัตย์", desc: "ดำเนินธุรกิจด้วยความโปร่งใส ตรงไปตรงมา และยึดมั่นในจริยธรรม", colorClass: "text-brand-green dark:text-emerald-400", borderClass: "border-t-brand-green dark:border-t-emerald-400" },
                  { letter: "G", Icon: Icons.Growth, label: "Growth Mindset", thai: "ใจรักการเติบโต", desc: "พัฒนาตนเองและลูกค้าอย่างต่อเนื่อง เปิดรับนวัตกรรมและโอกาสใหม่", colorClass: "text-yellow-600 dark:text-yellow-400", borderClass: "border-t-yellow-600 dark:border-t-yellow-400" },
                  { letter: "S", Icon: Icons.Strategic, label: "Strategic Partnership", thai: "พันธมิตรเชิงกลยุทธ์", desc: "สร้างความสัมพันธ์ระยะยาวบนพื้นฐานของความไว้วางใจและผลลัพธ์ที่แท้จริง", colorClass: "text-emerald-700 dark:text-emerald-500", borderClass: "border-t-emerald-700 dark:border-t-emerald-500" },
                ].map((v, i) => (
                  <div 
                    key={i} 
                    className={`p-8 rounded-sm transition-all duration-300 cursor-default border border-gray-200 dark:border-gray-800 border-t-[4px] ${v.borderClass} hover:-translate-y-1.5 bg-white dark:bg-brand-dark shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_0_0_1px_#2a3d33,0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(0,77,64,0.12)] dark:hover:shadow-[0_0_0_1px_#d4a843,0_0_28px_rgba(212,168,67,0.18),0_12px_40px_rgba(0,0,0,0.5)]`}
                  >
                    {/* Letter badge */}
                    <div className="flex justify-between items-start mb-5">
                      <span className={`font-playfair text-[48px] font-extrabold leading-none opacity-20 dark:opacity-60 transition-colors ${v.colorClass}`}>
                        {v.letter}
                      </span>
                      <div className={`transition-colors ${v.colorClass}`}><v.Icon /></div>
                    </div>

                    <h3 className="text-[16px] font-bold text-brand-greenDark dark:text-white mb-1 transition-colors duration-300">
                      {v.label}
                    </h3>
                    <p className={`text-[13px] font-semibold mb-2.5 transition-colors ${v.colorClass}`}>{v.thai}</p>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-[1.7] transition-colors duration-300">{v.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 5 · LOGO MEANING
        ═══════════════════════════════════════ */}
        <section className="py-16 px-12 transition-colors duration-300 bg-white dark:bg-brand-dark">
          <div className="max-w-[960px] mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <SectionLabel text="Brand Identity" center colorClass="text-brand-gold" />
                <h2 className="font-playfair text-[clamp(24px,3vw,40px)] font-bold text-brand-greenDark dark:text-white transition-colors duration-300">
                  ความหมายของ<span className="text-brand-gold"> โลโก้</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-3 transition-colors duration-300">
                  ทุกองค์ประกอบในโลโก้ถูกออกแบบมาด้วยความหมายที่ลึกซึ้ง
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">
              {/* Gold Triangle */}
              <Reveal delay={0}>
                <div 
                  className="p-[40px_36px] text-center border border-gray-200 dark:border-gray-800 border-b-[4px] border-b-brand-gold transition-all duration-300 bg-white dark:bg-brand-darkElevated shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_0_0_1px_#2a3d33,0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  <div className="mb-6 flex justify-center text-brand-gold">
                    <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                      <polygon points="40,8 72,68 8,68" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                      <polygon points="40,24 60,56 20,56" fill="currentColor" opacity="0.15"/>
                      <path d="M40 40v16M34 52h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="inline-block bg-brand-gold/10 border border-brand-gold/30 px-4 py-1 rounded-sm mb-4">
                    <span className="text-brand-gold text-[11px] font-bold tracking-[0.2em]">GOLD TRIANGLE</span>
                  </div>
                  <h3 className="font-playfair text-[22px] font-bold text-brand-greenDark dark:text-white mb-3 transition-colors duration-300">
                    ความมั่นคง
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-[1.8] transition-colors duration-300">
                    รูปสามเหลี่ยมทองคำแทนรากฐานที่มั่นคง — ความแข็งแกร่งทางการเงิน
                    ความน่าเชื่อถือ และความโปร่งใสที่สร้างขึ้นมาตลอด 30 ปี
                  </p>
                </div>
              </Reveal>

              {/* Center connector */}
              <Reveal delay={0.1}>
                <div className="flex lg:flex-col items-center justify-center gap-3">
                  <div className="w-[32px] h-[1px] lg:w-[1px] lg:h-[32px] bg-gradient-to-r lg:bg-gradient-to-b from-transparent to-brand-gold" />
                  <div 
                    className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center bg-white dark:bg-[#1e1e1e] dark:shadow-[0_0_24px_rgba(201,168,76,0.2)] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" width="22" height="22" className="text-brand-gold">
                      <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="w-[32px] h-[1px] lg:w-[1px] lg:h-[32px] bg-gradient-to-l lg:bg-gradient-to-t from-transparent to-brand-gold" />
                  <span className="text-brand-gold text-[10px] tracking-[0.2em] uppercase font-bold lg:mt-2">Fusion</span>
                </div>
              </Reveal>

              {/* Green Arrow */}
              <Reveal delay={0.15}>
                <div 
                  className="p-[40px_36px] text-center border border-gray-200 dark:border-gray-800 border-b-[4px] border-b-brand-green dark:border-b-emerald-400 transition-all duration-300 bg-white dark:bg-brand-darkElevated shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_0_0_1px_#2a3d33,0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  <div className="mb-6 flex justify-center text-brand-green dark:text-emerald-400 transition-colors">
                    <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                      <path d="M16 60L40 20l24 40" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                      <path d="M28 44l12-20 12 20" fill="currentColor" opacity="0.15"/>
                      <path d="M40 36V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M34 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div 
                    className="inline-block px-4 py-1 rounded-sm mb-4 border bg-brand-green/10 dark:bg-emerald-400/10 border-brand-green/25 dark:border-emerald-400/25 transition-colors"
                  >
                    <span className="text-brand-green dark:text-emerald-400 text-[11px] font-bold tracking-[0.2em] transition-colors">GREEN ARROW</span>
                  </div>
                  <h3 className="font-playfair text-[22px] font-bold text-brand-greenDark dark:text-white mb-3 transition-colors duration-300">
                    การเติบโต
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-[1.8] transition-colors duration-300">
                    ลูกศรสีเขียวชี้ขึ้นสู่ความสำเร็จ — แทนพลังแห่งการเติบโต
                    การขยายตัว และการก้าวไปข้างหน้าอย่างไม่หยุดยั้ง
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CTA STRIP
        ═══════════════════════════════════════ */}
        <section 
          className="py-16 px-12 text-center relative overflow-hidden transition-colors duration-300 bg-brand-green dark:bg-[#0d1a14]"
        >
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full border-2 border-brand-gold/15" />
          
          <Reveal>
            <p className="text-white/60 text-[12px] tracking-[0.3em] uppercase mb-4">
              พร้อมเป็นพันธมิตรของคุณ
            </p>
            <h2 className="font-playfair text-white text-[clamp(24px,3.5vw,42px)] font-bold mb-8">
              ให้เราช่วยสร้างรากฐานที่แข็งแกร่ง<br />
              <span className="text-brand-gold">เพื่ออนาคตที่มั่นคงของธุรกิจคุณ</span>
            </h2>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2.5 bg-brand-gold text-brand-greenDark px-12 py-4 font-bold text-[12px] tracking-[0.2em] uppercase no-underline transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(201,168,76,0.45)]"
            >
              ติดต่อเราวันนี้
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Reveal>
        </section>

      </div>
    </>
  );
}