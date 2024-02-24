import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (req.method === "POST") {
        // Destructure the needed properties from the request body
        const { id } = req.query; // Get the post ID from the query
        const { title, description, content, tags, published } = req.body;

        try {
            // make sure that post is created by the user who is updating it
            const postExists = await prisma.post.findUnique({
                where: { id },
                select: { userId: true },
            });

            if (postExists.userId !== session.user?.id) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            // Update a new post with tags
            const post = await prisma.post.update({
                where: { id },
                data: {
                    title,
                    content: Buffer.from(content, "utf8"),
                    userId: session.user?.id,
                    description,
                    published: published, 
                    tags: {
                        connectOrCreate: tags.map((tag) => ({
                            where: { name: tag },
                            create: { name: tag },
                        })),
                    },
                },
                include: {
                    user: true,
                    tags: true,
                },
            });

            // Respond with the created post data
            res.status(200).json(post);
        } catch (error) {
            console.error("Failed to update post:", error);
            res.status(500).json({ error: "Failed to update post" });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
