'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Check if we are on the homepage
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // If we are not on the homepage, redirect to home with hash
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white p-1 border border-slate-200 dark:border-emerald-800 shadow-sm flex items-center justify-center">
              <Image
                src="/renders/logo.png"
                alt="Logo Tùng Bách"
                fill
                sizes="40px"
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-primary dark:text-white leading-tight tracking-tight uppercase group-hover:text-accent transition-colors">
                TÙNG BÁCH
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-none tracking-wider uppercase">
                BẤT ĐỘNG SẢN
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-700 dark:text-slate-200">
            <a 
              href="#overview" 
              onClick={(e) => handleNavClick(e, 'overview')}
              className="hover:text-primary dark:hover:text-accent transition-colors text-sm"
            >
              Tổng quan
            </a>
            <a 
              href="#highlights" 
              onClick={(e) => handleNavClick(e, 'highlights')}
              className="hover:text-primary dark:hover:text-accent transition-colors text-sm"
            >
              Tiện ích
            </a>
            <a 
              href="#layouts" 
              onClick={(e) => handleNavClick(e, 'layouts')}
              className="hover:text-primary dark:hover:text-accent transition-colors text-sm"
            >
              Thiết kế căn hộ
            </a>
            <a 
              href="#progress" 
              onClick={(e) => handleNavClick(e, 'progress')}
              className="hover:text-primary dark:hover:text-accent transition-colors text-sm"
            >
              Tiến độ
            </a>
            <Link 
              href="/contact" 
              className="hover:text-primary dark:hover:text-accent transition-colors text-sm"
            >
              Liên hệ
            </Link>
            <Link 
              href="/admin/compliance" 
              className="text-xs text-slate-400 hover:text-primary dark:hover:text-accent transition-colors border border-dashed border-slate-300 dark:border-slate-700 px-2 py-1 rounded"
            >
              Pháp lý Domain
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#register" 
              onClick={(e) => handleNavClick(e, 'register')}
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Đăng ký tư vấn
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-700 dark:text-slate-200 hover:text-primary focus:outline-none p-2 rounded-md"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-emerald-950 border-t border-slate-200 dark:border-emerald-900 shadow-lg mt-3">
          <a
            href="#overview"
            onClick={(e) => handleNavClick(e, 'overview')}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Tổng quan
          </a>
          <a
            href="#highlights"
            onClick={(e) => handleNavClick(e, 'highlights')}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Tiện ích
          </a>
          <a
            href="#layouts"
            onClick={(e) => handleNavClick(e, 'layouts')}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Thiết kế căn hộ
          </a>
          <a
            href="#progress"
            onClick={(e) => handleNavClick(e, 'progress')}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Tiến độ
          </a>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Liên hệ
          </Link>
          <Link
            href="/admin/compliance"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Hồ sơ & Pháp lý Domain
          </Link>
          <div className="pt-4 pb-2 px-3">
            <a
              href="#register"
              onClick={(e) => handleNavClick(e, 'register')}
              className="block w-full text-center px-4 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold shadow-md"
            >
              Đăng ký tư vấn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
