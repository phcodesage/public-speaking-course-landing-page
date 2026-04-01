import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Crown, LogOut, LayoutDashboard, Users, BookOpen } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0e1f3e] text-white flex flex-col">
        <div className="p-6 flex items-center justify-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ca3433] flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Exceed Admin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-colors cursor-not-allowed opacity-60">
            <Users className="w-5 h-5" />
            Inquiries
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-colors cursor-not-allowed opacity-60">
            <BookOpen className="w-5 h-5" />
            Courses
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-400 text-center mb-4">Logged in as {session.user?.name}</p>
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
