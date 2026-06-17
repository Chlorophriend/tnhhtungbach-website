import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-emerald-900/50 shadow-sm mt-8 mb-16">
      <h1 className="text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">Điều Khoản Dịch Vụ</h1>
      <p className="text-xs text-slate-400 mb-8 uppercase tracking-wider">Cập nhật ngày: {new Date().toLocaleDateString('vi-VN')}</p>
      
      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-6">
        <p>
          Chào mừng quý khách đến với trang thông tin chính thức của dự án Nhà ở xã hội Tùng Bách (địa chỉ tên miền: <strong>tungbachbds.com</strong>), được vận hành bởi <strong>Công ty TNHH Tùng Bách</strong>. Xin vui lòng đọc kỹ các điều khoản dịch vụ này trước khi sử dụng hoặc đăng ký tư vấn trên website.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-primary pl-2">1. Chấp thuận các điều khoản</h2>
          <p>
            Bằng việc truy cập, duyệt qua hoặc đăng ký thông tin tư vấn trên website này, quý khách thừa nhận rằng đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản quy định tại đây cũng như các chính sách pháp lý liên quan của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-primary pl-2">2. Sở hữu trí tuệ</h2>
          <p>
            Mọi nội dung bao gồm văn bản, hình ảnh phối cảnh, bản vẽ thiết kế căn hộ, logo thương hiệu, và các tài liệu pháp lý được đăng tải trên website này thuộc quyền sở hữu độc quyền của <strong>Công ty TNHH Tùng Bách</strong>. Hành vi sao chép, phân phối hoặc sử dụng lại cho mục đích thương mại mà chưa được sự đồng ý bằng văn bản của chủ đầu tư là vi phạm pháp luật.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-primary pl-2">3. Sử dụng dịch vụ và Đăng ký thông tin</h2>
          <p>
            Khi đăng ký thông tin tư vấn căn hộ dự án Nhà ở xã hội Tùng Bách Quế Võ, quý khách cam kết cung cấp các thông tin liên hệ (Họ tên, Số điện thoại, Email) chính xác và trung thực. Chúng tôi không chịu trách nhiệm trong các trường hợp liên hệ thất bại do thông tin khách hàng nhập sai lệch.
          </p>
          <p>
            Thông tin đăng ký trên web chỉ mang ý nghĩa hỗ trợ khảo sát và tư vấn thủ tục, không thay thế cho các mẫu đơn đăng ký chính thức được nộp trực tiếp tại Văn phòng bán hàng của chủ đầu tư theo quy trình thẩm định quy định của Sở Xây dựng tỉnh Bắc Ninh.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-primary pl-2">4. Miễn trừ trách nhiệm</h2>
          <p>
            Mọi thông số kỹ thuật, bản vẽ mặt bằng, ảnh phối cảnh và tiến độ mang tính chất giới thiệu tham khảo tại thời điểm phát hành. Các thông số thực tế của căn hộ sẽ được quy định rõ ràng trong Hợp đồng mua bán (HĐMB) chính thức được ký kết giữa chủ đầu tư và khách hàng được phê duyệt.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-200 dark:border-emerald-800 pt-6">
          <p className="font-bold text-slate-900 dark:text-white">CÔNG TY TNHH TÙNG BÁCH</p>
          <ul className="space-y-1 text-xs text-slate-500">
            <li>Mã số thuế: 2300290374</li>
            <li>Trụ sở: Số 33, đường Lý Chiêu Hoàng, phường Suối Hoa, thành phố Bắc Ninh, tỉnh Bắc Ninh.</li>
            <li>Đại diện pháp luật: Bà Nguyễn Thị Nhung</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
