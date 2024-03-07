import PostCard from "@/components/PostCard";

export default function DashboardPage({ published, drafts }) {
    // const { data: session } = useSession();

    return (
          <div className="flex flex-col items-center w-full py-2 px-8 md:px-24 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-8 mt-4">
                Published Posts
            </h1>
            {published?.length === 0 ? <p className="text-gray-700">No published posts yet.</p> : null}
            {published?.map((post) => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-8 mt-4">
                Post Drafts
            </h1>
            {drafts?.length === 0 ? <p className="text-gray-700">No drafts yet.</p> : null}
            {drafts?.map((post) => {
                return (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        description={post.description}
                        author={post.user?.name}
                        authorImage={post.user?.image}
                        postId={post.id}
                        isDraft={true}
                    />
                );
            })}
            </div>
            
    );
}
