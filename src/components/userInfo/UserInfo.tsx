"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async()=>{
    await authClient.signOut();
  }

  return (
    <div>
      {user ? (
        <div className="flex justify-center items-center gap-2">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                alt="Photo"
                src={user?.image as string}
              />
            </div>
          </div>
          <h2 className="text-xl">{user?.name}</h2>
          <button onClick={handleSignout} className="px-3 py-2 rounded-xl text-white bg-red-500 ml-2">Signout</button>
        </div>
      ) : (
        <div>
          <Link href="/signin">সাইন ইন</Link>
          <Link
            href="/signup"
            className="px-3 py-2 rounded-xl text-white bg-green-500 ml-2"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
