import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { db } from "../../../lib/firebase";
import Stripe from "stripe";


export async function POST(params: NextRequest) {

  try {
    const body = await params.text()

    const signature = params.headers.get("stripe-signature")

    const secret = process.env.STRIPE_WEBHOOK_SECRET

    if (!signature || !secret) {
      throw new Error("Missing signature or secret")
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        //usuario completou o checkout
        if(event.data.object.payment_status === "paid") {
          const userId = event.data.object.client_reference_id;
          if(userId) {
            await db.collection("users").doc(userId).update({
              isSubscribed: true,
            })
          }
        }

        //verificar se foi boleto 
        if(event.data.object.payment_status === "unpaid" && event.data.object.payment_intent) {
          const paymentIntent = await stripe.paymentIntents.retrieve(event.data.object.payment_intent as string);
          const hostVoucherUrl = paymentIntent.next_action?.boleto_display_details?.hosted_voucher_url;
          if (hostVoucherUrl) {
            const userEmail = event.data.object.customer_details?.email;
            console.log("Enviar email para p client")

          }
        }

        console.log("Checkout session completed")
        break;
      case "checkout.session.async_payment_succeeded":
        //usuario pagou o boleto
        if(event.data.object.payment_status === "paid") {
          const userId = event.data.object.client_reference_id;
          if(userId) {
            await db.collection("users").doc(userId).update({
              isSubscribed: true,
            })
          }
        }
        console.log("Async payment succeeded")
        break;
      case "customer.subscription.deleted":
        //usuairo cancelou o plano
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        if (customerId){
          const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
         
          if (customer && customer.metadata.userId) {
            const userId = customer.metadata.userId;
            await db.collection("users").doc(userId).update({
              isSubscribed: false,
            })
          }
        }
         
        console.log("Subscription deleted")
        break;
    }


    return NextResponse.json({ status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500 })
  }
}