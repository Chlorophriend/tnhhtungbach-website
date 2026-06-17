'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [selectedLayout, setSelectedLayout] = useState<'A' | 'B'>('A');

  const handleApartmentSelect = (layout: 'A' | 'B') => {
    setSelectedLayout(layout);
  };

  return (
    <div className="flex-grow bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <nav className="text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-white font-semibold">Dịch vụ</span>
        </nav>

        {/* Page Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block">Dịch Vụ & Sản Phẩm</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            Giải Pháp Bất Động Sản Toàn Diện
          </h1>
          <div className="w-24 h-1.5 bg-primary dark:bg-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2">
            Công ty TNHH Tùng Bách cung cấp hệ sinh thái dịch vụ khép kín từ tư vấn hồ sơ nhà ở xã hội, phân phối căn hộ mẫu và hỗ trợ thiết kế nội thất hoàn thiện.
          </p>
        </div>

        {/* Core Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-emerald-950 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">
              📝
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tư Vấn Hồ Sơ NOXH</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Hỗ trợ toàn bộ quy trình chuẩn bị hồ sơ pháp lý, chứng minh điều kiện cư trú và thu nhập theo đúng mẫu quy định của Sở Xây dựng Bắc Ninh, đảm bảo tỷ lệ xét duyệt tối đa.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-light dark:bg-amber-950/40 flex items-center justify-center text-accent font-bold text-xl">
              🛋️
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nội Thất & Thiết Kế</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Kết hợp chặt chẽ cùng thương hiệu **Nội thất Tùng Bách** cung cấp các gói hoàn thiện căn hộ từ cơ bản đến cao cấp, tối ưu hóa không gian, vật liệu bền bỉ và ưu đãi đặc quyền.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-emerald-950 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">
              🤝
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Môi Giới & Ký Gửi</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Dịch vụ hỗ trợ chuyển nhượng hợp pháp, tư vấn cho thuê hoặc mua lại căn hộ với đầy đủ thủ tục pháp lý, bảo vệ quyền lợi tài chính lâu dài cho khách hàng.
            </p>
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 via-accent/30 via-primary/20 to-transparent" />

        {/* INTERACTIVE APARTMENT SELECTOR */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mặt Bằng Thiết Kế Căn Hộ</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
              Khám phá sơ đồ bố trí không gian mẫu căn hộ diện tích từ 61m² đến 71.3m² tại dự án Nhà ở xã hội Tùng Bách Quế Võ.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleApartmentSelect('A')}
              className={`px-6 py-3 rounded-full font-bold text-sm shadow transition-all cursor-pointer ${
                selectedLayout === 'A'
                  ? 'bg-primary text-white scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Căn Hộ Mẫu A (61.0 m²)
            </button>
            <button
              onClick={() => handleApartmentSelect('B')}
              className={`px-6 py-3 rounded-full font-bold text-sm shadow transition-all cursor-pointer ${
                selectedLayout === 'B'
                  ? 'bg-primary text-white scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Căn Hộ Mẫu B (71.3 m²)
            </button>
          </div>

          {/* Interactive display */}
          <div className="grid lg:grid-cols-12 gap-12 items-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm">
            {/* Visual SVG blueprint */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/50 dark:border-emerald-900 shadow-inner flex justify-center">
              {selectedLayout === 'A' ? (
                <svg className="w-full max-w-md h-72" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="380" height="230" rx="4" stroke="#064e3b" strokeWidth="3" fill="#ecfdf5" fillOpacity="0.3"/>
                  <rect x="10" y="10" width="160" height="150" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="35" y="90" fill="#064e3b" fontSize="14" fontWeight="bold">PHÒNG KHÁCH</text>
                  <text x="35" y="110" fill="#64748b" fontSize="10">Kèm khu Bếp + Ăn</text>
                  <rect x="170" y="10" width="110" height="130" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="185" y="70" fill="#064e3b" fontSize="11" fontWeight="bold">PHÒNG NGỦ 1</text>
                  <rect x="280" y="10" width="110" height="130" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="295" y="70" fill="#064e3b" fontSize="11" fontWeight="bold">PHÒNG NGỦ 2</text>
                  <rect x="170" y="140" width="100" height="100" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="200" y="195" fill="#064e3b" fontSize="12" fontWeight="bold">WC</text>
                  <rect x="10" y="160" width="160" height="80" stroke="#064e3b" strokeWidth="2" fill="#f8fafc"/>
                  <text x="70" y="205" fill="#064e3b" fontSize="12" fontWeight="bold">LÔ GIA</text>
                  <path d="M 285 240 L 285 200" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow)"/>
                  <text x="295" y="225" fill="#d97706" fontSize="10" fontWeight="bold">LỐI VÀO</text>
                </svg>
              ) : (
                <svg className="w-full max-w-md h-72" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="380" height="230" rx="4" stroke="#064e3b" strokeWidth="3" fill="#ecfdf5" fillOpacity="0.3"/>
                  <rect x="10" y="10" width="180" height="130" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="45" y="70" fill="#064e3b" fontSize="14" fontWeight="bold">PHÒNG KHÁCH</text>
                  <text x="45" y="90" fill="#64748b" fontSize="10">Rộng rãi thoáng đãng</text>
                  <rect x="190" y="10" width="100" height="150" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="200" y="80" fill="#064e3b" fontSize="11" fontWeight="bold">PN MASTER</text>
                  <rect x="190" y="120" width="50" height="40" stroke="#064e3b" strokeWidth="1" fill="#f8fafc"/>
                  <text x="205" y="145" fill="#064e3b" fontSize="9" fontWeight="bold">WC 1</text>
                  <rect x="290" y="10" width="100" height="150" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="310" y="80" fill="#064e3b" fontSize="11" fontWeight="bold">PHÒNG NGỦ 2</text>
                  <rect x="290" y="160" width="100" height="80" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="325" y="205" fill="#064e3b" fontSize="12" fontWeight="bold">WC 2</text>
                  <rect x="10" y="140" width="110" height="100" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="45" y="195" fill="#064e3b" fontSize="12" fontWeight="bold">BẾP</text>
                  <rect x="120" y="140" width="70" height="100" stroke="#064e3b" strokeWidth="2" fill="#f8fafc"/>
                  <text x="135" y="195" fill="#064e3b" fontSize="10" fontWeight="bold">LÔ GIA 1</text>
                  <rect x="190" y="160" width="100" height="80" stroke="#064e3b" strokeWidth="2" fill="#f8fafc"/>
                  <text x="210" y="205" fill="#064e3b" fontSize="10" fontWeight="bold">LÔ GIA 2</text>
                </svg>
              )}
            </div>

            {/* Layout specifications */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedLayout === 'A' ? 'Mẫu A: Thiết kế tối giản, công năng' : 'Mẫu B: Tổ ấm lý tưởng cho gia đình'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-light">
                  {selectedLayout === 'A' 
                    ? 'Phù hợp cho các cặp vợ chồng trẻ hoặc người độc thân làm việc tại các khu công nghiệp.' 
                    : 'Không gian mở rộng rãi với 2 lô gia thông thoáng, đáp ứng trọn vẹn nhu cầu sinh hoạt gia đình 2-3 thế hệ.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-slate-200 dark:border-emerald-800 py-6">
                <div>
                  <span className="block text-xs text-slate-400 uppercase">Diện tích tim tường</span>
                  <span className="text-lg font-bold text-primary dark:text-accent">
                    {selectedLayout === 'A' ? '61.0 m²' : '71.3 m²'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase">Thiết kế căn hộ</span>
                  <span className="text-lg font-bold text-primary dark:text-accent">
                    2 PN | {selectedLayout === 'A' ? '1 WC' : '2 WC'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase">Lô gia (Ban công)</span>
                  <span className="text-lg font-bold text-primary dark:text-accent">
                    {selectedLayout === 'A' ? '1 Lô gia' : '2 Lô gia'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase">Giá bán trung bình</span>
                  <span className="text-lg font-bold text-primary dark:text-accent">
                    {selectedLayout === 'A' ? '~854 Triệu VNĐ' : '~1.0 Tỷ VNĐ'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow transition-all hover:scale-105"
                >
                  Đăng ký tham quan căn hộ mẫu
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
