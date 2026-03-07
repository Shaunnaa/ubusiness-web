"use client"

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types & Interfaces
───────────────────────────────────────────── */
type ServiceId = "commercial" | "accounting" | "audit";

interface ServicePillar {
  icon: string;
  title: string;
  desc: string;
}

interface ServiceData {
  id: string;
  title: string;
  titleTh: string;
  tagline: string;
  headline: string;
  subheadline: string;
  image: string;
  meta: {
    title: string;
    description: string;
  };
  pillars: ServicePillar[];
  results: string[];
  dropdownLabel: string;
  accentGreen: string;
  accentGreenDark: string;
}

interface FormState {
  name: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

/* ─────────────────────────────────────────────
   Scroll Reveal Hook
───────────────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.1
): readonly [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setVisible(true); 
          obs.disconnect(); 
        } 
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
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
const SunIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);
const LockIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="11" width="14" height="10" rx="2"/>
    <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
  </svg>
);

/* ─── Service-specific SVG Icons ─── */
const PillarIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    // Commercial
    modernTrade: <><path d="M8 36V18l16-10 16 10v18H8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><rect x="18" y="26" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2"/></>,
    omni: <><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/><rect x="28" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/><rect x="4" y="28" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/><rect x="28" y="28" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/><path d="M20 12h8M12 20v8M36 20v8M20 36h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>,
    smeGrowth: <><path d="M8 36l10-12 8 6 8-14 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="38" cy="10" r="5" stroke="currentColor" strokeWidth="2.5"/></>,
    pricing: <><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5"/><path d="M24 12v2.5c-2.8 0-5 1.7-5 3.9S21.2 22 24 22.6c2.8.5 5 2.2 5 4.4s-2.2 3.9-5 3.9V33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M20 12h8M20 33h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>,
    // Accounting
    tfrs: <><rect x="8" y="6" width="32" height="36" rx="3" stroke="currentColor" strokeWidth="2.5"/><path d="M16 16h16M16 22h16M16 28h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M28 32l4 4 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    taxPlan: <><path d="M24 6l18 10v16L24 42 6 32V16L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M18 24h12M24 18v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></>,
    payroll: <><rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2.5"/><path d="M14 18h20M14 24h12M14 30h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="34" cy="30" r="6" stroke="currentColor" strokeWidth="2"/></>,
    cfo: <><circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5"/><path d="M8 40c0-8.84 7.16-16 16-16s16 7.16 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M20 28l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></>,
    // Audit
    internalAudit: <><rect x="10" y="6" width="28" height="36" rx="3" stroke="currentColor" strokeWidth="2.5"/><path d="M18 16h12M18 22h12M18 28h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="36" cy="36" r="8" stroke="currentColor" strokeWidth="2.5"/><path d="M33 36l2.5 2.5 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    risk: <><path d="M24 6l18 32H6L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M24 20v8M24 32v2" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></>,
    pcl: <><rect x="4" y="4" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="2.5"/><path d="M12 24l8 8 16-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></>,
    preIPO: <><path d="M8 40V8h32v32H8zM8 24h32M24 8v32" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M16 16l4 4-4 4M28 16l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
  };
  return (
    <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
      {icons[type] || null}
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Service Data
───────────────────────────────────────────── */
const SERVICE_DATA: Record<ServiceId, ServiceData> = {
  commercial: {
    id: "commercial",
    title: "Commercial & Distribution Strategy",
    titleTh: "กลยุทธ์การค้าและช่องทางจัดจำหน่าย",
    tagline: "ขับเคลื่อนยอดขาย สร้างช่องทาง และเติบโตอย่างยั่งยืน",
    headline: "ปลดล็อกศักยภาพเชิงพาณิชย์ของคุณด้วยกลยุทธ์ที่พิสูจน์แล้ว",
    subheadline: "ผสาน Data-Driven Insights กับประสบการณ์ตรงจากผู้เชี่ยวชาญการทำตลาดภายในประเทศไทย เพื่อสร้างการเติบโตที่วัดผลได้",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    meta: {
      title: "Commercial & Distribution Strategy | U Business Adviser",
      description: "กลยุทธ์การค้าและช่องทางจัดจำหน่ายที่ครอบคลุม Modern Trade, Omni-channel และ SME Growth โดยผู้เชี่ยวชาญประสบการณ์ 30+ ปี",
    },
    pillars: [
      { icon: "modernTrade", title: "Modern Trade Mastery", desc: "บริหารความสัมพันธ์กับ Key Accounts และ Retail Chains อย่างเชี่ยวชาญ เพิ่ม Share of Shelf และยอดขาย" },
      { icon: "omni", title: "Omni-channel Design", desc: "สร้างระบบช่องทางจัดจำหน่ายที่ไร้รอยต่อ ทั้ง Online, Offline และ Social Commerce" },
      { icon: "smeGrowth", title: "SME Commercial Growth", desc: "พัฒนาขีดความสามารถเชิงพาณิชย์ของ SME ให้แข่งขันได้กับแบรนด์ขนาดใหญ่" },
      { icon: "pricing", title: "Pricing & Margin Optimization", desc: "วิเคราะห์โครงสร้างราคาและ Margin เพื่อเพิ่มกำไรโดยไม่สูญเสียความสามารถในการแข่งขัน" },
    ],
    results: ["เพิ่ม Revenue 25-40% ใน 12 เดือน", "ขยาย Distribution Coverage ทั่วประเทศ", "ลด Cost-to-Serve ด้วยระบบที่มีประสิทธิภาพ", "สร้าง Loyalty Program ที่วัดผลได้"],
    dropdownLabel: "Commercial & Distribution Strategy",
    accentGreen: "#004d40",
    accentGreenDark: "#2ecc71",
  },
  accounting: {
    id: "accounting",
    title: "Strategic Accounting & Tax Solutions",
    titleTh: "บัญชีเชิงกลยุทธ์และการวางแผนภาษี",
    tagline: "มาตรฐานบริษัทมหาชน ความไว้วางใจ 30 ปี",
    headline: "บัญชีที่ไม่ใช่แค่ตัวเลข แต่คือรากฐานของทุกการตัดสินใจธุรกิจ",
    subheadline: "สืบทอดความเชี่ยวชาญกว่า 30 ปีจาก APL Accountancy สู่โซลูชันการเงินที่ครบวงจร",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    meta: {
      title: "Strategic Accounting & Tax Solutions | U Business Adviser",
      description: "บริการบัญชีและภาษีมาตรฐาน TFRS กว่า 30 ปีจาก APL Accountancy วางแผนภาษีถูกกฎหมาย รายงานการเงินโปร่งใส",
    },
    pillars: [
      { icon: "tfrs", title: "Financial Reporting (TFRS)", desc: "จัดทำงบการเงินตามมาตรฐาน TFRS/GAAP ที่ตรวจสอบได้ โปร่งใส และน่าเชื่อถือ" },
      { icon: "taxPlan", title: "Corporate Tax Planning", desc: "วางแผนภาษีอย่างถูกกฎหมาย ลดภาระภาษีได้จริง ทั้งนิติบุคคลและบุคคลธรรมดา" },
      { icon: "payroll", title: "Payroll & Monthly Accounting", desc: "บริการบัญชีรายเดือนและจัดการ Payroll อย่างครบถ้วน ถูกต้อง ตรงเวลา" },
      { icon: "cfo", title: "CFO Advisory Service", desc: "บริการที่ปรึกษา CFO แบบ Part-time สำหรับธุรกิจที่ต้องการมุมมองการเงินเชิงกลยุทธ์" },
    ],
    results: ["ประหยัดภาษีได้ 15-30% อย่างถูกกฎหมาย", "งบการเงินพร้อมรองรับการตรวจสอบ", "ลดความเสี่ยงทางภาษี 100%", "รายงานการเงินทันเวลาทุกเดือน"],
    dropdownLabel: "Strategic Accounting & Tax Solutions",
    accentGreen: "#004d40",
    accentGreenDark: "#2ecc71",
  },
  audit: {
    id: "audit",
    title: "Internal Audit & Corporate Systems",
    titleTh: "ตรวจสอบภายในและระบบกำกับดูแลองค์กร",
    tagline: "มาตรฐาน PCL ป้องกันความเสี่ยง สู่ IPO Ready",
    headline: "สร้างระบบที่แข็งแกร่งพอสำหรับบริษัทมหาชน เพื่อธุรกิจของคุณ",
    subheadline: "ระบบควบคุมภายในที่ดี ไม่ใช่ค่าใช้จ่าย แต่คือการลงทุนที่คืนทุนเร็วที่สุด",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
    meta: {
      title: "Internal Audit & Corporate Systems | U Business Adviser",
      description: "บริการตรวจสอบภายในมาตรฐาน PCL บริหารความเสี่ยง Corporate Governance และ Pre-IPO Readiness โดยผู้เชี่ยวชาญ",
    },
    pillars: [
      { icon: "internalAudit", title: "Internal Audit Program", desc: "ออกแบบและดำเนินโครงการ Internal Audit ที่ครอบคลุม ระบุความเสี่ยงก่อนที่จะกลายเป็นปัญหา" },
      { icon: "risk", title: "Risk Management Framework", desc: "สร้าง Enterprise Risk Management ที่เป็นระบบ วัดผลได้ และรายงานต่อคณะกรรมการ" },
      { icon: "pcl", title: "PCL-Standard Controls", desc: "ยกระดับระบบควบคุมภายในให้ได้มาตรฐาน SET Listed Company เตรียมความพร้อมสู่การจดทะเบียนในตลาดหลักทรัพย์" },
      { icon: "preIPO", title: "Pre-IPO Readiness", desc: "โปรแกรมเตรียมความพร้อม IPO ครอบคลุมทั้ง Financial Due Diligence, Corporate Governance และ Disclosure Standards" },
    ],
    results: ["ลดความเสี่ยงองค์กรได้ 60-80%", "ผ่านการตรวจสอบ SEC/SET ครั้งแรก", "ลดต้นทุนการดำเนินงานจากระบบที่มีประสิทธิภาพ", "สร้างความเชื่อมั่นให้ผู้ถือหุ้นและนักลงทุน"],
    dropdownLabel: "Internal Audit & Corporate Systems",
    accentGreen: "#004d40",
    accentGreenDark: "#2ecc71",
  },
};

/* ─────────────────────────────────────────────
   SERVICE DETAIL TEMPLATE
───────────────────────────────────────────── */
interface ServiceDetailPageProps {
  serviceId?: ServiceId;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function ServiceDetailPage({ serviceId = "commercial", dark, setDark }: ServiceDetailPageProps) {
  const svc = SERVICE_DATA[serviceId];
  const [form, setForm] = useState<FormState>({ name: "", company: "", phone: "", service: svc.id, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  /* Theme variables mapping */
  const themeVars = {
    "--bg":              dark ? "#0a1410" : "#ffffff",
    "--bg-alt":          dark ? "#051A15" : "#f4f8f6",
    "--bg-card":         dark ? "#111e18" : "#ffffff",
    "--bg-form":         dark ? "#141414" : "#f5f5f5",
    "--bg-input":        dark ? "#0d0d0d" : "#ffffff",
    "--text-heading":    dark ? "#f0ede6" : "#1a1a1a",
    "--text-body":       dark ? "#8aaa98" : "#4b5563",
    "--text-muted":      dark ? "#4d6b58" : "#9ca3af",
    "--border":          dark ? "#1e3028" : "#e5e7eb",
    "--pillars-section": dark ? "#051A15" : "#fafafa",
    "--expertise-bg":    dark ? "#0a1f16" : "#004d40",
  } as React.CSSProperties;

  const pillarCardStyle = (i: number): React.CSSProperties => ({
    background: hoveredPillar === i
      ? dark ? "#16261e" : "#ffffff"
      : dark ? "#0d1a12" : "#ffffff",
    border: `1px solid ${hoveredPillar === i ? "#C9A84C80" : "var(--border)"}`,
    boxShadow: hoveredPillar === i
      ? dark
        ? `0 0 0 1px #C9A84C60, 0 0 32px rgba(201,168,76,0.22), 0 12px 40px rgba(0,0,0,0.5)`
        : `0 0 0 2px #C9A84C50, 0 16px 40px rgba(0,77,64,0.12)`
      : dark
        ? "0 4px 24px rgba(0,0,0,0.4)"
        : "0 2px 16px rgba(0,0,0,0.06)",
  });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  /* Reusable input class */
  const inputClass = "w-full p-[14px_18px] font-['IBM_Plex_Sans_Thai',sans-serif] text-[15px] rounded-sm bg-[var(--bg-input)] text-[var(--text-heading)] border border-[var(--border)] outline-none transition-all duration-300 focus:border-[#C9A84C] min-h-[52px]";

  return (
    <div 
      className="font-['IBM_Plex_Sans_Thai',sans-serif] overflow-x-hidden bg-[var(--bg)] text-[var(--text-heading)] transition-colors duration-300"
      style={themeVars}
    >
      {/* ═══════════════════════════════════════
          SECTION 1 · HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${svc.image}')` }} />
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 transition-colors duration-300" 
          style={{ background: dark ? "linear-gradient(105deg,rgba(2,8,5,0.97) 0%,rgba(5,26,18,0.88) 55%,rgba(2,10,7,0.70) 100%)" : "linear-gradient(105deg,rgba(0,20,10,0.95) 0%,rgba(0,60,40,0.85) 55%,rgba(0,40,25,0.60) 100%)" }} 
        />
        
        {/* Gold left accent */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#C9A84C_35%] to-transparent" />
        
        {/* Decorative corners */}
        <div className="absolute top-10 right-[60px] w-[160px] h-[160px] border border-[#C9A84C]/15 rounded-sm rotate-[15deg] pointer-events-none" />
        <div className="absolute top-14 right-[76px] w-[160px] h-[160px] border border-[#C9A84C]/10 rounded-sm rotate-[28deg] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[60px] pt-[120px] pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-white/45 text-[12px] tracking-[0.1em]">Our Services</span>
            <span className="text-white/25 text-[12px]">/</span>
            <span className="text-[#C9A84C] text-[12px] font-semibold tracking-[0.1em]">{svc.title}</span>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[11px] tracking-[0.35em] uppercase font-bold">{svc.tagline}</span>
          </div>

          {/* Main headline */}
          <h1 className="font-['Playfair_Display',serif] text-[clamp(30px,4.5vw,62px)] font-extrabold leading-[1.15] text-white max-w-[820px] mb-5">
            {svc.headline}
          </h1>

          <p className="text-white/70 text-[clamp(15px,1.6vw,19px)] max-w-[600px] leading-[1.85] mb-12">
            {svc.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a 
              href="#lead-form" 
              className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#001a10] py-4 px-9 font-bold text-[12px] tracking-[0.2em] uppercase no-underline transition-all duration-300 hover:bg-[#d4b050] hover:shadow-[0_0_32px_rgba(201,168,76,0.5)] group"
            >
              ปรึกษาฟรีวันนี้
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a 
              href="#pillars" 
              className="inline-flex items-center gap-2 border border-white/30 text-white py-4 px-9 font-semibold text-[12px] tracking-[0.2em] uppercase no-underline transition-all duration-300 hover:bg-white/10"
            >
              ดูรายละเอียด
            </a>
          </div>

          {/* Quick results bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-14 pt-10 border-t border-white/10">
            {svc.results.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                <span className="text-white/70 text-[13px] font-medium">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 · SERVICE PILLARS
      ═══════════════════════════════════════ */}
      <section id="pillars" className="py-28 px-6 lg:px-[60px] transition-colors duration-300 bg-[var(--pillars-section)]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2.5 mb-4">
                <div className="h-[1px] w-9 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[11px] tracking-[0.35em] uppercase font-bold">Key Offerings</span>
                <div className="h-[1px] w-9 bg-[#C9A84C]" />
              </div>
              <h2 className="font-['Playfair_Display',serif] text-[clamp(26px,3.5vw,42px)] font-bold text-[var(--text-heading)] mb-4 transition-colors duration-300">
                4 เสาหลักของ <span className="text-[#C9A84C]">{svc.titleTh}</span>
              </h2>
              <p className="text-[var(--text-body)] text-[16px] max-w-[520px] mx-auto leading-[1.8] transition-colors duration-300">
                แต่ละบริการออกแบบมาเพื่อแก้ปัญหาที่แท้จริง ด้วยแนวทางที่พิสูจน์แล้วจากประสบการณ์ 30+ ปี
              </p>
            </div>
          </Reveal>

          {/* 2x2 Pillar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {svc.pillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="rounded-sm p-8 md:p-9 transition-all duration-300 cursor-default"
                  style={pillarCardStyle(i)}
                  onMouseEnter={() => setHoveredPillar(i)}
                  onMouseLeave={() => setHoveredPillar(null)}
                >
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-[#C9A84C] transition-all duration-300 border-[1.5px]"
                    style={{
                      background: dark ? "rgba(201,168,76,0.08)" : "rgba(0,77,64,0.06)",
                      borderColor: hoveredPillar === i ? "#C9A84C" : "var(--border)",
                    }}
                  >
                    <PillarIcon type={p.icon} />
                  </div>

                  {/* Text & Number badge */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-['Playfair_Display',serif] text-[20px] font-bold text-[var(--text-heading)] mb-2.5 leading-[1.3] transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-[var(--text-body)] text-[14px] leading-[1.8] transition-colors duration-300">{p.desc}</p>
                    </div>
                    <span 
                      className="font-['Playfair_Display',serif] text-[40px] font-extrabold leading-none ml-4 -mt-1 transition-all duration-300 hidden sm:block opacity-60"
                      style={{ color: hoveredPillar === i ? "#C9A84C" : "var(--border)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 · 30-YEAR EXPERTISE BAR
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden transition-colors duration-300 bg-[var(--expertise-bg)]">
        {/* Decorative rings */}
        <div className="absolute -left-[60px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border-2 border-[#C9A84C]/10 pointer-events-none" />
        <div className="absolute -right-[40px] top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border-2 border-[#C9A84C]/10 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto py-20 px-6 lg:px-[60px]">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
              {/* Badge */}
              <div className="shrink-0">
                <div className="w-[140px] h-[140px] rounded-full border-[3px] border-[#C9A84C] flex flex-col items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border border-[#C9A84C]/30" />
                  <span className="font-['Playfair_Display',serif] text-[44px] font-extrabold text-[#C9A84C] leading-none">30</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-semibold mt-1">ปีแห่ง</span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-semibold">ความเชี่ยวชาญ</span>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-[280px] text-center md:text-left">
                <h2 className="font-['Playfair_Display',serif] text-white text-[clamp(22px,3vw,36px)] font-bold mb-4 leading-[1.3]">
                  มาตรฐาน <span className="text-[#C9A84C]">Public Company (PCL)</span><br />
                  สำหรับทุกธุรกิจที่เราดูแล
                </h2>
                <p className="text-white/65 text-[15px] leading-[1.85] max-w-[580px] mx-auto md:mx-0">
                  ตลอด 30 ปีที่ APL Accountancy ให้บริการลูกค้าตั้งแต่ SME จนถึงบริษัทมหาชน
                  เราได้พัฒนามาตรฐานการทำงานที่เทียบเท่าบริษัทตรวจสอบบัญชีชั้นนำ
                  และนำประสบการณ์นั้นมาไว้ในทุกบริการของ U Business Adviser
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-10 flex-wrap">
                {[
                  { num: "30+", label: "ปีประสบการณ์" },
                  { num: "300+", label: "ลูกค้าที่ไว้วางใจ" },
                  { num: "PCL", label: "มาตรฐาน" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="font-['Playfair_Display',serif] text-[34px] font-extrabold text-[#C9A84C] block">{s.num}</span>
                    <span className="text-[12px] text-white/55 tracking-[0.1em] uppercase">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 · LEAD GENERATION FORM
      ═══════════════════════════════════════ */}
      <section id="lead-form" className="py-28 px-6 lg:px-[60px] transition-colors duration-300 bg-[var(--bg-alt)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-start">

            {/* ── Left Copy ── */}
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <div className="h-[1px] w-9 bg-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase font-bold">Free Consultation</span>
                </div>

                <h2 className="font-['Playfair_Display',serif] text-[clamp(24px,3vw,40px)] font-bold text-[var(--text-heading)] leading-[1.25] mb-5 transition-colors duration-300">
                  เริ่มต้นบทสนทนา<br />
                  <span className="text-[#C9A84C]">กับผู้เชี่ยวชาญของเรา</span>
                </h2>

                <p className="text-[var(--text-body)] text-[15px] leading-[1.85] mb-9 transition-colors duration-300">
                  กรอกข้อมูลด้านล่าง ทีมผู้เชี่ยวชาญจะติดต่อกลับเพื่อประเมินความต้องการของคุณโดยไม่มีค่าใช้จ่าย
                </p>

                {/* Checklist */}
                <div className="flex flex-col gap-3.5 mb-10">
                  {[
                    "การปรึกษาครั้งแรกฟรี 100% ไม่มีข้อผูกมัด",
                    "ทีมผู้เชี่ยวชาญเฉพาะทางตอบกลับภายใน 24 ชม.",
                    "วิเคราะห์ความต้องการและเสนอแนวทางที่เหมาะสม",
                    "ประสบการณ์ 30+ ปีในการดูแลลูกค้าทุกขนาด",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div 
                        className="w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 mt-px"
                        style={{
                          background: dark ? "rgba(201,168,76,0.12)" : "rgba(0,77,64,0.08)",
                          borderColor: dark ? "#C9A84C40" : "#004d4030",
                        }}
                      >
                        <span className="text-[#C9A84C]"><CheckIcon /></span>
                      </div>
                      <span className="text-[var(--text-body)] text-[14px] leading-[1.65] transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Privacy note — always visible */}
                <div 
                  className="p-[20px_22px] border border-l-[4px] border-l-[#C9A84C] rounded-sm"
                  style={{
                    background: dark ? "rgba(201,168,76,0.05)" : "rgba(0,77,64,0.05)",
                    borderColor: dark ? "rgba(201,168,76,0.2)" : "rgba(0,77,64,0.15)",
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#C9A84C] mt-0.5 shrink-0"><LockIcon /></span>
                    <div>
                      <p className="text-[#C9A84C] text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1.5">Privacy & Confidentiality</p>
                      <p className="text-[var(--text-muted)] text-[13px] leading-[1.7] transition-colors duration-300">
                        ข้อมูลธุรกิจของท่านจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐานวิชาชีพ
                        และจะไม่ถูกเปิดเผยต่อบุคคลที่สามภายใต้ทุกกรณี
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Right Form ── */}
            <Reveal delay={0.15}>
              <div 
                className="p-10 border border-[var(--border)] border-t-[4px] border-t-[#C9A84C] transition-all duration-300 bg-[var(--bg-form)]"
                style={{ boxShadow: dark ? "0 16px 60px rgba(0,0,0,0.5)" : "0 16px 60px rgba(0,0,0,0.08)" }}
              >
                {submitted ? (
                  <div className="text-center py-12 px-5">
                    <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <h3 className="font-['Playfair_Display',serif] text-[26px] font-bold text-[var(--text-heading)] mb-3 transition-colors duration-300">ส่งข้อความสำเร็จ!</h3>
                    <p className="text-[var(--text-body)] leading-[1.8] text-[15px] transition-colors duration-300">ขอบคุณที่ไว้วางใจเรา ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมงในวันทำการ</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="mb-1">
                      <h3 className="font-['Playfair_Display',serif] text-[22px] font-bold text-[var(--text-heading)] mb-1.5 transition-colors duration-300">ส่งคำขอปรึกษา</h3>
                      <p className="text-[var(--text-muted)] text-[13px] transition-colors duration-300">กรุณากรอกข้อมูลเพื่อให้เราติดต่อกลับได้อย่างถูกต้อง</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-300">ชื่อ-นามสกุล *</label>
                      <input 
                        type="text" required placeholder="นาย สมชาย ใจดี"
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className={inputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-300">บริษัท / ชื่อธุรกิจ *</label>
                      <input 
                        type="text" required placeholder="บริษัท ตัวอย่าง จำกัด"
                        value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                        className={inputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-300">เบอร์โทรศัพท์ *</label>
                      <input 
                        type="tel" required placeholder="08X-XXX-XXXX"
                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        className={inputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-300">บริการที่สนใจ</label>
                      <select 
                        value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                        className={`${inputClass} cursor-pointer appearance-none bg-no-repeat bg-[position:right_16px_center] pr-11`}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")` }}
                      >
                        <option value="commercial">Commercial & Distribution Strategy</option>
                        <option value="accounting">Strategic Accounting & Tax Solutions</option>
                        <option value="audit">Internal Audit & Corporate Systems</option>
                        <option value="integrated">ต้องการหลายบริการแบบบูรณาการ</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                      <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-300">ความท้าทายที่คุณเผชิญอยู่</label>
                      <textarea 
                        rows={4} placeholder="เล่าให้เราฟังถึงปัญหาหรือเป้าหมายที่ต้องการบรรลุ..."
                        value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full p-5 bg-[#C9A84C] text-[#001a10] font-extrabold text-[14px] tracking-[0.2em] uppercase border-none cursor-pointer font-['IBM_Plex_Sans_Thai',sans-serif] flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-[#d4b050] hover:shadow-[0_0_36px_rgba(201,168,76,0.45)] hover:gap-[18px] group"
                    >
                      ส่งคำขอปรึกษาฟรี
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </button>

                    <p className="text-center text-[var(--text-muted)] text-[12px] flex items-center justify-center gap-1.5 transition-colors duration-300 -mt-1">
                      <LockIcon /> ข้อมูลของคุณได้รับการปกป้องอย่างสูงสุด
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP SHELL — Tab Switcher for Demo
───────────────────────────────────────────── */
export default function ServiceDetailApp() {
  const [dark, setDark] = useState(false);
  const [activeService, setActiveService] = useState<ServiceId>("commercial");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Dark mode toggle */}
      <button 
        className="fixed top-5 right-5 z-[1000] w-[46px] h-[46px] rounded-full border-2 border-[#C9A84C] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md text-[#C9A84C] hover:scale-110 hover:rotate-[15deg] hover:shadow-[0_0_24px_rgba(201,168,76,0.5)]"
        onClick={() => setDark(d => !d)}
        style={{ background: dark ? "rgba(20,20,20,0.9)" : "rgba(0,0,0,0.6)" }}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Service Switcher Bar */}
      <div 
        className="sticky top-0 z-[100] py-3.5 px-6 md:px-[60px] flex items-center gap-4 flex-wrap transition-colors duration-300"
        style={{
          background: dark ? "#0a0a0a" : "#ffffff",
          borderBottom: `1px solid ${dark ? "#1e3028" : "#e5e7eb"}`,
          boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.5)" : "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        <span 
          className="text-[11px] tracking-[0.2em] uppercase font-semibold mr-2 transition-colors duration-300"
          style={{ color: dark ? "#5a7a68" : "#9ca3af" }}
        >
          Service:
        </span>
        {Object.keys(SERVICE_DATA).map((id) => (
          <button 
            key={id} 
            className="py-2.5 px-6 font-['IBM_Plex_Sans_Thai',sans-serif] text-[12px] font-bold tracking-[0.12em] uppercase rounded-sm cursor-pointer transition-all duration-300"
            onClick={() => setActiveService(id as ServiceId)}
            style={{
              background: activeService === id ? "#C9A84C" : "transparent",
              color: activeService === id ? "#001a10" : dark ? "#8aaa98" : "#6b7280",
              border: activeService === id ? "1px solid #C9A84C" : `1px solid ${dark ? "#2a3d33" : "#e5e7eb"}`,
            }}
          >
            {id === "commercial" ? "Commercial" : id === "accounting" ? "Accounting" : "Internal Audit"}
          </button>
        ))}
      </div>

      {/* Render active service page */}
      <ServiceDetailPage
        serviceId={activeService}
        dark={dark}
        setDark={setDark}
      />
    </>
  );
}