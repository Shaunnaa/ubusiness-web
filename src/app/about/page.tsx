// src/app/about/page.tsx

import type { Metadata } from "next";
import AboutClient from "../../components/features/about/AboutClient";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | APL Accountancy & U Business Adviser",
  description: "จากรากฐานด้านบัญชีและตรวจสอบที่มั่นคงกว่า 30 ปี สู่การเป็นพันธมิตรที่ปรึกษาธุรกิจเชิงกลยุทธ์แบบครบวงจร เราช่วยยกระดับธุรกิจ SME สู่มาตรฐานบริษัทมหาชน",
  keywords: "ประวัติ APL Accountancy, เกี่ยวกับ U Business Adviser, ประสบการณ์ 30 ปี, ผู้เชี่ยวชาญด้านบัญชี, บริษัทที่ปรึกษาธุรกิจ, มาตรฐาน TFRS",
  openGraph: {
    title: "เกี่ยวกับ APL Accountancy & U Business Adviser | พันธมิตรธุรกิจ 30 ปี",
    description: "จากผู้เชี่ยวชาญด้านบัญชีกว่า 30 ปี สู่พันธมิตรที่ปรึกษาธุรกิจที่ช่วยให้ SME เติบโตอย่างยั่งยืนและทำกำไรได้จริง",
    url: "https://www.ubusinessadviser.com/about",
    siteName: "U Business Adviser",
    images: [
      {
        url: "/logo.png", // แนะนำให้ใช้รูปทีมงานหรือรูปสำนักงานตั้งเป็นปกแชร์ og-about.jpg
        width: 1200,
        height: 630,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}