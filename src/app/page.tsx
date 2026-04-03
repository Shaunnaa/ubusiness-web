// src/app/page.tsx

import type { Metadata } from "next";
import HomeClient from "../components/features/home/HomeClient"; 

export const metadata: Metadata = {
  title: "APL Accountancy & U Business Adviser | ที่ปรึกษาธุรกิจและบัญชี",
  description: "พันธมิตรเชิงกลยุทธ์เพื่อการเติบโตอย่างยั่งยืน บริการวางแผนกลยุทธ์การค้า ตรวจสอบภายใน และบัญชีภาษี ด้วยประสบการณ์กว่า 30 ปี มาตรฐานบริษัทมหาชน",
  keywords: "ที่ปรึกษาธุรกิจ, Modern Trade, Traditional Trade, วางแผนภาษี, ตรวจสอบภายใน, กลยุทธ์การค้า, รับทำบัญชี, SME, U Business Adviser, APL Accountancy",
  openGraph: {
    title: "APL Accountancy & U Business Adviser | ที่ปรึกษาธุรกิจ",
    description: "ยกระดับธุรกิจของคุณด้วยมาตรฐานระดับสากล ปรึกษาฟรี",
    url: "https://www.ubusinessadviser.com",
    siteName: "U Business Adviser",
    images: [
      {
        url: "/logo.png", // เตรียมรูปขนาด 1200x630px ตั้งชื่อ og-image.jpg ไว้ในโฟลเดอร์ public ด้วยนะครับ
        width: 1200,
        height: 630,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}

