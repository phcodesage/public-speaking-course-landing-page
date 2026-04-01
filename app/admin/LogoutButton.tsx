"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600/20 text-red-400 font-bold hover:bg-red-600/30 transition-colors"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  );
}
