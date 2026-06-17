'use client';

import React, { useState, useEffect } from 'react';

interface Registration {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  source: string;
  createdAt: string;
}

export default function CompliancePage() {
  // 1. Interactive Checklist State (persisted in LocalStorage)
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    gpkd: false,
    cccd: false,
    banKhai: false,
    vanBanDeNghi: false,
    inetDNSA: false,
    inetDNSCname: false,
    moitAccount: false,
    moitSubmit: false,
  });

  // 2. Leads State
  const [leads, setLeads] = useState<Registration[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [leadsError, setLeadsError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Load checklist from local storage and fetch leads on mount
  useEffect(() => {
    const savedChecklist = localStorage.getItem('tungbach_compliance_checklist');
    if (savedChecklist) {
      try {
        setChecklist(JSON.parse(savedChecklist));
      } catch (e) {
        console.error(e);
      }
    }
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      const res = await fetch('/api/register');
      const data = await res.json();
      if (data.success) {
        setLeads(data.data || []);
      } else {
        setLeadsError('Không thể tải danh sách đăng ký.');
      }
    } catch (e) {
      setLeadsError('Lỗi kết nối API.');
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleCheckChange = (key: string) => {
    const nextChecklist = { ...checklist, [key]: !checklist[key] };
    setChecklist(nextChecklist);
    localStorage.setItem('tungbach_compliance_checklist', JSON.stringify(nextChecklist));
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`Đã sao chép mẫu tin nhắn "${label}" vào bộ nhớ tạm!`);
  };

  // Zalo Templates
  const zaloTemplate1 = `Chào cả nhà, để xây dựng nội dung giới thiệu uy tín cho website công ty, mọi người hỗ trợ cung cấp cho em các thông tin cơ bản sau nhé ạ:
1. Thông tin chung: Slogan (khẩu hiệu), Sứ mệnh, Tầm nhìn, và Giá trị cốt lõi của công ty mình.
2. Hồ sơ năng lực (Profile): Danh sách các dự án bất động sản hoặc xây dựng mà công ty đã hoàn thiện trước đây (Tên dự án, vị trí, quy mô sơ bộ nếu có).
3. Logo công ty: Gửi giúp em file thiết kế gốc (định dạng PDF, AI, SVG hoặc ảnh PNG chất lượng cao không nền).
Em cảm ơn mọi người!`;

  const zaloTemplate2 = `Chào anh/chị bên vận hành dự án, em đang hoàn thiện trang giới thiệu chi tiết cho dự án Nhà ở xã hội Tùng Bách Quế Võ. Anh/chị gửi giúp em các tài liệu/thông tin sau nhé:
1. Thông số dự án: Quy mô cụ thể (Tổng số tòa, số tầng, tổng số căn hộ, diện tích các loại căn hộ phổ biến như 61m2 - 71.3m2).
2. Tiện ích: Các tiện ích nội khu nổi bật (Khuôn viên, khu vui chơi, bãi đỗ xe, thang máy, an ninh...).
3. Hình ảnh: Các file ảnh phối cảnh 3D của dự án (mặt ngoài tòa nhà, cảnh quan xung quanh) và ảnh chụp tiến độ xây dựng thực tế mới nhất.
4. Bản vẽ: Bản vẽ mặt bằng tầng điển hình và mặt bằng chi tiết của từng mẫu căn hộ (để đưa lên bộ chọn căn hộ trực quan).
5. Giá bán & tiến độ: Khoảng giá bán/thuê dự kiến và tiến độ thanh toán của khách hàng.`;

  const zaloTemplate3 = `Chào team pháp lý, website tungbachbds.vn cần khai báo thông tin với Bộ Công Thương và đăng tải tính minh bạch pháp lý cho dự án NOXH. Nhờ mọi người hỗ trợ gửi:
1. Ảnh chụp/quét Giấy chứng nhận Đăng ký Doanh nghiệp (để kiểm tra chính xác MST, địa chỉ trụ sở đăng ký và người đại diện).
2. Các văn bản pháp lý dự án có thể công khai (ví dụ: Quyết định phê duyệt dự án, Giấy phép xây dựng, hoặc văn bản của Sở Xây dựng chấp thuận đủ điều kiện bán/cho thuê nhà ở xã hội hình thành trong tương lai).
3. Quy trình & biểu mẫu đăng ký mua nhà để khách hàng có thể tải về trực tiếp từ website.`;

  // Filter leads by search query
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery) ||
    (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl mt-8">
      <div className="text-center mb-12 space-y-4">
        <span className="text-xs font-bold text-accent bg-accent-light dark:bg-amber-950 px-3 py-1 rounded-full uppercase tracking-widest inline-block">Trang Quản Trị</span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Hồ Sơ Pháp Lý & Quản Lý Đăng Ký</h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded"></div>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Công cụ quản lý nội bộ dành riêng cho bạn để theo dõi tiến độ chuyển quyền tên miền, khai báo Bộ Công Thương và quản lý các lượt đăng ký tư vấn lưu cục bộ.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Checklist & DNS Setup */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Section 1: Domain Owner Transfer */}
          <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-800/40 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm">1</span>
              Thủ tục Chuyển quyền Tên miền iNet
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chuyển tên miền <code className="bg-slate-100 dark:bg-emerald-900 px-1 py-0.5 rounded font-mono">tungbachbds.vn</code> từ Sở hữu Cá nhân sang Sở hữu Doanh nghiệp (Công ty TNHH Tùng Bách).
            </p>

            <div className="space-y-3.5">
              <label className="flex items-start gap-3 cursor-pointer group text-sm">
                <input
                  type="checkbox"
                  checked={checklist.gpkd}
                  onChange={() => handleCheckChange('gpkd')}
                  className="mt-1 accent-primary rounded cursor-pointer"
                />
                <span className={`group-hover:text-primary ${checklist.gpkd ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  Chụp/Quét Giấy phép Đăng ký Kinh doanh (GPKD) Công ty TNHH Tùng Bách
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group text-sm">
                <input
                  type="checkbox"
                  checked={checklist.cccd}
                  onChange={() => handleCheckChange('cccd')}
                  className="mt-1 accent-primary rounded cursor-pointer"
                />
                <span className={`group-hover:text-primary ${checklist.cccd ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  Ảnh CCCD người đại diện pháp luật (Bà Nguyễn Thị Nhung)
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group text-sm">
                <input
                  type="checkbox"
                  checked={checklist.banKhai}
                  onChange={() => handleCheckChange('banKhai')}
                  className="mt-1 accent-primary rounded cursor-pointer"
                />
                <span className={`group-hover:text-primary ${checklist.banKhai ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  Bản khai đăng ký tên miền (iNet cung cấp, công ty đóng dấu)
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group text-sm">
                <input
                  type="checkbox"
                  checked={checklist.vanBanDeNghi}
                  onChange={() => handleCheckChange('vanBanDeNghi')}
                  className="mt-1 accent-primary rounded cursor-pointer"
                />
                <span className={`group-hover:text-primary ${checklist.vanBanDeNghi ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  Văn bản đề nghị chuyển nhượng quyền sử dụng tên miền (Ký/đóng dấu đầy đủ)
                </span>
              </label>
            </div>
          </div>

          {/* Section 2: iNet DNS Config */}
          <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-800/40 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm">2</span>
              Cấu hình DNS trên iNet trỏ về GitHub Pages
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Đăng nhập trang quản trị iNet, chọn quản lý tên miền <code className="font-mono">tungbachbds.vn</code> và cấu hình các bản ghi sau:
            </p>

            <div className="space-y-4">
              {/* Record A */}
              <div className="p-4 bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">BẢN GHI 1: Trỏ Root Domain (Tạo 4 bản ghi A)</span>
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-3xs font-semibold">TYPE A</span>
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1">
                  <div>Tên: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">@</code> | Giá trị: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">185.199.108.153</code></div>
                  <div>Tên: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">@</code> | Giá trị: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">185.199.109.153</code></div>
                  <div>Tên: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">@</code> | Giá trị: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">185.199.110.153</code></div>
                  <div>Tên: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">@</code> | Giá trị: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">185.199.111.153</code></div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-2 text-2xs">
                  <input 
                    type="checkbox" 
                    checked={checklist.inetDNSA} 
                    onChange={() => handleCheckChange('inetDNSA')}
                    className="accent-primary rounded" 
                  />
                  <span className={checklist.inetDNSA ? 'line-through text-slate-400' : 'text-slate-600 dark:text-slate-300'}>Đã cấu hình xong 4 bản ghi A</span>
                </label>
              </div>

              {/* Record CNAME */}
              <div className="p-4 bg-slate-50 dark:bg-emerald-950/40 border border-slate-200 dark:border-emerald-900 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">BẢN GHI 2: Trỏ Subdomain WWW</span>
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-3xs font-semibold">CNAME</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                  <div>Tên: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded">www</code></div>
                  <div className="col-span-2">Giá trị: <code className="bg-slate-200 dark:bg-emerald-900 px-1 rounded text-2xs">[username-github].github.io</code></div>
                </div>
                <p className="text-3xs text-slate-400 mt-1">Thay <code className="font-mono">[username-github]</code> bằng tên tài khoản GitHub của bạn.</p>
                <label className="flex items-center gap-2 cursor-pointer pt-1 text-2xs">
                  <input 
                    type="checkbox" 
                    checked={checklist.inetDNSCname} 
                    onChange={() => handleCheckChange('inetDNSCname')}
                    className="accent-primary rounded" 
                  />
                  <span className={checklist.inetDNSCname ? 'line-through text-slate-400' : 'text-slate-600 dark:text-slate-300'}>Đã hoàn thành thêm bản ghi CNAME</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: MoIT steps */}
          <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-800/40 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm">3</span>
              Đăng ký Bộ Công Thương (online.gov.vn)
            </h2>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group text-sm">
                <input
                  type="checkbox"
                  checked={checklist.moitAccount}
                  onChange={() => handleCheckChange('moitAccount')}
                  className="mt-1 accent-primary rounded cursor-pointer"
                />
                <span className={`group-hover:text-primary ${checklist.moitAccount ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  Đăng ký tài khoản doanh nghiệp trên <code className="font-mono text-xs">online.gov.vn</code> (dùng MST 2300290374) và đợi duyệt tài khoản (khoảng 3 ngày làm việc).
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group text-sm">
                <input
                  type="checkbox"
                  checked={checklist.moitSubmit}
                  onChange={() => handleCheckChange('moitSubmit')}
                  className="mt-1 accent-primary rounded cursor-pointer"
                />
                <span className={`group-hover:text-primary ${checklist.moitSubmit ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  Khai báo hồ sơ website thương mại điện tử bán hàng. Điền tên miền <code className="font-mono text-xs">tungbachbds.vn</code>, tải ảnh GPKD, gửi duyệt và chờ nhận Logo dấu đỏ của Bộ Công Thương.
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Copy Zalo & Leads Management */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Section 4: Copy Zalo Templates */}
          <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-800/40 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sao Chép Mẫu Hỏi Tin Nhắn Zalo</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Nhấp nút dưới để sao chép nhanh các tin nhắn và dán thẳng vào nhóm chat Zalo với nhân viên công ty để thu thập thông tin.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => copyToClipboard(zaloTemplate1, 'Mẫu 1: Thông tin Công ty')}
                className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-emerald-900 rounded-xl text-xs flex justify-between items-center group font-medium"
              >
                <span>Mẫu 1: Hỏi Slogan, Sứ mệnh & Dự án đã hoàn thành</span>
                <span className="text-primary group-hover:underline text-3xs uppercase font-bold shrink-0 ml-2">Sao chép</span>
              </button>

              <button
                onClick={() => copyToClipboard(zaloTemplate2, 'Mẫu 2: Phối cảnh & Mặt bằng')}
                className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-emerald-900 rounded-xl text-xs flex justify-between items-center group font-medium"
              >
                <span>Mẫu 2: Hỏi Phối cảnh 3D, Bản vẽ mặt bằng căn hộ mẫu</span>
                <span className="text-primary group-hover:underline text-3xs uppercase font-bold shrink-0 ml-2">Sao chép</span>
              </button>

              <button
                onClick={() => copyToClipboard(zaloTemplate3, 'Mẫu 3: Hồ sơ pháp lý')}
                className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-emerald-900 rounded-xl text-xs flex justify-between items-center group font-medium"
              >
                <span>Mẫu 3: Hỏi Bản quét GPKD & Hồ sơ Pháp lý dự án</span>
                <span className="text-primary group-hover:underline text-3xs uppercase font-bold shrink-0 ml-2">Sao chép</span>
              </button>
            </div>
          </div>

          {/* Section 5: Local Leads List */}
          <div className="bg-white dark:bg-emerald-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-800/40 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Danh Sách Khách Hàng Đăng Ký</h2>
              <button 
                onClick={fetchLeads}
                className="p-1 rounded-full text-primary hover:bg-primary-light"
                title="Làm mới danh sách"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Các leads đăng ký tư vấn được lưu trong tệp tin cục bộ <code className="bg-slate-100 dark:bg-emerald-900 px-1 py-0.5 rounded font-mono">data/registrations.json</code>.
            </p>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Tìm theo tên hoặc số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-emerald-900 bg-white dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />

            {/* Leads Table */}
            <div className="overflow-x-auto max-h-80 border border-slate-100 dark:border-emerald-900 rounded-xl">
              {loadingLeads ? (
                <div className="py-8 text-center text-xs text-slate-400">Đang tải danh sách...</div>
              ) : leadsError ? (
                <div className="py-8 text-center text-xs text-red-500">{leadsError}</div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">Chưa có lượt đăng ký nào khớp.</div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-emerald-950/40 border-b border-slate-100 dark:border-emerald-900 text-slate-600 dark:text-slate-300 font-semibold uppercase">
                      <th className="p-3">Họ và tên</th>
                      <th className="p-3">Số điện thoại</th>
                      <th className="p-3">Yêu cầu/Ghi chú</th>
                      <th className="p-3">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-emerald-900 text-slate-700 dark:text-slate-300">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-900/10">
                        <td className="p-3 font-semibold">{lead.name}</td>
                        <td className="p-3 font-mono">{lead.phone}</td>
                        <td className="p-3 max-w-[150px] truncate" title={lead.notes}>{lead.notes || 'Không ghi chú'}</td>
                        <td className="p-3 text-slate-400 text-3xs">
                          {new Date(lead.createdAt).toLocaleString('vi-VN', { hour12: false })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Total leads helper */}
            <div className="flex justify-between items-center text-2xs text-slate-400 pt-2 border-t border-slate-100 dark:border-emerald-900">
              <span>Tổng số lượng leads: <strong className="text-slate-700 dark:text-slate-300">{leads.length}</strong></span>
              <span>Lưu tại: <code className="font-mono text-3xs text-primary">data/registrations.json</code></span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
