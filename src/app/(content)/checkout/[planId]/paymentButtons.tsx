import {
    PayPalButtons,
    PayPalButtonsComponentProps,
  } from "@paypal/react-paypal-js";
  import React from "react";
import { PlanId } from "@/models/payment";
  
  export interface PaymentButtonsProps extends PayPalButtonsComponentProps {
    subscription?: {
      planId: PlanId;
    };
  }
  
  export default function PaymentButtons({
    subscription,
    createOrder,
    createSubscription,
    ...props
  }: PaymentButtonsProps) {
    return subscription ? (
      <PayPalButtons
        createSubscription={createSubscription}
        createOrder={undefined}
        {...props}
      />
    ) : (
      <PayPalButtons
      createSubscription={undefined}
      createOrder={createOrder}
        {...props}
      />
    );
  }
  