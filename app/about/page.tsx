'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex-grow bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <nav className="text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-white font-semibold">Giới thiệu</span>
        </nav>

        {/* Page Title & Intro */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            Giới Thiệu Công Ty <br />
            <span className="text-primary dark:text-accent font-black">TNHH TÙNG BÁCH</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary dark:bg-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2">
            Đồng hành cùng giấc mơ an cư lạc nghiệp của người lao động Việt Nam. Công ty TNHH Tùng Bách tự hào là chủ đầu tư dự án Nhà ở xã hội Quế Võ, Bắc Ninh.
          </p>
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 via-accent/30 via-primary/20 to-transparent" />

        {/* Detailed Sections: Vision, Mission, Values */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tầm nhìn Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-emerald-950 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">
              👁️
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tầm Nhìn</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              [Nhập nội dung Tầm nhìn tại đây. Ví dụ: Trở thành doanh nghiệp hàng đầu trong lĩnh vực phát triển nhà ở xã hội và bất động sản phân khúc đại chúng tại tỉnh Bắc Ninh, kiến tạo những khu đô thị văn minh, tiện ích đầy đủ cho cư dân.]
            </p>
          </div>

          {/* Sứ mệnh Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-accent-light dark:bg-amber-950/40 flex items-center justify-center text-accent font-bold text-xl">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sứ Mệnh</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              [Nhập nội dung Sứ mệnh tại đây. Ví dụ: Cung cấp giải pháp an cư chất lượng cao, giá thành hợp lý và hồ sơ pháp lý minh bạch cho người lao động có thu nhập trung bình/thấp, góp phần đảm bảo an sinh xã hội địa phương.]
            </p>
          </div>
        </div>

        {/* Core Values Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-6 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center md:text-left">Giá Trị Cốt Lõi</h3>
            <div className="w-16 h-1 bg-primary dark:bg-accent rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <span className="text-lg font-bold text-primary dark:text-accent">01. Uy Tín</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Cam kết chất lượng công trình và bàn giao đúng tiến độ, xây dựng niềm tin vững chắc đối với khách hàng và đối tác.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-lg font-bold text-primary dark:text-accent">02. Tận Tâm</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Luôn đặt lợi ích và sự hài lòng của cư dân làm trọng tâm hành động, đồng hành và hỗ trợ tối đa thủ tục mua nhà.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-lg font-bold text-primary dark:text-accent">03. Minh Bạch</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Mọi quy trình pháp lý, hợp đồng mua bán, giá cả đều công khai rõ ràng, tuân thủ nghiêm ngặt quy định pháp luật.
              </p>
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 via-accent/30 via-primary/20 to-transparent" />

        {/* CTA Contact */}
        <div className="bg-gradient-to-br from-primary via-emerald-900 to-slate-900 text-white p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 filter blur-3xl z-0"></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold sm:text-3xl">Tìm Hiểu Thêm Về Cơ Hội An Cư</h3>
            <p className="text-slate-200 text-sm max-w-2xl mx-auto font-light leading-relaxed">
              Nếu quý khách cần tư vấn chi tiết về hồ sơ năng lực của chủ đầu tư, chính sách mua/thuê nhà hoặc tham quan dự án thực tế, xin vui lòng kết nối ngay với chúng tôi.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-sm shadow transition-transform hover:scale-105"
              >
                Liên Hệ Ngay
              </Link>
              <Link 
                href="/" 
                className="px-8 py-3 rounded-full border border-white/60 hover:bg-white/10 text-white font-semibold text-sm transition-colors"
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
