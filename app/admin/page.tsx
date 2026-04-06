import { Crown, Eye, Users, MessageSquare, TrendingUp } from "lucide-react";
import clientPromise from "@/lib/mongodb";
import Link from "next/link";

async function getStats() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const today = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [totalVisits, todayVisits, totalInquiries, unreadInquiries, visitsByDay] =
      await Promise.all([
        db.collection("pageVisits").countDocuments(),
        db.collection("pageVisits").countDocuments({ date: today }),
        db.collection("inquiries").countDocuments(),
        db.collection("inquiries").countDocuments({ read: false }),
        db
          .collection("pageVisits")
          .aggregate([
            { $match: { timestamp: { $gte: sevenDaysAgo } } },
            { $group: { _id: "$date", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ])
          .toArray(),
      ]);

    return { totalVisits, todayVisits, totalInquiries, unreadInquiries, visitsByDay };
  } catch {
    return {
      totalVisits: 0,
      todayVisits: 0,
      totalInquiries: 0,
      unreadInquiries: 0,
      visitsByDay: [],
    };
  }
}

function VisitsBarChart({ data }: { data: { _id: string; count: number }[] }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split("T")[0];
    const found = data.find((x) => x._id === dateStr);
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      count: found?.count || 0,
    };
  });

  const max = Math.max(...days.map((d) => d.count), 1);

  return (
    <div className="flex items-end gap-2 h-36 w-full pt-2">
      {days.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-xs font-bold text-[#0e1f3e]">
            {d.count > 0 ? d.count : ""}
          </span>
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${Math.max((d.count / max) * 96, d.count > 0 ? 6 : 3)}px`,
              backgroundColor: d.count > 0 ? "#ca3433" : "#e5e7eb",
            }}
          />
          <span className="text-[10px] text-gray-400 font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  accent,
  href,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  accent?: boolean;
  href?: string;
}) {
  const inner = (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border transition-shadow hover:shadow-md ${
        accent ? "border-[#ca3433]/20" : "border-gray-100"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            accent ? "bg-[#fcf8f8]" : "bg-gray-50"
          }`}
        >
          {icon}
        </div>
      </div>
      <p className={`text-3xl font-bold ${accent ? "text-[#ca3433]" : "text-[#0e1f3e]"}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-[#0e1f3e]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Overview of your site activity</p>
        </div>
        <div className="hidden sm:flex w-16 h-16 rounded-full bg-[#fcf8f8] items-center justify-center border-2 border-[#ca3433]/20">
          <Crown className="w-8 h-8 text-[#ca3433]" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Page Visits"
          value={stats.totalVisits}
          icon={<Eye className="w-5 h-5 text-[#0e1f3e]" />}
        />
        <StatCard
          title="Visits Today"
          value={stats.todayVisits}
          icon={<TrendingUp className="w-5 h-5 text-[#ca3433]" />}
          accent
        />
        <StatCard
          title="Total Inquiries"
          value={stats.totalInquiries}
          icon={<MessageSquare className="w-5 h-5 text-[#0e1f3e]" />}
          href="/admin/inquiries"
        />
        <StatCard
          title="Unread Inquiries"
          value={stats.unreadInquiries}
          icon={<Users className="w-5 h-5 text-[#ca3433]" />}
          accent={stats.unreadInquiries > 0}
          href="/admin/inquiries"
        />
      </div>

      {/* Visits Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3
          className="text-lg font-bold text-[#0e1f3e] mb-1"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Page Visits — Last 7 Days
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {(stats.visitsByDay as { count: number }[]).reduce((a, b) => a + b.count, 0)} visits
          this week
        </p>
        <VisitsBarChart data={stats.visitsByDay as { _id: string; count: number }[]} />
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/inquiries"
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#ca3433]/20 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fcf8f8] flex items-center justify-center border border-[#ca3433]/20">
              <MessageSquare className="w-6 h-6 text-[#ca3433]" />
            </div>
            <div>
              <h4
                className="font-bold text-[#0e1f3e] group-hover:text-[#ca3433] transition-colors"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                View Inquiries
              </h4>
              <p className="text-sm text-gray-500">
                {stats.unreadInquiries > 0
                  ? `${stats.unreadInquiries} unread message${stats.unreadInquiries > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/admin/editor"
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#0e1f3e]/20 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
              <Eye className="w-6 h-6 text-[#0e1f3e]" />
            </div>
            <div>
              <h4
                className="font-bold text-[#0e1f3e] group-hover:text-[#ca3433] transition-colors"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Page Editor
              </h4>
              <p className="text-sm text-gray-500">
                Edit the announcement shown on your landing page
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
