"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f8f1] px-4 py-12 text-[#20382a] sm:px-6">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-lime-200/40 blur-3xl" />

      {/* Decorative grocery icons */}
      <div className="pointer-events-none absolute left-[8%] top-[15%] hidden rotate-[-15deg] text-5xl opacity-50 sm:block">
        🥬
      </div>
      <div className="pointer-events-none absolute right-[10%] top-[20%] hidden rotate-12 text-5xl opacity-50 sm:block">
        🍅
      </div>
      <div className="pointer-events-none absolute bottom-[15%] left-[12%] hidden rotate-12 text-4xl opacity-50 sm:block">
        🥕
      </div>
      <div className="pointer-events-none absolute bottom-[18%] right-[12%] hidden -rotate-12 text-5xl opacity-50 sm:block">
        🛒
      </div>

      {/* Main content */}
      <section className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-green-100 bg-white/85 px-5 py-10 text-center shadow-[0_20px_70px_rgba(32,56,42,0.08)] backdrop-blur-sm sm:px-12 sm:py-14">
        {/* Brand */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 transition hover:bg-green-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-lg">
            <span role="img" aria-label="Shopping basket">
              🛒
            </span>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-green-800">
            Bazar-Dor
          </span>
        </Link>

        {/* 404 illustration */}
        <div className="relative mx-auto mb-5 flex items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full bg-green-100/80 blur-2xl sm:h-52 sm:w-52" />

          <div
            aria-hidden="true"
            className="relative flex items-center justify-center gap-1 font-black leading-none tracking-tighter text-green-700"
          >
            <span className="text-7xl sm:text-8xl md:text-9xl">4</span>

            {/* Grocery basket in place of zero */}
            <span className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center sm:h-32 sm:w-32">
              <span className="absolute inset-0 rounded-full border-[5px] border-dashed border-lime-300 sm:border-[6px]" />
              <span className="relative text-5xl drop-shadow-sm sm:text-7xl">
                🛒
              </span>
            </span>

            <span className="text-7xl sm:text-8xl md:text-9xl">4</span>
          </div>
        </div>

        {/* Message */}
        <div className="mx-auto max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Oops! Wrong aisle
          </span>

          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            এই পেজটি খুঁজে পাওয়া যায়নি!
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            মনে হচ্ছে আপনি ভুল বাজারে চলে এসেছেন! পেজটি সরানো হয়েছে
            অথবা ঠিকানাটি ভুল হতে পারে। চলুন, আবার বাজারে ফিরে যাই।
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-green-700/25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 18-6-6 6-6M9 12h12"
              />
            </svg>
            বাজারে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-6 py-3 text-sm font-bold text-green-800 transition duration-300 hover:border-green-400 hover:bg-green-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-2"
              />
            </svg>
            আগের পেজে যান
          </button>
        </div>

        {/* Footer */}
        <div className="mx-auto mt-9 h-px max-w-xs bg-gradient-to-r from-transparent via-green-200 to-transparent" />

        <p className="mt-5 text-xs text-gray-400">
          <span className="font-semibold text-green-700">Bazar-Dor</span>
          {" "}· সঠিক দামে সঠিক বাজার
        </p>
      </section>
    </main>
  );
};

export default NotFound;

