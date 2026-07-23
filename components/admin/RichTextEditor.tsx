"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Placeholder } from "@tiptap/extension-placeholder";

// Editor visual (WYSIWYG) para el cuerpo de las publicaciones.
// Guarda HTML. Al mostrarlo en la web pública, ese HTML se limpia con
// sanitize-html (ver lib/sanitize.ts) para evitar XSS.

const btn =
  "flex h-8 min-w-8 items-center justify-center rounded px-2 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40";
const btnActive = "bg-brand/10 text-brand hover:bg-brand/15";

function ToolbarButton({
  onClick,
  active,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      // onMouseDown+preventDefault: no perder la selección del editor al hacer clic.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`${btn} ${active ? btnActive : ""}`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const addImage = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al subir");
        editor.chain().focus().setImage({ src: data.url }).run();
      } catch (err) {
        alert(err instanceof Error ? err.message : "No se pudo subir la imagen");
      } finally {
        setUploading(false);
      }
    },
    [editor],
  );

  const addLink = useCallback(() => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Dirección del enlace (URL):", prev ?? "https://");
    if (url === null) return; // cancelado
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt("Pega el enlace del video de YouTube:");
    if (!url) return;
    editor.commands.setYoutubeVideo({ src: url });
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 p-1.5">
      <ToolbarButton
        title="Negrita"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className="bi bi-type-bold text-base" />
      </ToolbarButton>
      <ToolbarButton
        title="Cursiva"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className="bi bi-type-italic text-base" />
      </ToolbarButton>
      <ToolbarButton
        title="Subrayado"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className="bi bi-type-underline text-base" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-slate-300" />

      <ToolbarButton
        title="Título"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <i className="bi bi-type-h2 text-base" />
      </ToolbarButton>
      <ToolbarButton
        title="Subtítulo"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <i className="bi bi-type-h3 text-base" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-slate-300" />

      <ToolbarButton
        title="Lista con viñetas"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <i className="bi bi-list-ul text-base" />
      </ToolbarButton>
      <ToolbarButton
        title="Lista numerada"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <i className="bi bi-list-ol text-base" />
      </ToolbarButton>
      <ToolbarButton
        title="Cita"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <i className="bi bi-quote text-base" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-slate-300" />

      <ToolbarButton title="Enlace" active={editor.isActive("link")} onClick={addLink}>
        <i className="bi bi-link-45deg text-base" />
      </ToolbarButton>
      <ToolbarButton
        title={uploading ? "Subiendo imagen…" : "Insertar imagen"}
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
      >
        <i className={`bi bi-${uploading ? "arrow-repeat animate-spin" : "image"} text-base`} />
      </ToolbarButton>
      <ToolbarButton title="Insertar video de YouTube" onClick={addYoutube}>
        <i className="bi bi-youtube text-base" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-slate-300" />

      <ToolbarButton
        title="Deshacer"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <i className="bi bi-arrow-counterclockwise text-base" />
      </ToolbarButton>
      <ToolbarButton
        title="Rehacer"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <i className="bi bi-arrow-clockwise text-base" />
      </ToolbarButton>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) addImage(f);
          e.target.value = ""; // permite volver a subir el mismo archivo
        }}
      />
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    // Evita el desajuste de hidratación en SSR (obligatorio en Next.js).
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
        },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg" } }),
      Youtube.configure({ controls: true, nocookie: false, width: 640, height: 360 }),
      Placeholder.configure({ placeholder: placeholder || "Escribe el contenido aquí…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "tiptap prose prose-slate max-w-none min-h-[220px] px-3 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sincroniza si el valor externo cambia (p. ej. al abrir otro registro) sin
  // pisar lo que el usuario está escribiendo.
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if ((value || "") !== current) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="min-h-[260px] rounded-lg border border-slate-300 bg-slate-50" />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
