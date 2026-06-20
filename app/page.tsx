'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
  source: string;
}

export default function Home() {
  const [animateIn, setAnimateIn] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    notes: '',
    source: 'Corporate Landing Page'
  });
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
    loading?: boolean;
  }>({});

  const handleImageLoad = () => {
    setLoadedCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount === 5) {
        setImagesLoaded(true);
      }
      return nextCount;
    });
  };

  useEffect(() => {
    // Fallback timer: force transition after 2.5 seconds if loading takes too long
    const fallback = setTimeout(() => {
      setImagesLoaded(true);
    }, 2500);

    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setFormStatus({ success: false, message: 'Vui lòng điền đầy đủ Họ tên và Số điện thoại!' });
      return;
    }

    setFormStatus({ loading: true });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('API failed');
      }

      const result = await response.json();
      if (result.success) {
        setFormStatus({
          success: true,
          message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.'
        });
        setFormData({ name: '', phone: '', email: '', notes: '', source: 'Corporate Landing Page' });
      } else {
        setFormStatus({ success: false, message: result.message || 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    } catch (error) {
      console.log('API failed, redirecting to Zalo...', error);
      
      const message = `Chào Tùng Bách, tôi muốn liên hệ hợp tác / tư vấn dịch vụ. Thông tin:\n- Họ tên: ${formData.name}\n- SĐT: ${formData.phone}${formData.email ? `\n- Email: ${formData.email}` : ''}${formData.notes ? `\n- Nội dung yêu cầu: ${formData.notes}` : ''}`;
      
      setFormStatus({
        success: true,
        message: 'Đang kết nối Zalo hỗ trợ...'
      });

      setTimeout(() => {
        try {
          navigator.clipboard.writeText(message);
          alert('Đã tự động copy nội dung yêu cầu của bạn. Hãy dán (Ctrl+V) vào khung chat Zalo của Tùng Bách để được phản hồi nhanh nhất!');
        } catch (clipError) {
          console.error('Clipboard failed:', clipError);
        }
        window.open('https://zalo.me/0393005566', '_blank');
        setFormStatus({});
        setFormData({ name: '', phone: '', email: '', notes: '', source: 'Corporate Landing Page' });
      }, 1000);
    }
  };

  const sectors = [
    { title: "San lấp mặt bằng & Nền móng", icon: "🏗️", bgImage: "/renders/sector_leveling.png" },
    { title: "Xây dựng công trình kỹ thuật dân dụng", icon: "🛣️", bgImage: "/renders/sector_construction.png" },
    { title: "Vận tải hàng hóa bằng đường bộ", icon: "🚛", bgImage: "/renders/sector_transport.png" },
    { title: "Khai thác cát, sỏi, đá & đất sét", icon: "⛏️", bgImage: "/renders/sector_mining.png" },
    { title: "Bán buôn nhiên liệu & VLXD", icon: "🧱", bgImage: "/renders/sector_materials.png" },
    { title: "Đầu tư & Kinh doanh Bất động sản", icon: "🏢", bgImage: "/renders/sector_realestate.png" }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-primary via-emerald-900 to-slate-900 text-white py-24 md:py-36 overflow-hidden min-h-[580px] lg:min-h-[700px] flex items-center">
        
        {/* Abstract Curved Line SVG Waves behind the content */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M-100,200 C300,100 500,450 900,300 C1100,220 1300,400 1600,350" stroke="white" strokeWidth="2" fill="none" />
            <path d="M-100,250 C320,130 520,480 880,350 C1080,270 1280,450 1600,400" stroke="white" strokeWidth="1" fill="none" />
            <path d="M-100,300 C340,160 540,510 860,400 C1060,320 1260,500 1600,450" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M-100,350 C360,190 560,540 840,450 C1040,370 1240,550 1600,500" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5,5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="md:col-span-7 space-y-6 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest shadow-md">
                Tập đoàn đầu tư hạ tầng & xây dựng uy tín
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-normal leading-tight">
                CÔNG TY TNHH <br />
                <span className="text-accent">TÙNG BÁCH</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed text-justify md:text-left">
                Kiến tạo hạ tầng vững bền và phát triển không gian sống chất lượng cao từ năm 2006. Chúng tôi khẳng định uy tín qua năng lực khai thác vật liệu, san lấp nền móng, vận tải logistics và các dự án đô thị, hạ tầng giao thông trọng điểm.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Link 
                  href="#sectors" 
                  className="px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-center shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm"
                >
                  Lĩnh Vực Hoạt Động
                </Link>
                <Link 
                  href="/nha-o-xa-hoi" 
                  className="px-8 py-3.5 rounded-full border-2 border-white/80 hover:bg-white hover:text-primary text-white font-semibold text-center transition-colors text-sm"
                >
                  Dự Án Nhà Ở Xã Hội Quế Võ
                </Link>
              </div>
            </div>

            {/* Hero Right Content - 3D Staggered Slice Animation (Bigger & Fuller) */}
            <div className="md:col-span-5 flex items-center justify-center relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[620px] overflow-visible">
              {/* Stacked Building Cutout - Blends directly into background (no container box, no borders, no labels) */}
              <div className="relative w-full h-full max-w-[500px] md:max-w-none aspect-[16/9] overflow-visible">
                
                {/* Slice 5 (Base / Ground floor) - Slides up */}
                <div 
                  className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: animateIn ? 'translateY(0) scale(1.15)' : 'translateY(80px) scale(1)',
                    opacity: animateIn ? 1 : 0,
                    transitionDelay: '0ms'
                  }}
                >
                  <Image
                    src="/renders/building_slice_5.png"
                    alt="Tòa nhà Tùng Bách - Lớp 5"
                    fill
                    priority
                    onLoad={handleImageLoad}
                    className="object-contain"
                  />
                </div>

                {/* Slice 4 (Lower floors) - Slides in from right */}
                <div 
                  className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: animateIn ? 'translateX(0) scale(1.15)' : 'translateX(100px) scale(1)',
                    opacity: animateIn ? 1 : 0,
                    transitionDelay: '150ms'
                  }}
                >
                  <Image
                    src="/renders/building_slice_4.png"
                    alt="Tòa nhà Tùng Bách - Lớp 4"
                    fill
                    priority
                    onLoad={handleImageLoad}
                    className="object-contain"
                  />
                </div>

                {/* Slice 3 (Middle floors) - Slides in from left */}
                <div 
                  className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: animateIn ? 'translateX(0) scale(1.15)' : 'translateX(-100px) scale(1)',
                    opacity: animateIn ? 1 : 0,
                    transitionDelay: '300ms'
                  }}
                >
                  <Image
                    src="/renders/building_slice_3.png"
                    alt="Tòa nhà Tùng Bách - Lớp 3"
                    fill
                    priority
                    onLoad={handleImageLoad}
                    className="object-contain"
                  />
                </div>

                {/* Slice 2 (Upper floors) - Slides in from right */}
                <div 
                  className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: animateIn ? 'translateX(0) scale(1.15)' : 'translateX(100px) scale(1)',
                    opacity: animateIn ? 1 : 0,
                    transitionDelay: '450ms'
                  }}
                >
                  <Image
                    src="/renders/building_slice_2.png"
                    alt="Tòa nhà Tùng Bách - Lớp 2"
                    fill
                    priority
                    onLoad={handleImageLoad}
                    className="object-contain"
                  />
                </div>

                {/* Slice 1 (Top / Roof) - Slides down */}
                <div 
                  className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: animateIn ? 'translateY(0) scale(1.15)' : 'translateY(-60px) scale(1)',
                    opacity: animateIn ? 1 : 0,
                    transitionDelay: '600ms'
                  }}
                >
                  <Image
                    src="/renders/building_slice_1.png"
                    alt="Tòa nhà Tùng Bách - Lớp 1"
                    fill
                    priority
                    onLoad={handleImageLoad}
                    className="object-contain"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        
        {/* Smooth Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 dark:from-slate-900/10 to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* OVERVIEW SECTION */}
      <section id="overview" className="py-20 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Overview text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block">Giới Thiệu Doanh Nghiệp</span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                  Hành Trình Kiến Tạo Uy Tín Hơn 2 Thập Kỷ
                </h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-justify">
                Được thành lập từ ngày 31 tháng 08 năm 2006, <strong>Công ty TNHH Tùng Bách</strong> (Giấy CNKD số 2300290374) đã phát triển bền vững để trở thành một thương hiệu đáng tin cậy tại tỉnh Bắc Ninh và các tỉnh thành lân cận. Chúng tôi xây dựng hoạt động kinh doanh đa dạng dựa trên nền tảng cán bộ kỹ sư tâm huyết và có trình độ kỹ thuật vững chắc.
              </p>
              
              <div className="grid sm:grid-cols-1 gap-6 pt-2 text-sm text-slate-600 dark:text-slate-300">
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Địa chỉ văn phòng:</span>
                    <span className="font-medium">Tầng 2, Tòa nhà Trung tâm thương mại Tùng Bách, Khu đô thị mới Quế Võ, thị xã Quế Võ, tỉnh Bắc Ninh, Việt Nam.</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Mã số thuế / GPĐKKD:</span>
                    <span>2300290374 (Đăng ký thay đổi lần thứ 7 ngày 17/03/2022 bởi Sở KH&ĐT tỉnh Bắc Ninh).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview strategic block */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/60 shadow-inner flex flex-col justify-center space-y-6">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white mb-2">Định Hướng Chiến Lược</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light text-justify leading-relaxed">
                Tùng Bách tiếp tục củng cố khả năng tài chính, nhân lực và hướng trọng tâm đầu tư mạnh mẽ vào các dự án hạ tầng giao thông và dự án bất động sản chất lượng cao tại Bắc Ninh, Bắc Giang, Quảng Ninh, Khánh Hòa,... Đồng hành cùng sự phát triển an sinh xã hội bền vững của địa phương.
              </p>
              <div className="pt-4 border-t border-slate-200 dark:border-emerald-950">
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-accent hover:underline"
                >
                  Tìm hiểu chi tiết Hồ sơ năng lực
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTORS SECTION (Image background grids, no links) */}
      <section id="sectors" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-emerald-950/10 dark:to-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Lĩnh Vực Hoạt Động</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Năng Lực Thi Công & Cung Ứng Đa Dạng
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-300 font-light text-justify md:text-center text-sm">
              Chúng tôi tự chủ và đồng bộ từ khai thác mỏ vật liệu cát sỏi, vận chuyển logistics bằng đường bộ đến việc trực tiếp thi công hạ tầng giao thông, san lấp nền móng và đầu tư bất động sản.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, idx) => (
              <div 
                key={idx}
                className="relative h-64 rounded-2xl overflow-hidden group shadow-md flex flex-col justify-end p-6 border border-slate-200/20 dark:border-slate-800/40"
              >
                {/* Background Image */}
                <Image
                  src={sector.bgImage}
                  alt={sector.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 pointer-events-none"></div>
                
                {/* Content */}
                <div className="relative z-20 space-y-2 text-white pointer-events-none">
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg shadow-sm">
                    {sector.icon}
                  </div>
                  <h3 className="font-bold text-base leading-snug">{sector.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION: LIST & TIMELINE */}
      <section id="projects" className="py-20 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Lịch Sử Dự Án</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Các Dự Án Đã & Đang Triển Khai
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-300 font-light text-justify md:text-center text-sm">
              Xem quá trình hình thành các công trình xây dựng hạ tầng khu đô thị, trung tâm thương mại, và các dự án an sinh xã hội do Tùng Bách làm chủ đầu tư.
            </p>
          </div>

          {/* Timeline of Projects */}
          <div className="relative border-l-2 border-primary/20 dark:border-emerald-800 ml-4 md:ml-32 space-y-12 mb-16">
            
            {/* Project 1 (Active) */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-slate-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-primary dark:text-accent md:-ml-36 pr-4">
                  2024 - 2026
                </div>
                <div className="md:col-span-9 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/60 space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wider">Dự án đang triển khai</span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Dự án Nhà ở xã hội tại ô đất CT01A và CT01B (Khu đô thị mới Quế Võ)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quyết định phê duyệt số 432/QĐ-UBND ngày 03/08/2018 của UBND tỉnh Bắc Ninh.</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 text-justify font-light leading-relaxed">
                    Tổ hợp chung cư quy mô gồm 4 tòa tháp cao 12 tầng với hơn 900 căn hộ chất lượng cao, phục vụ nhu cầu an cư lạc nghiệp cho cư dân và người lao động. Dự án đang hoàn thiện các hạng mục vỉa hè, đường nội bộ bao quanh và khuôn viên cây xanh để tiến hành bàn giao nhà từ tháng 6/2026.
                  </p>
                  <div className="pt-2">
                    <Link 
                      href="/nha-o-xa-hoi"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all hover:scale-102 shadow"
                    >
                      Xem chi tiết
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-slate-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Năm 2021
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/10 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900/30">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Khu dịch vụ, thương mại Tân Mỹ - Tùng Bách (Bắc Giang)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quyết định số 1369/QĐ-UBND ngày 6/12/2021 của UBND tỉnh Bắc Giang.</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-justify font-light">
                    Dự án đánh dấu cột mốc mở rộng đầu tư thành công của công ty Tùng Bách sang địa bàn phát triển công nghiệp Bắc Giang, kiến tạo tổ hợp dịch vụ kho bãi, thương mại chuyên nghiệp.
                  </p>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Năm 2018
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/10 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900/30 space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Tổ hợp dịch vụ công cộng nội khu KĐT mới Quế Võ</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Thi công và bàn giao đưa vào sử dụng chuỗi tiện ích kỹ thuật và dịch vụ văn hóa đồng bộ:</p>
                  <div className="grid sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="font-bold block text-slate-800 dark:text-slate-200">1. TTTM (CC10)</span>
                      <span className="text-[10px] text-slate-400">QĐ số 428/QĐ-UBND</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="font-bold block text-slate-800 dark:text-slate-200">2. Trường mầm non (CC11)</span>
                      <span className="text-[10px] text-slate-400">QĐ số 434/QĐ-UBND</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="font-bold block text-slate-800 dark:text-slate-200">3. Trung tâm thể thao (CC02)</span>
                      <span className="text-[10px] text-slate-400">QĐ số 439/QĐ-UBND</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Năm 2015
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/10 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900/30">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Hạ tầng kỹ thuật KĐT mới Quế Võ II</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quy mô 28.8 ha | Quyết định số 328/QĐ-UBND ngày 25/8/2015 của UBND tỉnh Bắc Ninh.</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-justify font-light">
                    Đầu tư thi công đồng bộ hệ thống giao thông thảm nhựa asphalt rộng rãi, vỉa hè lát gạch chống trơn, hệ thống điện chiếu sáng ngầm và mạng lưới cấp thoát nước sạch cho toàn phân khu.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORPORATE CONTACT FORM */}
      <section id="register" className="py-20 bg-slate-50 dark:bg-slate-950/30 border-t border-slate-100 dark:border-emerald-950 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Form Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block">Liên Hệ Doanh Nghiệp</span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                  Hợp Tác Phát Triển Dự Án
                </h2>
                <div className="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-justify">
                Công ty TNHH Tùng Bách hoan nghênh mọi cơ hội hợp tác thi công hạ tầng kỹ thuật, liên kết cung ứng nguyên vật liệu xây dựng (xi măng, cát, đá, sỏi, thiết bị hoàn thiện) và nhu cầu liên hệ từ khách hàng. Hãy điền thông tin đăng ký để văn phòng đại diện liên hệ lại sớm nhất.
              </p>
              
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Liên kết thi công móng, san lấp cao độ hạ tầng.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Cung ứng sỉ/lẻ xi măng, cát sỏi san lấp chất lượng cao.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Địa chỉ văn phòng giao dịch tại Tầng 2, Tòa nhà TTTM Tùng Bách.</span>
                </div>
              </div>
            </div>

            {/* Form Right Input */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900 shadow-md">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Gửi Yêu Cầu Liên Hệ</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-950 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-950 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Số điện thoại của bạn"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Địa chỉ Email (Nếu có)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-950 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="nguyenvana@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Yêu cầu hợp tác chi tiết
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-950 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Tôi muốn tìm hiểu chính sách hợp tác..."
                  ></textarea>
                </div>

                {formStatus.message && (
                  <div className={`p-4 rounded-lg text-sm font-medium ${formStatus.success ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900' : 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900'}`}>
                    {formStatus.message}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="flex-grow py-3.5 rounded-lg bg-primary hover:bg-primary-hover disabled:bg-slate-400 text-white font-bold text-center shadow-lg transition-transform hover:scale-102 active:scale-98 text-sm cursor-pointer"
                  >
                    {formStatus.loading ? 'Đang gửi thông tin...' : 'GỬI YÊU CẦU LIÊN HỆ'}
                  </button>
                  <a
                    href="https://zalo.me/0393005566"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center shadow-lg transition-all hover:scale-102 active:scale-98 text-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Chat Zalo Thư Ký</span>
                  </a>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
