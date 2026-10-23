"use client";

import { useEffect, useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import googleIcon from "../../assets/google-icon.png";
import githubIcon from "../../assets/github-icon.png";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Reset social loading if the user returns from a cancelled OAuth flow.
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();

    // Name validation
    if (name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (name.length > 100) {
      toast.error("নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারবে");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
      return;
    }

    // Password validation
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি ইংরেজি অক্ষর ও একটি সংখ্যা দিন");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setPasswordError("দুটি পাসওয়ার্ড মিলছে না");
      toast.error("পাসওয়ার্ড নিশ্চিত করুন");
      return;
    }

    // Optional image URL validation
    if (image) {
      try {
        const imageUrl = new URL(image);

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("Invalid URL");
        }
      } catch {
        toast.error("সঠিক Image URL দিন");
        return;
      }
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (
    provider: "google" | "github"
  ) => {
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
        toast.error(error.message || "সাইন ইন করা যায়নি");

        setGoogleLoading(false);
        setGithubLoading(false);
      }

      // On success, Better Auth normally redirects to the provider.
      // Keep the loading indicator active during the redirect.
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");

      setGoogleLoading(false);
      setGithubLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-4 py-8 sm:py-10">
      {/* Page heading */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold text-[#26332b] sm:text-3xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="text-sm text-gray-500 sm:text-base">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Registration card */}
      <section className="w-full max-w-md rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="form-control w-full">
            <label htmlFor="name" className="label pb-2">
              <span className="label-text font-medium text-gray-800">
                নাম
              </span>
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
              className="input input-bordered w-full rounded-xl border-[#dfe8df] bg-transparent focus:border-green-600 focus:outline-none"
            />
          </div>

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

          {/* Optional profile image URL */}
          <div className="form-control w-full">
            <label htmlFor="image" className="label pb-2">
              <span className="label-text font-medium text-gray-800">
                প্রোফাইল ছবির URL (ঐচ্ছিক)
              </span>
            </label>

            <input
              id="image"
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
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

            <input
              id="password"
              type="password"
              name="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className="input input-bordered w-full rounded-xl border-[#dfe8df] bg-transparent focus:border-green-600 focus:outline-none"
            />

            <p className="mt-1 text-xs text-gray-500">
              অন্তত ৮ অক্ষর, একটি ইংরেজি অক্ষর ও একটি সংখ্যা দিন।
            </p>
          </div>

          {/* Confirm password */}
          <div className="form-control w-full">
            <label htmlFor="confirmPassword" className="label pb-2">
              <span className="label-text font-medium text-gray-800">
                পাসওয়ার্ড নিশ্চিত করুন
              </span>
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="আবার লিখুন"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError("");
              }}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={
                passwordError ? "password-error" : undefined
              }
              className={`input input-bordered w-full rounded-xl bg-transparent focus:outline-none ${
                passwordError
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#dfe8df] focus:border-green-600"
              }`}
            />

            {passwordError && (
              <p
                id="password-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || googleLoading || githubLoading}
            className="btn mt-2 w-full rounded-xl border-none bg-green-600 text-white shadow-md hover:bg-green-700 disabled:bg-green-400"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                অ্যাকাউন্ট তৈরি হচ্ছে...
              </>
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-4 text-sm text-gray-500">অথবা</div>

        {/* Social sign-up */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Google */}
          <button
            type="button"
            onClick={() => handleSocialSignup("google")}
            disabled={googleLoading || githubLoading || loading}
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

          {/* GitHub */}
          <button
            type="button"
            onClick={() => handleSocialSignup("github")}
            disabled={githubLoading || googleLoading || loading}
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

        {/* Sign-in link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-medium text-green-600 hover:text-green-700 hover:underline"
          >
            সাইন ইন করুন
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

export default SignUpPage;

