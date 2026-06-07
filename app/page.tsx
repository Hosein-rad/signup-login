// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 px-4"
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 size-125 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 size-100 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      {/* main card */}
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
        <div className="text-center">
          {/* title */}
          <h1 className="animate-fade-in-up text-3xl font-extrabold text-white sm:text-4xl">
            خوش آمدید
          </h1>

          {/* subtitle */}
          <p className="animate-fade-in-up delay-200 mt-4 text-lg text-gray-400">
            برای ادامه، وارد حساب خود شوید یا ثبت‌نام کنید
          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="animate-fade-in-scale rounded-xl bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/50"
            >
              ورود
            </Link>

            <Link
              href="/signup"
              className="animate-fade-in-scale rounded-xl bg-green-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-green-700 hover:shadow-green-600/50"
            >
              ثبت‌ نام
            </Link>
          </div>
        </div>
      </div>

      {/* footer note */}
      <p className="animate-fade-in-up delay-500 mt-8 text-sm text-gray-600">
        سیستم احراز هویت با Next.js & MySQL
      </p>
    </main>
  );
}
