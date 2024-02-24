import { EditorContent, useEditor } from "@tiptap/react";
import ImageN from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { extensions } from "@/lib/editor-config.js";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PostViewer = ({
    content = "",
    title = "",
    description = "",
    author,
    session,
    postId,
}) => {
    const router = useRouter();
    const { toast } = useToast();

    const editor = useEditor({
        editable: false,
        extensions: extensions,
        content: content,
    });

    useEffect(() => {
        console.log("editor mounted in postviewer");
        return () => {
            if (editor) {
                editor.destroy();
                console.log("destroyed in postviewer");
            }
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <article className="w-full prose md:prose-lg mb-32">
            <div className="flex flex-col">
                {session?.user.id == author.id ? (
                    <>
                        <p className="text-base px-4 py-2 border border-gray-300 rounded-md mb-4">
                            It seems like you made this post — you can {" "}
                            <Link href={`/edit/${postId}`}>edit</Link> your post or {" "}
                            <AlertDialog>
                            <AlertDialogTrigger className="underline font-medium">delete</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your post and remove 
                                        its data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={() => {
                                        fetch(`/api/deletePost/${postId}`, {
                                            method: "POST",
                                        }).then((res) => {
                                            if (res.ok) {
                                                toast({
                                                    title: "Post deleted",
                                                    description: "Your post has been deleted.",
                                                })
                                                router.push("/");
                                            } else {
                                                console.error("Failed to delete post");
                                            }
                                        }).catch((err) => {
                                            console.error("Error deleting post:", err);
                                        });
                                    }}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        {" "} it.
                        </p>

                        <div className="pb-2 md:pb-6"></div>
                    </>
                ) : null}
                <p className="text-5xl md:text-6xl font-bold border-none bg-transparent outline-none pb-2 md:pb-3 text-[#1F1F1F]">
                    {title}
                </p>
                <p className="text-base text-gray-600 border-none bg-transparent outline-none">
                    {description}
                </p>

                <div className="flex items-center space-x-3">
                    <ImageN
                        src={author?.image}
                        className="rounded-full my-4 md:my-6"
                        width={40}
                        height={40}
                    />
                    <span className="text-base">By {author?.name}</span>
                </div>
            </div>

            <EditorContent className="w-full" editor={editor} />
        </article>
    );
};

export default PostViewer;
