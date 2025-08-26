// If you haven't already, install Stripe: npm install stripe
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { planType, teamMembers = 0, fullName, email, useCase, teamSize, role, packageId, credits, price, userId, authToken } = await req.json();

    // Determine pricing based on the selected plan
    let unitAmount = 2900; // default to $29 (in cents) for Basic plan
    let productName = "Basic Plan";

    // Handle credit purchase
    if (planType === "CreditPurchase") {
      unitAmount = price * 100; // Convert dollars to cents
      productName = `${credits} Credits`;
    } else {
      // Handle existing subscription plans
      switch (planType) {
        case "CollaborativePlan": {
          const members = Number(teamMembers) || 0;
          const base = 8900; // $89 in cents
          const additional = members * 2900; // $29 per additional member
          unitAmount = base + additional;
          productName = `Collaborative Plan${members > 0 ? ` (+${members} members)` : ""}`;
          break;
        }
        case "FounderPlan": {
          unitAmount = 9900; // $99 in cents
          productName = "Founder Plan";
          break;
        }
        case "BasicPlan":
        default: {
          unitAmount = 2900; // $29 in cents
          productName = "Basic Plan";
        }
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: planType === "CreditPurchase" 
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/credit-success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}&authToken=${authToken}&credits=${credits}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        planType: planType || "",
        teamMembers: teamMembers?.toString() || "0",
        fullName: fullName || "",
        email: email || "",
        useCase: useCase || "",
        teamSize: teamSize || "",
        role: role || "",
        packageId: packageId || "",
        credits: credits?.toString() || "",
        price: price?.toString() || "",
        userId: userId || "",
        authToken: authToken || "",
      },
      customer_email: email || undefined,
    });
    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    const message = typeof e === "object" && e && "message" in e ? (e as { message: string }).message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
} 