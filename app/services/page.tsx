'use client';

import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const sectors = [
    {
      title: "San lấp mặt bằng & Thi công nền móng",
      desc: "Đây là một trong những thế mạnh hàng đầu của Tùng Bách từ khi thành lập. Chúng tôi sở hữu đội xe cơ giới, máy xúc, máy ủi hiện đại cùng nguồn cát san lấp dồi dào, đảm bảo bàn giao mặt bằng thi công đúng tiến độ và đạt chuẩn cao độ kỹ thuật cho các dự án nhà xưởng, khu đô thị.",
      icon: "🏗️"
    },
    {
      title: "Xây dựng công trình kỹ thuật dân dụng",
      desc: "Tùng Bách thực hiện tư vấn thiết kế và trực tiếp thi công các công trình giao thông đường bộ, hệ thống thủy lợi, công trình công nghiệp và các công trình điện đến 35kV. Đội ngũ kỹ sư giàu kinh nghiệm của chúng tôi luôn đảm bảo các tiêu chí kỹ thuật và độ bền công trình tối đa.",
      icon: "🛣️"
    },
    {
      title: "Vận tải hàng hóa bằng đường bộ",
      desc: "Với đội ngũ xe tải trọng tải lớn và mạng lưới đối tác logistics rộng khắp, Tùng Bách cung cấp dịch vụ vận chuyển nguyên vật liệu xây dựng, đất đá san lấp, hàng hóa công nghiệp an toàn và chuyên nghiệp khắp các tỉnh thành Bắc Ninh, Bắc Giang, Quảng Ninh.",
      icon: "🚛"
    },
    {
      title: "Khai thác cát, sỏi, đá & đất sét",
      desc: "Công ty trực tiếp đầu tư và khai thác tại các mỏ vật liệu xây dựng hợp pháp, cung cấp nguồn nguyên liệu chất lượng cao phục vụ các dự án hạ tầng của công ty cũng như phân phối sỉ/lẻ cho các công trình đối tác trong khu vực.",
      icon: "⛏️"
    },
    {
      title: "Bán buôn nhiên liệu & Vật liệu xây dựng",
      desc: "Cung cấp chuỗi cung ứng vật liệu xây dựng hoàn chỉnh bao gồm xi măng, gạch xây, cát sỏi san lấp, đá ốp lát, sơn màu, véc-ni và thiết bị vệ sinh chính hãng. Hỗ trợ cung cấp nhiên liệu rắn, lỏng, khí phục vụ sản xuất công nghiệp và công trình.",
      icon: "🧱"
    },
    {
      title: "Kinh doanh & Đầu tư phát triển Bất động sản",
      desc: "Tùng Bách là chủ đầu tư của nhiều dự án khu đô thị mới, trung tâm thương mại và dịch vụ tại Bắc Ninh và Bắc Giang. Chúng tôi cam kết mang lại các sản phẩm bất động sản minh bạch về pháp lý, đồng bộ về hạ tầng kỹ thuật và nâng cao chất lượng cuộc sống cho cộng đồng.",
      icon: "🏢"
    }
  ];

  return (
    <div className="flex-grow bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100 min-h-screen py-12 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <nav className="text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-white font-semibold">Lĩnh vực hoạt động</span>
        </nav>

        {/* Page Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block">Năng Lực & Dịch Vụ</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            Lĩnh Vực Hoạt Động Cốt Lõi
          </h1>
          <div className="w-24 h-1.5 bg-primary dark:bg-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2 text-justify md:text-center">
            Công ty TNHH Tùng Bách phát triển hệ sinh thái đa dạng từ khai thác mỏ vật liệu, san lấp mặt bằng, vận tải đường bộ đến đầu tư thi công các dự án bất động sản lớn, tạo chuỗi giá trị khép kín vượt trội.
          </p>
        </div>

        {/* Detailed Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-emerald-950 flex items-center justify-center text-primary dark:text-accent font-bold text-xl shadow-inner">
                  {sector.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{sector.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light text-justify">
                  {sector.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Capacity Stats */}
        <div className="bg-gradient-to-br from-primary via-emerald-900 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 filter blur-3xl z-0"></div>
          <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <span className="block text-4xl font-extrabold text-accent">20+ Năm</span>
              <span className="block text-xs text-slate-300 mt-1 uppercase tracking-wider">Kinh nghiệm hoạt động (từ 2006)</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block text-4xl font-extrabold text-accent">45+ Nhân Sự</span>
              <span className="block text-xs text-slate-300 mt-1 uppercase tracking-wider">Kỹ sư trắc địa, xây dựng & cử nhân kinh tế</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block text-4xl font-extrabold text-accent">5+ Dự Án</span>
              <span className="block text-xs text-slate-300 mt-1 uppercase tracking-wider">Hạ tầng lớn đã hoàn thành bàn giao</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hợp Tác Phát Triển Cùng Tùng Bách</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Chúng tôi luôn sẵn sàng hợp tác cùng các đối tác nhà thầu, đơn vị cung ứng vật tư và quý khách hàng quan tâm đến các sản phẩm dịch vụ xây dựng hạ tầng kỹ thuật của công ty.
          </p>
          <div className="pt-2">
            <Link 
              href="/contact" 
              className="inline-block px-8 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              Liên Hệ Hợp Tác Ngay
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
