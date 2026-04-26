"use client";

import { Bold, Heading2, Italic, LinkIcon, List, Pilcrow } from "lucide-react";
import { useEffect, useRef } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  function command(name: string, argument?: string) {
    document.execCommand(name, false, argument);
    onChange(ref.current?.innerHTML || "");
  }

  function addLink() {
    const url = window.prompt("Enter URL");
    if (url) command("createLink", url);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <Tool label="Bold" onClick={() => command("bold")} icon={<Bold />} />
        <Tool label="Italic" onClick={() => command("italic")} icon={<Italic />} />
        <Tool label="Heading" onClick={() => command("formatBlock", "h2")} icon={<Heading2 />} />
        <Tool label="Paragraph" onClick={() => command("formatBlock", "p")} icon={<Pilcrow />} />
        <Tool label="List" onClick={() => command("insertUnorderedList")} icon={<List />} />
        <Tool label="Link" onClick={addLink} icon={<LinkIcon />} />
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={() => onChange(ref.current?.innerHTML || "")}
        className="prose-content min-h-48 px-4 py-3 text-sm outline-none"
      />
    </div>
  );
}

function Tool({ label, icon, onClick }: { label: string; icon: React.ReactElement; onClick: () => void }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-md text-slate-600 transition hover:bg-white hover:text-ink [&_svg]:h-4 [&_svg]:w-4"
    >
      {icon}
    </button>
  );
}
