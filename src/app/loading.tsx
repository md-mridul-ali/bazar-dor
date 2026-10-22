
const Loading = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f8f1] px-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-lime-200/40 blur-3xl" />

      {/* Loading card */}
      <section className="relative w-full max-w-sm rounded-3xl border border-green-100 bg-white/85 px-8 py-10 text-center shadow-[0_20px_70px_rgba(32,56,42,0.08)] backdrop-blur-sm sm:px-10">
        {/* Animated shopping basket */}
        <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-green-100/70 [animation-duration:2.5s]" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-green-100 bg-green-50 shadow-sm">
            <span
              role="img"
              aria-label="Shopping basket"
              className="animate-bounce text-4xl [animation-duration:1.5s] motion-reduce:animate-none"
            >
              🛒
            </span>
          </div>

          <span className="absolute -right-1 top-1 animate-pulse text-xl text-amber-400 motion-reduce:animate-none">
            ✦
          </span>
          <span className="absolute -bottom-1 -left-1 animate-pulse text-lg text-green-500 motion-reduce:animate-none">
            ✦
          </span>
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-extrabold tracking-tight text-green-800 sm:text-3xl">
          বাজার দর
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          আপনার পছন্দের পণ্যগুলো প্রস্তুত হচ্ছে
        </p>

        {/* Spinner */}
        <div
          className="mt-7 flex items-center justify-center gap-3"
          role="status"
          aria-live="polite"
        >
          <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-green-100 border-t-green-600 motion-reduce:animate-none" />

          <span className="text-sm font-medium text-green-700">
            বাজারের তথ্য লোড হচ্ছে...
          </span>
        </div>

        {/* Animated progress indicator */}
        <div className="mx-auto mt-6 h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/2 animate-[loadingBar_1.6s_ease-in-out_infinite] rounded-full bg-green-600 motion-reduce:animate-none" />
        </div>

        {/* Footer */}
        <p className="mt-7 text-xs text-gray-400">
          <span className="font-semibold text-green-700">
            Bazar-Dor
          </span>
          {" "}· সঠিক দামে সঠিক বাজার
        </p>
      </section>

      {/* Global keyframes: no styled-jsx required */}
      <style>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(220%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Loading;
