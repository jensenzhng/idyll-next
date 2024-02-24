import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  // Ensure the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query; // Get the post ID from the query

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true, // Include the user associated with the post
        tags: true, // Include the tags associated with the post
      },
    });

    if (post && post.published) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
}
