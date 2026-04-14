import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const client = await clientPromise;
    const db = client.db();
    const registrations = await db
      .collection("registrations")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      registrations.map((r) => ({
        id: r._id.toString(),
        name: r.name,
        email: r.email,
        phone: r.phone,
        schedule: r.schedule,
        courseName: r.courseName || r.schedule,
        paymentStatus: r.paymentStatus || "pending",
        createdAt: r.createdAt,
      }))
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, paymentStatus } = await request.json();
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    await db
      .collection("registrations")
      .updateOne({ _id: new ObjectId(id) }, { $set: { paymentStatus } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await request.json();
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    await db.collection("registrations").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
