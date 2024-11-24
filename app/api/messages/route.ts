import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const conn = await createConnection();
    const [rows] = await conn.execute(
      `SELECT * FROM private_messages 
       WHERE sender_id = ? OR receiver_id = ?
       ORDER BY sent_at ASC`,
      [userId, userId]
    );
    await conn.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
