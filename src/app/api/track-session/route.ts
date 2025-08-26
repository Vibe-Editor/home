import { NextRequest, NextResponse } from "next/server";

// In-memory store for processed sessions (in production, use a database)
const processedSessions = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const { sessionId, action } = await req.json();
    
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    if (action === "check") {
      const isProcessed = processedSessions.has(sessionId);
      return NextResponse.json({ processed: isProcessed });
    }

    if (action === "mark") {
      processedSessions.add(sessionId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Session tracking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  const isProcessed = processedSessions.has(sessionId);
  return NextResponse.json({ processed: isProcessed });
}
