import "../styles/globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster"

import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <>
            <Head>
                <style>{inter.style.fontFamily}</style>
                <title>Idyll</title>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={inter.className}>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </main>
            <Toaster />
        </>
    );
}
