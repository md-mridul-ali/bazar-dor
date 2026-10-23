"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import googleIcon from "../../assets/google-icon.png";
import githubIcon from "../../assets/github-icon.png";

const SignInPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Reset social loading when returning from a cancelled OAuth flow.
  useEffect(() => {
    const resetSocialLoading = () => {
      if (document.visibilityState === "visible") {
        setGoogleLoading(false);
        setGithubLoading(false);
      }
    };

    window.addEventListener("pageshow", resetSocialLoading);
    window.addEventListener("focus", resetSocialLoading);
    document.addEventListener("visibilitychange", resetSocialLoading);

    return () => {
      window.removeEventListener("pageshow", resetSocialLoading);
      window.removeEventListener("focus", resetSocialLoading);
      document.removeEventListener("visibilitychange", resetSocialLoading);
    };
  }, []);

  const handleSignin = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    if (loading || googleLoading || githubLoading) return;

    const formData = new FormData(e.target);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
      return;
    }

    if (!password) {
      toast.error("পাসওয়ার্ড লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল দিয়ে সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignin = async (provider:string) => {
    if (loading || googleLoading || githubLoading) return;

    if (provider === "google") {
      setGoogleLoading(true);
    } else {
      setGithubLoading(true);
    }

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || `${provider} sign-in failed`);
        setGoogleLoading(false);
        setGithubLoading(false);
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setGoogleLoading(false);
      setGithubLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-4 py-8 sm:py-10">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold text-[#26332b] sm:text-3xl">
          সাইন ইন করুন
        </h1>

        <p className="text-sm text-gray-500 sm:text-base">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Sign-in card */}
      <section className="w-full max-w-md rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-6">
        <form onSubmit={handleSignin} className="space-y-4">
          {/* Email */}
          <div className="form-control w-full">
            <label htmlFor="email" className="label pb-2">
              <span className="label-text font-medium text-gray-800">
                ইমেইল
              </span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
              required
              className="input input-bordered w-full rounded-xl border-[#dfe8df] bg-transparent focus:border-green-600 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label htmlFor="password" className="label pb-2">
              <span className="label-text font-medium text-gray-800">
                পাসওয়ার্ড
              </span>
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                autoComplete="current-password"
                required
                className="input input-bordered w-full rounded-xl border-[#dfe8df] bg-transparent pr-20 focus:border-green-600 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-green-700 hover:text-green-800"
              >
                {showPassword ? "লুকান" : "দেখুন"}
              </button>
            </div>

            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-green-700 hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
          </div>

          {/* Sign-in button */}
          <button
            type="submit"
            disabled={loading || googleLoading || githubLoading}
            className="btn mt-2 w-full rounded-xl border-none bg-green-600 text-white shadow-md hover:bg-green-700 disabled:bg-green-400"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                সাইন ইন হচ্ছে...
              </>
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-4 text-sm text-gray-500">
          অথবা
        </div>

        {/* Social sign-in buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSocialSignin("google")}
            disabled={loading || googleLoading || githubLoading}
            className="btn h-auto min-h-11 w-full rounded-xl border border-[#dfe8df] bg-transparent px-2 text-sm text-gray-800 shadow-none hover:bg-green-50"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <Image
                src={googleIcon}
                alt="Google"
                width={18}
                height={18}
              />
            )}
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignin("github")}
            disabled={loading || googleLoading || githubLoading}
            className="btn h-auto min-h-11 w-full rounded-xl border border-[#dfe8df] bg-transparent px-2 text-sm text-gray-800 shadow-none hover:bg-green-50"
          >
            {githubLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <Image
                src={githubIcon}
                alt="GitHub"
                width={18}
                height={18}
              />
            )}
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-medium text-green-600 hover:text-green-700 hover:underline"
          >
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </section>

      {/* Back to home */}
      <Link
        href="/"
        className="mt-6 text-sm text-gray-500 transition-colors hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignInPage;

