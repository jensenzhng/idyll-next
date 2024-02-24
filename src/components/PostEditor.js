import { EditorContent, useEditor } from "@tiptap/react";
import ImageN from "next/image";
import { useState } from "react";
import MenuBar from "@/components/MenuBar";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { extensions } from "@/lib/editor-config.js";

const startContent = `
<p>Feel free to use this text editor for anything you'd like — we support <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, and <s>striked</s> text, as well as</p><ul><li><p>unordered lists,</p></li><li><p>maybe for ingredients?</p></li></ul><p>or</p><ol><li><p>ordered lists,</p></li><li><p>for steps?</p></li></ol><p>and links: <a target="_blank" rel="noopener noreferrer nofollow" href="http://youtube.com/">https://youtube.com/</a>. Click on any text here to edit it!</p>
`;

const PostEditor = ({
    content = startContent,
    title = "",
    description = "",
    session,
    editing = false,
    postId,
}) => {
    const { toast } = useToast();
    const [h1Text, setH1Text] = useState(title);
    const [pText, setPText] = useState(description);
    const router = useRouter();

    const uploadPost = async (editor, isPublishing) => {
        if (h1Text === "" || pText === "") {
            toast({
                title: "Missing fields",
                description: `Please fill in the ${
                    h1Text === "" ? "title" : ""
                }${h1Text === "" && pText === "" ? " and " : ""}${
                    pText === "" ? "description" : ""
                }.`,
                duration: 4000,
            });
            return;
        }

        const $images = editor.$nodes("image");
        console.log($images.length, " images found");

        if ($images.length > 0) {
            toast({
                title: "Status",
                description: "Uploading images...",
                duration: 2500,
            });
        }

        for (let node of $images) {
            if (!node.currentNode.attrs.src.startsWith("data:")) continue;
            let res = await fetch(node.currentNode.attrs.src);
            let blob = await res.blob();

            const compressedBlob = await imageCompression(blob, {
                maxSizeMB: 0.5,
            });

            const compressedImage = new File([compressedBlob], Date.now(), {
                type: compressedBlob.type,
            });

            const formData = new FormData();
            formData.append("image", compressedImage);

            try {
                const response = await fetch("/api/uploadImage", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                node.currentNode.attrs.src = data.url;
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        toast({
            title: "Status",
            description: `Uploading your ${
                isPublishing ? "post" : "draft"
            } content...`,
            duration: 2500,
        });

        const postInfo = {
            title: h1Text,
            description: pText,
            content: editor.getHTML(),
            published: isPublishing,
            tags: ["American"],
        };

        try {
            const API_ROUTE = editing
                ? `/api/updatePost/${postId}`
                : "/api/uploadPost";

            const response = await fetch(API_ROUTE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postInfo),
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            const data = await response.json();
            console.log(data);

            if (isPublishing) {
                router.push(`/post/${data.id}`);
            } else {
                router.push(`/edit/${data.id}`);
            }
            toast({
                title: "Post created",
                description: `${isPublishing ? "Post" : "Draft"} ${
                    editing ? " edited" : " created"
                } successfully!`,
                duration: 2500,
            });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const editor = useEditor({
        editable: true,
        extensions: extensions,
        content: content,
        // onUpdate: (editor) => {
        //     console.log(editor.editor.$nodes("image"));
        // },
    });

    useEffect(() => {
        console.log("editor mounted");
        return () => {
            if (editor) {
                editor.destroy();
                console.log("destroyed");
            }
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <MenuBar editor={editor} />
            <article className="w-full prose md:prose-lg mb-8">
                <div className="border border-gray-300 rounded-sm w-full mb-4"></div>
                <div className="flex flex-col">
                    <input
                        type="text"
                        value={h1Text}
                        onChange={(e) => setH1Text(e.target.value)}
                        placeholder="Article Title"
                        className="text-5xl md:text-6xl font-bold border-none bg-transparent outline-none pb-5 text-[#1F1F1F]"
                    />
                    <input
                        type="text"
                        value={pText}
                        onChange={(e) => setPText(e.target.value)}
                        placeholder="Article Description"
                        className="text-base text-gray-600 border-none bg-transparent outline-none"
                    />
                    <span className="flex items-center space-x-3 my-0">
                        <ImageN
                            src={session?.user?.image}
                            className="rounded-full"
                            width={40}
                            height={40}
                        />
                        <span className="text-base text-[#1F1F1F]">
                            By {session?.user?.name}
                        </span>
                    </span>
                </div>

                <EditorContent className="w-full" editor={editor} />

                <span className="flex mt-4">
                    <button
                        className="flex items-center text-sm justify-center border hover:bg-gray-300 py-2 px-3 border-gray-400 rounded-md mt-4 mr-2"
                        onClick={async () => {
                            uploadPost(editor, true);
                        }}
                    >
                        Publish Post
                    </button>
                    <button
                        className="flex items-center text-sm justify-center border hover:bg-gray-300 py-2 px-3 border-gray-300 rounded-md mt-4"
                        onClick={async () => {
                            uploadPost(editor, false);
                        }}
                    >
                        Save Draft
                    </button>
                </span>
            </article>
        </>
    );
};

export default PostEditor;
