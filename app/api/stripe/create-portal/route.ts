import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { auth } from "../../../lib/auth";
import { db } from "../../../lib/firebase";

export async function POST(request: Request) {

  const sessions = await auth();
  const userId = sessions?.user.id;


  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.collection("users").doc(userId).get();
  const customerId = user.data()?.customerId;
  
  if (!customerId) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${request.headers.get("origin")}`
    });
  
    return NextResponse.json({ url: portalSession.url });
  
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }

  
}