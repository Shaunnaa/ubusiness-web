"use server"

import nodemailer from "nodemailer";
import mysql from "mysql2/promise";

export async function submitContactForm(formData: {
  name: string;
  company?: string;
  contact: string;
  subject: string;
  message: string;
}) {
  try {
    // ==========================================
    // Save infomation to Database
    // ==========================================
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const dbQuery = `
      INSERT INTO contacts (name, company, contact_info, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    const dbValues = [
      formData.name, 
      formData.company || "-", 
      formData.contact, 
      formData.subject, 
      formData.message
    ];

    // Save to DB
    await connection.execute(dbQuery, dbValues);
    await connection.end(); // Save finished and close the connection.

    // ==========================================
    // Send email to the inbox
    // ==========================================
    const transporter = nodemailer.createTransport({
      host: "mail.ubusinessadviser.com",
      port: 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Website System" <${process.env.SMTP_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: formData.contact.includes("@") ? formData.contact : undefined,
      subject: `[ลูกค้าใหม่] ${formData.subject} - คุณ ${formData.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #003d2b; padding: 20px; text-align: center;">
            <h2 style="color: #C9A84C; margin: 0;">มีข้อความติดต่อใหม่จากเว็บไซต์</h2>
          </div>
          <div style="padding: 25px; color: #333;">
            <p style="color: green; font-size: 12px;">✅ บันทึกข้อมูลลง Database สำเร็จแล้ว</p>
            <p><strong>ชื่อ:</strong> ${formData.name}</p>
            <p><strong>บริษัท:</strong> ${formData.company || '-'}</p>
            <p><strong>ติดต่อ:</strong> ${formData.contact}</p>
            <p><strong>เรื่อง:</strong> ${formData.subject}</p>
            <hr style="border-top: 1px solid #eee; margin: 15px 0;" />
            <p><strong>ข้อความ:</strong></p>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${formData.message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // Success both database and email
    return { success: true };

  } catch (error) {
    console.error("System Error:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" };
  }
}