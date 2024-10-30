"use client";

import React from "react";
import usePayments from "@/lib/hooks/usePayments";
import PaymentButtons from "./paymentButtons";
import { PlanId } from "../../../../models/payment";

export default function CheckoutPage({
  params,
}: {
  params: { planId: string };
}) {
  const {
    createOrder,
    createSubscription,
    handleApproveOrder,
    isSubscription,
  } = usePayments();

  const planId: PlanId = params.planId;

  return (
    <div>
      <h1>Checkout</h1>
      <PaymentButtons
        style={{
          color: "gold",
          shape: "rect",
          layout: "vertical",
          label: isSubscription(planId) ? "subscribe" : "pay",
          height: 40,
        }}
        subscription={isSubscription(planId) ? { planId } : undefined}
        createOrder={async (data, actions) => {
          const orderId = await createOrder(planId);
          return orderId;
        }}
        createSubscription={async (data, actions) => {
          const subscriptionId = await actions.subscription.create({
            plan_id: planId,
          });
          await createSubscription(subscriptionId);
          return subscriptionId;
        }}
        onApprove={async (data, actions) => {
          await handleApproveOrder(data, actions);
        }}
        onError={(err) => {}}
        onCancel={(data) => {}}
      />
    </div>
  );
}
