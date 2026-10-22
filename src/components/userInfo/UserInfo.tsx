"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  
  return (
    <div>
      {user ? (
        <div className="flex justify-center items-center gap-2">
          <Link href="/profile">
            <div className="flex items-center  gap-2">
              <div className="avatar">
                <div className="w-15 flex items-center justify-center bg-base-300 rounded-full">
                  <img className="rounded-full h-12 w-12"
                    alt="photo"
                    src={user?.image as string}
                  />
                </div>
              </div>
              <h2 className="text-xl">{user?.name}</h2>
            </div>
          </Link>
         
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
