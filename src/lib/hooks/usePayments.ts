import axios from "axios";
import {
  OnApproveData,
  PayPalCapture,
  PlanId,
  SubscriptionId,
} from "../models/payment";

export default function usePayments() {
  const createOrder = async (itemId: string, amount: number = 1) => {
    try {
      const result = await axios.post("/api/order", {
        product: {
          itemId,
          amount,
        },
      });
      const orderData = result.data;

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error: any) {
      throw error;
    }
  };

  const approveSubscription = async (
    data: OnApproveData
  ): Promise<SubscriptionId> => {
    try {
      const result = await axios.post("/api/subscription/approve", { data });
      const subscriptionData = result.data;

      if (subscriptionData.id) {
        return subscriptionData.id;
      } else {
        const errorDetail = subscriptionData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${subscriptionData.debug_id})`
          : JSON.stringify(subscriptionData);

        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("**ERROR APPROVING SUBSCRIPTION**", { error });
      throw error;
    }
  };

  const createSubscription = async (subscriptionId: SubscriptionId) => {
    try {
      const result = await axios.post("/api/subscription", {
        subscriptionId,
      });
      const subscription = result.data;
      return subscription.id;
    } catch (error: any) {
      console.error("Error creating order", { error });
      throw error;
    }
  };

  const approveOrder = async (orderId: string): Promise<PayPalCapture> => {
    try {
      const response = await axios.post<PayPalCapture>(
        `/api/order/${orderId}/capture`
      );
      return response.data;
    } catch (error: any) {
      console.error("**ERROR APPROVING ORDER**", { error });
      throw error;
    }
  };

  const handleApproveOrder = async (data: OnApproveData, actions: any) => {
    if (data.subscriptionID) {
      return await approveSubscription(data);
    } else {
      const orderData = await approveOrder(data.orderID);
      const errorDetail = orderData?.details?.[0];
      if (errorDetail?.issue) {
        if (errorDetail.issue === "INSTRUMENT_DECLINED") {
          return actions.restart();
        } else if (errorDetail.issue === "PAYER_CANNOT_PAY") {
          throw new Error("Your payment method is not valid.");
        } else if (errorDetail) {
          console.error("**ERROR CAPTURING ORDER**", { errorDetail });
          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
        }
      }
    }
  };

  const isSubscription = (planId: PlanId) =>
    planId !== process.env.NEXT_PUBLIC_PLAN_ID_ONE_TIME;

  return {
    createOrder,
    createSubscription,
    handleApproveOrder,
    isSubscription,
  };
}
