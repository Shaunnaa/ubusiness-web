"use client"

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface IconProps {
  size?: number;
  className?: string;
}

interface FormState {
  name: string;
  contact: string;
  service: string;
  message: string;
}

/* ─────────────────────────────────────────────
   Scroll Reveal Hook
───────────────────────────────────────────── */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.12
): readonly [React.RefObject<T | null>, boolean] {

  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);
  // @ts-ignore
  return [ref, visible] as const;
}

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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
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
const CommercialIcon = ({ size = 52, className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" width={size} height={size} className={className}>
    <path d="M8 48L22 30l10 8 12-18 8 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 16h8v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="22" cy="30" r="3.5" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 56h48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const AccountingIcon = ({ size = 52, className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" width={size} height={size} className={className}>
    <path d="M32 6L52 18v28L32 58 12 46V18L32 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M32 6v52M12 18l20 12 20-12" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 34h16M24 40h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const AuditIcon = ({ size = 52, className = "" }: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" width={size} height={size} className={className}>
    <rect x="10" y="8" width="36" height="44" rx="3" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M18 20h20M18 28h20M18 36h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="44" cy="46" r="10" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M51 53l6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M40 46l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="11" width="14" height="10" rx="2"/><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4"/>
  </svg>
);

/* ─────────────────────────────────────────────
   OUR SERVICES PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  const [form, setForm] = useState<FormState>({ name: "", contact: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const pillars = [
    {
      id: "commercial",
      Icon: CommercialIcon,
      tag: "Pillar 01",
      title: "Commercial &\nDistribution Strategy",
      titleTh: "กลยุทธ์การค้าและช่องทางจัดจำหน่าย",
      summary: "ขับเคลื่อนการเติบโตด้วยกลยุทธ์การขายเชิงรุก ครอบคลุมทั้ง Modern Trade, Omni-channel และการพัฒนา SME ให้แข่งขันได้ในตลาดที่เปลี่ยนแปลงเร็ว",
      features: [
        "Modern Trade & Key Account Management",
        "Omni-channel Distribution Design",
        "SME Commercial Capability Building",
        "Pricing & Margin Optimization",
        "Category Management Strategy",
      ],
      cta: "ดูรายละเอียดกลยุทธ์การค้า",
      colorClass: "text-brand-gold",
      borderClass: "border-brand-gold",
      bgClass: "bg-brand-gold/5",
      hoverBgClass: "hover:bg-brand-gold",
      hoverTextClass: "hover:text-brand-greenDark",
    },
    {
      id: "accounting",
      Icon: AccountingIcon,
      tag: "Pillar 02",
      title: "Strategic Accounting &\nTax Solutions",
      titleTh: "บัญชีเชิงกลยุทธ์และการวางแผนภาษี",
      summary: "บริการบัญชีและภาษีระดับมืออาชีพที่สืบทอดประสบการณ์กว่า 30 ปีจาก APL Accountancy พร้อมมาตรฐาน TFRS และการวางแผนภาษีอย่างถูกกฎหมาย",
      features: [
        "Financial Reporting (TFRS Standard)",
        "Corporate & Personal Tax Planning",
        "Monthly Accounting & Payroll",
        "Financial Health Diagnosis",
        "CFO Advisory Service",
      ],
      cta: "ดูรายละเอียดบริการบัญชี",
      colorClass: "text-brand-green dark:text-emerald-400",
      borderClass: "border-brand-green dark:border-emerald-400",
      bgClass: "bg-brand-green/5 dark:bg-emerald-400/5",
      hoverBgClass: "hover:bg-brand-green dark:hover:bg-emerald-400",
      hoverTextClass: "hover:text-white dark:hover:text-brand-dark",
    },
    {
      id: "audit",
      Icon: AuditIcon,
      tag: "Pillar 03",
      title: "Internal Audit &\nCorporate Systems",
      titleTh: "ตรวจสอบภายในและระบบองค์กร",
      summary: "สร้างระบบควบคุมภายในที่แข็งแกร่งตามมาตรฐานบริษัทมหาชน เตรียมพร้อมสู่การ IPO ลดความเสี่ยงองค์กร และยกระดับ Corporate Governance",
      features: [
        "Internal Audit & Risk Assessment",
        "PCL-Standard Control Systems",
        "Pre-IPO Readiness Program",
        "Corporate Governance Framework",
        "Fraud Prevention Systems",
      ],
      cta: "ดูรายละเอียดระบบควบคุม",
      colorClass: "text-brand-gold",
      borderClass: "border-brand-gold",
      bgClass: "bg-brand-gold/5",
      hoverBgClass: "hover:bg-brand-gold",
      hoverTextClass: "hover:text-brand-greenDark",
    },
  ];

  const synergySteps = [
    { num: "01", label: "Control", sub: "Internal Audit\n& Accounting", colorClass: "text-brand-green dark:text-emerald-400", borderClass: "border-brand-green dark:border-emerald-400", bgClass: "bg-brand-green/10 dark:bg-emerald-400/10" },
    { num: "02", label: "Strategy", sub: "Commercial\n& Distribution", colorClass: "text-brand-gold", borderClass: "border-brand-gold", bgClass: "bg-brand-gold/10" },
    { num: "03", label: "Growth", sub: "Profitable &\nSustainable", colorClass: "text-yellow-600 dark:text-yellow-400", borderClass: "border-yellow-600 dark:border-yellow-400", bgClass: "bg-yellow-600/10 dark:bg-yellow-400/10" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* Reusable class string for form inputs */
  const inputClasses = `w-full p-[14px_18px] font-thai text-[14px] rounded-sm outline-none transition-all duration-300 bg-gray-50 dark:bg-[#111] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50`;

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        
        @keyframes heroShimmer {
          0%, 100% { opacity: 0.04; } 
          50% { opacity: 0.09; }
        }
        @keyframes successPop {
          0%   { transform: scale(0.8); opacity: 0; }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Root Container */}
      <div className="font-thai leading-[1.7] overflow-x-hidden bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">

        {/* ═══════════════════════════════════════
            SECTION 1 · HERO
        ═══════════════════════════════════════ */}
        <section 
          className="relative px-12 pt-[120px] pb-[100px] overflow-hidden transition-colors duration-300 bg-gradient-to-br from-brand-green via-[#003d2b] to-brand-greenDark dark:from-[#060e0a] dark:via-brand-darkElevated dark:to-[#060e0a]"
        >
          {/* Decorative grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.06] animate-[heroShimmer_6s_ease-in-out_infinite]"
            style={{
              backgroundImage: `linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }} 
          />
          {/* Gold left border */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-brand-gold/60 to-transparent" />
          {/* Glow orb */}
          <div className="absolute -top-[20%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-[1100px] mx-auto">
            <div className="flex items-center gap-3 mb-7">
              <div className="h-[1px] w-12 bg-brand-gold" />
              <span className="text-brand-gold text-[11px] tracking-[0.35em] uppercase font-bold">Our Services</span>
            </div>

            <h1 className="font-playfair text-[clamp(32px,5vw,62px)] font-extrabold leading-[1.18] text-white max-w-[820px] mb-6">
              Strategic Solutions for{" "}
              <span className="text-brand-gold">Every Stage</span>{" "}
              of Business
            </h1>

            <p className="text-white/70 text-[clamp(15px,1.8vw,19px)] max-w-[640px] leading-[1.85] mb-10 transition-colors duration-300">
              ผสานความเชี่ยวชาญจาก 2 โลกธุรกิจ:{" "}
              <strong className="text-brand-gold">กลยุทธ์การขายเชิงรุก</strong>{" "}
              และ{" "}
              <strong className="text-emerald-400 transition-colors duration-300">การควบคุมภายในที่มั่นคง</strong>
            </p>

            {/* 3 Pillar chips */}
            <div className="flex flex-wrap gap-3">
              {["Commercial Strategy", "Accounting & Tax", "Internal Audit"].map((label, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 py-2 px-5 border border-brand-gold/30 bg-brand-gold/10 rounded-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="text-white/85 text-[13px] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white dark:to-brand-dark transition-colors duration-300" />
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 · 3 CORE PILLARS
        ═══════════════════════════════════════ */}
        <section className="py-16 px-12 transition-colors duration-300 bg-white dark:bg-brand-dark">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div className="mb-14 flex justify-between items-end flex-wrap gap-4">
                <div>
                  <div className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase font-bold text-brand-gold mb-3 before:content-[''] before:block before:w-9 before:h-[1px] before:bg-brand-gold">
                    Core Service Pillars
                  </div>
                  <h2 className="font-playfair text-[clamp(26px,3.5vw,40px)] font-bold text-gray-900 dark:text-gray-100 leading-[1.25] transition-colors duration-300">
                    3 เสาหลักแห่งความเชี่ยวชาญ
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-[14px] max-w-[340px] leading-[1.75] transition-colors duration-300">
                  แต่ละบริการถูกออกแบบมาให้ทำงานร่วมกันได้อย่างไร้รอยต่อ เพื่อสร้างผลลัพธ์ที่ครบถ้วนที่สุด
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pillars.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <div
                    className={`group rounded-sm p-[40px_36px] transition-all duration-300 cursor-default flex flex-col min-h-[540px] bg-gray-50 dark:bg-brand-darkElevated border border-gray-200 dark:border-gray-800 border-t-[4px] ${p.borderClass} shadow-sm hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)]`}
                  >
                    {/* Tag + Icon row */}
                    <div className="flex justify-between items-start mb-7">
                      <span 
                        className={`text-[10px] font-extrabold tracking-[0.3em] uppercase py-1 px-3 border rounded-sm ${p.colorClass} ${p.bgClass} ${p.borderClass} border-opacity-30`}
                      >
                        {p.tag}
                      </span>
                      <p.Icon size={48} className={p.colorClass} />
                    </div>

                    {/* Title */}
                    <h3 className="font-playfair text-[clamp(20px,2vw,24px)] font-bold text-gray-900 dark:text-gray-100 leading-[1.3] mb-1.5 whitespace-pre-line transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className={`text-[13px] font-semibold mb-4.5 ${p.colorClass}`}>{p.titleTh}</p>

                    {/* Summary */}
                    <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-[1.85] mb-7 transition-colors duration-300">{p.summary}</p>

                    {/* Feature list */}
                    <div className="mb-9 flex-1">
                      {p.features.map((feat, fi) => (
                        <div key={fi} className="flex items-start gap-2.5 py-2 border-b border-gray-200 dark:border-gray-800 last:border-b-0 transition-colors duration-300">
                          <span className={`mt-0.5 shrink-0 ${p.colorClass}`}><CheckIcon /></span>
                          <span className="text-gray-600 dark:text-gray-400 text-[14px] transition-colors duration-300">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a 
                      href={`#${p.id}`} 
                      className={`inline-flex items-center gap-2 py-[13px] px-7 text-[12px] font-bold tracking-[0.18em] uppercase no-underline border-2 transition-all duration-300 self-start ${p.colorClass} ${p.borderClass} ${p.hoverBgClass} ${p.hoverTextClass} hover:gap-3`}
                    >
                      {p.cta}
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 3 · SYNERGY
        ═══════════════════════════════════════ */}
        <section className="py-16 px-12 transition-colors duration-300 bg-gray-50 dark:bg-[#0d1a14]">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2.5 text-[11px] tracking-[0.3em] uppercase font-bold text-brand-gold mb-3.5 before:content-[''] before:block before:w-9 before:h-[1px] before:bg-brand-gold">
                  The Synergy Advantage
                </div>
                <h2 className="font-playfair text-[clamp(26px,3.5vw,42px)] font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                  ทำไม <span className="text-brand-gold">Model แบบบูรณาการ</span> ถึงได้ผล?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-[16px] max-w-[580px] mx-auto leading-[1.85] transition-colors duration-300">
                  เมื่อทั้ง 3 เสาหลักทำงานร่วมกัน จะเกิดผลลัพธ์ที่มากกว่าผลรวมของแต่ละส่วน
                </p>
              </div>
            </Reveal>

            {/* Synergy diagram */}
            <Reveal delay={0.1}>
              <div 
                className="p-[56px_48px] border border-gray-200 dark:border-gray-800 transition-all duration-300 bg-white dark:bg-brand-darkElevated shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
                  {synergySteps.map((step, i) => (
                    <React.Fragment key={step.num}>
                      <div className="flex flex-col items-center text-center flex-1 relative px-6">
                        {/* Circle */}
                        <div 
                          className={`w-20 h-20 rounded-full border-[3px] flex items-center justify-center mb-5 relative ${step.borderClass} ${step.bgClass}`}
                        >
                          <span className={`font-playfair text-[22px] font-extrabold ${step.colorClass}`}>{step.num}</span>
                        </div>
                        <h3 className={`font-playfair text-[20px] font-bold mb-2 ${step.colorClass}`}>{step.label}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-[13px] leading-[1.6] whitespace-pre-line max-w-[160px] transition-colors duration-300">{step.sub}</p>
                      </div>
                      {/* Arrow connector */}
                      {i < synergySteps.length - 1 && (
                        <div className="flex flex-col md:flex-row items-center shrink-0 px-2 md:py-0 py-4">
                          {/* Instead of complex gradient line, using simplified border/colors for stability in Tailwind */}
                          <div className="h-10 w-[2px] md:h-[2px] md:w-12 mb-2 md:mb-0 md:mr-2 bg-gray-300 dark:bg-gray-700" />
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="rotate-90 md:rotate-0 text-brand-gold">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <div className="h-10 w-[2px] md:h-[2px] md:w-12 mt-2 md:mt-0 md:ml-2 bg-gray-300 dark:bg-gray-700" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Bottom result banner */}
                <div 
                  className="mt-12 p-[24px_40px] text-center rounded-sm bg-gradient-to-br from-brand-green to-[#006d55] dark:from-[#0d1a14] dark:to-[#1a2820] transition-colors duration-300"
                >
                  <p className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-bold mb-2">The Outcome</p>
                  <p className="font-playfair text-white text-[clamp(16px,2vw,22px)] font-semibold">
                    Profitable Growth — การเติบโตที่ทำกำไรได้จริง อย่างยั่งยืน
                  </p>
                </div>

                {/* 3 pillars explain */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  {[
                    { colorClass: "border-brand-green dark:border-emerald-400 text-brand-green dark:text-emerald-400", title: "Control Foundation", desc: "ระบบบัญชีและ Audit ที่แม่นยำสร้างรากฐานที่ทุกกลยุทธ์พึ่งพาได้" },
                    { colorClass: "border-brand-gold text-brand-gold", title: "Strategy Layer", desc: "กลยุทธ์เชิงพาณิชย์ที่ขับเคลื่อนด้วยข้อมูลการเงินที่ถูกต้อง" },
                    { colorClass: "border-yellow-600 dark:border-yellow-400 text-yellow-600 dark:text-yellow-400", title: "Profit Engine", desc: "ผลลัพธ์ที่วัดได้จริง กำไรเพิ่ม ความเสี่ยงลด ธุรกิจเติบโต" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className={`p-[20px_24px] border-l-[3px] bg-gray-100/50 dark:bg-gray-800/30 ${item.colorClass.split(' ')[0]} ${item.colorClass.split(' ')[1] || ''}`}
                    >
                      <p className={`text-[13px] font-bold mb-1.5 ${item.colorClass.split(' ').slice(2).join(' ')}`}>{item.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-[1.65] transition-colors duration-300">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 · INQUIRY FORM
        ═══════════════════════════════════════ */}
        <section className="py-16 px-12 transition-colors duration-300 bg-white dark:bg-brand-dark">
          <div className="max-w-[900px] mx-auto">
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start"> */}
            <div className="grid items-center justify-center">


              {/* Left: Copy */}
              <Reveal>
                <div>
                  <div className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase font-bold text-brand-gold mb-4 before:content-[''] before:block before:w-9 before:h-[1px] before:bg-brand-gold">
                    Free Consultation
                  </div>
                  <h2 className="font-playfair text-[clamp(24px,3vw,38px)] font-bold text-gray-900 dark:text-gray-100 leading-[1.3] mb-5 transition-colors duration-300">
                    ไม่แน่ใจว่าบริการไหน<br />
                    <span className="text-brand-gold">ที่เหมาะกับคุณ?</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-[1.85] mb-8 text-[15px] transition-colors duration-300">
                    ปรึกษาเราเบื้องต้นฟรี ไม่มีข้อผูกมัด ผู้เชี่ยวชาญของเราจะช่วยวิเคราะห์และแนะนำบริการที่เหมาะสมที่สุดสำหรับธุรกิจของคุณ
                  </p>

                  {/* Trust badges */}
                  <div className="flex flex-col gap-3.5">
                    {[
                      "ตอบกลับภายใน 24 ชั่วโมง",
                      "ปรึกษาครั้งแรกฟรี ไม่มีค่าใช้จ่าย",
                      "ทีมผู้เชี่ยวชาญประสบการณ์ 30+ ปี",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-brand-green/10 dark:bg-brand-gold/15"
                        >
                          <span className="text-brand-gold text-[13px]"><CheckIcon /></span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-300 text-[14px] transition-colors duration-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Confidentiality note */}
                  <div 
                    className="mt-10 p-[16px_20px] border border-brand-green/15 dark:border-brand-gold/20 border-l-[3px] border-l-brand-gold rounded-sm bg-brand-green/5 dark:bg-brand-gold/5"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-gold mt-0.5"><LockIcon /></span>
                      <div>
                        <p className="text-brand-gold text-[12px] font-bold tracking-[0.1em] uppercase mb-1">Confidentiality Note</p>
                        <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-[1.65] transition-colors duration-300">
                          ข้อมูลทั้งหมดที่คุณส่งมาจะถูกเก็บรักษาอย่างเป็นความลับ ภายใต้นโยบายความเป็นส่วนตัวของเรา และจะไม่ถูกเปิดเผยต่อบุคคลที่สาม
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right: Form
              <Reveal delay={0.15}>
                <div 
                  className="p-[40px_36px] border border-gray-200 dark:border-gray-800 border-t-[4px] border-t-brand-gold transition-all duration-300 bg-white dark:bg-brand-darkElevated shadow-[0_8px_40px_rgba(0,0,0,0.07)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                >
                  {submitted ? (
                    <div className="text-center p-[40px_20px] animate-[successPop_0.5s_ease_forwards]">
                      <div className="w-[72px] h-[72px] rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center mx-auto mb-6">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-brand-gold">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <h3 className="font-playfair text-[24px] font-bold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">ส่งข้อความสำเร็จ!</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-[1.75] transition-colors duration-300">ขอบคุณที่ติดต่อเรา ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h3 className="font-playfair text-[20px] font-bold text-gray-900 dark:text-gray-100 mb-7 transition-colors duration-300">
                        ส่งข้อความปรึกษา
                      </h3>

                      Name
                      <div className="mb-5">
                        <label className="block text-[12px] font-bold tracking-[0.1em] uppercase text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                          ชื่อ-นามสกุล *
                        </label>
                        <input
                          type="text" required 
                          className={inputClasses}
                          placeholder="กรอกชื่อของคุณ"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                      </div>

                      Email/Line
                      <div className="mb-5">
                        <label className="block text-[12px] font-bold tracking-[0.1em] uppercase text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                          Email หรือ Line ID *
                        </label>
                        <input
                          type="text" required 
                          className={inputClasses}
                          placeholder="email@example.com หรือ @lineid"
                          value={form.contact}
                          onChange={e => setForm({ ...form, contact: e.target.value })}
                        />
                      </div>

                      Service dropdown
                      <div className="mb-5">
                        <label className="block text-[12px] font-bold tracking-[0.1em] uppercase text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                          บริการที่สนใจ *
                        </label>
                        <select
                          required 
                          className={`${inputClasses} cursor-pointer appearance-none bg-no-repeat bg-[position:right_16px_center] pr-11 ${!form.service ? 'text-gray-400 dark:text-gray-500' : ''}`}
                          value={form.service}
                          onChange={e => setForm({ ...form, service: e.target.value })}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`
                          }}
                        >
                          <option value="" disabled>เลือกบริการที่สนใจ</option>
                          <option value="commercial">Commercial & Distribution Strategy</option>
                          <option value="accounting">Strategic Accounting & Tax Solutions</option>
                          <option value="audit">Internal Audit & Corporate Systems</option>
                          <option value="integrated">ต้องการทุกบริการแบบบูรณาการ</option>
                          <option value="unsure">ยังไม่แน่ใจ / ต้องการคำแนะนำ</option>
                        </select>
                      </div>

                      Message
                      <div className="mb-7">
                        <label className="block text-[12px] font-bold tracking-[0.1em] uppercase text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                          ข้อความเพิ่มเติม
                        </label>
                        <textarea
                          rows={4}
                          className={`${inputClasses} resize-none`}
                          placeholder="บอกเล่าปัญหาหรือความต้องการของคุณ..."
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full p-[18px] bg-brand-gold text-brand-greenDark font-extrabold text-[14px] tracking-[0.2em] uppercase border-none cursor-pointer font-thai transition-all duration-300 flex items-center justify-center gap-2.5 hover:bg-brand-goldLight hover:shadow-[0_0_32px_rgba(201,168,76,0.4)] hover:gap-4 group"
                      >
                        ส่งข้อความปรึกษาฟรี
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </button>

                      <p className="text-center text-gray-500 dark:text-gray-400 text-[12px] mt-4 flex items-center justify-center gap-1.5 transition-colors duration-300">
                        <LockIcon /> ข้อมูลของคุณปลอดภัย 100%
                      </p>
                    </form>
                  )}
                </div>
              </Reveal> */}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}