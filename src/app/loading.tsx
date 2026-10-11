

const loading = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">

        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-gray-400 animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h2 className="mt-6 text-xl font-semibold text-white">
          বাজার দর
        </h2>

        <p className="mt-1 text-sm text-gray-500 animate-pulse">
          Preparing your products...
        </p>

      </div>
    </div>
    );
};

export default loading;