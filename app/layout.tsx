import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dự án Nhà ở xã hội Tùng Bách Quế Võ - Bắc Ninh",
  description: "Trang thông tin chính thức dự án Nhà ở xã hội Tùng Bách tại Quế Võ, Bắc Ninh. Chủ đầu tư Công ty TNHH Tùng Bách. Căn hộ diện tích từ 61m2 - 71.3m2.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Header />
        <main className="flex-grow pt-20 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

