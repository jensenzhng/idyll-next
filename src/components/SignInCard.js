"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import G_logo from "../../public/images/G_logo.png";
import { redirect } from "next/dist/server/api-utils";
import { useSearchParams } from "next/navigation";

export default function SignInCard() {
    const searchParams = useSearchParams();

    const redirectPath = searchParams.get("redirect");

    return (
        <div className="h-[85vh] flex items-center justify-center">
            <div className="border-solid border p-6 border-gray-300 rounded-md max-w-[70rem] mx-14 bg-white">
                <h1 className="text-xl font-bold mb-1">Sign in</h1>
                <p className="text-gray-600 text-sm mb-6">
                    to continue to Idyll. We'll make your account if you don't
                    have one.
                </p>
                <button
                    className="flex items-center justify-center border py-2 px-3 border-gray-300 rounded-sm w-full bg-white"
                    onClick={() => {
                        signIn("google", {
                            callbackUrl: redirectPath ? decodeURIComponent(redirectPath) : "/",
                        });
                    }}
                >
                    <span className="text-gray-600 flex items-center">
                        <Image
                            src={G_logo}
                            width={23}
                            height={23}
                            alt="Google logo"
                        />
                    </span>
                    <p className="text-sm pl-2">Continue with Google</p>
                </button>
            </div>
        </div>
    );
}
