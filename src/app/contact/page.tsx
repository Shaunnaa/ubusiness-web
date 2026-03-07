"use client"

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface FormState {
  name: string;
  company: string;
  subject: string;
  phone: string;
  message: string;
}

type FormKeys = keyof FormState;

/* ─────────────────────────────────────────────
   Scroll Reveal Hook & Component
───────────────────────────────────────────── */
function useReveal(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
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
  
  return [ref, visible];
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

function Reveal({ children, delay = 0, style = {}, className = "" }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <div 
      ref={ref} 
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
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
const Icons = {
  Phone: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
  Mail: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  Line: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.1 2 11.1c0 3.44 2.21 6.46 5.55 8.17-.24.88-.88 3.18-.97 3.55-.12.47.17.46.35.34.14-.09 2.24-1.52 3.14-2.14.63.09 1.28.14 1.93.14 5.52 0 10-4.1 10-9.06C22 6.1 17.52 2 12 2z"/></svg>,
  Location: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  Clock: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/></svg>,
  LinkedIn: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  Facebook: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  Lock: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4"/></svg>,
  Alert: () => <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4M12 16h.01"/></svg>,
  Send: () => <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z"/></svg>,
  MapPin: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
};

/* ─────────────────────────────────────────────
   Validation helpers
───────────────────────────────────────────── */
const validate: Record<FormKeys, (v: string) => boolean> = {
  phone:   (v) => /^[0-9]{9,10}$/.test(v.replace(/[-\s]/g, "")),
  name:    (v) => v.trim().length >= 2,
  company: (v) => v.trim().length >= 1,
  subject: (v) => v !== "",
  message: (v) => v.trim().length >= 10,
};

const errorMsg: Record<FormKeys, string> = {
  phone:   "กรุณากรอกเบอร์โทร 9-10 หลัก",
  name:    "กรุณากรอกชื่อ-นามสกุล",
  company: "กรุณากรอกชื่อบริษัท",
  subject: "กรุณาเลือกหัวข้อที่ต้องการ",
  message: "กรุณาระบุรายละเอียด (อย่างน้อย 10 ตัวอักษร)",
};

/* ─────────────────────────────────────────────
   FORM FIELD HELPER
───────────────────────────────────────────── */
function FormField({ label, children, error, hint }: { label: string; children: React.ReactNode; error?: string | null; hint?: string | null; }) {
  return (
    <div>
      <label className={`block text-[11px] font-bold tracking-[0.12em] uppercase mb-2 transition-colors duration-300 ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-[5px] text-red-600 text-[12px] mt-1.5 font-medium">
          <Icons.Alert /> {error}
        </p>
      )}
      {hint && (
        <p className="text-brand-green dark:text-emerald-400 text-[12px] mt-[5px] font-semibold">{hint}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", company: "", subject: "", phone: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<FormKeys, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const showError = (k: FormKeys) => touched[k] && !validate[k](form[k]);
  const allValid  = (Object.keys(validate) as FormKeys[]).every(k => validate[k](form[k]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, company: true, subject: true, phone: true, message: true });
    if (!allValid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const contactItems = [
    { icon: <Icons.Phone />,    label: "โทรศัพท์",      value: "02-862-6009",            sub: "คลิกเพื่อโทร",          href: "tel:02XXXXXXX" },
    { icon: <Icons.Mail />,     label: "อีเมล",          value: "info@ubusinessadviser.com",   sub: "คลิกเพื่อส่งอีเมล",    href: "mailto:info@ubusiness.co.th" },
    { icon: <Icons.Line />,     label: "LINE OA",        value: "@944tkzgr",      sub: "เพิ่มเพื่อนบน LINE",     href: "https://line.me" },
    { icon: <Icons.Location />, label: "ที่อยู่สำนักงาน", value: "1006/416 ชั้น 1 มาสเตอร์วิว เอ็กเซ็กคิวทีฟ เพลส, ซอยเจริญนคร 34/1", sub: "ถ.เจริญนคร แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพฯ 10600" },
    { icon: <Icons.Clock />,    label: "เวลาทำการ",      value: "จันทร์ – เสาร์",         sub: "08:30 – 17:30 น. (ยกเว้นวันหยุดนักขัตฤกษ์)" },
  ];

  const inputBaseClasses = `w-full p-[15px_18px] text-[15px] font-thai bg-gray-50 dark:bg-[#111] text-gray-900 dark:text-gray-100 outline-none rounded-sm min-h-[52px] transition-all duration-[0.25s] border-[1.5px] border-gray-200 dark:border-gray-800 focus:border-brand-gold focus:ring-[3px] focus:ring-brand-gold/20 dark:focus:ring-brand-gold/10`;

  return (
    <>
      <style>{`
        @keyframes successIn {
          0% { opacity: 0; transform: scale(0.85) translateY(12px); }
          65% { transform: scale(1.03) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="font-thai overflow-x-hidden leading-[1.7] bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
        
        {/* HERO HEADER */}
        <section className="relative overflow-hidden transition-colors duration-300 px-6 py-[80px] pb-[60px] sm:px-[60px] sm:pt-[110px] sm:pb-[80px] bg-gradient-to-br from-brand-green via-[#003d2b] to-brand-greenDark dark:from-brand-dark dark:via-brand-darkElevated dark:to-brand-dark">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,168,76,0.07)_1.5px,transparent_1.5px)] bg-[size:36px_36px] pointer-events-none" />
          <div className="absolute left-0 top-0 w-[5px] h-full bg-gradient-to-b from-transparent via-brand-gold to-transparent" />
          
          <div className="relative z-[2] max-w-[1100px] mx-auto animate-[heroFade_0.9s_ease_forwards]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-brand-gold" />
              <span className="text-brand-gold text-[11px] tracking-[0.35em] uppercase font-bold">Get In Touch</span>
            </div>

            <h1 className="font-playfair text-[clamp(34px,5.5vw,68px)] font-extrabold leading-[1.1] text-white mb-[22px] max-w-[740px]">
              Ready to <span className="text-brand-gold">Scale</span> Your Business?
            </h1>

            <p className="text-white/70 text-[clamp(15px,1.7vw,19px)] max-w-[580px] leading-[1.85] mb-10">
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาเบื้องต้นโดยทีมผู้เชี่ยวชาญ ที่มีประสบการณ์กว่า <strong className="text-brand-gold">30 ปี</strong> — ฟรี ไม่มีข้อผูกมัด
            </p>

            <div className="flex flex-wrap gap-5">
              {["ตอบกลับภายใน 24 ชม.", "ปรึกษาครั้งแรกฟรี", "ข้อมูลปลอดภัย 100%"].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="text-white/70 text-[13px] font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-white dark:to-brand-dark" />
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-[1200px] mx-auto px-6 py-[60px] pb-[80px] sm:px-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.12fr] gap-12 lg:gap-[72px] items-start">

            {/* LEFT: Info */}
            <Reveal>
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="h-[1px] w-9 bg-brand-gold" />
                  <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-bold">Contact Information</span>
                </div>
                <h2 className="font-playfair text-[clamp(24px,3vw,36px)] font-bold mb-2.5 leading-[1.25]">
                  เราอยู่ที่นี่<br /><span className="text-brand-gold">พร้อมช่วยเหลือคุณ</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-9 text-[15px] leading-[1.8]">
                  ไม่แน่ใจว่าควรเริ่มจากไหน? บอกเราถึงความต้องการของธุรกิจคุณ ทีมเราจะแนะนำเส้นทางที่เหมาะสมที่สุด
                </p>

                <div className="flex flex-col gap-2 mb-9">
                  {contactItems.map((item, i) =>
                    item.href ? (
                      <a key={i} href={item.href} className="group flex gap-4 py-[18px] px-5 rounded-sm border border-gray-200 dark:border-gray-800 border-l-[3px] border-l-brand-gold bg-gray-50 dark:bg-brand-darkElevated hover:-translate-y-0.5 hover:shadow-md transition-all">
                        <div className="w-[42px] h-[42px] rounded-full bg-brand-green/5 dark:bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 transition-colors group-hover:bg-brand-gold group-hover:text-brand-greenDark">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5">{item.label}</p>
                          <p className="font-semibold text-[15px]">{item.value}</p>
                          {item.sub && <p className="text-brand-gold text-[12px] mt-px">{item.sub}</p>}
                        </div>
                      </a>
                    ) : (
                      <div key={i} className="flex gap-4 py-[18px] px-5 rounded-sm border border-gray-200 dark:border-gray-800 border-l-[3px] border-l-gray-300 dark:border-l-gray-700 bg-gray-50 dark:bg-brand-darkElevated">
                        <div className="w-[42px] h-[42px] rounded-full bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center text-brand-gold shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5">{item.label}</p>
                          <p className="font-semibold text-[15px]">{item.value}</p>
                          {item.sub && <p className="text-gray-500 dark:text-gray-400 text-[13px] mt-0.5">{item.sub}</p>}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-3.5">ติดตามเรา</p>
                  <div className="flex gap-2.5">
                    {[{ icon: <Icons.LinkedIn />, bg: "#0077b5" }, { icon: <Icons.Facebook />, bg: "#1877f2" }, { icon: <Icons.Line />, bg: "#06c755" }].map((s, i) => (
                      <button key={i} className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-[3px] hover:shadow-lg" style={{ background: s.bg }}>{s.icon}</button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT: Form */}
            <Reveal delay={0.15}>
              <div className="bg-white dark:bg-brand-darkElevated border border-gray-200 dark:border-gray-800 border-t-[4px] border-t-brand-gold shadow-[0_16px_48px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_72px_rgba(0,0,0,0.55)] p-[44px_40px]">
                {submitted ? (
                  <div className="text-center p-[52px_24px] animate-[successIn_0.6s_forwards]">
                    <div className="w-[92px] h-[92px] rounded-full bg-brand-green/5 dark:bg-brand-gold/10 border-[3px] border-brand-gold flex items-center justify-center mx-auto mb-7">
                      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-brand-gold">
                        <path className="stroke-[60] [stroke-dashoffset:60] animate-[checkDraw_0.6s_ease_0.3s_forwards]" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <h3 className="font-playfair text-[26px] font-bold mb-3.5">ขอบคุณที่ติดต่อเรา!</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-[16px] mb-2">เราได้รับข้อความของคุณแล้ว ทีมจะติดต่อกลับ <strong className="text-brand-gold">ภายใน 24 ชั่วโมง</strong></p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: "", company: "", subject: "", phone: "", message: "" }); setTouched({}); }} className="mt-8 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 py-2.5 px-6 rounded-sm hover:border-brand-gold hover:text-brand-gold transition-all">ส่งข้อความอีกครั้ง</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div className="mb-2">
                      <h3 className="font-playfair text-[22px] font-bold mb-1">ส่งข้อความหาเรา</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-[13px]">ช่องที่มี * จำเป็นต้องกรอก</p>
                    </div>

                    <FormField label="ชื่อ-นามสกุล *" error={showError("name") ? errorMsg.name : null}>
                      <input type="text" placeholder="คำนำหน้า ชื่อ นามสกุล" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onBlur={() => setTouched(p => ({ ...p, name: true }))} className={`${inputBaseClasses} ${showError("name") ? "!border-red-600" : ""}`} />
                    </FormField>

                    <FormField label="บริษัท / ชื่อธุรกิจ *" error={showError("company") ? errorMsg.company : null}>
                      <input type="text" placeholder="บริษัท ตัวอย่าง จำกัด" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} onBlur={() => setTouched(p => ({ ...p, company: true }))} className={`${inputBaseClasses} ${showError("company") ? "!border-red-600" : ""}`} />
                    </FormField>

                    <FormField label="หัวข้อที่ต้องการ *" error={showError("subject") ? errorMsg.subject : null}>
                      <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} onBlur={() => setTouched(p => ({ ...p, subject: true }))} className={`${inputBaseClasses} cursor-pointer appearance-none bg-no-repeat bg-[position:right_16px_center] pr-12 ${showError("subject") ? "!border-red-600" : ""}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")` }}>
                        <option value="" disabled>เลือกหัวข้อที่ต้องการปรึกษา</option>
                        <option value="commercial">Commercial & Distribution Strategy</option>
                        <option value="accounting">Strategic Accounting & Tax Solutions</option>
                        <option value="audit">Internal Audit & Corporate Systems</option>
                        <option value="integrated">ต้องการหลายบริการแบบบูรณาการ</option>
                        <option value="other">อื่นๆ / ยังไม่แน่ใจ</option>
                      </select>
                    </FormField>

                    <FormField label="เบอร์โทรศัพท์ *" error={showError("phone") ? errorMsg.phone : null} hint={touched.phone && validate.phone(form.phone) ? "✓ เบอร์โทรถูกต้อง" : null}>
                      <input type="tel" placeholder="0XX-XXX-XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} onBlur={() => setTouched(p => ({ ...p, phone: true }))} className={`${inputBaseClasses} ${showError("phone") ? "!border-red-600" : ""}`} maxLength={12} />
                    </FormField>

                    <FormField label="รายละเอียด / ข้อความ *" error={showError("message") ? errorMsg.message : null}>
                      <textarea rows={5} placeholder="บอกเล่าความต้องการ ปัญหา หรือเป้าหมายของธุรกิจคุณ..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onBlur={() => setTouched(p => ({ ...p, message: true }))} className={`${inputBaseClasses} resize-y min-h-[130px] ${showError("message") ? "!border-red-600" : ""}`} />
                    </FormField>

                    <button type="submit" disabled={loading} className={`w-full py-[18px] px-6 text-[14px] font-extrabold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2.5 transition-all text-brand-greenDark ${loading ? "bg-brand-gold/60 cursor-not-allowed" : "bg-brand-gold cursor-pointer hover:bg-brand-goldLight hover:shadow-lg"}`}>
                      {loading ? <><div className="w-[18px] h-[18px] border-[2.5px] border-brand-greenDark/30 border-t-brand-greenDark rounded-full animate-spin" /> กำลังส่งข้อความ...</> : <><Icons.Send /> ส่งข้อความปรึกษาฟรี</>}
                    </button>

                    <div className="flex items-start gap-2.5 p-[14px_16px] bg-brand-green/5 dark:bg-brand-gold/10 border border-brand-green/10 dark:border-brand-gold/20 border-l-[3px] border-l-brand-gold rounded-sm transition-colors">
                      <span className="text-brand-gold mt-0.5 shrink-0"><Icons.Lock /></span>
                      <p className="text-gray-600 dark:text-gray-400 text-[12.5px] leading-[1.65]">ข้อมูลของท่านจะถูกเก็บรักษาเป็นความลับสูงสุดตามนโยบายความเป็นส่วนตัว และมาตรฐานวิชาชีพ</p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* MAP SECTION */}
        <section>
          <Reveal>
            <div className="relative">
              <div className="absolute top-4 left-4 sm:top-6 sm:left-12 z-20 bg-white/95 dark:bg-brand-dark/95 border border-gray-200 dark:border-gray-800 border-l-[4px] border-l-brand-gold p-[18px_22px] shadow-xl backdrop-blur-[12px] max-w-[300px]">
                <p className="text-brand-gold text-[10px] font-extrabold tracking-[0.25em] uppercase mb-2 flex items-center gap-[5px]"><Icons.MapPin /> สำนักงาน</p>
                <p className="font-bold text-[14px] leading-[1.4] mb-1.5">APL Accountancy /<br />U Business Adviser</p>
                <p className="text-gray-600 dark:text-gray-400 text-[12.5px] leading-[1.6] mb-2.5">1006/416 ชั้น 1 มาสเตอร์วิว เอ็กเซ็กคิวทีฟ เพลส, ซอยเจริญนคร 34/1</p>
                <div className="flex items-center gap-1.5"><div className="w-[7px] h-[7px] rounded-full bg-brand-green dark:bg-emerald-400" />
                <span className="text-brand-green dark:text-emerald-400 text-xs font-semibold">เปิดทำการ จ–ศ 08:30–17:30</span></div>
              </div>

              <div className="h-[480px] overflow-hidden dark:invert-[92%] dark:sepia-0 dark:saturate-[0.85] dark:hue-rotate-[180deg] dark:brightness-[0.82] dark:contrast-90">
                <iframe title="Office Map" src="https://www.google.com/maps?q=13.712906,100.499320&z=17&output=embed" width="100%" height="480" className="border-0 block" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-[108px_56px_36px] flex flex-wrap justify-between items-end gap-6 bg-gradient-to-t from-brand-greenDark from-0% via-brand-greenDark via-[95%] to-transparent to-100% dark:from-brand-dark/95 via-transparent to-transparent transition-colors">
                <div>
                  <p className="text-white/80 text-[13px] tracking-[0.15em] uppercase mb-1.5">หรือนัดพบที่สำนักงาน</p>
                  <p className="text-white font-semibold text-[16px]">เปิดทำการ จันทร์–เสาร์ 08:30–17:30 น. <span className="text-brand-gold ml-2">•</span><span className="text-white/70 text-[14px] ml-2">กรุณานัดหมายล่วงหน้า</span></p>
                </div>
                <a href="https://maps.app.goo.gl/QECVACv2MrPgS9PM7" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 p-[13px_30px] bg-brand-gold text-brand-greenDark font-extrabold text-[12px] tracking-[0.18em] uppercase transition-all hover:bg-brand-goldLight hover:gap-3.5">
                  <Icons.MapPin /> เปิดใน Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}