import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl mt-8">
      <div className="text-center mb-12 space-y-4">
        <span className="text-xs font-bold text-accent uppercase tracking-widest block">Liên hệ chúng tôi</span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Thông Tin Liên Hệ & Trụ Sở</h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Mọi thắc mắc về điều kiện mua nhà, thủ tục hồ sơ pháp lý dự án NOXH Tùng Bách Quế Võ, xin vui lòng liên hệ trực tiếp chủ đầu tư.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact details Card */}
        <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-800/40 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Công Ty TNHH Tùng Bách</h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Chủ đầu tư dự án NOXH Tùng Bách Quế Võ</p>
          </div>
          
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Địa chỉ trụ sở chính:
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 pl-3">
                Số 33, đường Lý Chiêu Hoàng, phường Suối Hoa, thành phố Bắc Ninh, tỉnh Bắc Ninh, Việt Nam.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Vị trí xây dựng dự án:
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 pl-3">
                Lô đất CT01A & CT01B, Khu đô thị mới Quế Võ, Phường Phương Liễu, Thị xã Quế Võ, Tỉnh Bắc Ninh.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Điện thoại Hotline:</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">0230.029.0374</p>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Địa chỉ Email:</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">info@tungbachbds.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Giờ làm việc hành chính:</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 pl-3">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
              <p className="text-slate-500 dark:text-slate-400 pl-3">Thứ 7: 8:00 - 12:00 (Nghỉ Chủ Nhật)</p>
            </div>
          </div>
        </div>
        
        {/* Support contact info */}
        <div className="bg-slate-50 dark:bg-emerald-950/10 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-900/30 shadow-inner space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Đăng ký Tư vấn Trực tiếp</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nếu quý khách đang có nhu cầu chuẩn bị hồ sơ hoặc xem sơ đồ mặt bằng các tòa chung cư CT01-CT04, vui lòng đăng ký thông tin liên hệ ở trang chủ. Đội ngũ tư vấn sẽ gọi lại cho quý khách ngay lập tức.
          </p>
          <div className="pt-4">
            <a 
              href="/#register"
              className="inline-block w-full text-center py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-bold shadow-md transition-all hover:scale-105"
            >
              Quay lại Trang Chủ & Đăng ký
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

