import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return NextResponse.json({ success: false, error: "Missing session_id" }, { status: 400 });
    }
    // TODO: Save form data logic here
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const message = typeof e === "object" && e && "message" in e ? (e as { message: string }).message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
} 