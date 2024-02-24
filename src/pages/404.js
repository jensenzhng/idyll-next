import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Custom404() {
    return (
        <>
            <Layout>
                <div className="h-[85vh] flex items-center justify-center">
                    <div className="border-solid border p-6 border-gray-300 rounded-md max-w-[80rem] mx-14 bg-white">
                        <h1 className="text-xl font-bold mb-1">Whoops!</h1>
                        <p className="text-gray-600 text-sm mb-4">
                            The page you're looking for doesn't exist.
                        </p>
                        <Link
                            className="flex items-center"
                            href="/"
                        >
                            <p className="text-sm mr-1">
                            Take me back home
                            </p>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}
