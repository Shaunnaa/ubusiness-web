"use client"

import React from "react";

/* ─────────────────────────────────────────────
   Footer Component
───────────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Commercial Excellence", href: "/services#commercial" },
      { label: "Financial Integrity", href: "/services#financial" },
      { label: "Internal Audit", href: "/services#audit" },
      { label: "Tax Planning", href: "/services#tax" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ]
  };

  return (
    <footer className="bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-gray-800 font-thai transition-colors duration-300">
      <div className="max-w-[1152px] mx-auto px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col mb-4">
              <span className="font-playfair font-extrabold text-[20px] text-brand-greenDark dark:text-white leading-tight">
                U Business
              </span>
              <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-brand-gold">
                Adviser & Accountancy
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-[200px]">
              Strategic Partner for Profitable Growth. ยกระดับธุรกิจของคุณด้วยมาตรฐานระดับสากล
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-brand-greenDark dark:text-gray-100 mb-4 tracking-wide">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 text-xs hover:text-brand-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-brand-greenDark dark:text-gray-100 mb-4 tracking-wide">
              Expertise
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 text-xs hover:text-brand-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter Area */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-brand-greenDark dark:text-gray-100 mb-4 tracking-wide">
              Office
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4">
              Bangkok, Thailand<br />
              Email: info@aplaccountancy.com<br />
              Tel: +66 (0) 2 XXX XXXX
            </p>
            <div className="flex gap-4">
              {/* Simple Social Placeholder Icons */}
              <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer">
                <span className="text-[10px] font-bold">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer">
                <span className="text-[10px] font-bold">LI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {currentYear} APL Accountancy & U Business Adviser. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className="text-[10px] text-gray-400 hover:text-brand-gold uppercase tracking-widest transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}