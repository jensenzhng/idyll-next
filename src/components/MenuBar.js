import { clsx } from "clsx";

import {
    Underline as UnderlineIcon,
    CaseLower,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Undo2,
    Redo2,
} from "lucide-react";

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="sticky top-16 mb-4 pt-2 z-20 transition-all backdrop-filter backdrop-blur-md bg-opacity-10 w-full flex justify-center pb-2 flex-wrap">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={clsx(
                        editor.isActive("bold") && "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <Bold className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={clsx(
                        editor.isActive("italic") && "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <Italic className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={
                        !editor.can().chain().focus().toggleUnderline().run()
                    }
                    className={clsx(
                        editor.isActive("underline") && "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <UnderlineIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={clsx(
                        editor.isActive("strike") && "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <Strikethrough className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={clsx(
                        editor.isActive("heading", { level: 1 }) &&
                            "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <Heading1 className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={clsx(
                        editor.isActive("heading", { level: 2 }) &&
                            "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <Heading2 className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setParagraph().run()
                    }
                    className={clsx(
                        editor.isActive("paragraph") && "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <CaseLower className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign('left').run()
                    }
                    className={clsx(
                        editor.isActive({ textAlign: "left" }) &&
                            "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <AlignLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign('center').run()
                    }
                    className={clsx(
                        editor.isActive({ textAlign: "center" }) &&
                            "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <AlignCenter className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign('right').run()
                    }
                    className={clsx(
                        editor.isActive({ textAlign: "right" }) &&
                            "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <AlignRight className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={clsx(
                        editor.isActive("bulletList") && "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <List className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={clsx(
                        editor.isActive("orderedList") && "bg-black text-white",
                        "border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                    )}
                >
                    <ListOrdered className="w-5 h-5" />
                </button>

                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                >
                    <Undo2 className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="border border-solid border-black rounded-md py-1 px-2 mr-2 my-2"
                >
                    <Redo2 className="w-5 h-5" />
                </button>
            </div>
        </>
    );
};

export default MenuBar;