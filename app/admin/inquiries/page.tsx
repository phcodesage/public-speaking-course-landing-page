"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  Check,
  Trash2,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id: string, read: boolean) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, read } : i)));
  }

  async function deleteInquiry(id: string) {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    await fetch("/api/admin/inquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-[#0e1f3e]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Inquiries
          </h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 ? (
              <span>
                <span className="text-[#ca3433] font-semibold">{unreadCount} unread</span>
                {" · "}
              </span>
            ) : null}
            {inquiries.length} total
          </p>
        </div>
        <div className="w-14 h-14 rounded-full bg-[#fcf8f8] flex items-center justify-center border-2 border-[#ca3433]/20 relative">
          <MessageSquare className="w-6 h-6 text-[#ca3433]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ca3433] text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          Loading inquiries...
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white p-14 rounded-2xl shadow-sm border border-gray-100 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No inquiries yet</p>
          <p className="text-gray-400 text-sm mt-1">
            They will appear here once visitors submit the contact form.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`bg-white rounded-2xl shadow-sm border transition-all ${
                !inquiry.read ? "border-[#ca3433]/30" : "border-gray-100"
              }`}
            >
              {/* Row */}
              <div
                className="p-5 cursor-pointer select-none"
                onClick={() => {
                  const isOpening = expanded !== inquiry.id;
                  setExpanded((prev) => (prev === inquiry.id ? null : inquiry.id));
                  if (isOpening && !inquiry.read) markRead(inquiry.id, true);
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        !inquiry.read ? "bg-[#ca3433]" : "bg-gray-100"
                      }`}
                    >
                      <User
                        className={`w-5 h-5 ${!inquiry.read ? "text-white" : "text-gray-400"}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#0e1f3e] truncate">{inquiry.name}</p>
                        {!inquiry.read && (
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#ca3433]" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{inquiry.email}</p>
                    </div>
                  </div>
                  {inquiry.course && inquiry.course !== "General Inquiry" && (
                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#0e1f3e]/10 text-[#0e1f3e]">
                      {inquiry.course}
                    </span>
                  )}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {formatDate(inquiry.createdAt)}
                    </span>
                    {expanded === inquiry.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 pl-[52px] line-clamp-2">
                  {inquiry.message}
                </p>
              </div>

              {/* Expanded detail */}
              {expanded === inquiry.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="flex items-center gap-2 text-sm text-[#0e1f3e] hover:text-[#ca3433] font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {inquiry.email}
                    </a>
                    {inquiry.phone && (
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="flex items-center gap-2 text-sm text-[#0e1f3e] hover:text-[#ca3433] font-medium transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {inquiry.phone}
                      </a>
                    )}
                    {inquiry.course && (
                      <span className="flex items-center gap-2 text-sm font-medium text-[#0e1f3e]">
                        <span className="px-2.5 py-1 rounded-full bg-[#ca3433]/10 text-[#ca3433] text-xs font-bold">
                          {inquiry.course}
                        </span>
                      </span>
                    )}
                    <span className="text-xs text-gray-400 sm:hidden">
                      {formatDate(inquiry.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4 leading-relaxed whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                  <div className="flex gap-2 mt-4 justify-end">
                    <button
                      onClick={() => markRead(inquiry.id, !inquiry.read)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-[#0e1f3e] hover:text-[#0e1f3e] transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      {inquiry.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
