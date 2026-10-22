"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
    redirect("/");
  };

  const handleUpdate = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updateData = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    await authClient.updateUser({
       ...updateData
    });

    if(updateData){
        toast.success("Update Successful!");
        return;
    }

  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2">আমার প্রোফাইল</h2>
      <p className="text-gray-300 mb-5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      <div className="px-4 py-8 bg-green-50 rounded-xl flex justify-between items-center">
        <div className="flex gap-2">
          <img
            className="rounded-md h-12 w-12"
            alt="photo"
            src={user?.image as string}
          />
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleSignout}
            className="px-3 py-2 rounded-xl text-red-500 border-2 border-red-500"
          >
            ↩ সাইন আউট
          </button>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="fieldset bg-base-200 border-base-300 rounded-xl w-full border p-4 mt-10"
      >
        <p className="text-xl text-gray-400">তথ্য</p>
        <fieldset className="fieldset ml-4">
          <label className="label text-lg">নাম</label>
          <input
            type="text"
            name="name"
            className="input validator rounded-md w-full"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>
        <button
          className="btn bg-green-600 rounded-xl text-white text-lg mt-4 ml-4"
          type="submit"
        >
          আপডেট
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
