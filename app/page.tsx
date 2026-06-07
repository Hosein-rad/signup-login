import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black text-gray-900">
      <h1 className="text-2xl text-blue-200 font-bold">خوش آمدید</h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow  hover:bg-blue-700 duration-300"
        >
          ورود
        </Link>
        <Link
          href="/signup"
          className="rounded-lg bg-green-600 px-6 py-3 text-white shadow  hover:bg-green-700 duration-300"
        >
          ثبت‌ نام
        </Link>
      </div>
    </main>
  );
}
