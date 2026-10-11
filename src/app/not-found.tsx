'use client'
import Link from "next/link";

 const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* 404 */}
        <div className="group relative">
          <h1 className="select-none text-[120px] font-black leading-none tracking-tighter text-white sm:text-[180px] md:text-[220px]">
            404
          </h1>

          {/* Subtle glow */}
          <div className="absolute inset-0 -z-10 text-[120px] font-black leading-none tracking-tighter text-white/10 blur-2xl sm:text-[180px] md:text-[220px]">
            404
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-6 h-px w-20 bg-zinc-700" />

        {/* Message */}
        <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
          Sorry, the page you are looking for does not exist or may have been
          moved to another location.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
          >
            Go Back
          </button>
        </div>

        {/* Bottom text */}
        <p className="mt-12 text-xs tracking-widest text-zinc-600 uppercase">
          Error 404 · Nothing here
        </p>
      </div>
    </main>
  );
}

export default NotFound;
