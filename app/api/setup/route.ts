import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    // Replace this with a secure approach or run only once in dev
    if (secret !== "init-admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing ADMIN_USERNAME or ADMIN_PASSWORD in environment." },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const admins = db.collection("admins");
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingAdmin = await admins.findOne({});

    if (existingAdmin) {
      await admins.updateOne(
        { _id: existingAdmin._id },
        { $set: { username, password: hashedPassword } }
      );

      return NextResponse.json({
        success: true,
        message: `Admin credentials synced from environment for username: ${username}`,
      });
    }

    await admins.insertOne({
      username,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: `Admin created from environment for username: ${username}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error setting up admin" }, { status: 500 });
  }
}
