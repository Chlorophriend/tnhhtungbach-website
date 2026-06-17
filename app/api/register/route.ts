import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, notes, source } = body;

    // Simple validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Họ tên và Số điện thoại là bắt buộc.' },
        { status: 400 }
      );
    }

    const newRegistration = {
      id: Date.now().toString(),
      name,
      phone,
      email: email || '',
      notes: notes || '',
      source: source || 'Web Contact Form',
      createdAt: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), 'data', 'registrations.json');

    try {
      // Read existing data
      let data = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        data = JSON.parse(fileContent);
      } catch (err) {
        // If file doesn't exist or has issues, initialize empty array
        data = [];
      }

      data.push(newRegistration);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

      return NextResponse.json({
        success: true,
        message: 'Đăng ký thành công! Thông tin đã được lưu lại cục bộ trên máy tính của bạn.',
        data: newRegistration,
        savedLocally: true,
      });
    } catch (fsError) {
      console.error('Error writing to registrations.json:', fsError);
      
      // Fallback if writing is not allowed (e.g. running on Vercel's read-only file system)
      return NextResponse.json({
        success: true,
        message: 'Đăng ký nhận thông tin thành công!',
        data: newRegistration,
        savedLocally: false,
      });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'registrations.json');
    let data = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (err) {
      data = [];
    }
    
    // Sort by latest registration first
    data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Không thể đọc dữ liệu đăng ký.' },
      { status: 500 }
    );
  }
}
