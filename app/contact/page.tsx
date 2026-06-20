import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl mt-8">
      <div className="text-center mb-12 space-y-4">
        <span className="text-xs font-bold text-accent uppercase tracking-widest block">Liên hệ chúng tôi</span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Thông Tin Liên Hệ & Trụ Sở</h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Mọi thắc mắc về hợp tác đầu tư hạ tầng, cung cấp vật liệu xây dựng hoặc tư vấn hồ sơ dự án Nhà ở xã hội Quế Võ, xin vui lòng liên hệ trực tiếp văn phòng Công ty TNHH Tùng Bách.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact details Card */}
        <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-800/40 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Công Ty TNHH Tùng Bách</h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">TUNG BACH COMPANY LIMITED</p>
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
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Mã số thuế:
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 pl-3">
                2300290374
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Người đại diện:
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 pl-3">
                Giám đốc Nguyễn Thị Nhung
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Số điện thoại Hotline:</h3>
                <a href="tel:0393005566" className="text-primary dark:text-accent font-bold hover:underline block mt-0.5">0393.00.55.66</a>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Địa chỉ Email:</h3>
                <a href="mailto:nhungtungbach@gmail.com" className="text-slate-500 dark:text-slate-400 hover:underline block mt-0.5">nhungtungbach@gmail.com</a>
              </div>
            </div>
            
            <div className="pt-2 border-t border-slate-100 dark:border-emerald-950">
              <h3 className="font-bold text-slate-900 dark:text-white">Giờ làm việc hành chính:</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1 pl-3">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
              <p className="text-slate-500 dark:text-slate-400 pl-3">Thứ 7: 8:00 - 12:00 (Nghỉ Chủ Nhật)</p>
            </div>
          </div>
        </div>
        
        {/* Support contact info */}
        <div className="bg-slate-50 dark:bg-emerald-950/10 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-900/30 shadow-inner space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hợp Tác & Tư Vấn</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quý đối tác có nhu cầu liên hệ hợp tác thi công hạ tầng, san lấp nền móng hoặc mua sỉ vật liệu xây dựng, xin vui lòng gửi thông tin yêu cầu ở form liên hệ trang chủ hoặc liên hệ trực tiếp qua Zalo số điện thoại đại diện công ty.
          </p>
          <div className="space-y-3 pt-2">
            <a 
              href="https://zalo.me/0393005566"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-all hover:scale-105"
            >
              Liên hệ Hotline qua Zalo
            </a>
            <a 
              href="/#register"
              className="inline-block w-full text-center py-3.5 rounded-full border border-primary text-primary dark:border-accent dark:text-accent font-semibold hover:bg-primary-light dark:hover:bg-emerald-950/30 transition-all hover:scale-105"
            >
              Gửi yêu cầu qua Form liên hệ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
