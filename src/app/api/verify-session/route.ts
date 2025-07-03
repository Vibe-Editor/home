// If you haven't already, install Stripe: npm install stripe
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ verified: false, error: "Missing session_id" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ verified: false });
    }
  } catch (e: unknown) {
    const message = typeof e === "object" && e && "message" in e ? (e as { message: string }).message : "Unknown error";
    return NextResponse.json({ verified: false, error: message }, { status: 400 });
  }
} 