"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

export default function PaymentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        vault: true, // Enable vault to store payment details for future payments
        currency: "USD",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
