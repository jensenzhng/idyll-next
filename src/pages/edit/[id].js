import prisma from "@/lib/prisma";
import PostEditor from "@/components/PostEditor";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context) {
    const { id } = context.params; // Get the post ID from the URL

    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: `/signin?redirect=%2Fedit%2F${id}`,
                permanent: false,
            },
        };
    }

    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            user: true, // Include user details
            tags: true, // Include tags
        },
    });

    if (!post) {
        return {
            notFound: true, // Return a 404 page if the post doesn't exist
        };
    }

    if (post.user.id != session.user.id) {
        return {
            redirect: {
                destination: "/post/" + id, // Redirect to home if not signed in
                permanent: false,
            },
        };
    }

    post.content = post.content.toString("utf8");

    return {
        props: { post: JSON.parse(JSON.stringify(post)), session: session }, // Pass the post as props
    };
}

const PostEdit = ({ post }) => {
    const { data: session } = useSession();

    return (
        <>
            <Layout>
                <div className="flex flex-col items-center min-h-screen py-2 px-8 mt-8">
                    <PostEditor
                        content={post.content.toString("utf8")}
                        title={post.title}
                        description={post.description}
                        author={post.user}
                        session={session}
                        editing={true}
                        postId={post.id}
                    />
                </div>
            </Layout>
        </>
    );
};

export default PostEdit;
