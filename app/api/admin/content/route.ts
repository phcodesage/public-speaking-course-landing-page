import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const doc = await db.collection("pageContent").findOne({ key: "announcement" });
    return NextResponse.json({ content: doc?.value || "" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { content } = await request.json();
    const client = await clientPromise;
    const db = client.db();
    await db.collection("pageContent").updateOne(
      { key: "announcement" },
      {
        $set: {
          key: "announcement",
          value: (content || "").substring(0, 5000),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
