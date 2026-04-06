"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, Phone, Mail } from "lucide-react";

export default function InquiryForm() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    course: "General Inquiry",
    message: "" 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", course: "General Inquiry", message: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to send. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 border-2 border-green-100">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h4 className="text-2xl font-bold text-[#0e1f3e] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Inquiry Sent!</h4>
        <p className="text-gray-500 max-w-sm mx-auto">
          Thank you for reaching out. We've sent a confirmation email to you and our team will be in touch shortly.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-8 font-bold text-[#ca3433] hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-5 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
      {/* Left Side: Info */}
      <div className="lg:col-span-2 p-8 lg:p-12 text-white flex flex-col justify-between" style={{ backgroundColor: '#0e1f3e' }}>
        <div>
          <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Inquire & Enroll</h3>
          <p className="text-white/80 mb-8 leading-relaxed">
            Ready to ignite your brilliance? Fill out the form and our team will get back to you with enrollment details and answer any questions.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                <Phone className="w-5 h-5 text-[#ca3433]" />
              </div>
              <span className="font-medium">+1 (516) 226-3114</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                <Mail className="w-5 h-5 text-[#ca3433]" />
              </div>
              <span className="font-medium text-sm">teenprograms@exceedlearningcenterny.com</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Location</p>
          <p className="text-sm leading-relaxed">1360 Willis Ave.,<br/>Albertson NY 11507</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="lg:col-span-3 p-8 lg:p-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Full Name</label>
              <input 
                required
                type="text" 
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#ca3433] focus:ring-4 focus:ring-[#ca3433]/5 outline-none transition-all text-[#0e1f3e]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Email Address</label>
              <input 
                required
                type="email" 
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="john@example.com"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#ca3433] focus:ring-4 focus:ring-[#ca3433]/5 outline-none transition-all text-[#0e1f3e]"
              />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Phone Number</label>
              <input 
                type="tel" 
                value={form.phone}
                onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="(555) 000-0000"
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#ca3433] focus:ring-4 focus:ring-[#ca3433]/5 outline-none transition-all text-[#0e1f3e]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Program of Interest</label>
              <select 
                id="course-select"
                value={form.course}
                onChange={(e) => setForm(f => ({ ...f, course: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#ca3433] focus:ring-4 focus:ring-[#ca3433]/5 outline-none transition-all text-[#0e1f3e] appearance-none cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Level 1 Regular">Level 1 - Regular Course</option>
                <option value="Level 2 Regular">Level 2 - Regular Course</option>
                <option value="Level 1 Crash">Level 1 - Crash Course</option>
                <option value="Level 2 Crash">Level 2 - Crash Course</option>
                <option value="Level 3 Crash">Level 3 - Crash Course</option>
                <option value="Summer Course">Summer Course (Teens)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0e1f3e] uppercase tracking-wider pl-1">Message</label>
            <textarea 
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="How can we help you?"
              className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#ca3433] focus:ring-4 focus:ring-[#ca3433]/5 outline-none transition-all text-[#0e1f3e] resize-none"
            ></textarea>
          </div>

          {error && (
            <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[#ca3433]/20"
            style={{ backgroundColor: '#ca3433', fontFamily: 'Montserrat, sans-serif' }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Inquiry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
