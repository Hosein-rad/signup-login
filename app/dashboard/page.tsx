"use client";

import Link from "next/link";

const dummyUser = {
  id: 2,
  name: "حسین راد",
};

const dummyStats = [
  { label: "پست‌های نوشته شده", value: "۱۲" },
  { label: "دنبال‌کنندگان", value: "۴۳" },
  { label: "دنبال‌شوندگان", value: "۲۷" },
  { label: "آخرین بازدید", value: "امروز" },
];

export default function DashboardPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-linear-to-br from-slate-400 to-white p-6"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
          <p className="mt-2 text-gray-600">خوش آمدید، {dummyUser.name}</p>
        </header>

        <div className="animate-fade-in-up mb-8 rounded-2xl bg-white p-6 shadow-md delay-100">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
              {dummyUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {dummyUser.name}
              </h2>
              <p className="text-sm text-gray-500">
                شناسه کاربری: {dummyUser.id}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dummyStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`animate-fade-in-scale rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg delay-${
                (index + 2) * 100
              }`}
            >
              <p className="mb-2 text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in-up delay-500">
          <Link href="/" className="text-indigo-600 hover:underline">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
