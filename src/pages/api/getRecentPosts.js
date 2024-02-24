import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const posts = await prisma.post.findMany({
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        });

        for (let post of posts) {
            post.content = post.content.toString("utf8");
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while fetching recent posts",
        });
    }
}
