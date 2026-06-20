'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex-grow bg-slate-50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-100 min-h-screen py-12 pt-24">
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
          <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2 text-justify md:text-center">
            Thành lập từ năm 2006, Công ty TNHH Tùng Bách là một trong những doanh nghiệp uy tín hàng đầu trong lĩnh vực đầu tư cơ sở hạ tầng, khu đô thị và phát triển nhà ở xã hội tại khu vực phía Bắc.
          </p>
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 via-accent/30 via-primary/20 to-transparent" />

        {/* Corporate Profile Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-6 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Thông Tin Doanh Nghiệp</h3>
            <div className="w-16 h-1 bg-primary dark:bg-accent rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
            <div className="space-y-3">
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Tên doanh nghiệp:</span>
                <span>CÔNG TY TNHH TÙNG BÁCH (TUNG BACH COMPANY LIMITED)</span>
              </div>
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Mã số thuế / GPĐKKD:</span>
                <span>2300290374 (Đăng ký lần đầu ngày 31/08/2006; thay đổi lần thứ 7 ngày 17/03/2022 bởi Sở KH&ĐT tỉnh Bắc Ninh)</span>
              </div>
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Trụ sở chính:</span>
                <span>Số 33, Lý Chiêu Hoàng, phường Suối Hoa, TP. Bắc Ninh, tỉnh Bắc Ninh</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Người đại diện pháp luật:</span>
                <span>Giám đốc Nguyễn Thị Nhung</span>
              </div>
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Ngành nghề kinh doanh chính:</span>
                <span>Đầu tư & kinh doanh bất động sản, xây dựng công trình kỹ thuật dân dụng, san lấp mặt bằng, khai thác vật liệu xây dựng.</span>
              </div>
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Nguồn lực nhân sự:</span>
                <span>Đội ngũ gồm 20 kỹ sư chuyên ngành (xây dựng, giao thông, thủy lợi), 10 kỹ thuật viên trung cấp xây dựng, 10 cử nhân kinh tế/tài chính và 5 kỹ sư trắc địa giàu kinh nghiệm.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Vision, Mission, Values */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tầm nhìn Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-emerald-950 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">
              👁️
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tầm Nhìn</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light text-justify">
              Định hướng phát triển bền vững trở thành chủ đầu tư uy tín trong lĩnh vực phát triển bất động sản và các dự án an sinh xã hội tại Bắc Ninh, Bắc Giang, Quảng Ninh, Khánh Hòa... Kiến tạo các khu nhà ở và đô thị văn minh, đầy đủ tiện ích và gắn liền với nhu cầu thực của cư dân.
            </p>
          </div>

          {/* Sứ mệnh Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-accent-light dark:bg-amber-950/40 flex items-center justify-center text-accent font-bold text-xl">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sứ Mệnh</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light text-justify">
              Đồng hành cùng mục tiêu phát triển nhà ở xã hội của Chính phủ và địa phương. Chúng tôi tận tâm kiến tạo không gian sống chất lượng cao, an toàn, có mức giá hợp lý và pháp lý vững chắc cho người lao động có thu nhập trung bình/thấp tại các khu công nghiệp trọng điểm.
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
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light text-justify">
                Được kiểm chứng qua 5 dự án lớn đã hoàn thành bàn giao và đưa vào sử dụng, khẳng định cam kết cao nhất về chất lượng công trình.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-lg font-bold text-primary dark:text-accent">02. Trách Nhiệm</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light text-justify">
                Luôn đồng hành sát sao cùng cư dân trong toàn bộ thủ tục đăng ký xét duyệt hồ sơ mua nhà ở xã hội theo đúng quy định của Bộ Xây dựng.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-lg font-bold text-primary dark:text-accent">03. Bền Vững</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light text-justify">
                Quy hoạch đồng bộ hạ tầng kỹ thuật, nhà trẻ, bãi đỗ xe và công viên cây xanh để xây dựng cộng đồng cư dân văn minh, đoàn kết.
              </p>
            </div>
          </div>
        </div>

        {/* Project Portfolio Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-emerald-900/40 shadow-sm space-y-6 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Lịch Sử Phát Triển Dự Án</h3>
            <div className="w-16 h-1 bg-primary dark:bg-accent rounded-full"></div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light text-justify pt-2">
              Năng lực của Tùng Bách đã được chứng minh qua hàng loạt công trình hạ tầng kỹ thuật, thương mại và an sinh xã hội quy mô:
            </p>
          </div>

          <div className="space-y-6">
            {/* Active Project */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 space-y-2">
              <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider">Dự án đang mở bán</span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Dự án Nhà ở xã hội tại ô đất CT01A và CT01B (Khu đô thị mới Quế Võ)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Quyết định số 432/QĐ-UBND ngày 03/08/2018 của UBND tỉnh Bắc Ninh.</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 text-justify font-light pt-1">
                Dự án gồm 4 tòa chung cư cao 12 tầng + 1 tum với tổng quy mô 914 căn hộ, tổng mức đầu tư được duyệt hơn 900 tỷ đồng. Đây là dự án trọng điểm đang hoàn thiện cảnh quan để bàn giao cho cư dân trong tháng 6/2026.
              </p>
            </div>

            {/* Completed Projects */}
            <div className="space-y-4">
              <h5 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Các dự án đã hoàn thành & bàn giao:</h5>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 space-y-1">
                  <h6 className="font-bold text-slate-900 dark:text-white text-sm">1. Hạ tầng kỹ thuật KĐT mới Quế Võ II</h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quy mô: 28.8 ha | Quyết định số 328/QĐ-UBND ngày 25/8/2015</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-justify">Hoàn thành đầu tư đồng bộ hệ thống giao thông, cấp thoát nước, chiếu sáng cho toàn phân khu.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 space-y-1">
                  <h6 className="font-bold text-slate-900 dark:text-white text-sm">2. Trung tâm thương mại (Ô đất CC10 KĐT Quế Võ)</h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quyết định số 428/QĐ-UBND ngày 02/08/2018</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-justify">Đáp ứng nhu cầu mua sắm, giải trí và phát triển thương mại dịch vụ nội khu đô thị.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 space-y-1">
                  <h6 className="font-bold text-slate-900 dark:text-white text-sm">3. Trường mầm non (Ô đất CC11 KĐT Quế Võ)</h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quyết định số 434/QĐ-UBND ngày 07/08/2018</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-justify">Cơ sở giáo dục chất lượng dành cho con em cư dân đô thị và công nhân khu công nghiệp.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 space-y-1">
                  <h6 className="font-bold text-slate-900 dark:text-white text-sm">4. Trung tâm thể dục thể thao (Ô đất CC02 KĐT Quế Võ)</h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quyết định số 439/QĐ-UBND ngày 08/08/2018</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-justify">Khu phức hợp thể thao, rèn luyện sức khỏe cộng đồng cho toàn bộ phân khu.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 col-span-full space-y-1">
                  <h6 className="font-bold text-slate-900 dark:text-white text-sm">5. Khu dịch vụ, thương mại Tân Mỹ - Tùng Bách (Bắc Giang)</h6>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quyết định số 1369/QĐ-UBND ngày 6/12/2021 của UBND tỉnh Bắc Giang</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-justify">Dự án đánh dấu sự mở rộng thành công của Tùng Bách sang các tỉnh thành công nghiệp phát triển lân cận.</p>
                </div>
              </div>
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
