import prisma from "@/lib/prisma";
import PostViewer from "@/components/PostViewer";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
    const { id } = context.params; // Get the post ID from the URL
    const session = await getServerSession(context.req, context.res, authOptions);

    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            user: true, // Include user details
            tags: true, // Include tags
        },
    });

    if (!post || !post.published) {
        return {
            notFound: true, // Return a 404 page if the post doesn't exist
        };
    }

    post.content = post.content.toString("utf8");

    return {
        props: { post: JSON.parse(JSON.stringify(post)), session: session },
    };
}

const PostView = ({ post }) => {
    const { data: session } = useSession();

    return (
        <>
            <Layout>
                <div className="flex flex-col items-center min-h-screen py-2 px-8 mt-8">
                    <PostViewer
                        content={post.content.toString("utf8")}
                        title={post.title}
                        description={post.description}
                        author={post.user}
                        session={session}
                        postId={post.id}
                    />
                </div>
            </Layout>
        </>
    );
};

export default PostView;
