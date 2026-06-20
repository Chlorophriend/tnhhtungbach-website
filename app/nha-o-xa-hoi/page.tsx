'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NhaOXaHoiPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keep only the first 4 images as requested
  const galleryImages = [
    {
      src: "/renders/z7946161277627_974316de9df63ed736c0cc3d64525a08.jpg",
      title: "Toàn cảnh dự án từ trên cao",
      desc: "4 block chung cư 12 tầng sừng sững và khang trang nổi bật tại trung tâm Khu đô thị mới Quế Võ."
    },
    {
      src: "/renders/z7946160675673_11e152accbe5beb864deb558c91e4aba.jpg",
      title: "Mặt đứng của dự án",
      desc: "Các block nhà đang trong những công đoạn hoàn thiện sơn ngoài và hạ tầng cảnh quan cuối cùng."
    },
    {
      src: "/renders/z7946161037038_31f627f3deb3f9e03daeb674242d8a31.jpg",
      title: "Cận cảnh tháp căn hộ",
      desc: "Kiến trúc thiết kế hiện đại, tối đa hóa mặt thoáng đón nắng gió tự nhiên cho các phòng ngủ."
    },
    {
      src: "/renders/z7946160913021_d78d2be2b26b3b7a8d3113648700271e.jpg",
      title: "Lắp đặt kính ban công",
      desc: "Đang tiến hành lắp đặt hệ thống lan can kính cường lực an toàn và hệ thống cửa kính căn hộ."
    }
  ];

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="flex-grow bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100 min-h-screen py-12 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumbs */}
        <nav className="text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-white font-semibold">Dự án Nhà ở xã hội</span>
        </nav>

        {/* Project Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            Nhà Ở Xã Hội <br />
            <span className="text-primary dark:text-accent font-black">TÙNG BÁCH QUẾ VÕ</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary dark:bg-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2 text-justify md:text-center animate-fade-in">
            Dự án nhà ở xã hội tại phường Phương Liễu, thị xã Quế Võ, tỉnh Bắc Ninh. Đây là dự án trọng điểm được đầu tư phát triển đồng bộ nhằm cung cấp căn hộ tiện nghi, hiện trạng thực tế đã hoàn thành nghiệm thu và đang tiến hành bàn giao nhà cho cư dân.
          </p>
        </div>

        {/* Project Technical Specifications */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Thông Tin Chi Tiết Dự Án</h3>
          <div className="w-16 h-1 bg-primary dark:bg-accent rounded-full"></div>
          
          <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Tên dự án pháp lý:</span>
                <span className="text-right text-slate-600 dark:text-slate-300">Dự án đầu tư xây dựng Khu nhà ở xã hội tại ô đất CT01A và ô đất CT01B</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Vị trí:</span>
                <span className="text-right text-slate-600 dark:text-slate-300">Khu đô thị mới Quế Võ, phường Phương Liễu, thị xã Quế Võ, tỉnh Bắc Ninh</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Chủ đầu tư:</span>
                <span className="text-right text-slate-600 dark:text-slate-300">Công ty TNHH Tùng Bách</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Quy mô xây dựng:</span>
                <span className="text-right text-slate-600 dark:text-slate-300">4 Block nhà chung cư cao 12 tầng (CT01A, CT01B, CT01, CT02, CT03, CT04)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Tổng số căn hộ:</span>
                <span className="text-right text-slate-600 dark:text-slate-300">914 Căn hộ (diện tích 61m² - 71.3m²)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Hiện trạng thực tế:</span>
                <span className="text-right text-emerald-600 dark:text-emerald-400 font-bold">Đang bàn giao nhà cho cư dân</span>
              </div>
            </div>
          </div>
        </div>

        {/* PHOTO GALLERY - Only keep the first 4 images */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Thư Viện Ảnh Thực Tế</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Hình Ảnh Chụp Tại Công Trường</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto text-sm">
              Hình ảnh thực tế dự án Nhà ở xã hội Tùng Bách Quế Võ, Bắc Ninh chụp từ drone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, idx) => (
              <div 
                key={idx} 
                className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer shadow-sm border border-slate-200/40 dark:border-slate-800/40 bg-slate-100 dark:bg-slate-900 transition-transform duration-300 hover:scale-102"
                onClick={() => setLightboxIndex(idx)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="font-bold text-sm">{image.title}</span>
                  <span className="text-[10px] text-slate-300 mt-1 line-clamp-2">{image.desc}</span>
                </div>
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/45 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRESS COVERAGES */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Truyền Thông Pháp Lý</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Báo Chí Đưa Tin Về Dự Án</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto text-sm text-justify md:text-center animate-fade-in">
              Các bài báo chính thống đưa tin về tiến độ thi công, nghiệm thu PCCC và các hoạt động của cơ quan chức năng giám sát tại dự án.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Bao Xay Dung */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/40 dark:border-emerald-800/40 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Báo Xây Dựng (Bộ Xây dựng)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    04/06/2026
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  Cận cảnh dự án nhà ở xã hội 900 căn hộ ở Bắc Ninh trước ngày về đích
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                  Dự án nhà ở xã hội trong khu đô thị mới Quế Võ có quy mô 914 căn hộ đang hoàn thiện những hạng mục cuối cùng, dự kiến đón cư dân vào ở từ tháng 6/2026. Dự án đã được nghiệm thu PCCC an toàn, hiện chủ đầu tư đã bàn giao kỹ thuật cho gần 500 căn hộ...
                </p>
              </div>
              <div className="pt-6">
                <a 
                  href="https://batdongsan.baoxaydung.vn/can-canh-du-an-nha-o-xa-hoi-900-can-ho-o-bac-ninh-truoc-ngay-ve-dich-192260604144410496.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-accent hover:underline"
                >
                  Đọc toàn văn bài viết
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Card 2: Bao Dai Bieu Nhan Dan */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/40 dark:border-emerald-800/40 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    Báo Đại Biểu Nhân Dân
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    23/05/2026
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  Bắc Ninh: Sớm đưa toàn bộ Dự án nhà ở xã hội tại Khu đô thị mới Quế Võ đến với người dân
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                  Đoàn giám sát của Thường trực HĐND tỉnh Bắc Ninh do Phó Chủ tịch HĐND tỉnh Lâm Thị Hương Thành làm Trưởng đoàn tiến hành giám sát thực tế dự án. Chủ đầu tư Công ty TNHH Tùng Bách đã hoàn tất đầy đủ quy trình pháp lý, hạ tầng, PCCC, công tác mở bán công khai minh bạch...
                </p>
              </div>
              <div className="pt-6">
                <a 
                  href="https://daibieunhandan.vn/bac-ninh-som-dua-toan-bo-du-an-nha-o-xa-hoi-tai-khu-do-thi-moi-que-vo-den-voi-nguoi-dan-10417888.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-accent hover:underline"
                >
                  Đọc toàn văn bài viết
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home action card */}
        <div className="bg-gradient-to-br from-primary via-emerald-900 to-slate-900 text-white p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 filter blur-3xl z-0"></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold sm:text-3xl">Liên Hệ Ban Đại Diện Văn Phòng</h3>
            <p className="text-slate-200 text-sm max-w-2xl mx-auto font-light leading-relaxed">
              Nếu quý đối tác hoặc khách hàng có nhu cầu làm việc cùng Công ty TNHH Tùng Bách, xin vui lòng kết nối trực tiếp với Thư ký của ban đại diện công ty qua Zalo.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://zalo.me/0393005566"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-sm shadow transition-transform hover:scale-105"
              >
                Kết nối Zalo Thư ký
              </a>
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-8">
          <div className="flex justify-between items-center text-white z-10">
            <span className="text-xs font-semibold tracking-wider uppercase">
              Hình ảnh {lightboxIndex + 1} / {galleryImages.length}
            </span>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors border-0"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative flex-grow flex items-center justify-center my-4">
            <button 
              onClick={prevLightbox}
              className="absolute left-0 p-3 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors border-0 z-10"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full max-w-4xl h-[70vh] rounded-lg overflow-hidden">
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button 
              onClick={nextLightbox}
              className="absolute right-0 p-3 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors border-0 z-10"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="text-center text-white max-w-2xl mx-auto space-y-1 pb-4 z-10">
            <h4 className="font-bold text-lg">{galleryImages[lightboxIndex].title}</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">{galleryImages[lightboxIndex].desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
