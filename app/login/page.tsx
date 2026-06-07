"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoginFormData = {
  identifier: string; // username or email
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          `خوش آمدید ${data.user.name}. تا لحظاتی دیگر به داشبورد منتقل می‌شوید.`
        );
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
        // console.log("Logged in user:", data.user);
      } else {
        setMessage(data.error || "خطایی رخ داد");
      }
    } catch (err) {
      setMessage(`خطای شبکه یا سرور: ${err}`);
    }
    //  finally {
    //   setLoading(false); // re‑enabled button
    // }
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 to-teal-200 px-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl animate-fade-in-up">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          ورود
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Identifier – username or email */}
          <div>
            <label
              htmlFor="identifier"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              نام کاربری یا ایمیل
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-right focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="example@mail.com یا نام کاربری"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-right focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        {/* Link to Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{" "}
          <Link href="/signup" className="text-teal-600 hover:underline">
            ثبت‌ نام
          </Link>
        </p>
      </div>

      {/* pop-up div for showing the messages after submit */}
      {loading && (
        <div
          onClick={() => setLoading(false)}
          className="absolute flex flex-col items-center justify-center w-dvw h-dvh backdrop-blur-3xl z-10"
        >
          <div className="size-fit p-10 flex flex-col items-center justify-center bg-white rounded-2xl z-20">
            <p>
              <b className="text-blue-800">{form.identifier}</b>{" "}
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
