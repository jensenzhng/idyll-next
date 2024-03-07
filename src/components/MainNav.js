"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import idylllogo from "../../public/images/idylllogo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export default function MainNav() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <header className="sticky left-0 right-0 top-0 z-20 border-b shadow-sm transition-all backdrop-filter backdrop-blur-lg bg-opacity-30">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" passHref>
                    <span className="flex items-center cursor-pointer">
                        <span className="inline-flex items-center">
                            <Image
                                src={idylllogo}
                                alt="Idyll logo"
                                width={25}
                                height={25}
                            />
                            <span className="text-xl font-semibold text-gray-800 pl-2">
                                Idyll
                            </span>
                        </span>
                    </span>
                </Link>
                {/* <div className="flex-1 flex justify-center px-4">
                    <Input
                        type="search"
                        className="max-w-xs w-full"
                        placeholder="Search..."
                    />
                </div> */}
                {session ? (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={session.user?.image}
                                        />
                                        <AvatarFallback>
                                            {session.user?.name
                                                ?.substring(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {session.user?.name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => router.push("/dashboard")}
                                    className="cursor-pointer"
                                >
                                    Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => router.push("/upload")}
                                    className="cursor-pointer"
                                >
                                    Upload
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className="cursor-pointer"
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <button
                            className="flex items-center justify-center border py-2 px-3 border-gray-300 rounded-md"
                            onClick={() => {
                                const redirectPath =
                                    window.location.pathname !== "/signin"
                                        ? window.location.pathname
                                        : "/";
                                router.push(
                                    `/signin?redirect=${encodeURIComponent(
                                        redirectPath
                                    )}`
                                );
                            }}
                        >
                            <p className="text-sm">Sign In</p>
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}
