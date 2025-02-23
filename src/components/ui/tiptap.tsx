// react & next
import { useEffect } from "react";

// others lib
import { useController } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import clsx from "clsx";

// components
import { Toggle } from "./toggle";

// icons
import { Bold as BoldIcon, Code, Heading1, Heading2, Heading3, Heading4, ItalicIcon, List, ListOrdered, Quote } from "lucide-react";


interface TipTapEditorProps {
    name: string;
    control: any;
    errors?: any;
    placeholder?: string;
}

const TipTapEditor = ({ name, control, errors, placeholder }: TipTapEditorProps) => {
    const {
        field: { onChange, value },
    } = useController({ name, control });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Heading.configure({ levels: [2, 3, 4, 5] }),
            BulletList,
            OrderedList,
            ListItem,
            Blockquote,
            CodeBlock
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    if (!editor) {
        return (
            <div className="border border-gray-300 p-2 rounded-md">
                Chargement...
            </div>
        )
    }

    return (
        <div
            className={clsx(
                "border rounded-md p-2 min-h-[200px] bg-white dark:bg-gray-900 focus-within:ring-2",
                errors?.[name]
                    ? "border-red-500 focus-within:ring-red-500"
                    : "border-gray-200 focus-within:ring-primary"
            )}
        >
            {/* Toolbar */}
            <div
                className="flex space-x-2 p-2 border-b bg-white dark:bg-gray-900 dark:text-gray-900 border border-blue-400 rounded-md"
            >
                <Toggle
                    aria-label="Transformer en titre secondaire 1"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("heading", { level: 2 })
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <Heading1 />
                </Toggle>

                <Toggle
                    aria-label="Transformer en titre secondaire 2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("heading", { level: 3 })
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <Heading2 />
                </Toggle>

                <Toggle
                    aria-label="Transformer en titre secondaire 2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("heading", { level: 4 })
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <Heading3 />
                </Toggle>

                <Toggle
                    aria-label="Transformer en titre secondaire 2"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("heading", { level: 5 })
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <Heading4 />
                </Toggle>

                <Toggle
                    aria-label="Mise en gras"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("bold")
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <BoldIcon />
                </Toggle>

                <Toggle
                    aria-label="Mise en forme citation"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("blockquote")
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <Quote />
                </Toggle>

                <Toggle
                    aria-label="Mise en forme code"
                    onClick={() => editor.chain().focus().setCodeBlock().run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("codeBlock")
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <Code />
                </Toggle>

                <Toggle
                    aria-label="Mise en italique"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("italic")
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <ItalicIcon />
                </Toggle>

                <Toggle
                    aria-label="Appliquer liste non ordonnée"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("bulletList")
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <List />
                </Toggle>

                <Toggle
                    aria-label="Appliquer liste ordonnée"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={clsx(
                        "p-2 border rounded-md transition-colors bg-white",
                        editor.isActive("orderedList")
                            ? "bg-gray-500 text-black font-bold"
                            : "bg-white border-none"
                    )}
                >
                    <ListOrdered />
                </Toggle>
            </div>

            {/* Éditeur */}
            <div className="relative dark:bg-gray-900">
                {!editor.getText() && (
                    <span className="absolute top-2 left-2 text-gray-400 pointer-events-none">
                        {placeholder}
                    </span>
                )}
                <EditorContent
                    editor={editor}
                    className="p-2 min-h-[50px] bg-white dark:bg-gray-900"
                />
            </div>
        </div>
    );
};

export default TipTapEditor;
