import Layout from "@/components/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import PostCard from "@/components/PostCard";

export default function HomePage({ posts }) {
    // const { data: session } = useSession();

    return (
          <div className="flex flex-col items-center w-full py-2 px-8 md:px-24 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-8 mt-4">
                Recent posts
            </h1>
            {posts?.length === 0 ? <p className="text-gray-700">No posts yet!</p> : null}
            {posts?.map((post) => {
                return (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        description={post.description}
                        author={post.user?.name}
                        authorImage={post.user?.image}
                        postId={post.id}
                    />
                );
            })}
            </div>
    );
}
