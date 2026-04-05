// src/app/insights/page.tsx

import type { Metadata } from "next";
import InsightsClient from "../../components/features/insights/InsightsClient";

export const metadata: Metadata = {
  title: "บทความและแนวคิดธุรกิจ | U Business Adviser & APL Accountancy",
  description: "อัปเดตบทวิเคราะห์และกลยุทธ์ทางธุรกิจจากประสบการณ์กว่า 30 ปี อ่านเคล็ดลับการเพิ่มกำไร วางแผนภาษี และระบบควบคุมภายใน สำหรับผู้ประกอบการ SME",
  keywords: "บทความธุรกิจ, ความรู้ SME, ข่าวธุรกิจ, วางแผนภาษี, กลยุทธ์การค้า, Internal Audit, U Business Adviser",
  openGraph: {
    title: "Knowledge Hub - บทความและแนวคิดธุรกิจ | U Business Adviser",
    description: "อ่านบทความเจาะลึกด้านกลยุทธ์การค้าและบัญชีภาษี ที่จะช่วยยกระดับธุรกิจของคุณให้เติบโตอย่างยั่งยืน",
    url: "https://www.ubusinessadviser.com/insights",
    siteName: "U Business Adviser",
    images: [
      {
        url: "/logo.png", // แนะนำให้ทำรูปแบนเนอร์สวยๆ เขียนว่า Knowledge Hub หรือ Blog og-insights.jpg
        width: 1200,
        height: 630,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function InsightsPage() {
  return <InsightsClient />;
}