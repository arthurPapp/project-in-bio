"use client"

import { useStripe } from "../../hooks/useStripe";

export default function PortalButton() {
  const { handlerCreateStripePortal } = useStripe();

  return <button onClick={handlerCreateStripePortal}>Portal</button>
}