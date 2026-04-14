"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileEdit, GraduationCap } from "lucide-react";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/inquiries", icon: Users, label: "Inquiries" },
  { href: "/admin/registrations", icon: GraduationCap, label: "Registrations" },
  { href: "/admin/editor", icon: FileEdit, label: "Page Editor" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-4 py-8 space-y-2">
      {links.map(({ href, icon: Icon, label }) => {
        const isActive =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
