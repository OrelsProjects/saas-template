"use client";

import React, { useMemo } from "react";
import PaymentButtons from "./paymentButtons";
import usePayments from "@/lib/hooks/usePayments";

export default function PaymentPage({
  params,
}: {
  params: { planId: string };
}) {
  const { createOrder, createSubscription, handleApproveOrder } = usePayments();

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
          await createSubscription(subscriptionId);
          return subscriptionId;
        }}
        createOrder={async (data, actions) => {
          const orderId = await createOrder(params.planId);
          return orderId;
        }}
        onApprove={async (data, actions) => {
          await handleApproveOrder(data, actions);
        }}
        onError={(err: any) => {
          console.error("Error", err);
          // Logic
        }}
        onCancel={async (data) => {
          console.log("Cancel", data);
          if (data.orderId) {
            // Logic to cancel order
          }
          // Logic
        }}
      />
    </div>
  );
}
