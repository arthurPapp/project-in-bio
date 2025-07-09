import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { auth } from "../../../lib/auth";
import { db } from "../../../lib/firebase";
import { trackServerEvent } from "../../../lib/mixpanel";

export async function POST(req: Request) {
  const { metadata, isSubscription } = await req.json();

  const price = isSubscription ?  process.env.STRIPE_PRICE_ID_MENSAL : process.env.STRIPE_PRICE_ID_ANUAL

  const userSession = await auth();

  if (!userSession || !userSession.user?.id || !userSession.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }



  const userId = userSession.user?.id;
  const userEmail = userSession.user?.email;
  const userName = userSession.user?.name;

  const userRef = db.collection("users").doc(userId || "");

  const userDoc = await userRef.get();

  let customerId;

  if (userDoc.exists) {
    customerId = userDoc.data()?.customerId;
  }

  if (!customerId) {
    const newCustomer = await stripe.customers.create({
      email: userEmail,
      name: userName || "Sem nome",
      metadata: {
        userId: userId,
      },
    });
    customerId = newCustomer.id;
    await userRef.update({ customerId });
  }


  const session = await stripe.checkout.sessions.create({
    // custumer:,
      line_items: [{
      price: price,
      quantity: 1,
    }],
      // o mode tem 3 opçoes 
    mode: "subscription",
    metadata,
    success_url: `${req.headers.get("origin")}/${metadata.profileId}`,
    cancel_url: `${req.headers.get("origin")}/${metadata.profileId}/upgrade`,
    client_reference_id: userId,
    payment_method_types: isSubscription ? ["card"] : ["card", "boleto"]
  })

  trackServerEvent("checkout_created", {
    price: price,
    isSubscription: isSubscription,
    userId: userId,
  });

  return NextResponse.json({
    sessionId: session.id,
  })
}