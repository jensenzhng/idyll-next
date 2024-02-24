import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (req.method === "POST") {
        // Destructure the needed properties from the request body
        const { title, description, content, tags, published } = req.body;

        try {
            // Create a new post with tags
            const post = await prisma.post.create({
                data: {
                    title,
                    content: Buffer.from(content, "utf8"),
                    userId: session.user?.id,
                    description,
                    published: published, // Assuming you want to publish the post immediately
                    tags: {
                        connectOrCreate: tags.map((tag) => ({
                            where: { name: tag },
                            create: { name: tag },
                        })),
                    },
                },
                include: {
                    user: true,
                    tags: true, // Include the tags in the response for confirmation
                },
            });

            // Respond with the created post data
            res.status(200).json(post);
        } catch (error) {
            console.error("Failed to create post:", error);
            res.status(500).json({ error: "Failed to create post" });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
