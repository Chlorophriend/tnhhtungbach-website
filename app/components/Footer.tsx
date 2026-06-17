import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 overflow-hidden rounded bg-white p-1 border border-slate-700 flex items-center justify-center">
                <Image
                  src="/renders/logo.png"
                  alt="Logo Tùng Bách"
                  fill
                  sizes="32px"
                  className="object-contain p-0.5"
                />
              </div>
              <span className="text-base font-bold text-white tracking-wider uppercase">
                CÔNG TY TNHH TÙNG BÁCH
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Chủ đầu tư dự án Nhà ở xã hội Tùng Bách Quế Võ. Đồng hành cùng giấc mơ an cư lạc nghiệp của người lao động Việt Nam.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-emerald-950/50 border border-emerald-800 rounded text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                MST: 2300290374
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Dự Án Đang Triển Khai</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <span className="font-semibold text-slate-300">Nhà ở xã hội Tùng Bách Quế Võ</span>
              </li>
              <li>
                <span className="block text-xs">Vị trí: Ô đất CT01A & CT01B, KĐT mới Quế Võ, Phường Phương Liễu, Thị xã Quế Võ, Bắc Ninh</span>
              </li>
              <li>
                <span className="block text-xs">Quy mô: 4 Tòa nhà cao 12 tầng (CT01 - CT04), 900+ căn hộ tiện nghi</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Pháp Lý & Hướng Dẫn</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-primary-light transition-colors">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary-light transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-light transition-colors">
                  Thông tin liên hệ
                </Link>
              </li>
              <li>
                <Link href="/admin/compliance" className="hover:text-primary-light transition-colors">
                  Thủ tục chuyển nhượng tên miền
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & MoIT Badge */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Thông Tin Trụ Sở</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Số 33, đường Lý Chiêu Hoàng, phường Suối Hoa, TP Bắc Ninh, Tỉnh Bắc Ninh</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0230.029.0374</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@tungbachbds.vn</span>
              </li>
            </ul>

            {/* Ministry of Industry and Trade Register Badge Placeholder */}
            <div className="pt-2">
              <a 
                href="http://online.gov.vn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block transition-transform hover:scale-105"
                title="Đã thông báo với Bộ Công Thương"
              >
                {/* Visual SVG representing MoIT "Đã Thông Báo" red seal badge */}
                <svg className="w-32 h-12" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="160" height="60" rx="8" fill="#D92D20"/>
                  <circle cx="35" cy="30" r="18" fill="white" fillOpacity="0.2"/>
                  {/* Outer circle red badge seal */}
                  <circle cx="35" cy="30" r="14" stroke="white" strokeWidth="2"/>
                  <path d="M31 35V25H35C37.2091 25 39 26.7909 39 29C39 31.2091 37.2091 33 35 33H33V35H31ZM33 31H35C36.1046 31 37 30.1046 37 29C37 27.8954 36.1046 27 35 27H33V31Z" fill="white"/>
                  {/* Text for badge */}
                  <text x="62" y="25" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">ĐÃ THÔNG BÁO</text>
                  <text x="62" y="38" fill="white" fontSize="10" fontFamily="Arial, sans-serif">BỘ CÔNG THƯƠNG</text>
                  <text x="62" y="49" fill="#FEF3C7" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif">MST: 2300290374</text>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Line */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p className="mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Công ty TNHH Tùng Bách. Bảo lưu mọi quyền.
          </p>
          <p className="text-center sm:text-right leading-relaxed max-w-md">
            GPKD số 2300290374 cấp bởi Sở Kế hoạch và Đầu tư tỉnh Bắc Ninh. Nội dung trang web này phục vụ mục đích thông tin giới thiệu và quảng cáo dự án Nhà ở xã hội Tùng Bách Quế Võ.
          </p>
        </div>
      </div>
    </footer>
  );
}
