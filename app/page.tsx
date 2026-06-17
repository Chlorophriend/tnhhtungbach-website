'use client';

import React, { useState } from 'react';
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
  // 1. Apartment Selector State
  const [selectedLayout, setSelectedLayout] = useState<'A' | 'B'>('A');

  // 2. Financial Calculator State
  const [apartmentPrice, setApartmentPrice] = useState<number>(854000000); // 61m2 * 14m/m2
  const [loanPercent, setLoanPercent] = useState<number>(70);
  const [loanYears, setLoanYears] = useState<number>(20);

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

  // Financial calculations
  const loanAmount = (apartmentPrice * loanPercent) / 100;
  const interestRateYear = 5.0; // 5% yearly policy interest rate for social housing
  const interestRateMonth = (interestRateYear / 100) / 12;
  const totalMonths = loanYears * 12;
  // Principal payment monthly
  const monthlyPrincipal = loanAmount / totalMonths;
  // First month interest
  const firstMonthInterest = loanAmount * interestRateMonth;
  const firstMonthTotal = monthlyPrincipal + firstMonthInterest;

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
      
      // Copy registration info to clipboard so they can paste it in Zalo chat
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
        // Open Zalo. You can replace "02300290374" with your Zalo hotline mobile number
        window.open('https://zalo.me/02300290374', '_blank');
        setFormStatus({});
        setFormData({ name: '', phone: '', email: '', notes: '', source: 'Landing Page Form' });
      }, 1000);
    }
  };

  const handleApartmentSelect = (layout: 'A' | 'B') => {
    setSelectedLayout(layout);
    if (layout === 'A') {
      setApartmentPrice(854000000); // 61m2 * 14m/m2
    } else {
      setApartmentPrice(1000000000); // 71.3m2 * 14m/m2
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Nhà Ở Xã Hội <br />
                <span className="text-accent">TÙNG BÁCH</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed">
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

            {/* Hero Right Media/Image */}
            <div className="md:col-span-5 relative w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-800">
              <Image
                src="/renders/project_render.png"
                alt="Phối cảnh dự án Nhà ở xã hội Tùng Bách Quế Võ"
                fill
                priority
                className="object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-lg font-bold text-white">Phối cảnh thực tế</h3>
                <p className="text-xs text-slate-300 mt-1">Dự án Nhà ở xã hội Tùng Bách Quế Võ, Bắc Ninh</p>
              </div>
            </div>
          </div>
        </div>
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
            <p className="text-slate-600 dark:text-slate-300 font-light">
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
              <p className="text-sm text-slate-500 dark:text-slate-400">Thiết kế thông minh từ 61m² (2PN, 1WC) đến 71.3m² (2PN, 2WC).</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-light dark:bg-emerald-900 flex items-center justify-center text-primary dark:text-accent mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pháp Lý Vững Chắc</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Được phê duyệt bởi cơ quan chức năng, hỗ trợ ký HĐMB trực tiếp chủ đầu tư.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS / FACILITIES SECTION */}
      <section id="highlights" className="py-20 bg-slate-50 dark:bg-emerald-950/10 scroll-mt-16 border-y border-slate-200/50 dark:border-emerald-900/30">
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
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Hệ thống công viên nội khu sạch sẽ, bồn hoa và cây cỏ mang lại không khí mát lành.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Khu vui chơi trẻ em</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sân chơi an toàn rộng rãi cho các bé thoải mái sáng tạo và vận động ngoài trời.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Hầm để xe rộng rãi</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Khu vực đỗ xe máy, ô tô an ninh được thiết kế quy chuẩn hiện đại.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Hệ thống an ninh 24/7</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Bảo vệ trực chốt kiểm soát cùng camera giám sát toàn khu liên tục.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Right: Interactive SVG Map/Concept mockup */}
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

      {/* APARTMENT SELECTOR SECTION */}
      <section id="layouts" className="py-20 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-xs font-bold text-accent uppercase tracking-widest">Mặt Bằng Căn Hộ</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Không Gian Sống Tinh Tế & Khoa Học
            </p>
            <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-slate-600 dark:text-slate-300 font-light">
              Mỗi căn hộ tại NOXH Tùng Bách đều được thiết kế thông minh, tối ưu hóa diện tích sử dụng, đón trọn ánh sáng tự nhiên và luồng gió mát đối lưu.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => handleApartmentSelect('A')}
              className={`px-6 py-3 rounded-full font-bold text-sm shadow transition-all ${
                selectedLayout === 'A'
                  ? 'bg-primary text-white scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Căn Hộ Mẫu A (61.0 m²)
            </button>
            <button
              onClick={() => handleApartmentSelect('B')}
              className={`px-6 py-3 rounded-full font-bold text-sm shadow transition-all ${
                selectedLayout === 'B'
                  ? 'bg-primary text-white scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Căn Hộ Mẫu B (71.3 m²)
            </button>
          </div>

          {/* Interactive display */}
          <div className="grid lg:grid-cols-12 gap-12 items-center bg-slate-50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900">
            {/* Visual SVG blueprint */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/50 dark:border-emerald-900 shadow-inner flex justify-center">
              {selectedLayout === 'A' ? (
                // SVG floor plan sketch for 61m2
                <svg className="w-full max-w-md h-72" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="380" height="230" rx="4" stroke="#064e3b" strokeWidth="3" fill="#ecfdf5" fillOpacity="0.3"/>
                  {/* Living room */}
                  <rect x="10" y="10" width="160" height="150" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="35" y="90" fill="#064e3b" fontSize="14" fontWeight="bold">PHÒNG KHÁCH</text>
                  <text x="35" y="110" fill="#64748b" fontSize="10">Kèm khu Bếp + Ăn</text>
                  {/* Master Bedroom */}
                  <rect x="170" y="10" width="110" height="130" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="185" y="70" fill="#064e3b" fontSize="11" fontWeight="bold">PHÒNG NGỦ 1</text>
                  {/* Small Bedroom */}
                  <rect x="280" y="10" width="110" height="130" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="295" y="70" fill="#064e3b" fontSize="11" fontWeight="bold">PHÒNG NGỦ 2</text>
                  {/* Bathroom */}
                  <rect x="170" y="140" width="100" height="100" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="200" y="195" fill="#064e3b" fontSize="12" fontWeight="bold">WC</text>
                  {/* Balcony */}
                  <rect x="10" y="160" width="160" height="80" stroke="#064e3b" strokeWidth="2" fill="#f8fafc"/>
                  <text x="70" y="205" fill="#064e3b" fontSize="12" fontWeight="bold">LÔ GIA</text>
                  {/* Entry arrow */}
                  <path d="M 285 240 L 285 200" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow)"/>
                  <text x="295" y="225" fill="#d97706" fontSize="10" fontWeight="bold">LỐI VÀO</text>
                </svg>
              ) : (
                // SVG floor plan sketch for 71.3m2
                <svg className="w-full max-w-md h-72" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="380" height="230" rx="4" stroke="#064e3b" strokeWidth="3" fill="#ecfdf5" fillOpacity="0.3"/>
                  {/* Living room */}
                  <rect x="10" y="10" width="180" height="130" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="45" y="70" fill="#064e3b" fontSize="14" fontWeight="bold">PHÒNG KHÁCH</text>
                  <text x="45" y="90" fill="#64748b" fontSize="10">Rộng rãi thoáng đãng</text>
                  {/* Master Bedroom */}
                  <rect x="190" y="10" width="100" height="150" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="200" y="80" fill="#064e3b" fontSize="11" fontWeight="bold">PN MASTER</text>
                  <rect x="190" y="120" width="50" height="40" stroke="#064e3b" strokeWidth="1" fill="#f8fafc"/>
                  <text x="205" y="145" fill="#064e3b" fontSize="9" fontWeight="bold">WC 1</text>
                  {/* Small Bedroom */}
                  <rect x="290" y="10" width="100" height="150" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="310" y="80" fill="#064e3b" fontSize="11" fontWeight="bold">PHÒNG NGỦ 2</text>
                  {/* Shared Bathroom */}
                  <rect x="290" y="160" width="100" height="80" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="325" y="205" fill="#064e3b" fontSize="12" fontWeight="bold">WC 2</text>
                  {/* Kitchen */}
                  <rect x="10" y="140" width="110" height="100" stroke="#064e3b" strokeWidth="2" fill="#fff"/>
                  <text x="45" y="195" fill="#064e3b" fontSize="12" fontWeight="bold">BẾP</text>
                  {/* Balcony 1 */}
                  <rect x="120" y="140" width="70" height="100" stroke="#064e3b" strokeWidth="2" fill="#f8fafc"/>
                  <text x="135" y="195" fill="#064e3b" fontSize="10" fontWeight="bold">LÔ GIA 1</text>
                  {/* Balcony 2 */}
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
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
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
                <a
                  href="#register"
                  className="inline-block px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow transition-all hover:scale-105"
                >
                  Đăng ký tham quan căn hộ mẫu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM FEATURE 1: LOAN / FINANCIAL CALCULATOR */}
      <section className="py-20 bg-slate-50 dark:bg-emerald-950/10 border-y border-slate-200/50 dark:border-emerald-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">Tính Toán Tài Chính</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Bảng Ước Tính Trả Góp Hàng Tháng
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Công cụ hỗ trợ bạn ước lượng mức chi trả gốc và lãi suất hàng tháng khi mua nhà xã hội Tùng Bách theo chính sách nhà nước ưu đãi (lãi suất ổn định 5%/năm).
            </p>
          </div>

          <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl shadow-md border border-slate-200/60 dark:border-emerald-800/40 space-y-8">
            {/* Input sliders */}
            <div className="space-y-6">
              {/* Option toggle */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setApartmentPrice(selectedLayout === 'A' ? 854000000 : 1000000000)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-emerald-900 text-xs font-bold bg-slate-50 dark:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Đặt lại theo căn hộ mẫu đang xem
                </button>
              </div>

              {/* Slider 1: Apartment value */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Giá trị căn hộ:</span>
                  <span className="font-bold text-primary dark:text-accent">{(apartmentPrice / 1000000).toFixed(0)} Triệu VNĐ</span>
                </div>
                <input 
                  type="range" 
                  min={600000000} 
                  max={1500000000} 
                  step={10000000} 
                  value={apartmentPrice}
                  onChange={(e) => setApartmentPrice(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-slate-100 dark:bg-emerald-950 rounded-lg"
                />
              </div>

              {/* Slider 2: Loan percentage */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Tỷ lệ vay vốn:</span>
                  <span className="font-bold text-primary dark:text-accent">{loanPercent}% (~{(loanAmount / 1000000).toFixed(0)} Triệu)</span>
                </div>
                <input 
                  type="range" 
                  min={20} 
                  max={80} 
                  step={5} 
                  value={loanPercent}
                  onChange={(e) => setLoanPercent(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-slate-100 dark:bg-emerald-950 rounded-lg"
                />
                <div className="flex justify-between text-2xs text-slate-400">
                  <span>Vốn tự có 80% (Vay tối thiểu 20%)</span>
                  <span>Vốn tự có 20% (Vay tối đa 80%)</span>
                </div>
              </div>

              {/* Slider 3: Loan period in years */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Thời gian vay:</span>
                  <span className="font-bold text-primary dark:text-accent">{loanYears} Năm ({totalMonths} Tháng)</span>
                </div>
                <input 
                  type="range" 
                  min={5} 
                  max={25} 
                  step={1} 
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-slate-100 dark:bg-emerald-950 rounded-lg"
                />
              </div>
            </div>

            {/* Calculations breakdown output */}
            <div className="bg-primary/5 dark:bg-emerald-950/40 border border-primary/20 dark:border-emerald-800 p-6 rounded-2xl grid md:grid-cols-3 gap-6 text-center">
              <div>
                <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase">Tiền tự có chuẩn bị</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {((apartmentPrice - loanAmount) / 1000000).toFixed(0)} Triệu
                </span>
                <span className="block text-2xs text-slate-400 mt-1">({(100 - loanPercent)}% giá trị nhà)</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase">Trả gốc hàng tháng</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {(monthlyPrincipal / 1000000).toFixed(2)} Triệu
                </span>
                <span className="block text-2xs text-slate-400 mt-1">(Trả đều theo tháng)</span>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-emerald-800 pt-4 md:pt-0">
                <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase text-accent font-semibold">Ước tính tháng đầu tiên</span>
                <span className="text-2xl font-extrabold text-accent">
                  {(firstMonthTotal / 1000000).toFixed(2)} Triệu
                </span>
                <span className="block text-2xs text-slate-400 mt-1">(Gồm Gốc + Lãi suất 5%/năm)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                      Dựa trên các câu trả lời của bạn, bạn hoàn toàn đáp ứng các điều kiện pháp lý để đăng ký mua căn hộ. Hãy tải bộ hồ sơ mẫu hoặc liên hệ ngay bộ phận hỗ trợ pháp lý của Tùng Bách để được nộp hồ sơ sớm.
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

      {/* PREMIUM FEATURE 3: TIMELINE */}
      <section id="progress" className="py-20 bg-slate-50 dark:bg-emerald-950/10 scroll-mt-16 border-t border-slate-200/50 dark:border-emerald-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold text-accent uppercase tracking-widest">Tiến Độ Dự Án</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Hành Trình Kiến Tạo Tổ Ấm
            </p>
            <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-slate-600 dark:text-slate-300 font-light">
              Chúng tôi cam kết thi công đúng tiến độ dự án đề ra và cập nhật thông tin minh bạch định kỳ đến các chủ nhân tương lai.
            </p>
          </div>

          {/* Timeline chart */}
          <div className="relative border-l-2 border-primary/20 dark:border-emerald-800 ml-4 md:ml-32 space-y-12">
            
            {/* Timeline item 1 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-primary dark:text-accent md:-ml-36 pr-4">
                  Quý 2/2026
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Thi công phần thân & đổ bê tông sàn</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Đang triển khai đổ bê tông sàn tầng 10 đối với hai tòa CT01A và CT01B. Đảm bảo đúng chất lượng kỹ thuật giám sát.</p>
                </div>
              </div>
            </div>

            {/* Timeline item 2 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Quý 1/2026
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Hoàn thành móng hầm chung</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Nghiệm thu toàn bộ kết cấu bê tông cốt thép đài móng và hầm liên kết đài móng của 4 tòa chung cư.</p>
                </div>
              </div>
            </div>

            {/* Timeline item 3 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Quý 4/2025
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Khởi công & Ép cọc thử tải</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Lễ khởi công chính thức dự án Nhà ở xã hội Tùng Bách Quế Võ. Ép cọc bê tông thí nghiệm và thử tải móng đợt đầu.</p>
                </div>
              </div>
            </div>

            {/* Timeline item 4 */}
            <div className="relative pl-8 md:pl-0">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-emerald-950"></div>
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3 md:text-right font-bold text-slate-500 md:-ml-36 pr-4">
                  Quý 3/2025
                </div>
                <div className="md:col-span-9 bg-white dark:bg-emerald-950/20 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-emerald-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Hoàn tất thủ tục hồ sơ mặt bằng</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Ủy ban nhân dân tỉnh bàn giao mốc giới đất sạch cho chủ đầu tư Công ty TNHH Tùng Bách triển khai hạ tầng kỹ thuật.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

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
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Đừng bỏ lỡ cơ hội vàng để nhận thông tin mở bán đợt 1 và được hỗ trợ tư vấn hồ sơ miễn phí trực tiếp từ chủ đầu tư Công ty TNHH Tùng Bách.
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
                  <span>Đăng ký tham quan thực tế căn hộ mẫu đang hoàn thiện.</span>
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

    </div>
  );
}
