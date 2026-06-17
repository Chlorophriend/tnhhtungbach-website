import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-slate">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Chính sách bảo mật</h1>
      
      <p className="text-sm text-slate-500 mb-6 italic">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">1. Thu thập thông tin cá nhân</h2>
        <p className="mb-4 text-slate-600">
          Công ty TNHH Tùng Bách thu thập thông tin cá nhân của người dùng khi họ tương tác với website, bao gồm nhưng không giới hạn ở: họ tên, số điện thoại, email, và các thông tin liên quan đến nhu cầu tìm hiểu về dự án Nhà ở xã hội Tùng Bách.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">2. Mục đích sử dụng thông tin</h2>
        <p className="mb-4 text-slate-600">Chúng tôi sử dụng thông tin thu thập được cho các mục đích:</p>
        <ul className="list-disc pl-6 mb-4 text-slate-600 space-y-2">
          <li>Tư vấn và cung cấp thông tin chi tiết về dự án Nhà ở xã hội Tùng Bách.</li>
          <li>Xử lý các yêu cầu hỗ trợ và khiếu nại của khách hàng.</li>
          <li>Gửi các bản tin cập nhật, chính sách ưu đãi (nếu có sự đồng ý của khách hàng).</li>
          <li>Nghiên cứu thị trường và cải thiện trải nghiệm người dùng trên website.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">3. Bảo mật thông tin</h2>
        <p className="mb-4 text-slate-600">
          Chúng tôi cam kết bảo mật thông tin cá nhân của bạn bằng các biện pháp kỹ thuật và tổ chức phù hợp. Thông tin cá nhân của khách hàng sẽ được lưu trữ an toàn và chỉ những nhân viên có thẩm quyền mới được phép tiếp cận.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">4. Chia sẻ thông tin với bên thứ ba</h2>
        <p className="mb-4 text-slate-600">
          Công ty TNHH Tùng Bách cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của khách hàng cho bên thứ ba vì mục đích thương mại mà không có sự đồng ý của khách hàng. Chúng tôi chỉ chia sẻ thông tin khi có yêu cầu từ cơ quan nhà nước có thẩm quyền theo quy định của pháp luật Việt Nam.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">5. Quyền của người dùng</h2>
        <p className="mb-4 text-slate-600">
          Người dùng có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình đã cung cấp cho chúng tôi. Mọi yêu cầu vui lòng liên hệ trực tiếp qua hotline hoặc email được cung cấp tại trang Liên hệ.
        </p>
      </section>

      <section className="mb-8 border-t pt-8">
        <p className="text-slate-600 dark:text-slate-300 font-medium">Công ty TNHH Tùng Bách</p>
        <p className="text-slate-500 dark:text-slate-400">Địa chỉ trụ sở chính: Số 33, đường Lý Chiêu Hoàng, phường Suối Hoa, thành phố Bắc Ninh, tỉnh Bắc Ninh</p>
      </section>
    </div>
  );
}
