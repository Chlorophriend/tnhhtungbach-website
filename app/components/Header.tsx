'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Call handleScroll immediately to set initial state based on current scroll position
    handleScroll();

    // Initial theme check
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

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

  const navLinkClass = 'text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-accent transition-colors text-sm font-semibold tracking-normal leading-normal';

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
              <span className="text-base font-extrabold text-primary dark:text-white leading-normal tracking-normal uppercase transition-colors group-hover:text-accent">
                TÙNG BÁCH
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-none tracking-normal uppercase transition-colors">
                BẤT ĐỘNG SẢN
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 font-medium">
            <a 
              href="#overview" 
              onClick={(e) => handleNavClick(e, 'overview')}
              className={navLinkClass}
            >
              Tổng quan
            </a>
            <a 
              href="#sectors" 
              onClick={(e) => handleNavClick(e, 'sectors')}
              className={navLinkClass}
            >
              Lĩnh vực
            </a>
            <a 
              href="#projects" 
              onClick={(e) => handleNavClick(e, 'projects')}
              className={navLinkClass}
            >
              Dự án
            </a>
            <Link 
              href="/services" 
              className={navLinkClass}
            >
              Dịch vụ
            </Link>
            <Link 
              href="/about" 
              className={navLinkClass}
            >
              Giới thiệu
            </Link>
            <Link 
              href="/contact" 
              className={navLinkClass}
            >
              Liên hệ
            </Link>
          </nav>

          {/* CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-slate-700 dark:text-amber-400 transition-colors shadow-sm cursor-pointer border-0"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <a 
              href="#register" 
              onClick={(e) => handleNavClick(e, 'register')}
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Đăng ký tư vấn
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle Trigger */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle Button for mobile header */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-emerald-950/60 text-slate-700 dark:text-amber-400 transition-colors shadow-sm cursor-pointer border-0"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="focus:outline-none p-2 rounded-md text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
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
            href="#sectors"
            onClick={(e) => handleNavClick(e, 'sectors')}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Lĩnh vực
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, 'projects')}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Dự án
          </a>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Dịch vụ
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Giới thiệu
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-emerald-900 hover:text-primary"
          >
            Liên hệ
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
