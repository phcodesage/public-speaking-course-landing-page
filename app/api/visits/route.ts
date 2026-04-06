import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const today = new Date().toISOString().split("T")[0];
    await db.collection("pageVisits").insertOne({
      timestamp: new Date(),
      date: today,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
