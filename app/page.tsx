'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Typings
interface FormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
  source: string;
}

export default function Home() {
  const [animateIn, setAnimateIn] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 3. Eligibility Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [quizResult, setQuizResult] = useState<string>('');

  // 4. Contact Form State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    notes: '',
    source: 'Landing Page Form'
  });
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
    loading?: boolean;
  }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Gallery Images from public/renders
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

  // Eligibility Quiz questions
  const quizQuestions = [
    {
      q: "Bạn có Hộ khẩu thường trú tại Bắc Ninh, hoặc có Tạm trú + đóng Bảo hiểm xã hội trên 1 năm tại Bắc Ninh không?",
      condition: "Residency"
    },
    {
      q: "Bạn và các thành viên trong hộ gia đình đã sở hữu nhà ở riêng lẻ hoặc đất nền nào tại tỉnh Bắc Ninh chưa?",
      condition: "NoOwnHouse" // Needs to be FALSE
    },
    {
      q: "Bạn có thuộc đối tượng đóng Thuế thu nhập cá nhân thường xuyên không (thu nhập cá nhân chịu thuế trên mức giảm trừ gia cảnh)?",
      condition: "LowIncome" // Needs to be FALSE
    },
    {
      q: "Bạn có thuộc đối tượng ưu tiên mua NOXH không (như công nhân KCN, cán bộ công nhân viên chức, người có công...)?",
      condition: "PriorityGroup"
    }
  ];

  const handleQuizAnswer = (answer: boolean) => {
    const nextAnswers = { ...quizAnswers, [quizStep]: answer };
    setQuizAnswers(nextAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Evaluate result
      const hasResidency = nextAnswers[0];
      const hasNoHouse = !nextAnswers[1]; // True if they answer NO to owning a house
      const isLowIncome = !nextAnswers[2]; // True if they answer NO to paying regular PIT
      const isPriority = nextAnswers[3];

      if (hasResidency && hasNoHouse && isLowIncome) {
        setQuizResult('eligible');
      } else {
        let issues = [];
        if (!hasResidency) issues.push('Điều kiện hộ khẩu/tạm trú tại Bắc Ninh');
        if (!hasNoHouse) issues.push('Điều kiện chưa sở hữu nhà ở tại địa bàn');
        if (!isLowIncome) issues.push('Điều kiện mức thu nhập (không đóng thuế TNCN thường xuyên)');
        setQuizResult(`ineligible:${issues.join(', ')}`);
      }
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult('');
  };

  // Form submission handler
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

      if (response.status === 404) {
        throw new Error('API Route not found (Static Export)');
      }

      const result = await response.json();
      if (result.success) {
        setFormStatus({
          success: true,
          message: 'Đăng ký thành công! Đội ngũ tư vấn Tùng Bách sẽ liên hệ với bạn trong thời gian sớm nhất.'
        });
        setFormData({ name: '', phone: '', email: '', notes: '', source: 'Landing Page Form' });
      } else {
        setFormStatus({ success: false, message: result.message || 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    } catch (error) {
      console.log('API failed, falling back to Zalo redirect...', error);
      
      const message = `Chào Tùng Bách BĐS, tôi muốn đăng ký tư vấn dự án Nhà ở xã hội Quế Võ. Thông tin:\n- Họ tên: ${formData.name}\n- SĐT: ${formData.phone}${formData.email ? `\n- Email: ${formData.email}` : ''}${formData.notes ? `\n- Nhu cầu: ${formData.notes}` : ''}`;
      
      setFormStatus({
        success: true,
        message: 'Đang chuyển hướng bạn sang Zalo để chat trực tiếp với chúng tôi...'
      });

      setTimeout(() => {
        try {
          navigator.clipboard.writeText(message);
          alert('Đã tự động copy thông tin đăng ký của bạn. Hãy dán (Ctrl+V) vào khung chat Zalo của Tùng Bách để được hỗ trợ nhanh nhất!');
        } catch (clipError) {
          console.error('Clipboard write failed:', clipError);
        }
        window.open('https://zalo.me/0393005566', '_blank');
        setFormStatus({});
        setFormData({ name: '', phone: '', email: '', notes: '', source: 'Landing Page Form' });
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
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-primary via-emerald-900 to-slate-900 text-white py-24 md:py-36 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/45 z-0"></div>
        {/* Visual Abstract Elements */}
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-accent/20 filter blur-3xl z-0"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-primary-light/10 filter blur-3xl z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="md:col-span-7 space-y-6 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest shadow-md">
                Dự án trọng điểm Quế Võ, Bắc Ninh
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-normal leading-normal">
                Nhà Ở Xã Hội <br />
                <span className="text-accent">TÙNG BÁCH</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed text-justify">
                Giải pháp an cư lý tưởng cho công nhân viên và người lao động tại trung tâm công nghiệp Quế Võ, Bắc Ninh. Thiết kế hiện đại, hồ sơ pháp lý minh bạch, hỗ trợ vay 80% lãi suất ưu đãi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <a 
                  href="#register" 
                  className="px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-bold text-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Đăng Ký Tư Vấn Ngay
                </a>
                <a 
                  href="#overview" 
                  className="px-8 py-3.5 rounded-full border-2 border-white/80 hover:bg-white hover:text-primary text-white font-semibold text-center transition-colors"
                >
                  Tìm Hiểu Chi Tiết
                </a>
              </div>
            </div>

            {/* Hero Right Media/Image - 3D Staggered Slice Animation */}
            <div className="md:col-span-5 relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-800/40 aspect-[4/3] md:aspect-auto">
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900/60">
                
                {/* Background blurred render as backdrop */}
                <Image
                  src="/renders/raw up-top building.jpg"
                  alt="Backdrop"
                  fill
                  priority
                  className="object-cover opacity-15 blur-sm scale-105"
                />
                
                {/* 5 building slices absolute stacked with staggered transitions */}
                <div className="absolute inset-0 w-full h-full">
                  {/* Slice 5 (Base / Ground floor) - Slides up */}
                  <div 
                    className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: animateIn ? 'translateY(0) scale(1)' : 'translateY(80px) scale(0.95)',
                      opacity: animateIn ? 1 : 0,
                      transitionDelay: '0ms'
                    }}
                  >
                    <Image
                      src="/renders/building_slice_5.png"
                      alt="Tòa nhà Tùng Bách - Lớp 5"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* Slice 4 (Lower floors) - Slides in from right */}
                  <div 
                    className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: animateIn ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.95)',
                      opacity: animateIn ? 1 : 0,
                      transitionDelay: '150ms'
                    }}
                  >
                    <Image
                      src="/renders/building_slice_4.png"
                      alt="Tòa nhà Tùng Bách - Lớp 4"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* Slice 3 (Middle floors) - Slides in from left */}
                  <div 
                    className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: animateIn ? 'translateX(0) scale(1)' : 'translateX(-100px) scale(0.95)',
                      opacity: animateIn ? 1 : 0,
                      transitionDelay: '300ms'
                    }}
                  >
                    <Image
                      src="/renders/building_slice_3.png"
                      alt="Tòa nhà Tùng Bách - Lớp 3"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* Slice 2 (Upper floors) - Slides in from right */}
                  <div 
                    className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: animateIn ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.95)',
                      opacity: animateIn ? 1 : 0,
                      transitionDelay: '450ms'
                    }}
                  >
                    <Image
                      src="/renders/building_slice_2.png"
                      alt="Tòa nhà Tùng Bách - Lớp 2"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* Slice 1 (Top / Roof) - Slides down & slightly left */}
                  <div 
                    className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: animateIn ? 'translateY(0) translateX(0) scale(1)' : 'translateY(-50px) translateX(-30px) scale(0.95)',
                      opacity: animateIn ? 1 : 0,
                      transitionDelay: '600ms'
                    }}
                  >
                    <Image
                      src="/renders/building_slice_1.png"
                      alt="Tòa nhà Tùng Bách - Lớp 1"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Overlay text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6 z-10">
                  <h3 className="text-lg font-bold text-white">Ảnh thực tế bay drone</h3>
                  <p className="text-xs text-slate-300 mt-1">Dự án Nhà ở xã hội Tùng Bách Quế Võ, Bắc Ninh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Smooth Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* OVERVIEW SECTION */}
      <section id="overview" className="py-20 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-accent uppercase tracking-widest">Tổng Quan Dự Án</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Nơi Khởi Đầu Hành Trình An Cư Bền Vững
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-slate-600 dark:text-slate-300 font-light text-justify">
              Dự án Nhà ở xã hội Tùng Bách nằm tại phường Phương Liễu, thị xã Quế Võ, Bắc Ninh. Dự án được quy hoạch bài bản nhằm cung ứng nhu cầu nhà ở thiết thực cho hàng ngàn người lao động trong khu vực.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light dark:bg-emerald-900 flex items-center justify-center text-primary dark:text-accent mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Vị Trí Vàng</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Phường Phương Liễu, Thị xã Quế Võ, Bắc Ninh. Sát cạnh các KCN lớn.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light dark:bg-emerald-900 flex items-center justify-center text-primary dark:text-accent mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Quy Mô Lớn</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">4 Tòa chung cư 12 tầng (CT01A, CT01B, CT01 - CT04), hơn 900 căn hộ.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light dark:bg-emerald-900 flex items-center justify-center text-primary dark:text-accent mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 20l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Diện Tích Tối Ưu</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Thiết kế thông minh căn 1.5 phòng ngủ đến 2 phòng ngủ (47m² - 70m²).</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light dark:bg-emerald-900 flex items-center justify-center text-primary dark:text-accent mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pháp Lý Vững Chắc</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Được phê duyệt bởi cơ quan chức năng, nghiệm thu PCCC hoàn tất, ký HĐMB trực tiếp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient border at top */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 via-accent/40 via-primary/30 to-transparent relative z-10" />

      {/* HIGHLIGHTS / FACILITIES SECTION */}
      <section id="highlights" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-emerald-950/10 dark:to-slate-900 scroll-mt-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Highlights Left: Info cards */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block">Tiện Ích Nổi Bật</span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                  Chất Lượng Sống Vượt Trội <br />Trong Tầm Tay
                </h2>
                <div className="w-16 h-1 bg-primary rounded"></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Khuôn viên cảnh quan xanh</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-justify">Hệ thống công viên nội khu được đầu tư cây xanh bóng mát, vườn hoa mang lại không khí thoáng đãng.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Nhà trẻ tiện ích</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-justify">Dành riêng hơn 500m² tại tầng 2 của hai tòa tháp làm trường mầm non nội khu chất lượng cao.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Hầm gửi xe rộng rãi</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-justify">Bố trí 2 tầng phục vụ đỗ xe máy và ô tô cho cư dân, quy hoạch thông thoáng và an toàn.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Nghiệm thu PCCC an toàn</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 text-justify">Hệ thống báo cháy tự động và họng chữa cháy hiện đại, đã được Công an tỉnh Bắc Ninh nghiệm thu an toàn.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Right: Connection map info */}
            <div className="lg:col-span-5 bg-white dark:bg-emerald-950/20 p-8 rounded-2xl border border-slate-200/60 dark:border-emerald-800/40 shadow-md">
              <h3 className="font-bold text-lg text-slate-950 dark:text-white mb-4">Vị trí kết nối vùng</h3>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-emerald-950/50 rounded-lg flex justify-between items-center text-sm border-l-4 border-primary">
                  <span className="font-medium">KCN Quế Võ 1, 2</span>
                  <span className="text-xs text-accent font-semibold bg-accent-light dark:bg-amber-950 px-2 py-0.5 rounded">2 Phút di chuyển</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-emerald-950/50 rounded-lg flex justify-between items-center text-sm border-l-4 border-primary">
                  <span className="font-medium">Trung tâm TP Bắc Ninh</span>
                  <span className="text-xs text-accent font-semibold bg-accent-light dark:bg-amber-950 px-2 py-0.5 rounded">10 Phút di chuyển</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-emerald-950/50 rounded-lg flex justify-between items-center text-sm border-l-4 border-primary">
                  <span className="font-medium">Trường học, Chợ dân sinh</span>
                  <span className="text-xs text-accent font-semibold bg-accent-light dark:bg-amber-950 px-2 py-0.5 rounded">5 Phút đi bộ</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-emerald-950/50 rounded-lg flex justify-between items-center text-sm border-l-4 border-primary">
                  <span className="font-medium">Cao tốc Hà Nội - Lạng Sơn</span>
                  <span className="text-xs text-accent font-semibold bg-accent-light dark:bg-amber-950 px-2 py-0.5 rounded">5 Phút di chuyển</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 via-accent/30 via-primary/20 to-transparent relative z-10" />

      {/* PREMIUM FEATURE 2: ELIGIBILITY QUIZ */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Tính Pháp Lý</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Đánh Giá Điều Kiện Mua Nhà Ở Xã Hội
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nhà ở xã hội Tùng Bách là sản phẩm hỗ trợ người lao động có điều kiện đặc thù. Hãy trả lời nhanh {quizQuestions.length} câu hỏi để kiểm tra khả năng xét duyệt hồ sơ của bạn.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/60 dark:border-emerald-800/40 shadow-sm min-h-[250px] flex flex-col justify-center">
            {quizStep < 4 ? (
              // Quiz Active Step
              <div className="space-y-6 text-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:text-accent font-bold rounded-full text-xs">
                  Câu hỏi {quizStep + 1} / {quizQuestions.length}
                </span>
                <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-relaxed max-w-xl mx-auto">
                  {quizQuestions[quizStep].q}
                </p>
                <div className="flex justify-center gap-6 pt-4">
                  <button
                    onClick={() => handleQuizAnswer(true)}
                    className="px-8 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-bold shadow-md transition-transform hover:scale-105 active:scale-95 w-32"
                  >
                    CÓ
                  </button>
                  <button
                    onClick={() => handleQuizAnswer(false)}
                    className="px-8 py-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold shadow-md transition-transform hover:scale-105 active:scale-95 w-32"
                  >
                    KHÔNG
                  </button>
                </div>
              </div>
            ) : (
              // Quiz Results
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-light dark:bg-emerald-900 flex items-center justify-center mx-auto text-primary dark:text-accent text-3xl">
                  {quizResult === 'eligible' ? '🎉' : '⚠️'}
                </div>
                
                {quizResult === 'eligible' ? (
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Chúc mừng! Bạn có tỷ lệ duyệt hồ sơ rất cao</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                      Dựa trên các câu trả lời của bạn, bạn hoàn toàn đáp ứng các điều kiện pháp lý để đăng ký mua căn hộ. Hãy đăng ký tư vấn pháp lý để được hướng dẫn nộp hồ sơ sớm nhất.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Bạn cần lưu ý điều kiện pháp lý</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                      Hồ sơ của bạn có thể gặp vướng mắc về: <br />
                      <span className="font-bold text-accent mt-1 block">{quizResult.replace('ineligible:', '')}</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      Đừng lo lắng, hãy liên hệ trực tiếp với chúng tôi để nhân viên pháp lý tư vấn cách thức xử lý và bổ sung hồ sơ phù hợp.
                    </p>
                  </div>
                )}

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-100"
                  >
                    Làm lại trắc nghiệm
                  </button>
                  <a
                    href="#register"
                    className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow hover:bg-primary-hover"
                  >
                    Tư vấn pháp lý ngay
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gradient border at top */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 via-accent/40 via-primary/30 to-transparent relative z-10" />

      {/* PREMIUM FEATURE 3: TIMELINE */}
      <section id="progress" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-emerald-950/10 dark:to-slate-900 scroll-mt-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold text-accent uppercase tracking-widest">Tiến Độ Dự Án</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Hành Trình Kiến Tạo Tổ Ấm
            </p>
            <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-slate-600 dark:text-slate-300 font-light text-justify">
              Chúng tôi cam kết thi công đúng tiến độ dự án đề ra và cập nhật thông tin minh bạch định kỳ đến các chủ nhân tương lai.
            </p>
          </div>

          {/* Timeline chart with real schedule */}
          <div className="relative border-l-2 border-primary/20 dark:border-emerald-800 ml-4 md:ml-32 space-y-12 mb-20">
            
            {/* Timeline item 1 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-primary dark:text-accent md:-ml-36 pr-4">
                  Tháng 06/2026
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Hoàn thiện cảnh quan & Bàn giao cư dân</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-justify">Hoàn thành thi công vườn hoa nội khu, vỉa hè lát đá và trải nhựa đường bao quanh các block nhà. Nộp hồ sơ nghiệm thu hoàn thành lên Sở Xây dựng để chính thức bàn giao chìa khóa cho cư dân.</p>
                </div>
              </div>
            </div>

            {/* Timeline item 2 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Tháng 05/2026
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Giám sát của Thường trực HĐND tỉnh & Mở bán Đợt 3</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-justify">Đoàn giám sát của HĐND tỉnh Bắc Ninh do Phó Chủ tịch HĐND tỉnh Lâm Thị Hương Thành làm Trưởng đoàn tiến hành giám sát thực tế dự án, đánh giá cao kết cấu hạ tầng đồng bộ. Chủ đầu tư mở bán chính thức Đợt 3.</p>
                </div>
              </div>
            </div>

            {/* Timeline item 3 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Đầu năm 2026
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Nghiệm thu PCCC an toàn & Bàn giao kỹ thuật</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-justify">Cơ quan Công an PCCC tỉnh Bắc Ninh chính thức nghiệm thu hệ thống Phòng cháy chữa cháy đạt chuẩn an toàn. Chủ đầu tư hoàn thành bàn giao kỹ thuật cho gần 500 căn hộ đầu tiên.</p>
                </div>
              </div>
            </div>

            {/* Timeline item 4 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Tháng 09/2024
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Khởi công công trình</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-justify">Chính thức làm lễ khởi công xây dựng dự án với tổng mức đầu tư hơn 900 tỷ đồng, thi công liên tục cọc đài móng và hầm liên kết chung đài móng.</p>
                </div>
              </div>
            </div>

          </div>

          {/* PROJECT PROGRESS GALLERY - Masonry Grid */}
          <div className="space-y-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block">Thư Viện Ảnh Tiến Độ Thực Tế</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hình Ảnh Chụp Tại Công Trường</h3>
              <div className="w-12 h-0.5 bg-primary mx-auto rounded"></div>
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

        </div>
      </section>

      {/* Lightbox Modal for Gallery Images */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          {/* Header Controls */}
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

          {/* Image & Navigation */}
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

          {/* Footer Text Details */}
          <div className="text-center text-white max-w-2xl mx-auto space-y-1 pb-4 z-10">
            <h4 className="font-bold text-lg">{galleryImages[lightboxIndex].title}</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">{galleryImages[lightboxIndex].desc}</p>
          </div>
        </div>
      )}

      {/* Gradient border at top */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 via-accent/40 via-primary/30 to-transparent relative z-10" />

      {/* MEDIA & PRESS COVERAGE SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Truyền Thông nói về chúng tôi</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Báo Chí nói về Dự Án
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-slate-600 dark:text-slate-300 font-light text-justify md:text-center">
              Các bài đưa tin chính thức từ cơ quan báo chí và truyền thông quốc gia đưa tin về tiến độ thi công, an toàn phòng cháy chữa cháy và hoạt động giám sát pháp lý của dự án.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Bao Xay Dung */}
            <div className="bg-slate-50 dark:bg-emerald-950/20 p-6 rounded-3xl border border-slate-200/40 dark:border-emerald-800/40 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
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
            <div className="bg-slate-50 dark:bg-emerald-950/20 p-6 rounded-3xl border border-slate-200/40 dark:border-emerald-800/40 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
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
      </section>

      {/* Gradient border at bottom */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 via-accent/40 via-primary/30 to-transparent relative z-10" />

      {/* REGISTRATION & CONTACT FORM SECTION */}
      <section id="register" className="py-20 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Form Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block">Đăng Ký Tư Vấn</span>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                  Sở Hữu Căn Hộ Tùng Bách Ngay Hôm Nay
                </h2>
                <div className="w-16 h-1 bg-primary rounded"></div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-justify">
                Đừng bỏ lỡ cơ hội nhận thông tin bảng hàng mở bán đợt cuối và được đội ngũ hỗ trợ pháp lý của Công ty TNHH Tùng Bách hướng dẫn làm hồ sơ xét duyệt mua/thuê nhà đúng quy chuẩn.
              </p>
              
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Hỗ trợ tư vấn chuẩn bị thủ tục pháp lý đúng quy định Bộ Xây Dựng.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Nhận trọn bộ bảng hàng, mặt bằng chi tiết các tòa.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-light dark:bg-emerald-900 text-primary dark:text-accent flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Đăng ký tham quan thực tế các căn hộ hoàn thiện tại dự án.</span>
                </div>
              </div>
            </div>

            {/* Form Right Input form */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900 shadow-md">
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-900 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-900 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="0912345678"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-900 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="nguyenvana@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Yêu cầu chi tiết (Diện tích quan tâm, tầng...)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-emerald-900 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Tôi cần tìm hiểu căn hộ 61m2..."
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
                  {formStatus.loading ? 'Đang gửi thông tin...' : 'GỬI ĐĂNG KÝ NGAY'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Gradient border at bottom */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 via-accent/40 via-primary/30 to-transparent relative z-10" />

    </div>
  );
}
