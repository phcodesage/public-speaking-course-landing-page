"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  GraduationCap,
  Trash2,
  User,
  ChevronDown,
  ChevronUp,
  DollarSign,
  CheckCircle,
  Clock,
} from "lucide-react";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  schedule: string;
  courseName: string;
  paymentStatus: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  async function fetchRegistrations() {
    try {
      const res = await fetch("/api/admin/registrations");
      const data = await res.json();
      setRegistrations(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function updatePaymentStatus(id: string, paymentStatus: string) {
    await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, paymentStatus }),
    });
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, paymentStatus } : r))
    );
  }

  async function deleteRegistration(id: string) {
    if (!confirm("Delete this registration? This cannot be undone.")) return;
    await fetch("/api/admin/registrations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
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

  const pendingCount = registrations.filter(
    (r) => r.paymentStatus === "pending"
  ).length;
  const paidCount = registrations.filter(
    (r) => r.paymentStatus === "paid"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-[#0e1f3e]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Registrations
          </h1>
          <p className="text-gray-500 mt-1">
            {pendingCount > 0 ? (
              <span>
                <span className="text-[#ca3433] font-semibold">
                  {pendingCount} pending payment
                </span>
                {" · "}
              </span>
            ) : null}
            {registrations.length} total
          </p>
        </div>
        <div className="w-14 h-14 rounded-full bg-[#fcf8f8] flex items-center justify-center border-2 border-[#ca3433]/20 relative">
          <GraduationCap className="w-6 h-6 text-[#ca3433]" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ca3433] text-white text-[10px] font-bold flex items-center justify-center">
              {pendingCount > 9 ? "9+" : pendingCount}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0e1f3e]/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#0e1f3e]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Registrations</p>
              <p className="text-2xl font-bold text-[#0e1f3e]">
                {registrations.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Payment</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-green-600">{paidCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          Loading registrations...
        </div>
      ) : registrations.length === 0 ? (
        <div className="bg-white p-14 rounded-2xl shadow-sm border border-gray-100 text-center">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No registrations yet</p>
          <p className="text-gray-400 text-sm mt-1">
            They will appear here once students complete the registration form.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {registrations.map((registration) => (
            <div
              key={registration.id}
              className={`bg-white rounded-2xl shadow-sm border transition-all ${
                registration.paymentStatus === "pending"
                  ? "border-yellow-300"
                  : "border-gray-100"
              }`}
            >
              {/* Row */}
              <div
                className="p-5 cursor-pointer select-none"
                onClick={() =>
                  setExpanded((prev) =>
                    prev === registration.id ? null : registration.id
                  )
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        registration.paymentStatus === "pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#0e1f3e] truncate">
                          {registration.name}
                        </p>
                        {registration.paymentStatus === "pending" && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                            Pending
                          </span>
                        )}
                        {registration.paymentStatus === "paid" && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            Paid
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {registration.courseName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {formatDate(registration.createdAt)}
                    </span>
                    {expanded === registration.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === registration.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <a
                      href={`mailto:${registration.email}`}
                      className="flex items-center gap-2 text-sm text-[#0e1f3e] hover:text-[#ca3433] font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {registration.email}
                    </a>
                    {registration.phone && (
                      <a
                        href={`tel:${registration.phone}`}
                        className="flex items-center gap-2 text-sm text-[#0e1f3e] hover:text-[#ca3433] font-medium transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {registration.phone}
                      </a>
                    )}
                    <span className="flex items-center gap-2 text-sm font-medium text-[#0e1f3e]">
                      <DollarSign className="w-4 h-4" />
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          registration.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {registration.paymentStatus === "paid"
                          ? "Paid"
                          : "Pending Payment"}
                      </span>
                    </span>
                    <span className="text-xs text-gray-400 sm:hidden">
                      {formatDate(registration.createdAt)}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Course:</strong> {registration.courseName}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Schedule ID:</strong> {registration.schedule}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end">
                    {registration.paymentStatus === "pending" ? (
                      <button
                        onClick={() =>
                          updatePaymentStatus(registration.id, "paid")
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Paid
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          updatePaymentStatus(registration.id, "pending")
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors"
                      >
                        <Clock className="w-4 h-4" />
                        Mark as Pending
                      </button>
                    )}
                    <button
                      onClick={() => deleteRegistration(registration.id)}
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
