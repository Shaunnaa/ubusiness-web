// src/app/services/page.tsx

import type { Metadata } from "next";
import ServicesClient from "../../components/features/services/ServicesClient";

export const metadata: Metadata = {
  title: "บริการของเรา | APL Accountancy & U Business Adviser",
  description: "บริการที่ปรึกษาธุรกิจครบวงจร 3 เสาหลัก: กลยุทธ์การค้าและการจัดจำหน่าย, บัญชีและวางแผนภาษีระดับ TFRS, และระบบตรวจสอบภายใน (Internal Audit) มาตรฐานบริษัทมหาชน",
  keywords: "ที่ปรึกษาธุรกิจ, กลยุทธ์การขาย, รับทำบัญชี, วางแผนภาษี, ตรวจสอบภายใน, Modern Trade, Traditional Trade, Internal Audit, CFO อาชีพ, เตรียมตัว IPO, U Business Adviser, APL Accountancy",
  openGraph: {
    title: "บริการที่ปรึกษาธุรกิจครบวงจร | U Business Adviser",
    description: "ผสานความเชี่ยวชาญด้านกลยุทธ์การตลาดและการเงิน เพื่อสร้างการเติบโตที่มั่นคงและทำกำไรได้จริงสำหรับธุรกิจ SME",
    url: "https://www.ubusinessadviser.com/services",
    siteName: "U Business Adviser",
    images: [
      {
        url: "/logo.png", // แนะนำให้ใช้รูปแบนเนอร์สวยๆ ที่แสดงไอคอนหรือคำอธิบาย 3 เสาหลักบริการของคุณครับ og-services.jpg
        width: 1200,
        height: 630,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}