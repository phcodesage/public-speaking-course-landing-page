import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Crown } from "lucide-react";
import LogoutButton from "./LogoutButton";
import AdminNav from "./AdminNav";

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

        <AdminNav />

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
