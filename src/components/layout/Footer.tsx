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
      // { label: "Insights", href: "/insights" },
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

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const Icons = {
  Facebook: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
};

  return (
    <footer className="bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-gray-800 font-thai transition-colors duration-300">
      <div className="max-w-[1152px] mx-auto px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="group flex items-center gap-2 no-underline">
              <img src= "/logo.png"
                  alt="U Business Adviser & Accountancy Logo" 
                  className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
              />
            </a>
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
            {/* <h4 className="font-playfair font-bold text-sm text-brand-greenDark dark:text-gray-100 mb-4 tracking-wide">
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
            </ul> */}
          </div>

          {/* Contact / Newsletter Area */}
          <div>
            <h4 className="font-playfair font-bold text-sm text-brand-greenDark dark:text-gray-100 mb-4 tracking-wide">
              Office
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4">
              1006/416 ชั้น 1 มาสเตอร์วิว เอ็กเซ็กคิวทีฟ เพลส, ซอยเจริญนคร 34/1<br />
              Email: info@ubusinessadviser.com<br />
              Tel: +66 (0) 2-862-6009
            </p>
            <div className="flex gap-4">
              {/* Social Links */}
              <div className="flex gap-2.5">
                {/* Facebook Link */}
                <a 
                  href="https://https://www.facebook.com/UBusinessAdviser" // UPDATE THIS LINK
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-[3px] hover:shadow-lg bg-[#1877f2]"
                  aria-label="Facebook"
                >
                  <Icons.Facebook />
                </a>

                {/* LINE Official Account Link using SVG */}
                <a 
                  href="https://line.me/ti/p/@944tkzgr" // UPDATE THIS LINK
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-[3px] hover:shadow-lg bg-[#06c755]"
                  aria-label="LINE"
                >
                  <img 
                  src="/line-logo.png"
                  alt="LINE" 
                  className="w-full h-full object-cover"
                />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {currentYear} U Business Adviser & APL Accountancy. All Rights Reserved.
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