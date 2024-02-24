import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Dropcursor from "@tiptap/extension-dropcursor";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import FileHandler from "@tiptap-pro/extension-file-handler";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

const extensions = [
    // CustomDocument,
    Link.extend({
        inclusive: false,
    }),
    Dropcursor,
    Underline,
    Image,
    TextAlign.configure({
        alignments: ["left", "center", "right"],
        types: ["heading", "paragraph", "listItem", "image"],
    }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        // document: false
    }),
    Placeholder.configure({
        showOnlyWhenEditable: true,
        placeholder: () => {
            return "Enter your text here...";
        },
    }),
    Heading.configure({
        levels: [1, 2],
    }),
    FileHandler.configure({
        allowedMimeTypes: [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
            files.forEach((file) => {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    currentEditor
                        .chain()
                        .insertContentAt(pos, {
                            type: "image",
                            attrs: {
                                src: fileReader.result,
                            },
                        })
                        .focus()
                        .run();
                };
            });
        },
        onPaste: (currentEditor, files, htmlContent) => {
            files.forEach((file) => {
                if (htmlContent) {
                    // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                    // you could extract the pasted file from this url string and upload it to a server for example
                    console.log(htmlContent); // eslint-disable-line no-console
                    return false;
                }

                const fileReader = new FileReader();

                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    currentEditor
                        .chain()
                        .insertContentAt(currentEditor.state.selection.anchor, {
                            type: "image",
                            attrs: {
                                src: fileReader.result,
                            },
                        })
                        .focus()
                        .run();
                };
            });
        },
    }),
];

export { extensions };