"use client";

import { useState, useEffect } from "react";
import { Loader2, X, GraduationCap } from "lucide-react";
import PaymentModal, { calcCardPrice } from "./PaymentModal";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSchedule: string;
}

export const COURSE_SCHEDULES = [
  { id: "level-1-regular", name: "Level 1 - Regular Course ($439)", link: "https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04" },
  { id: "level-2-regular", name: "Level 2 - Regular Course ($439)", link: "https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04" },
  { id: "level-3-regular", name: "Level 3 - Regular Course ($439)", link: "https://buy.stripe.com/7sY5kwcWw9se6FXfF1dfG04" },
  { id: "level-1-crash", name: "Level 1 - Crash Course ($139)", link: "https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i" },
  { id: "level-2-crash", name: "Level 2 - Crash Course ($139)", link: "https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i" },
  { id: "level-3-crash", name: "Level 3 - Crash Course ($139)", link: "https://buy.stripe.com/7sY8wI4q0gUGaWd2SfdfG0i" },
  { id: "bundle", name: "All 3 Levels Bundle ($1,200)", link: "https://buy.stripe.com/14A3co1dO1ZM9S950ndfG0b" },
];

export default function RegistrationModal({ isOpen, onClose, defaultSchedule }: RegistrationModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    schedule: defaultSchedule || "level-1-regular",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedScheduleData, setSelectedScheduleData] = useState<typeof COURSE_SCHEDULES[0] | null>(null);

  // Sync form schedule when modal opens with a new default schedule
  useEffect(() => {
    if (isOpen && defaultSchedule) {
      setForm((f) => ({ ...f, schedule: defaultSchedule }));
      setError("");
    }
  }, [isOpen, defaultSchedule]);

  if (!isOpen && !paymentModalOpen) return null;

  if (paymentModalOpen && selectedScheduleData) {
    const cashPrice = getCashPrice(form.schedule);
    return (
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => { setPaymentModalOpen(false); onClose(); }}
        courseName={`Public Speaking — ${getCourseName(form.schedule)}`}
        cashPrice={cashPrice}
        cardPrice={calcCardPrice(cashPrice)}
        stripeLink={selectedScheduleData.link}
      />
    );
  }

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const selectedSchedule = COURSE_SCHEDULES.find((c) => c.id === form.schedule);
        if (selectedSchedule) {
          setSelectedScheduleData(selectedSchedule);
          setPaymentModalOpen(true);
        } else {
          setError("Invalid schedule selected.");
          setLoading(false);
        }
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  function getCourseName(scheduleId: string): string {
    const schedule = COURSE_SCHEDULES.find(c => c.id === scheduleId);
    return schedule?.name || 'Public Speaking Course';
  }

  function getCashPrice(scheduleId: string): string {
    if (scheduleId.includes('crash')) return '$139';
    if (scheduleId === 'bundle') return '$1,200';
    return '$439';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b" style={{ backgroundColor: '#0e1f3e' }}>
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-[#ca3433]" />
            <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Student Registration
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form body */}
        <div className="p-6 overflow-y-auto">
          <p className="text-gray-600 mb-6 text-sm">
            Please provide your details below to register. You will be redirected to our secure payment gateway to complete your enrollment.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Full Name *</label>
              <input 
                required
                type="text" 
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ca3433] focus:ring-2 focus:ring-[#ca3433]/20 outline-none transition-all text-[#0e1f3e]"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Email Address *</label>
              <input 
                required
                type="email" 
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ca3433] focus:ring-2 focus:ring-[#ca3433]/20 outline-none transition-all text-[#0e1f3e]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Phone Number *</label>
              <input 
                required
                type="tel" 
                value={form.phone}
                onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ca3433] focus:ring-2 focus:ring-[#ca3433]/20 outline-none transition-all text-[#0e1f3e]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Selected Schedule *</label>
              <select 
                required
                value={form.schedule}
                onChange={(e) => setForm(f => ({ ...f, schedule: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ca3433] focus:ring-2 focus:ring-[#ca3433]/20 outline-none transition-all text-[#0e1f3e] appearance-none cursor-pointer"
              >
                {COURSE_SCHEDULES.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 mt-2">
                {error}
              </p>
            )}

            <button 
              disabled={loading}
              type="submit"
              className="w-full mt-6 py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              style={{ backgroundColor: '#ca3433', fontFamily: 'Montserrat, sans-serif' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue to Payment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
