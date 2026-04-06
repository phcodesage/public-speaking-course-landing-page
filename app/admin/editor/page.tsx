"use client";

import { useState, useEffect } from "react";
import { Save, Eye, Edit3, FileText, CheckCircle, Info } from "lucide-react";

/** Minimal safe markdown → HTML. Input is HTML-escaped first so no XSS. */
function renderMarkdown(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:700;color:#0e1f3e;margin:12px 0 6px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.3rem;font-weight:800;color:#0e1f3e;margin:16px 0 8px">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.6rem;font-weight:800;color:#0e1f3e;margin:18px 0 10px">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li style="margin-left:1.2rem;list-style:disc">$1</li>')
    .replace(/\n/g, "<br />");
}

type Mode = "edit" | "split" | "preview";

const PLACEHOLDER = `## 📣 Announcement Title

Write your announcement here. Use **bold**, *italic*, ## headings, and - lists.

Leave this blank to hide the banner on the landing page.`;

export default function EditorPage() {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [mode, setMode] = useState<Mode>("split");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        setContent(data.content || "");
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  async function save() {
    setSaving(true);
    setSaveMsg("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setSaveMsg("Saved!");
      setTimeout(() => setSaveMsg(""), 3000);
    }
  }

  function handleChange(val: string) {
    setContent(val);
    setSaved(false);
    setSaveMsg("");
  }

  const modes: [Mode, typeof Edit3, string][] = [
    ["edit", Edit3, "Edit"],
    ["split", FileText, "Split"],
    ["preview", Eye, "Preview"],
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold text-[#0e1f3e]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Page Editor
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Write an announcement in Markdown — it appears as a banner on your landing page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-semibold">
              <CheckCircle className="w-4 h-4" />
              {saveMsg}
            </span>
          )}
          {!saved && !saveMsg && (
            <span className="text-xs text-gray-400 font-medium">Unsaved changes</span>
          )}
          <button
            onClick={save}
            disabled={saving || saved}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ca3433] text-white font-semibold text-sm hover:bg-[#b02e2d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Hint */}
      <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          Supports <code className="bg-blue-100 px-1 rounded">**bold**</code>,{" "}
          <code className="bg-blue-100 px-1 rounded">*italic*</code>,{" "}
          <code className="bg-blue-100 px-1 rounded"># Heading</code>,{" "}
          <code className="bg-blue-100 px-1 rounded">## Subheading</code>,{" "}
          <code className="bg-blue-100 px-1 rounded">- list item</code>. Leave blank to hide
          the banner.
        </p>
      </div>

      {/* Editor / Preview */}
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
        style={{ minHeight: "520px" }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-100 bg-gray-50">
          {modes.map(([m, Icon, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mode === m
                  ? "bg-white text-[#0e1f3e] shadow-sm border border-gray-200"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Panes */}
        <div className={`flex flex-1 ${mode === "split" ? "divide-x divide-gray-100" : ""}`}>
          {/* Edit pane */}
          {(mode === "edit" || mode === "split") && (
            <div className={mode === "split" ? "w-1/2 flex flex-col" : "w-full flex flex-col"}>
              {mode === "split" && (
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 px-5 pt-3 pb-1">
                  Markdown
                </p>
              )}
              {loaded ? (
                <textarea
                  value={content}
                  onChange={(e) => handleChange(e.target.value)}
                  className="flex-1 w-full p-5 text-sm font-mono text-gray-700 resize-none outline-none"
                  placeholder={PLACEHOLDER}
                  style={{ minHeight: "460px" }}
                />
              ) : (
                <div className="flex-1 p-5 text-sm text-gray-400">Loading…</div>
              )}
            </div>
          )}

          {/* Preview pane */}
          {(mode === "preview" || mode === "split") && (
            <div
              className={`overflow-y-auto ${
                mode === "split" ? "w-1/2 p-5" : "w-full p-8"
              }`}
            >
              {mode === "split" && (
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-3">
                  Preview
                </p>
              )}
              {content.trim() ? (
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              ) : (
                <p className="text-gray-400 italic text-sm">
                  Preview will appear here…
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
