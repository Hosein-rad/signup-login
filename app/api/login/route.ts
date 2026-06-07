import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "نام کاربری/ایمیل و رمز عبور الزامی است" },
        { status: 400 }
      );
    }

    // Look up user by email or name
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, name, email, password FROM users WHERE email = ? OR name = ? LIMIT 1",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "کاربری با این مشخصات یافت نشد" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    // Success – return user data (never return the password)
    return NextResponse.json(
      {
        message: "ورود موفقیت‌آمیز بود",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
