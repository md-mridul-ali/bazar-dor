"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import googleIcon from "../../assets/google-icon.png";

const SignUpPage = () => {
  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...userData,
    });
    if (data) {
      console.log(data);
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  };

  const handleSignupGoogle = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.error("Google sign-in error:", error);
      toast.error(error.message || "Google sign-in failed");
      return;
    }

    console.log("Google sign-in response:", data);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold mb-2">অ্যাকাউন্ট তৈরি করুন</h2>
      <p className="text-gray-400 mb-5">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-xl w-xs border p-4"
      >
        <fieldset className="fieldset">
          <label className="label">নাম</label>
          <input
            type="text"
            name="name"
            className="input validator"
            placeholder="যেমন: রহিম উদ্দিন"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">ইমেইল</label>
          <input
            type="email"
            name="email"
            className="input validator"
            placeholder="you@example.com"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">Image</label>
          <input
            type="url"
            name="image"
            className="input validator"
            placeholder="Image"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        <label className="fieldset">
          <span className="label">পাসওয়ার্ড</span>
          <input
            type="password"
            name="password"
            className="input validator"
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
          />
          <span className="validator-hint hidden">Required</span>
        </label>

        <button
          className="btn bg-green-600 rounded-xl text-white mt-4"
          type="submit"
        >
          অ্যাকাউন্ট তৈরি করুন
        </button>
        <button className="btn mt-1 rounded-xl hover:bg-green-100" type="reset">
          Reset
        </button>
      </form>

      <button onClick={handleSignupGoogle} className="btn">
        <Image
          src={googleIcon}
          alt="google icon"
          height={20}
          width={20}
        ></Image>
        Google দিয়ে চালিয়ে যান
      </button>

      <Link className="text-gray-400 mt-2" href="/">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUpPage;
