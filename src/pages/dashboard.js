// dashboard component
import React from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "@/components/Layout";
import DashboardPage from "@/components/DashboardPage";

export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/signin?redirect=%2fdashboard", // Redirect to dashboard if not signed in
                permanent: false,
            },
        };
    }

    // find posts from post table from prisma where the user id is the same as the session user id
    let posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            userId: session.user?.id,
        },
        include: {
            user: {
                select: { name: true, id: true, image: true },
            },
        },
    });

    // posts = JSON.parse(JSON.stringify(posts));

    let published = [],
        drafts = [];

    for (let post of posts) {
        post.content = post.content.toString("utf8");
        post = JSON.parse(JSON.stringify(post));

        if (post.published) {
            published.push(post);
        } else {
            drafts.push(post);
        }
    }

    console.log("published", published);
    console.log("drafts", drafts);

    return {
        props: { published: published, drafts: drafts, session: session },
    };
}

export default function Dashboard({ published, drafts}) {

    return (
        <Layout>
            <DashboardPage published={published} drafts={drafts} />
        </Layout>
    );
}
