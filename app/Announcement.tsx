"use client";

import { useEffect, useState } from "react";

/** Minimal safe markdown → HTML (input is HTML-escaped first). */
function renderMarkdown(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /^### (.+)$/gm,
      '<h3 style="font-size:1rem;font-weight:700;color:#0e1f3e;margin:8px 0 4px">$1</h3>'
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 style="font-size:1.2rem;font-weight:800;color:#0e1f3e;margin:12px 0 6px">$1</h2>'
    )
    .replace(
      /^# (.+)$/gm,
      '<h1 style="font-size:1.4rem;font-weight:800;color:#0e1f3e;margin:14px 0 8px">$1</h1>'
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li style="margin-left:1.2rem;list-style:disc">$1</li>')
    .replace(/\n/g, "<br />");
}

export default function Announcement() {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => setContent(data.content || ""))
      .catch(() => setContent(""));
  }, []);

  if (!content || !content.trim()) return null;

  return (
    <div className="mb-8 p-6 rounded-2xl border-2 border-[#ca3433]/40 bg-gradient-to-br from-[#fcf8f8] to-white shadow-sm">
      <div
        className="text-[#0e1f3e] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    </div>
  );
}
