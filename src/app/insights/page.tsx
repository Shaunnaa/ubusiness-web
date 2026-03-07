"use client"

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types & Interfaces
───────────────────────────────────────────── */
interface IconProps {
  size?: number;
}

interface ContentBlock {
  type: "intro" | "h2" | "p";
  text: string;
}

interface Article {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured: boolean;
  content: ContentBlock[];
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
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
const ArrowIcon = ({ size = 14 }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const UserIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/>
  </svg>
);
const BackIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Blog Data
───────────────────────────────────────────── */
const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "sme-3-strategies",
    category: "Commercial",
    categoryColor: "#C9A84C",
    title: "3 กลยุทธ์ที่ SME ต้องรู้เพื่อเพิ่มกำไรอย่างยั่งยืนใน 2025",
    excerpt: "การแข่งขันที่รุนแรงในตลาดปัจจุบันทำให้ SME ต้องปรับกลยุทธ์ให้ทันสมัย บทความนี้รวบรวม 3 แนวทางที่พิสูจน์แล้วว่าได้ผลจริงจากประสบการณ์ตรง",
    date: "10 มิ.ย. 2568",
    readTime: "7 นาที",
    author: "U Business Adviser Team",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    featured: true,
    content: [
      { type: "intro", text: "ท่ามกลางความท้าทายของตลาดในปี 2025 ผู้ประกอบการ SME ที่สามารถปรับตัวได้เร็วและชัดเจน คือผู้ที่จะอยู่รอดและเติบโตได้อย่างยั่งยืน จากประสบการณ์กว่า 30 ปีในการให้คำปรึกษาธุรกิจ เราได้รวบรวม 3 กลยุทธ์สำคัญที่ผู้ประกอบการควรนำไปปฏิบัติทันที" },
      { type: "h2", text: "1. วางรากฐานด้านข้อมูลก่อนตัดสินใจทุกอย่าง" },
      { type: "p", text: "การตัดสินใจที่ดีต้องมาจากข้อมูลที่ถูกต้องและทันสมัย ไม่ใช่จากความรู้สึกหรือประสบการณ์อย่างเดียว SME ที่ประสบความสำเร็จในยุคนี้ล้วนมีระบบติดตามตัวเลขธุรกิจที่ชัดเจน ไม่ว่าจะเป็นอัตรากำไรขั้นต้น ต้นทุนการขาย หรือ Customer Acquisition Cost" },
      { type: "h2", text: "2. สร้างช่องทางรายได้หลายสายควบคู่กัน" },
      { type: "p", text: "การพึ่งพาลูกค้ากลุ่มเดียวหรือช่องทางเดียวคือความเสี่ยงที่หลีกเลี่ยงได้ กลยุทธ์ Omni-channel ไม่ใช่แค่สำหรับแบรนด์ใหญ่อีกต่อไป SME สามารถเริ่มต้นด้วยการขายผ่าน 2-3 ช่องทางและค่อยขยายตามศักยภาพ" },
      { type: "h2", text: "3. ลงทุนในระบบบัญชีและการวางแผนภาษีตั้งแต่วันนี้" },
      { type: "p", text: "หลายธุรกิจรอให้ใหญ่พอแล้วค่อยจัดระบบบัญชี นั่นคือความผิดพลาดที่แพงที่สุด การมีระบบบัญชีที่ดีตั้งแต่ต้นจะช่วยประหยัดภาษีได้อย่างถูกกฎหมาย ป้องกันการรั่วไหลของเงิน และสร้างความน่าเชื่อถือต่อ Partner และนักลงทุน" },
    ],
  },
  {
    id: 2,
    slug: "internal-audit-defence",
    category: "Internal Audit",
    categoryColor: "#2a9d8f",
    title: "Internal Audit: Why It's Your First Line of Defence Against Business Risk",
    excerpt: "An effective internal audit function isn't a bureaucratic burden — it's your early-warning system that surfaces risks before they become crises worth millions.",
    date: "22 พ.ค. 2568",
    readTime: "5 นาที",
    author: "APL Accountancy Team",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content: [
      { type: "intro", text: "Many business owners view internal audit as an unnecessary cost — a checkbox exercise for large corporations. In reality, a well-structured internal audit function is one of the highest-ROI investments a growing business can make." },
      { type: "h2", text: "What Internal Audit Actually Does" },
      { type: "p", text: "Internal audit evaluates and improves the effectiveness of risk management, control, and governance processes. It's an independent, objective assurance and consulting activity designed to add value to your operations." },
      { type: "h2", text: "The Cost of NOT Having Internal Audit" },
      { type: "p", text: "Companies without internal audit typically discover problems only after they've caused significant damage — whether financial fraud, regulatory non-compliance, or operational inefficiencies that have quietly eroded margins for years." },
    ],
  },
  {
    id: 3,
    slug: "tax-planning-legal",
    category: "Accounting",
    categoryColor: "#e9c46a",
    title: "วางแผนภาษีอย่างถูกกฎหมาย: ลดภาระได้จริงโดยไม่ต้องเสี่ยง",
    excerpt: "การวางแผนภาษีที่ถูกต้องไม่ใช่การหลบเลี่ยง แต่คือการใช้สิทธิประโยชน์ทางภาษีที่กฎหมายให้ไว้ให้คุ้มค่าที่สุด",
    date: "5 พ.ค. 2568",
    readTime: "6 นาที",
    author: "U Business Adviser Team",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content: [
      { type: "intro", text: "ผู้ประกอบการหลายคนเข้าใจผิดว่าการวางแผนภาษีคือการหลบเลี่ยงภาษี ซึ่งผิดทั้งกฎหมายและจริยธรรม แต่ในความเป็นจริง มีช่องทางที่ถูกต้องตามกฎหมายมากมายที่สามารถลดภาระภาษีได้อย่างมีนัยสำคัญ" },
      { type: "h2", text: "สิทธิประโยชน์ภาษีที่ SME มักมองข้าม" },
      { type: "p", text: "ค่าใช้จ่ายที่หักได้เป็น 2 เท่า การลงทุนในทรัพย์สินที่ได้รับการส่งเสริม BOI ค่าฝึกอบรมพนักงาน และการบริจาคเพื่อการศึกษา ล้วนเป็นช่องทางที่ถูกต้องและมักถูกมองข้าม" },
    ],
  },
  {
    id: 4,
    slug: "modern-trade-strategy",
    category: "Commercial",
    categoryColor: "#C9A84C",
    title: "Modern Trade Strategy: เจาะตลาด Retail Chain อย่างมืออาชีพ",
    excerpt: "การเข้า Modern Trade ต้องการมากกว่าแค่สินค้าดี — ต้องมีกลยุทธ์ที่ชัดเจนทั้งด้าน Listing, Promotion และ In-store Execution",
    date: "18 เม.ย. 2568",
    readTime: "8 นาที",
    author: "U Business Adviser Team",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content: [
      { type: "intro", text: "การเข้า Modern Trade เป็นเป้าหมายของแบรนด์หลายแบรนด์ แต่การเข้าได้ไม่ได้หมายความว่าจะสำเร็จ บทความนี้จะพาคุณเข้าใจกลยุทธ์ที่แท้จริง" },
      { type: "h2", text: "การเตรียมตัวก่อนเข้า Modern Trade" },
      { type: "p", text: "ก่อนจะเข้าไปเจรจากับ Buyer ของ Modern Trade คุณต้องรู้ต้นทุนและ Margin ของตัวเองอย่างแม่นยำ รวมถึงเข้าใจโครงสร้างค่าใช้จ่ายต่างๆ ที่ Retailer จะเรียกเก็บ" },
    ],
  },
  {
    id: 5,
    slug: "corporate-governance-sme",
    category: "Internal Audit",
    categoryColor: "#2a9d8f",
    title: "Corporate Governance for SME: Why It Matters Before You Need It",
    excerpt: "Good governance isn't just for public companies. SMEs that build governance frameworks early scale faster, attract investors easier, and avoid costly legal disputes.",
    date: "2 เม.ย. 2568",
    readTime: "6 นาที",
    author: "APL Accountancy Team",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content: [
      { type: "intro", text: "The question isn't whether your SME needs corporate governance — it's whether you'll implement it before or after a painful lesson teaches you why you should have." },
      { type: "h2", text: "The Three Pillars of SME Governance" },
      { type: "p", text: "Accountability, transparency, and fairness form the foundation. Without these, even the most profitable businesses eventually face crises that good governance would have prevented." },
    ],
  },
  {
    id: 6,
    slug: "financial-health-check",
    category: "Accounting",
    categoryColor: "#e9c46a",
    title: "Financial Health Check: 5 ตัวชี้วัดที่เจ้าของธุรกิจต้องดูทุกเดือน",
    excerpt: "เจ้าของธุรกิจหลายคนดูแค่ยอดขาย แต่ธุรกิจที่ยั่งยืนต้องติดตาม 5 ตัวเลขสำคัญที่บอกสุขภาพการเงินที่แท้จริง",
    date: "15 มี.ค. 2568",
    readTime: "5 นาที",
    author: "U Business Adviser Team",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    featured: false,
    content: [
      { type: "intro", text: "ถ้าคุณถามเจ้าของธุรกิจส่วนใหญ่ว่าตัวเลขไหนที่ดูทุกเดือน คำตอบมักจะเป็นยอดขาย แต่นั่นเป็นแค่ส่วนเล็กของภาพรวมสุขภาพทางการเงินของธุรกิจ" },
      { type: "h2", text: "Gross Profit Margin — อัตรากำไรขั้นต้น" },
      { type: "p", text: "ตัวเลขนี้บอกว่าทุก 100 บาทที่ขายได้ เหลือเป็นกำไรก่อนหักค่าใช้จ่ายดำเนินงานเท่าไร ถ้าตัวเลขนี้ลดลงทุกเดือน แปลว่ามีปัญหาที่ต้นทุนหรือราคาขาย" },
    ],
  },
];

const CATEGORIES = ["All", "Commercial", "Accounting", "Internal Audit"];

const RELATED_SERVICES = [
  { title: "Commercial Strategy", desc: "กลยุทธ์การค้าและช่องทาง", color: "#C9A84C" },
  { title: "Accounting & Tax", desc: "บัญชีและการวางแผนภาษี", color: "#2a9d8f" },
  { title: "Internal Audit", desc: "ระบบควบคุมและตรวจสอบ", color: "#e9c46a" },
];

/* ─────────────────────────────────────────────
   ARTICLE DETAIL PAGE
───────────────────────────────────────────── */
interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    { label: "Facebook", tailwind: "bg-[#1877f2] hover:bg-[#0d65d9] text-white" },
    { label: "LinkedIn", tailwind: "bg-[#0077b5] hover:bg-[#005e8e] text-white" },
    { label: "LINE", tailwind: "bg-[#06c755] hover:bg-[#059940] text-white" },
    { 
      label: copied ? "คัดลอกแล้ว!" : "คัดลอก Link", 
      tailwind: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-brand-gold", 
      action: handleCopy 
    },
  ];

  return (
    <div className="bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">

      {/* Article Hero */}
      <div className="relative h-[460px] overflow-hidden">
        <img
          src={article.image} alt={article.title} loading="lazy"
          className="w-full h-full object-cover block"
        />
        {/* Dynamic Dark/Light Overlay */}
        <div className="absolute inset-0 bg-[#003d2b]/65 dark:bg-black/75 transition-colors duration-300" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-gold to-transparent" />

        {/* Back button */}
        <button 
          onClick={onBack} 
          className="absolute top-8 left-12 flex items-center gap-2 bg-black/40 border border-white/20 text-white py-2.5 px-5 cursor-pointer text-[12px] tracking-[0.1em] uppercase font-thai font-semibold backdrop-blur-md transition-all duration-300 hover:bg-brand-gold/40"
        >
          <BackIcon /> กลับ
        </button>

        {/* Article meta */}
        <div className="absolute bottom-0 left-0 right-0 py-10 px-12">
          <div className="max-w-[900px] mx-auto">
            <span 
              className="inline-block py-1 px-3.5 mb-4 text-[11px] font-bold tracking-[0.2em] uppercase border"
              style={{
                background: article.categoryColor + "25", 
                borderColor: `${article.categoryColor}60`,
                color: article.categoryColor, 
              }}
            >
              {article.category}
            </span>
            <h1 className="font-playfair text-[clamp(24px,4vw,44px)] font-extrabold text-white leading-[1.2] max-w-[780px]">
              {article.title}
            </h1>
            <div className="flex flex-wrap gap-5 mt-5">
              {[
                { icon: <CalendarIcon />, text: article.date },
                { icon: <ClockIcon />, text: `อ่าน ${article.readTime}` },
                { icon: <UserIcon />, text: article.author },
              ].map((m, i) => (
                <span key={i} className="flex items-center gap-1.5 text-white/65 text-[13px]">
                  {m.icon} {m.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article Body + Sidebar */}
      <div className="max-w-[1200px] mx-auto py-16 px-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-start">

        {/* ── Main Content ── */}
        <article className="max-w-full">
          {article.content.map((block, i) => {
            if (block.type === "intro") return (
              <p key={i} className="text-[18px] leading-[2] text-gray-600 dark:text-gray-400 mb-8 pl-5 border-l-[3px] border-brand-gold italic transition-colors duration-300">
                {block.text}
              </p>
            );
            if (block.type === "h2") return (
              <h2 key={i} className="font-playfair text-[clamp(20px,2.5vw,28px)] font-bold text-gray-900 dark:text-gray-100 mb-4 mt-10 leading-[1.3] transition-colors duration-300">
                {block.text}
              </h2>
            );
            if (block.type === "p") return (
              <p key={i} className="text-[16px] leading-[1.95] text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
                {block.text}
              </p>
            );
            return null;
          })}

          {/* Share Section */}
          <div className="mt-14 pt-10 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <p className="text-gray-500 dark:text-gray-400 text-[13px] tracking-[0.2em] uppercase font-bold mb-4 flex items-center gap-2 transition-colors duration-300">
              <ShareIcon /> แชร์บทความนี้
            </p>
            <div className="flex flex-wrap gap-2.5">
              {shareButtons.map((s, i) => (
                <button 
                  key={i} 
                  onClick={s.action}
                  className={`py-2.5 px-[22px] border-none cursor-pointer text-[13px] font-bold font-thai transition-all duration-300 ${s.tailwind}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div 
            className="mt-12 p-10 border-l-[4px] border-brand-gold bg-brand-green dark:bg-[#0a1f16] transition-colors duration-300"
          >
            <p className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-bold mb-3">Need Expert Advice?</p>
            <h3 className="font-playfair text-white text-[clamp(18px,2.5vw,26px)] font-bold mb-4 leading-[1.3]">
              ต้องการคำแนะนำเฉพาะสำหรับธุรกิจของคุณ?
            </h3>
            <p className="text-white/65 text-[14px] leading-[1.8] mb-6">
              ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาที่ตรงจุด ไม่ใช่แค่คำแนะนำทั่วไป
            </p>
            <button 
              className="inline-flex items-center gap-2 py-3.5 px-8 bg-brand-gold text-brand-greenDark border-none cursor-pointer font-extrabold text-[12px] tracking-[0.18em] uppercase font-thai transition-all duration-300 hover:bg-brand-goldLight hover:gap-3.5"
            >
              ติดต่อผู้เชี่ยวชาญ <ArrowIcon />
            </button>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="sticky top-[100px] hidden lg:block">
          {/* Related articles */}
          <div className="mb-10">
            <h3 className="font-playfair text-[16px] font-bold text-gray-900 dark:text-gray-100 mb-5 pb-3 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
              บทความที่เกี่ยวข้อง
            </h3>
            <div className="flex flex-col gap-4">
              {ARTICLES.filter(a => a.id !== article.id).slice(0, 3).map((rel) => (
                <div key={rel.id} className="cursor-pointer py-3.5 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: rel.categoryColor }}>{rel.category}</span>
                  <p className="text-gray-900 dark:text-gray-100 text-[14px] font-semibold leading-[1.45] mt-1 transition-colors duration-300">{rel.title}</p>
                  <span className="text-gray-500 dark:text-gray-400 text-[12px] transition-colors duration-300">{rel.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Services */}
          <div>
            <h3 className="font-playfair text-[16px] font-bold text-gray-900 dark:text-gray-100 mb-5 pb-3 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
              บริการที่เกี่ยวข้อง
            </h3>
            <div className="flex flex-col gap-3">
              {RELATED_SERVICES.map((svc, i) => (
                <div 
                  key={i} 
                  className="py-4 px-4.5 bg-white dark:bg-brand-darkElevated border border-gray-200 dark:border-gray-800 border-l-[3px] cursor-pointer transition-all duration-300 hover:translate-x-1"
                  style={{ borderLeftColor: svc.color }}
                >
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: svc.color }}>{svc.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] transition-colors duration-300">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INSIGHTS MAIN PAGE — APP SHELL
───────────────────────────────────────────── */
export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const featured = ARTICLES.find(a => a.featured);
  const gridArticles = filtered.filter(a => !a.featured || activeCategory !== "All");

  if (openArticle) {
    return <ArticleDetail article={openArticle} onBack={() => setOpenArticle(null)} />;
  }

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="font-thai overflow-x-hidden leading-[1.7] bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">

        {/* ═══════════════════════════════════════
            SECTION 1 · HEADER + FILTERS
        ═══════════════════════════════════════ */}
        <section 
          className="relative px-[60px] pt-[100px] pb-[80px] overflow-hidden transition-colors duration-300 bg-gradient-to-br from-brand-green via-[#003d2b] to-brand-greenDark dark:from-[#0a0f0c] dark:to-[#0d1a12]"
        >
          {/* Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,168,76,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-brand-gold to-transparent" />

          <div className="relative z-10 max-w-[1100px] mx-auto animate-[fadeSlideUp_0.9s_ease_forwards]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] w-12 bg-brand-gold" />
              <span className="text-brand-gold text-[11px] tracking-[0.35em] uppercase font-bold">Knowledge Hub</span>
            </div>

            <h1 className="font-playfair text-[clamp(34px,5vw,66px)] font-extrabold text-white leading-[1.12] mb-5">
              Insights &{" "}
              <span className="text-brand-gold">Perspectives</span>
            </h1>

            <p className="text-white/70 text-[clamp(15px,1.6vw,19px)] max-w-[620px] leading-[1.85] mb-12">
              บทวิเคราะห์และแนวคิดเชิงกลยุทธ์ เพื่อการขับเคลื่อนธุรกิจจากประสบการณ์จริงกว่า{" "}
              <strong className="text-brand-gold">30 ปี</strong>
            </p>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`py-[9px] px-[22px] rounded-full text-[13px] font-semibold cursor-pointer border font-thai transition-all duration-300 tracking-[0.04em] ${
                    activeCategory === cat
                      ? "bg-brand-gold text-brand-greenDark border-transparent shadow-[0_0_20px_rgba(201,168,76,0.35)]"
                      : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-transparent to-white dark:to-brand-dark transition-colors duration-300" />
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 · FEATURED POST
        ═══════════════════════════════════════ */}
        {activeCategory === "All" && featured && (
          <section className="px-[60px] pt-[60px]">
            <div className="max-w-[1200px] mx-auto">
              <Reveal>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="h-[1px] w-9 bg-brand-gold" />
                  <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-bold">Featured Article</span>
                </div>

                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden cursor-pointer group/featured shadow-[0_8px_48px_rgba(0,77,64,0.12)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.5)]"
                  onClick={() => setOpenArticle(featured)}
                >
                  {/* Image */}
                  <div className="h-[420px] overflow-hidden relative">
                    <img 
                      src={featured.image} alt={featured.title} loading="lazy" 
                      className="block w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover/featured:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" />
                  </div>

                  {/* Content */}
                  <div 
                    className="p-[48px_44px] flex flex-col justify-center bg-brand-green dark:bg-[#1a1a1a] transition-colors duration-300"
                  >
                    <span className="inline-block py-1 px-3.5 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[11px] font-bold tracking-[0.22em] uppercase mb-5 self-start">
                      {featured.category}
                    </span>
                    <h2 className="font-playfair text-[clamp(20px,2.5vw,32px)] font-extrabold text-white leading-[1.3] mb-4">
                      {featured.title}
                    </h2>
                    <p className="text-white/65 text-[15px] leading-[1.85] mb-7">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-8">
                      {[{ i: <CalendarIcon />, t: featured.date }, { i: <ClockIcon />, t: `อ่าน ${featured.readTime}` }].map((m, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-white/50 text-[13px]">{m.i} {m.t}</span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-brand-gold text-[12px] font-bold tracking-[0.18em] uppercase transition-all duration-300 group-hover/featured:gap-3">
                      อ่านบทความเต็ม <ArrowIcon />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════
            SECTION 3 · ARTICLES GRID
        ═══════════════════════════════════════ */}
        <section className="py-[72px] px-[60px]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div className="flex justify-between items-baseline flex-wrap gap-3 mb-9">
                <h2 className="font-playfair text-[clamp(22px,2.5vw,30px)] font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  {activeCategory === "All" ? "บทความทั้งหมด" : `หมวด: ${activeCategory}`}
                </h2>
                <span className="text-gray-500 dark:text-gray-400 text-[14px] transition-colors duration-300">{filtered.length} บทความ</span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {gridArticles.map((art, i) => (
                <Reveal key={art.id} delay={i * 0.07}>
                  <div 
                    className="flex flex-col rounded-sm overflow-hidden cursor-pointer transition-all duration-[0.35s] ease-in-out group/card bg-white dark:bg-brand-darkElevated border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-brand-gold/50 dark:hover:border-brand-gold/50 hover:shadow-[0_16px_40px_rgba(0,77,64,0.12)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                    onClick={() => setOpenArticle(art)}
                  >
                    {/* Image */}
                    <div className="h-[210px] overflow-hidden relative">
                      <img 
                        src={art.image} alt={art.title} loading="lazy" 
                        className="block w-full h-full object-cover transition-transform duration-[0.6s] ease-in-out group-hover/card:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-[24px_24px_28px] flex flex-col flex-1">
                      {/* Category + meta */}
                      <div className="flex justify-between items-center mb-3.5">
                        <span 
                          className="py-[3px] px-2.5 border text-[10px] font-bold tracking-[0.2em] uppercase"
                          style={{ background: art.categoryColor + "18", borderColor: `${art.categoryColor}50`, color: art.categoryColor }}
                        >
                          {art.category}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-[12px] transition-colors duration-300">
                          <ClockIcon /> {art.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-playfair text-[clamp(16px,1.5vw,19px)] font-bold text-gray-900 dark:text-gray-100 leading-[1.4] mb-2.5 transition-colors duration-300">
                        {art.title}
                      </h3>

                      {/* Excerpt — 2 lines */}
                      <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-[1.75] flex-1 mb-5 line-clamp-2 transition-colors duration-300">
                        {art.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
                        <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[12px] transition-colors duration-300">
                          <CalendarIcon /> {art.date}
                        </span>
                        <div className="inline-flex items-center gap-1.5 text-brand-gold text-[12px] font-bold tracking-[0.18em] uppercase transition-all duration-300 group-hover/card:gap-3">
                          อ่านต่อ <ArrowIcon size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Empty state */}
            {gridArticles.length === 0 && (
              <div className="text-center py-16 px-5">
                <p className="text-gray-500 dark:text-gray-400 text-[16px] transition-colors duration-300">ยังไม่มีบทความในหมวดนี้</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 · NEWSLETTER
        ═══════════════════════════════════════ */}
        <section className="px-[60px] pb-[112px] transition-colors duration-300">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div 
                className="p-[56px_64px] border border-gray-200 dark:border-gray-800 border-t-[4px] border-t-brand-gold flex flex-wrap gap-12 items-center justify-between transition-all duration-300 bg-[#f9f7f2] dark:bg-brand-darkElevated shadow-[0_8px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
              >
                {/* Copy */}
                <div className="flex-1 min-w-[260px]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-[1px] w-8 bg-brand-gold" />
                    <span className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-bold">Monthly Insights</span>
                  </div>
                  <h2 className="font-playfair text-[clamp(20px,2.5vw,30px)] font-bold text-gray-900 dark:text-gray-100 mb-2.5 leading-[1.3] transition-colors duration-300">
                    Subscribe to Our Monthly Insights
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-[1.75] transition-colors duration-300">
                    รับบทวิเคราะห์เชิงลึกและ Case Study จากประสบการณ์จริงส่งตรงถึง Inbox ทุกเดือน
                  </p>
                </div>

                {/* Form */}
                <div className="flex-1 min-w-[300px] max-w-[440px]">
                  {subscribed ? (
                    <div className="text-center p-5">
                      <div className="w-14 h-14 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center mx-auto mb-4">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-brand-gold"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <p className="text-brand-gold font-bold text-[15px]">สมัครสำเร็จแล้ว! ขอบคุณมาก 🎉</p>
                    </div>
                  ) : (
                    <form onSubmit={e => { e.preventDefault(); setSubscribed(true); }} className="flex gap-0">
                      <input
                        type="email" required placeholder="your@email.com"
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="flex-1 p-[14px_18px] font-thai text-[15px] rounded-sm outline-none transition-all duration-300 bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 border-r-0 focus:border-brand-gold"
                      />
                      <button 
                        type="submit" 
                        className="py-[14px] px-7 bg-brand-gold text-brand-greenDark border-none cursor-pointer font-extrabold text-[13px] tracking-[0.15em] uppercase font-thai whitespace-nowrap transition-all duration-300 hover:bg-brand-goldLight"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                  <p className="text-gray-500 dark:text-gray-500 text-[12px] mt-2.5 transition-colors duration-300">
                    ไม่มีสแปม ยกเลิกได้ทุกเวลา
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}