import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    // Server‑side check – passwords matching, else: error 400
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "رمز عبور و تکرار آن یکسان نیستند" },
        { status: 400 }
      );
    }

    // check if name or email already exists or not
    const [existing] = await pool.execute<RowDataPacket[]>(
      "SELECT name, email FROM users WHERE name = ? OR email = ?",
      [name, email]
    );

    if (existing.length > 0) {
      const existingUser = existing[0];
      if (existingUser.name === name) {
        return NextResponse.json(
          {
            error:
              "این نام کاربری قبلاً استفاده شده است. نام دیگری انتخاب کنید.",
          },
          { status: 409 }
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: "این ایمیل قبلاً ثبت شده است. ایمیل دیگری انتخاب کنید." },
          { status: 409 }
        );
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into database
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return NextResponse.json(
      {
        message: " ثبت‌ نام با موفقیت انجام شد. می‌توانید وارد شوید.",
        userId: (result as any).insertId,
        // name: name,
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Duplicate email
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: " این ایمیل قبلاً ثبت شده است. لطفا ایمیل دیگری وارد کنید." },
        { status: 409 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
