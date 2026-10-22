"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import googleIcon from "../../assets/google-icon.png";
import githubIcon from "../../assets/github-icon.png";
import Image from "next/image";

const SignInPage = () => {
  const handleSignin = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const user = Object.fromEntries(formdata.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Email sign-in Successful!");
      return;
    }
    if (error) {
      toast.error((error.message as string) || "Email sign-in Failed");
      return;
    }
  };

  const handleSigninGoogle = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (data) {
      toast.success("Google sign-in Successful");
      return;
    }

    if (error) {
      toast.error(error.message || "Google sign-in failed");
      return;
    }
  };

  const handleSigninGithub = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
    });

    if (data) {
      toast.success("GitHub sign-in Successful");
      return;
    }

    if (error) {
      toast.error(error.message || "GitHub sign-in failed");
      return;
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold mb-2">সাইন ইন</h2>
      <p className="text-gray-400 mb-5">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>
      <form
        onSubmit={handleSignin}
        className="fieldset bg-base-200 border-base-300 rounded-xl w-xs border p-4"
      >
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
          className="btn bg-green-500 text-white rounded-xl mt-4"
          type="submit"
        >
          Login
        </button>

        <button className="btn mt-1 rounded-xl hover:bg-green-100" type="reset">
          Reset
        </button>

        <div>
          <div className="divider">অথবা</div>
        </div>
      </form>

      <div className="flex ">
        <button onClick={handleSigninGoogle} className="btn">
          <Image
            src={googleIcon}
            alt="google icon"
            height={20}
            width={20}
          ></Image>
          Google দিয়ে চালিয়ে যান
        </button>

        <button onClick={handleSigninGithub} className="btn">
          <Image
            src={githubIcon}
            alt="google icon"
            height={20}
            width={20}
          ></Image>
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <Link className="text-gray-400 mt-2" href="/">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignInPage;
