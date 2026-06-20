'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
  source: string;
}

export default function NhaOXaHoiPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    notes: '',
    source: 'NOXH Subpage Form'
  });
  
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
    loading?: boolean;
  }>({});

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
    },
    {
      src: "/renders/z7946165624476_831ef3e79b091b9027d6a7264b93eed2.jpg",
      title: "Hầm để xe & Đường dẫn liên kết",
      desc: "Lối xuống hầm gửi xe liên kết rộng rãi, đang được hoàn thiện sơn và hệ thống chỉ dẫn."
    },
    {
      src: "/renders/z7946165633218_f50a49a936d33537f0bbe07c5bd646bf.jpg",
      title: "Khuôn viên cảnh quan cây xanh",
      desc: "Trồng cây bóng mát, lát đá lối đi dạo nội khu để chuẩn bị đón những cư dân đầu tiên."
    },
    {
      src: "/renders/z7946165640415_4b56e131c9e3b66f11328618672210f8.jpg",
      title: "Trải thảm nhựa đường nội bộ",
      desc: "Hạ tầng giao thông quanh block nhà được thảm nhựa asphalt bằng phẳng và sạch đẹp."
    },
    {
      src: "/renders/z7946165647245_83b81355e2af10d899fc8d406545988a.jpg",
      title: "Không gian hành lang chung",
      desc: "Hành lang căn hộ rộng rãi, sạch sẽ với hệ thống đèn led tiết kiệm điện và cửa thoát hiểm."
    },
    {
      src: "/renders/z7946169811123_c19e55658c59d0f96bd04cf73de78dcf.jpg",
      title: "Hệ thống PCCC tiêu chuẩn",
      desc: "Tủ PCCC và các đầu phun nước tự động được thi công đồng bộ, đã được Công an tỉnh nghiệm thu."
    }
  ];

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
          message: 'Đăng ký thành công! Đội ngũ pháp lý Tùng Bách sẽ liên hệ hướng dẫn hồ sơ cho bạn.'
        });
        setFormData({ name: '', phone: '', email: '', notes: '', source: 'NOXH Subpage Form' });
      } else {
        setFormStatus({ success: false, message: result.message || 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    } catch (error) {
      console.log('API failed, redirecting to Zalo...', error);
      
      const message = `Chào Tùng Bách BĐS, tôi đăng ký tư vấn dự án Nhà ở xã hội Quế Võ. Thông tin:\n- Họ tên: ${formData.name}\n- SĐT: ${formData.phone}${formData.email ? `\n- Email: ${formData.email}` : ''}${formData.notes ? `\n- Ghi chú: ${formData.notes}` : ''}`;
      
      setFormStatus({
        success: true,
        message: 'Đang kết nối Zalo hotline hỗ trợ trực tiếp...'
      });

      setTimeout(() => {
        try {
          navigator.clipboard.writeText(message);
          alert('Đã tự động copy thông tin đăng ký của bạn. Hãy dán (Ctrl+V) vào khung chat Zalo của Tùng Bách để được hỗ trợ nhanh nhất!');
        } catch (clipError) {
          console.error('Clipboard failed:', clipError);
        }
        window.open('https://zalo.me/0393005566', '_blank');
        setFormStatus({});
        setFormData({ name: '', phone: '', email: '', notes: '', source: 'NOXH Subpage Form' });
      }, 1000);
    }
  };

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
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest shadow-sm">
            Dự án trọng điểm mở bán đợt cuối
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl leading-tight">
            Nhà Ở Xã Hội <br />
            <span className="text-primary dark:text-accent font-black">TÙNG BÁCH QUẾ VÕ</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary dark:bg-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2 text-justify md:text-center">
            Tọa lạc tại vị trí chiến lược thuộc phường Phương Liễu, thị xã Quế Võ, tỉnh Bắc Ninh, dự án là tổ hợp chung cư an sinh chất lượng cao được phát triển bởi Công ty TNHH Tùng Bách nhằm giải quyết nhu cầu nhà ở thực của cư dân và công nhân lao động.
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
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Quyết định phê duyệt:</span>
                <span className="text-right text-slate-600 dark:text-slate-300 font-mono">Quyết định số 432/QĐ-UBND ngày 03/08/2018 của UBND tỉnh Bắc Ninh</span>
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
                <span className="font-bold text-slate-900 dark:text-white">Tổng mức đầu tư:</span>
                <span className="text-right text-slate-600 dark:text-slate-300">Hơn 900 tỷ đồng</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Hiện trạng thực tế:</span>
                <span className="text-right text-emerald-600 dark:text-emerald-400 font-bold">Hoàn thiện cảnh quan nội khu, chuẩn bị bàn giao nhà (Tháng 06/2026)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights & Facilities Info */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Hạ Tầng Tiện Ích Đạt Chuẩn</h4>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex gap-2">
                <span className="text-primary dark:text-accent font-bold">✓</span>
                <span><strong>Hệ thống PCCC an toàn:</strong> Được thi công đồng bộ và đã được Công an tỉnh Bắc Ninh kiểm tra, nghiệm thu đạt tiêu chuẩn kỹ thuật an toàn phòng cháy chữa cháy.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary dark:text-accent font-bold">✓</span>
                <span><strong>Nhà trẻ nội khu:</strong> Bố trí hơn 500m² tại tầng 2 của các block nhà phục vụ giáo dục mầm non chất lượng cao cho con em cư dân.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary dark:text-accent font-bold">✓</span>
                <span><strong>Bãi đỗ xe:</strong> 2 tầng bãi đỗ xe rộng rãi liên thông dưới các block, đảm bảo chỗ đỗ xe máy và xe ô tô an toàn.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary dark:text-accent font-bold">✓</span>
                <span><strong>Cảnh quan xanh:</strong> Đường đi dạo nội khu lát đá, trồng cây bóng mát và khuôn viên dạo bộ, mang lại bầu không khí trong lành.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Kết Nối Vùng Thuận Tiện</h4>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-emerald-950/30 rounded-lg flex justify-between items-center text-sm border-l-4 border-accent">
                <span className="font-semibold text-slate-900 dark:text-white">Khu công nghiệp Quế Võ 1, 2</span>
                <span className="text-xs text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">2 Phút di chuyển</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-emerald-950/30 rounded-lg flex justify-between items-center text-sm border-l-4 border-accent">
                <span className="font-semibold text-slate-900 dark:text-white">Trung tâm thành phố Bắc Ninh</span>
                <span className="text-xs text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">10 Phút di chuyển</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-emerald-950/30 rounded-lg flex justify-between items-center text-sm border-l-4 border-accent">
                <span className="font-semibold text-slate-900 dark:text-white">Trường học & Chợ dân sinh</span>
                <span className="text-xs text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">5 Phút đi bộ</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-emerald-950/30 rounded-lg flex justify-between items-center text-sm border-l-4 border-accent">
                <span className="font-semibold text-slate-900 dark:text-white">Cao tốc Hà Nội - Lạng Sơn</span>
                <span className="text-xs text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">5 Phút di chuyển</span>
              </div>
            </div>
          </div>
        </div>

        {/* PHOTO GALLERY - Actual photos of construction site */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Thư Viện Ảnh Thực Tế</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Hình Ảnh Thực Tế Tại Công Trường</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto text-sm text-justify md:text-center animate-fade-in">
              Hình ảnh cập nhật tiến độ thi công hạ tầng đường bao, cảnh quan nội khu và cấu trúc xây dựng thực tế của các tháp chung cư.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            <p className="text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto text-sm text-justify md:text-center">
              Xem các bài báo chính thống đưa tin về hoạt động nghiệm thu phòng cháy chữa cháy, tiến độ thi công và các buổi giám sát thực tế của Thường trực HĐND tỉnh Bắc Ninh.
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

        {/* REGISTRATION FORM */}
        <div className="grid lg:grid-cols-12 gap-12 items-center bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-emerald-900 shadow-md">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block">Tư Vấn Pháp Lý Hỗ Trợ Hồ Sơ</span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                Đăng Ký Tư Vấn Thủ Tục Hồ Sơ Mua Nhà
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-justify">
              Nhà ở xã hội yêu cầu các điều kiện đặc thù về hộ khẩu, tình trạng nhà ở và thu nhập. Hãy đăng ký thông tin để bộ phận pháp lý của Tùng Bách liên hệ trực tiếp hướng dẫn chuẩn bị các giấy tờ xác nhận đúng theo mẫu quy chuẩn quy định, đảm bảo khả năng xét duyệt nhanh nhất.
            </p>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                <span>Tư vấn hộ khẩu, tạm trú và xác nhận BHXH tại Bắc Ninh.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                <span>Hướng dẫn làm giấy xác nhận chưa sở hữu nhà ở/đất nền.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                <span>Cung cấp hồ sơ mẫu xác nhận thu nhập thấp (không đóng thuế TNCN).</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Thông Tin Đăng Ký</h3>
            
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
                  placeholder="0912345678"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Địa chỉ Email
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
                  Nhu cầu chi tiết (Diện tích quan tâm, câu hỏi...)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-950 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Tôi muốn đăng ký mua căn hộ..."
                ></textarea>
              </div>

              {formStatus.message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${formStatus.success ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900' : 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900'}`}>
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus.loading}
                className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-hover disabled:bg-slate-400 text-white font-bold text-center shadow-lg transition-transform hover:scale-102 active:scale-98 text-sm"
              >
                {formStatus.loading ? 'Đang gửi thông tin...' : 'GỬI ĐĂNG KÝ HỒ SƠ'}
              </button>
            </form>
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
