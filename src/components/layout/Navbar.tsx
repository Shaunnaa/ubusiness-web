"use client"

import React, { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   Navigation Data
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  // { label: "Insights", href: "/insights" },
];

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const MenuIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ─────────────────────────────────────────────
   Navbar Component
───────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 font-thai ${
          isScrolled
            ? "bg-white/95 dark:bg-brand-dark/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] py-4"
            : "bg-brand-green/50 py-4 md:py-6 dark:bg-brand-greenDark/50"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Brand / Logo */}
          <a href="/" className="group flex items-center gap-2 no-underline">
            <img src= "/logo.png"
                 alt="U Business Adviser & Accountancy Logo" 
                 className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-300 hover:text-brand-gold ${
                  isScrolled ? "text-gray-600 dark:text-gray-300" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="/contact"
              className={`ml-2 px-6 py-2.5 text-[12px] font-extrabold tracking-[0.15em] uppercase transition-all duration-300 border-2 ${
                isScrolled
                  ? "bg-brand-gold border-brand-gold text-brand-greenDark hover:bg-brand-goldLight hover:border-brand-goldLight"
                  : "bg-transparent border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-greenDark"
              }`}
            >
              Contact Us
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? "text-gray-900 dark:text-white" : "text-white"
            }`}
            aria-label="Open Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white dark:bg-brand-darkElevated shadow-2xl z-[102] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
          <span className="font-playfair font-extrabold text-[20px] text-brand-greenDark dark:text-white">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-brand-gold transition-colors"
            aria-label="Close Menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-6 gap-6 font-thai">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[16px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide hover:text-brand-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Sidebar Footer / CTA */}
        <div className="mt-auto p-6">
          <a
            href="/contact"
            className="flex justify-center items-center w-full py-4 bg-brand-gold text-brand-greenDark font-extrabold text-[13px] tracking-[0.2em] uppercase transition-all hover:bg-brand-goldLight"
          >
            Contact Us
          </a>
          <p className="text-center text-[11px] text-gray-400 mt-4">
            APL Accountancy · U Business Adviser
          </p>
        </div>
      </div>
    </>
  );
}