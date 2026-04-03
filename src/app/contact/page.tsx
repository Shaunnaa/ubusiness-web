// src/app/contact/page.tsx

import type { Metadata } from "next";
import ContactClient from "../../components/features/contact/ContactClient";

export const metadata: Metadata = {
  title: "ติดต่อเรา | APL Accountancy & U Business Adviser",
  description: "นัดหมายหรือปรึกษาผู้เชี่ยวชาญด้านบัญชี กลยุทธ์การค้า และตรวจสอบภายใน ฟรี ไม่มีข้อผูกมัด ติดต่อ U Business Adviser วันนี้ ทีมงานพร้อมตอบกลับภายใน 24 ชั่วโมง",
  keywords: "ติดต่อ U Business Adviser, เบอร์โทร APL Accountancy, ปรึกษาธุรกิจฟรี, สำนักงานบัญชี เจริญนคร, บริษัทที่ปรึกษาธุรกิจ",
  openGraph: {
    title: "ติดต่อเรา | APL Accountancy & U Business Adviser",
    description: "รับคำปรึกษาด้านธุรกิจและการเงินเบื้องต้นฟรี โดยทีมผู้เชี่ยวชาญประสบการณ์กว่า 30 ปี",
    url: "https://www.ubusinessadviser.com/contact",
    siteName: "U Business Adviser",
    images: [
      {
        url: "/logo.png", // แนะนำให้ใช้รูปแผนที่บริษัท หรือรูปหน้าตึกสวยๆ เป็นปกแชร์ครับ og-contact.jpg
        width: 1200,
        height: 630,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}