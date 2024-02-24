import Image from "next/image";
import SignIn from "@/components/SignInCard";
import MainNav from "@/components/MainNav";
import Layout from "@/components/Layout";
import { withSession } from "@/components/hoc/withSession";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import PostCard from "@/components/PostCard";
import HomePage from "@/components/HomePage";

export async function getServerSideProps(context) {
  const session = await getServerSession(
      context.req,
      context.res,
      authOptions
  );

  const posts = await prisma.post.findMany({
      take: 10,
      orderBy: {
          createdAt: "desc",
      },
      include: {
          user: {
              select: { name: true, id: true, image: true },
          },
      },
  });

  for (let post of posts) {
      post.content = post.content.toString("utf8");
  }

  return {
      props: { posts: JSON.parse(JSON.stringify(posts)), session: session },
  };
}

//getserverprops

export default function Home({ posts }) {
    // const { data: session } = useSession();

    return (
        <Layout>
          <HomePage posts={posts}/>
        </Layout>
    );
}
