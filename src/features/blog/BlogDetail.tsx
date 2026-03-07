"use client"

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types & Interfaces
───────────────────────────────────────────── */
interface SectionBlock {
  type: "lead" | "h2" | "h3" | "p" | "checklist" | "insight" | "quote";
  text?: string;
  items?: string[];
  label?: string;
  attribution?: string;
}

interface Article {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  service: string;
  servicePage: string;
  relatedService: string;
  sections: SectionBlock[];
  cta: {
    heading: string;
    body: string;
    button: string;
  };
  prev: { title: string; id: number };
  next: { title: string; id: number };
}

/* ─────────────────────────────────────────────
   Scroll Progress Hook
───────────────────────────────────────────── */
function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  
  return progress;
}

/* ─────────────────────────────────────────────
   Reveal Hook
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
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
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
  Sun: () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Moon: () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  Check: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth="2.5" className="shrink-0 mt-[3px]"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
  Arrow: ({ dir = "right" }: { dir?: "right" | "left" }) => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>,
  LinkedIn: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  Facebook: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  Line: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.1 2 11.1c0 3.44 2.21 6.46 5.55 8.17-.24.88-.88 3.18-.97 3.55-.12.47.17.46.35.34.14-.09 2.24-1.52 3.14-2.14.63.09 1.28.14 1.93.14 5.52 0 10-4.1 10-9.06C22 6.1 17.52 2 12 2z"/></svg>,
  Clock: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/></svg>,
  Calendar: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  User: () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/></svg>,
  Lightbulb: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6m-6-3h6m-3-3V9m0 0a4 4 0 100-8 4 4 0 000 8z"/></svg>,
  Quote: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.25"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>,
};

/* ─────────────────────────────────────────────
   Article Data
───────────────────────────────────────────── */
const ARTICLES: Article[] = [
  {
    id: 1,
    category: "Commercial Strategy",
    categoryColor: "#C9A84C",
    title: "3 กลยุทธ์ปั้นแบรนด์ SME บุก Modern Trade ให้ได้ผลจริงใน 90 วัน",
    subtitle: "จากประสบการณ์ช่วยแบรนด์หลายสิบรายเข้า Retailer ชั้นนำ เราสรุป 3 สิ่งที่ต้องทำก่อนวันที่จะเดินเข้าไปคุย Buyer",
    date: "10 มิ.ย. 2568",
    author: "U Business Adviser Team",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    service: "Commercial Strategy",
    servicePage: "#commercial",
    relatedService: "Commercial & Distribution Strategy",
    sections: [
      {
        type: "lead",
        text: "การเข้าสู่ Modern Trade ไม่ใช่แค่การได้ Listing — มันคือการเริ่มต้นสงครามที่คุณต้องพร้อมทั้งงบ กลยุทธ์ และระบบปฏิบัติการตั้งแต่วันแรก จากการช่วยแบรนด์ SME กว่า 50 รายเจาะตลาด Retailer (Modern Trade) ชั้นนำ เราพบว่า 80% ของความล้มเหลวเกิดจาก 3 ข้อผิดพลาดเดิมซ้ำๆ",
      },
      { type: "h2", text: "1. รู้ต้นทุนจริงก่อนตั้งราคาขาย" },
      {
        type: "p",
        text: "ผู้ประกอบการหลายรายตั้งราคาขายให้ Modern Trade โดยไม่ได้คำนวณ Total Cost of Trade อย่างละเอียด ซึ่งประกอบด้วยค่า Listing Fee, ค่า Promotion Budget, ค่า Rebate, ค่าใช้จ่ายอื่นๆใน Trade Term, ค่า Wastage และ Logistics Cost ที่แอบซ่อนอยู่ การคำนวณผิดพลาดเพียง 5-8% ของ Margin อาจทำให้ธุรกิจขาดทุนทั้งๆ ที่ยอดขายสูง",
      },
      {
        type: "checklist",
        items: [
          "คำนวณ Gross Margin หลังหักค่าใช้จ่าย Trade ทั้งหมด",
          "เปรียบเทียบ Margin ต่อ SKU ก่อนตัดสินใจว่าสินค้าไหนควรเข้า",
          "วางแผน Break-even Point ว่าต้องขายกี่ชิ้นต่อเดือน",
          "กันสำรอง Working Capital สำหรับ Credit Term 30-60 วัน",
        ],
      },
      {
        type: "insight",
        label: "Key Insight",
        text: "แบรนด์ที่ประสบความสำเร็จใน Modern Trade มักเริ่มจากการเข้าวางขายใน Account ที่เลือกแล้วว่าใช่ และสาขาพื้นที่นำร่องก่อน ไม่ใช่การ Roll-out ทันที 20,000+ สาขา การเรียนรู้จาก Pilot Store ช่วยประหยัดค่าใช้จ่ายได้มหาศาล",
      },
      { type: "h2", text: "2. เข้าใจ Buyer Mindset และ Category Management" },
      {
        type: "p",
        text: "Buyer ของ Modern Trade ไม่ได้มองหาสินค้าที่ดีที่สุด — เขามองหาสินค้าที่จะสร้าง Category Growth ให้ร้านของเขา การนำเสนอที่ดีต้องบอกได้ว่าสินค้าของคุณจะเพิ่ม Basket Size หรือดึง Shopper กลุ่มใหม่เข้ามาในร้าน",
      },
      { type: "h3", text: "การเตรียม Selling Story ที่ใช่" },
      {
        type: "p",
        text: "Selling Story ที่ดีต้องประกอบด้วย Market Insight ที่ชัดเจน, Consumer Demand Data ที่น่าเชื่อถือ, และ Sales Track Record จากช่องทางอื่นก่อน เช่น Online หรือ Traditional Trade เพื่อพิสูจน์ว่าสินค้ามี Demand จริง",
      },
      {
        type: "quote",
        text: "Retailers don't buy products — they buy profit per square meter.",
        attribution: "U Business Adviser, จากการ Workshop กับทีม Buyer",
      },
      { type: "h2", text: "3. สร้างระบบ In-store Execution ก่อนเปิดตัว" },
      {
        type: "p",
        text: "การได้ Listing เป็นแค่ก้าวแรก ความสำเร็จที่แท้จริงอยู่ที่ In-store Execution ซึ่งได้แก่ การจัดวาง Shelf Position, Planogram Management, OSA (On-Shelf Availability) และการทำ Promotion ที่ตรงกลุ่มเป้าหมาย",
      },
      {
        type: "checklist",
        items: [
          "ออกแบบ Planogram มาตรฐาน (Guideline) สำหรับทุก Store Format",
          "วางระบบ Replenishment ที่ป้องกัน Out-of-Stock",
          "ฝึก Field Sales Team ในการทำ In-store Audit",
          "ตั้ง KPI ที่วัดผล In-store Execution ได้จริง",
        ],
      },
    ],
    cta: {
      heading: "พร้อมพาแบรนด์ของคุณเข้า Modern Trade?",
      body: "หากท่านต้องการยกระดับธุรกิจด้วยผู้เชี่ยวชาญด้าน Commercial Strategy ที่มีประสบการณ์จริงกว่า 30 ปี ทีมของเราพร้อมช่วยวางกลยุทธ์ที่เหมาะกับธุรกิจคุณโดยเฉพาะ",
      button: "ดูบริการ Commercial Strategy",
    },
    prev: { title: "Financial Health Check: 5 ตัวชี้วัดสำคัญ", id: 3 },
    next: { title: "Internal Audit: Your First Line of Defence", id: 2 },
  },
  {
    id: 2,
    category: "Accounting & Tax",
    categoryColor: "#2a9d8f",
    title: "วางแผนภาษีนิติบุคคลอย่างมืออาชีพ: ลดภาระภาษีได้จริงโดยไม่เสี่ยง",
    subtitle: "เปิดเผยทุกช่องทางที่ถูกกฎหมายสำหรับการลดภาระภาษีนิติบุคคล จากผู้เชี่ยวชาญที่ได้รับความไว้วางใจมากว่า 30 ปี",
    date: "22 พ.ค. 2568",
    author: "APL Accountancy Expert Team",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    service: "Accounting & Tax",
    servicePage: "#accounting",
    relatedService: "Strategic Accounting & Tax Solutions",
    sections: [
      {
        type: "lead",
        text: "การวางแผนภาษีที่ดีไม่ใช่การหลีกเลี่ยงภาษี แต่คือการใช้กฎหมายที่มีอยู่ให้เต็มประสิทธิภาพ นักธุรกิจหลายคนจ่ายภาษีมากเกินความจำเป็น เพราะไม่รู้ว่ามีสิทธิ์ที่กฎหมายให้ไว้มากแค่ไหน",
      },
      { type: "h2", text: "ค่าใช้จ่ายที่หักได้ 2 เท่า: โอกาสที่หลายคนมองข้าม" },
      {
        type: "p",
        text: "ประมวลรัษฎากรกำหนดให้ค่าใช้จ่ายบางประเภทสามารถหักได้มากกว่า 1 เท่า ซึ่งเป็นโอกาสสำคัญที่ SME หลายรายไม่ได้ใช้ประโยชน์ ทั้งค่าฝึกอบรมพนักงาน ค่าวิจัยพัฒนา และค่าลงทุนในระบบ IT ที่ได้รับการส่งเสริม",
      },
      {
        type: "checklist",
        items: [
          "ค่าฝึกอบรมและพัฒนาพนักงาน — หักได้ 200%",
          "ค่าใช้จ่ายวิจัยและพัฒนา — หักได้ 200-300%",
          "ค่าลงทุนระบบ ERP ที่ได้รับการอนุมัติ — หักได้ 200%",
          "เงินบริจาคเพื่อการศึกษาที่ได้รับการรับรอง — หักได้ 200%",
        ],
      },
      {
        type: "insight",
        label: "Key Insight",
        text: "บริษัทที่มีค่าใช้จ่ายฝึกอบรมปีละ 1 ล้านบาท สามารถหักภาษีได้เป็น 2 ล้านบาท ประหยัดภาษีได้สูงสุด 400,000 บาทต่อปี (อัตราภาษี 20%)",
      },
      { type: "h2", text: "การวางโครงสร้างธุรกิจที่ถูกต้อง" },
      {
        type: "p",
        text: "โครงสร้างนิติบุคคลที่เหมาะสมสามารถลดภาระภาษีรวมได้อย่างมีนัยสำคัญ ทั้งการแบ่งรายได้ระหว่างนิติบุคคล การจัดโครงสร้าง Holding Company และการบริหาร Transfer Pricing ระหว่างบริษัทในกลุ่ม ล้วนมีผลต่อภาระภาษีโดยรวม",
      },
      { type: "h3", text: "ข้อควรระวังในการวางแผนโครงสร้าง" },
      {
        type: "p",
        text: "การวางโครงสร้างธุรกิจต้องทำด้วยความระมัดระวังและต้องมี Business Substance ที่แท้จริง การตั้งบริษัทเพื่อจุดประสงค์ทางภาษีเพียงอย่างเดียวโดยไม่มีการดำเนินธุรกิจจริง อาจถูกกรมสรรพากรตีความว่าเป็นการหลีกเลี่ยงภาษี",
      },
      {
        type: "quote",
        text: "Good tax planning is not about paying zero tax — it's about paying exactly what the law requires, nothing more.",
        attribution: "APL Accountancy, จากประสบการณ์ 30+ ปี",
      },
      { type: "h2", text: "กำหนดการยื่นภาษีที่ต้องจำ" },
      {
        type: "checklist",
        items: [
          "ภ.ง.ด. 50 — ภายใน 150 วันหลังสิ้นรอบบัญชี",
          "ภ.ง.ด. 51 — ครึ่งปีแรก ภายใน 2 เดือนหลังครึ่งรอบบัญชี",
          "ภ.พ. 30 — ภาษีมูลค่าเพิ่มรายเดือน ภายในวันที่ 15",
          "ภ.ง.ด. 1, 3, 53 — หัก ณ ที่จ่ายรายเดือน ภายในวันที่ 7",
        ],
      },
    ],
    cta: {
      heading: "ต้องการผู้เชี่ยวชาญด้านบัญชีและภาษีที่ไว้วางใจได้?",
      body: "หากท่านต้องการยกระดับธุรกิจด้วยผู้เชี่ยวชาญด้าน Accounting & Tax จาก APL Accountancy ที่มีประสบการณ์กว่า 30 ปี ทีมของเราพร้อมให้คำปรึกษาฟรีและวางแผนภาษีที่เหมาะสมที่สุดสำหรับธุรกิจของคุณ",
      button: "ดูบริการบัญชีและภาษี",
    },
    prev: { title: "3 กลยุทธ์ปั้นแบรนด์ SME บุก Modern Trade", id: 1 },
    next: { title: "Internal Audit: First Line of Defence", id: 3 },
  },
  {
    id: 3,
    category: "Internal Audit",
    categoryColor: "#2d6a4f",
    title: "Internal Audit ที่แท้จริง: สร้างระบบป้องกันความเสี่ยงก่อนที่จะสาย",
    subtitle: "ทำไม Internal Audit จึงไม่ใช่ต้นทุน แต่คือการลงทุนที่ให้ผลตอบแทนสูงที่สุดสำหรับธุรกิจที่ต้องการเติบโตอย่างยั่งยืน",
    date: "5 พ.ค. 2568",
    author: "U Business Adviser Team",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
    service: "Internal Audit",
    servicePage: "#audit",
    relatedService: "Internal Audit & Corporate Systems",
    sections: [
      {
        type: "lead",
        text: "ในทุกๆ 10 บริษัทที่ประสบวิกฤตทางการเงิน 7 บริษัทมีสัญญาณเตือนที่มองเห็นได้ล่วงหน้าก่อน 12-24 เดือน แต่ไม่มีระบบที่จะตรวจจับสัญญาณเหล่านั้นได้ทันเวลา Internal Audit คือระบบตรวจจับนั้น",
      },
      { type: "h2", text: "Internal Audit ไม่ใช่การหาความผิด" },
      {
        type: "p",
        text: "ความเข้าใจผิดที่พบบ่อยที่สุดเกี่ยวกับ Internal Audit คือการมองว่ามันเป็นการ 'ตรวจจับคนผิด' ซึ่งสร้างบรรยากาศการทำงานที่ตึงเครียดและทำให้พนักงานต่อต้าน ในความเป็นจริง Internal Audit ที่ดีคือ 'ระบบสุขภาพองค์กร' ที่ช่วยระบุจุดอ่อนและสร้างการปรับปรุง",
      },
      {
        type: "checklist",
        items: [
          "ประเมินประสิทธิภาพของระบบควบคุมภายใน",
          "ระบุความเสี่ยงที่อาจส่งผลต่อการดำเนินงาน",
          "เสนอแนวทางปรับปรุงที่ปฏิบัติได้จริง",
          "ติดตามการนำมาตรการแก้ไขไปปฏิบัติ",
        ],
      },
      {
        type: "insight",
        label: "Key Insight",
        text: "การลงทุนใน Internal Audit 1 บาท สามารถป้องกันความเสียหายที่อาจเกิดขึ้นได้ 5-10 บาท จากการศึกษาของ Institute of Internal Auditors พบว่าองค์กรที่มี Internal Audit ที่แข็งแกร่งมีอัตราการเติบโตสูงกว่าคู่แข่งถึง 23%",
      },
      { type: "h2", text: "5 พื้นที่ที่ Internal Audit ต้องตรวจสอบทุกปี" },
      {
        type: "p",
        text: "การวางแผน Internal Audit ที่ดีต้องครอบคลุมความเสี่ยงหลักขององค์กร ซึ่งในแต่ละปีควรมีการประเมิน Risk Universe และจัดลำดับความสำคัญของพื้นที่ที่จะตรวจสอบตามระดับความเสี่ยง",
      },
      { type: "h3", text: "พื้นที่ความเสี่ยงสูงที่ไม่ควรมองข้าม" },
      {
        type: "checklist",
        items: [
          "การบริหารเงินสดและการป้องกันการทุจริต",
          "ระบบการซื้อและการจ่ายเงิน (Procure-to-Pay)",
          "การบริหาร Inventory และทรัพย์สินองค์กร",
          "ระบบ IT Security และการปกป้องข้อมูล",
          "การปฏิบัติตามกฎหมายและข้อกำหนดที่เกี่ยวข้อง",
        ],
      },
      {
        type: "quote",
        text: "The best time to implement internal audit was when you started your business. The second best time is now.",
        attribution: "U Business Adviser, จากประสบการณ์กับลูกค้า Pre-IPO",
      },
      { type: "h2", text: "เส้นทางสู่มาตรฐาน PCL สำหรับ SME" },
      {
        type: "p",
        text: "บริษัทที่ต้องการ IPO หรือระดมทุนจากนักลงทุนสถาบัน จำเป็นต้องมีระบบควบคุมภายในที่ได้มาตรฐานบริษัทจดทะเบียน การเตรียมตัวล่วงหน้า 2-3 ปีจะทำให้กระบวนการราบรื่นและลดค่าใช้จ่ายในการ IPO ได้อย่างมีนัยสำคัญ",
      },
    ],
    cta: {
      heading: "พร้อมสร้างระบบควบคุมที่แข็งแกร่งให้ธุรกิจของคุณ?",
      body: "หากท่านต้องการยกระดับธุรกิจด้วยผู้เชี่ยวชาญด้าน Internal Audit และ Corporate Governance ที่มีประสบการณ์จริงในการเตรียม Pre-IPO และยกระดับมาตรฐาน PCL",
      button: "ดูบริการ Internal Audit",
    },
    prev: { title: "วางแผนภาษีนิติบุคคลอย่างมืออาชีพ", id: 2 },
    next: { title: "3 กลยุทธ์ปั้นแบรนด์ SME บุก Modern Trade", id: 1 },
  },
];

/* ─────────────────────────────────────────────
   ARTICLE DETAIL COMPONENT
───────────────────────────────────────────── */
interface ArticleDetailProps {
  article: Article;
  dark: boolean;
}

function ArticleDetail({ article, dark }: ArticleDetailProps) {
  const progress = useScrollProgress();
  const [shareToast, setShareToast] = useState("");
  const [stickyShare, setStickyShare] = useState(false);

  useEffect(() => {
    const handleScroll = () => setStickyShare(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => { 
    setShareToast(msg); 
    setTimeout(() => setShareToast(""), 2200); 
  };
  
  const handleCopy = () => { 
    navigator.clipboard?.writeText(window.location.href).catch(() => {}); 
    showToast("คัดลอก Link แล้ว!"); 
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-heading)] font-['IBM_Plex_Sans_Thai',sans-serif] transition-colors duration-300 overflow-x-hidden">
      
      {/* ── Progress Bar ── */}
      <div 
        className="fixed top-0 left-0 z-[1000] h-[3px] bg-gradient-to-r from-[#004d40] to-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%` }} 
      />

      {/* ── Sticky Social Share ── */}
      <div 
        className={`fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-2.5 transition-opacity duration-400 ease-in-out ${stickyShare ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {[
          { icon: <Icons.LinkedIn />, bg: "#0077b5", label: "LinkedIn" },
          { icon: <Icons.Facebook />, bg: "#1877f2", label: "Facebook" },
          { icon: <Icons.Line />, bg: "#06c755", label: "LINE" },
          { icon: null, bg: dark ? "#2a3d33" : "#eee", label: "Link", action: handleCopy },
        ].map((s, i) => (
          <button 
            key={i} title={s.label} onClick={s.action}
            className="w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-250 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
            style={{ 
              background: s.bg, 
              color: s.label === "Link" ? (dark ? "#C9A84C" : "#333") : "white",
              fontSize: s.label === "Link" ? 13 : 16, fontWeight: 700 
            }}
          >
            {s.icon || "🔗"}
          </button>
        ))}
      </div>

      {/* ── Toast ── */}
      {shareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-[#C9A84C] text-[#001a10] py-3 px-7 font-bold text-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] animate-[fadeSlideUp_0.3s_ease]">
          {shareToast}
        </div>
      )}

      {/* ═══════════════════════════════════════
          SECTION 1 · ARTICLE HEADER
      ═══════════════════════════════════════ */}
      <header className="max-w-[800px] mx-auto pt-20 px-6 pb-10">
        <Reveal>
          {/* Category Badge */}
          <div className="mb-5">
            <span 
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full text-[12px] font-bold tracking-[0.18em] uppercase border"
              style={{ background: `${article.categoryColor}18`, borderColor: `${article.categoryColor}50`, color: article.categoryColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full block" style={{ background: article.categoryColor }} />
              {article.category}
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="font-['Playfair_Display',serif] text-[clamp(28px,4.5vw,52px)] font-extrabold leading-[1.18] text-[var(--text-heading)] mb-4.5 transition-colors duration-300">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[18px] leading-[1.75] text-[var(--text-body)] mb-7 transition-colors duration-300">
            {article.subtitle}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-5 pt-5 border-t border-[var(--border)] transition-colors duration-300">
            {[
              { icon: <Icons.Calendar />, text: article.date },
              { icon: <Icons.User />, text: article.author },
              { icon: <Icons.Clock />, text: article.readTime },
            ].map((m, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[var(--text-muted)] text-[13px] transition-colors duration-300">
                {m.icon} {m.text}
              </span>
            ))}
          </div>
        </Reveal>
      </header>

      {/* ═══════════════════════════════════════
          SECTION 2 · HERO IMAGE
      ═══════════════════════════════════════ */}
      <Reveal className="max-w-[1100px] mx-auto px-6 pb-16">
        <div 
          className="relative rounded-sm overflow-hidden transition-shadow duration-300"
          style={{ boxShadow: dark ? "0 16px 64px rgba(0,0,0,0.6)" : "0 16px 64px rgba(0,0,0,0.12)" }}
        >
          <img
            src={article.image} alt={article.title} loading="lazy"
            className="w-full h-[clamp(260px,40vw,500px)] object-cover block"
          />
          {dark && <div className="absolute inset-0 bg-black/35 pointer-events-none" />}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#004d40] to-[#C9A84C]" />
        </div>
      </Reveal>

      {/* ═══════════════════════════════════════
          SECTION 3 · ARTICLE BODY
      ═══════════════════════════════════════ */}
      <article className="max-w-[800px] mx-auto px-6 pb-20">
        {article.sections.map((block, i) => {
          if (block.type === "lead") return (
            <Reveal key={i} delay={0.05}>
              <p className="text-[19px] leading-[1.85] text-[var(--text-body)] italic mb-10 pl-6 border-l-[4px] border-[#C9A84C] transition-colors duration-300">
                {block.text}
              </p>
            </Reveal>
          );

          if (block.type === "h2") return (
            <Reveal key={i} delay={0.05}>
              <h2 
                className="font-['Playfair_Display',serif] text-[clamp(20px,2.5vw,28px)] font-bold leading-[1.3] mt-[52px] mb-[18px] transition-colors duration-300"
                style={{ color: dark ? "#5ee7c4" : "#004d40" }}
              >
                {block.text}
              </h2>
            </Reveal>
          );

          if (block.type === "h3") return (
            <Reveal key={i} delay={0.05}>
              <h3 
                className="text-[clamp(17px,2vw,21px)] font-bold leading-[1.4] mt-8 mb-3.5 transition-colors duration-300"
                style={{ color: dark ? "#C9A84C" : "#333" }}
              >
                {block.text}
              </h3>
            </Reveal>
          );

          if (block.type === "p") return (
            <Reveal key={i} delay={0.05}>
              <p className="text-[18px] leading-[1.85] text-[var(--text-body)] mb-6 transition-colors duration-300">
                {block.text}
              </p>
            </Reveal>
          );

          if (block.type === "checklist") return (
            <Reveal key={i} delay={0.05}>
              <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-3">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[17px] leading-[1.7] text-[var(--text-body)] transition-colors duration-300">
                    <Icons.Check /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );

          if (block.type === "insight") return (
            <Reveal key={i} delay={0.05}>
              <div 
                className="my-10 p-7 md:p-8 rounded-sm relative border-l-[5px] border-l-[#C9A84C] transition-colors duration-300"
                style={{
                  background: dark ? "#0d1f18" : "#f0faf5",
                  borderTop: `1px solid ${dark ? "#1a3d28" : "#c0e8d0"}`,
                  borderRight: `1px solid ${dark ? "#1a3d28" : "#c0e8d0"}`,
                  borderBottom: `1px solid ${dark ? "#1a3d28" : "#c0e8d0"}`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#C9A84C]"><Icons.Lightbulb /></span>
                  <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#C9A84C]">
                    {block.label}
                  </span>
                </div>
                <p 
                  className="text-[16px] leading-[1.85] font-medium transition-colors duration-300"
                  style={{ color: dark ? "#b8dac8" : "#1a3d28" }}
                >
                  {block.text}
                </p>
              </div>
            </Reveal>
          );

          if (block.type === "quote") return (
            <Reveal key={i} delay={0.05}>
              <blockquote 
                className="my-11 p-8 md:p-10 relative transition-colors duration-300 border border-[var(--border)]"
                style={{ background: dark ? "#1a1a1a" : "#fafaf8" }}
              >
                <div className="absolute top-4 left-6 text-[#C9A84C]"><Icons.Quote /></div>
                <p className="font-['Playfair_Display',serif] text-[clamp(17px,2vw,22px)] italic leading-[1.7] text-[var(--text-heading)] pl-5 mb-4 transition-colors duration-300">
                  {block.text}
                </p>
                <cite className="text-[13px] text-[var(--text-muted)] not-italic pl-5 block transition-colors duration-300">
                  — {block.attribution}
                </cite>
              </blockquote>
            </Reveal>
          );

          return null;
        })}

        {/* ─── Inline Share Row ─── */}
        <Reveal>
          <div className="pt-12 mt-12 border-t border-[var(--border)] flex flex-wrap gap-2.5 items-center transition-colors duration-300">
            <span className="text-[var(--text-muted)] text-[13px] font-semibold mr-1.5 transition-colors duration-300">
              แชร์บทความ:
            </span>
            {[
              { label: "LinkedIn", bg: "#0077b5", color: "white" },
              { label: "Facebook", bg: "#1877f2", color: "white" },
              { label: "LINE", bg: "#06c755", color: "white" },
              { label: "Copy Link", bg: dark ? "#2a3d33" : "#f0f0f0", color: dark ? "#C9A84C" : "#333", action: handleCopy },
            ].map((s, i) => (
              <button 
                key={i} onClick={s.action}
                className="py-2 px-4.5 border-none cursor-pointer text-[13px] font-semibold font-['IBM_Plex_Sans_Thai',sans-serif] transition-opacity duration-300 hover:opacity-85 rounded-sm"
                style={{ background: s.bg, color: s.color }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>
      </article>

      {/* ═══════════════════════════════════════
          SECTION 4 · CTA BOX
      ═══════════════════════════════════════ */}
      <Reveal className="max-w-[800px] mx-auto px-6 pb-20">
        <div 
          className="p-10 md:p-11 border-l-[5px] border-[#C9A84C] relative overflow-hidden transition-colors duration-300 rounded-sm"
          style={{ background: dark ? "#0a1f16" : "#004d40" }}
        >
          {/* Decorative ring */}
          <div className="absolute -right-15 -top-15 w-[220px] h-[220px] rounded-full border-2 border-[#C9A84C]/10 pointer-events-none" />

          <span className="inline-block py-1 px-3.5 bg-[#C9A84C]/15 border border-[#C9A84C]/35 text-[#C9A84C] text-[11px] font-bold tracking-[0.2em] uppercase mb-5 rounded-sm">
            {article.relatedService}
          </span>
          <h2 className="font-['Playfair_Display',serif] text-white text-[clamp(20px,2.5vw,30px)] font-bold mb-4 leading-[1.3]">
            {article.cta.heading}
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.85] mb-8 max-w-[600px]">
            {article.cta.body}
          </p>
          <a 
            href={article.servicePage} 
            className="inline-flex items-center gap-2.5 py-[15px] px-9 bg-[#C9A84C] text-[#001a10] font-extrabold text-[13px] tracking-[0.18em] uppercase no-underline transition-all duration-300 hover:bg-[#d4b050] hover:gap-4 rounded-sm"
          >
            {article.cta.button} <Icons.Arrow />
          </a>
        </div>
      </Reveal>

      {/* ═══════════════════════════════════════
          SECTION 5 · PREV / NEXT NAV
      ═══════════════════════════════════════ */}
      <Reveal className="max-w-[800px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Prev */}
          <div 
            className="p-6 bg-[var(--bg-card)] border border-[var(--border)] cursor-pointer transition-all duration-300 hover:border-[#C9A84C80] hover:-translate-x-1 rounded-sm group"
          >
            <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] tracking-[0.2em] uppercase mb-2 transition-colors duration-300">
              <Icons.Arrow dir="left" /> Previous
            </div>
            <p className="text-[var(--text-heading)] text-[14px] font-semibold leading-[1.45] transition-colors duration-300 group-hover:text-[#C9A84C]">
              {article.prev.title}
            </p>
          </div>

          {/* Next */}
          <div 
            className="p-6 text-right bg-[var(--bg-card)] border border-[var(--border)] cursor-pointer transition-all duration-300 hover:border-[#C9A84C80] hover:translate-x-1 rounded-sm group"
          >
            <div className="flex items-center justify-end gap-1.5 text-[var(--text-muted)] text-[11px] tracking-[0.2em] uppercase mb-2 transition-colors duration-300">
              Next <Icons.Arrow />
            </div>
            <p className="text-[var(--text-heading)] text-[14px] font-semibold leading-[1.45] transition-colors duration-300 group-hover:text-[#C9A84C]">
              {article.next.title}
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  );
}

/* ─────────────────────────────────────────────
   APP SHELL
───────────────────────────────────────────── */
export default function BlogDetailApp() {
  const [dark, setDark] = useState(false);
  const [activeArticle, setActiveArticle] = useState(0);

  const themeVars = {
    "--bg":           dark ? "#121212" : "#ffffff",
    "--bg-card":      dark ? "#1e1e1e" : "#f9f9f9",
    "--text-heading": dark ? "#e0e0e0" : "#1a1a1a",
    "--text-body":    dark ? "#8fa898" : "#4b5563",
    "--text-muted":   dark ? "#4d6b58" : "#9ca3af",
    "--border":       dark ? "#2a2a2a" : "#e5e7eb",
  } as React.CSSProperties;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Dark mode toggle */}
      <button 
        className="fixed top-5 right-5 z-[1001] w-[46px] h-[46px] rounded-full border-2 border-[#C9A84C] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md text-[#C9A84C] hover:scale-110 hover:rotate-[15deg] hover:shadow-[0_0_24px_rgba(201,168,76,0.5)]"
        onClick={() => setDark(d => !d)}
        style={{ background: dark ? "rgba(20,20,20,0.9)" : "rgba(0,0,0,0.55)" }}
      >
        {dark ? <Icons.Sun /> : <Icons.Moon />}
      </button>

      <div style={themeVars} className="bg-[var(--bg)] transition-colors duration-300">
        {/* Article switcher bar */}
        <div 
          className="sticky top-0 z-[200] py-3 px-8 flex items-center gap-3 flex-wrap transition-colors duration-300 border-b"
          style={{
            background: dark ? "#0a0a0a" : "#ffffff",
            borderColor: "var(--border)",
            boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.6)" : "0 2px 16px rgba(0,0,0,0.06)",
          }}
        >
          <span className="text-[var(--text-muted)] text-[11px] tracking-[0.2em] uppercase font-semibold mr-1 transition-colors duration-300">
            Article:
          </span>
          {ARTICLES.map((art, i) => (
            <button 
              key={art.id} 
              onClick={() => setActiveArticle(i)}
              className="py-2.5 px-5 font-['IBM_Plex_Sans_Thai',sans-serif] text-[12px] font-semibold tracking-[0.08em] rounded-sm cursor-pointer border transition-all duration-300"
              style={{
                background: activeArticle === i ? "#C9A84C" : "transparent",
                color: activeArticle === i ? "#001a10" : "var(--text-muted)",
                borderColor: activeArticle === i ? "#C9A84C" : "var(--border)",
              }}
            >
              {art.category}
            </button>
          ))}
        </div>

        <ArticleDetail
          article={ARTICLES[activeArticle]}
          dark={dark}
        />
      </div>
    </>
  );
}