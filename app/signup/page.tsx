"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Quick client‑side validation
    if (form.password !== form.confirmPassword) {
      setMessage("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(
          `خوش آمدید. تا لحظاتی دیگر به داشبورد منتقل می‌شوید.`
        );
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
        // console.log("User ID:", data.userId);
      } else {
        setMessage(data.error || "خطایی رخ داد");
      }
    } catch (err) {
      setMessage(`خطای شبکه یا سرور: ${err}`);
    }
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-300 to-mist-300 px-4"
    >
      <div
        className={
          "w-full max-w-md rounded-2xl bg-white p-8 shadow-xl animate-fade-in-up"
        }
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          ثبت‌ نام
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              نام
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-2.5 text-right focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="نام خود را وارد کنید"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-2.5 text-right focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="example@mail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-2.5 text-right focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="حداقل ۶ کاراکتر"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              تکرار رمز عبور
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-lg border text-black border-gray-300 px-4 py-2.5 text-right focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="رمز عبور را دوباره وارد کنید"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 duration-200 cursor-pointer"
          >
            ثبت‌ نام
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          قبلاً ثبت‌ نام کرده‌اید؟{" "}
          <Link href="/login" className="text-teal-600 hover:underline">
            ورود
          </Link>
        </p>
      </div>

      {/* pop-up div for showing the messages after submit */}
      {loading && (
        <div
          onClick={() => setLoading(false)}
          className="absolute flex flex-col items-center justify-center w-dvw h-dvh backdrop-blur-3xl z-10"
        >
          <div className="size-fit p-10 flex items-center justify-center bg-white rounded-2xl z-20">
            <p>
              <b className="text-blue-800">{form.name}</b> عزیز،{" "}
            </p>
            <p> {message} </p>
          </div>

          <p className="block text-center text-xs text-gray-500">
            برای خروج، هرجای صفحه کلیک کنید
          </p>
        </div>
      )}
    </main>
  );
}
