"use client";

import React, { useMemo } from "react";
import PaymentButtons from "./paypalButtons";

export default function PaymentPage({
  params,
}: {
  params: { planId: string };
}) {
  const isSubscription = useMemo(
    () => params.planId !== process.env.NEXT_PUBLIC_PLAN_ID_ONE_TIME,
    [params]
  );

  return (
    <div>
      <PaymentButtons
        style={{
          color: "gold",
          shape: "rect",
          layout: "vertical",
          label: isSubscription ? "subscribe" : "pay",
          height: 40,
        }}
        subscription={isSubscription ? { planId: params.planId } : undefined}
        createSubscription={async (data, actions) => {
          const subscriptionId = await actions.subscription.create({
            plan_id: params.planId,
          });
          // Logic
          return subscriptionId;
        }}
        createOrder={async (data, actions) => {
          // Logic
          const orderId = "";
          return orderId;
        }}
        onApprove={async (data, actions) => {
          // Logic
        }}
        onError={(err: any) => {
          // Logic
        }}
        onCancel={async (data) => {
          if (data.orderId) {
            // Logic to cancel order
          }
          // Logic
        }}
      />
    </div>
  );
}
