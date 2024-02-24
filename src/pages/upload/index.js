import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "@/components/Layout";
import PostEditor from "@/components/PostEditor";

export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/signin?redirect=%2fupload", // Redirect to home if not signed in
                permanent: false,
            },
        };
    }

    return {
        props: {session: session}, // Return empty props b/c signed in
    };
}

export default function Upload() {
    const { data: session } = useSession();

    return (
        <>
            <Layout>
                <div className="flex flex-col items-center min-h-screen py-2 px-8 mb-8">
                    <PostEditor session={session} editing={false} />
                </div>
            </Layout>
        </>
    );
}
