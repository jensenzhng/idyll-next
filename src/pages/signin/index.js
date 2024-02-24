import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "@/components/Layout";
import SignInCard from "@/components/SignInCard";

export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (session) {
        return {
            redirect: {
                destination: "/", // Redirect to home if signed in
                permanent: false,
            },
        };
    }

    return {
        props: {}, // Return empty props if not signed in
    };
}

export default function SignIn() {
    return (
        <>
            <Layout>
                <SignInCard />
            </Layout>
        </>
    );
}
