import axios from "axios";

export default function usePayments() {
  const createOrder = async (itemId: string, amount: number = 1) => {
    try {
      const result = await axios.post("/api/order", {
        cart: {
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
  return { createOrder };
}
