import axios from "axios";
import {
  OnApproveData,
  PayPalCapture,
  PayPalCreate,
  PayPalSubscriptionResource,
} from "@/models/payment";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET as string;
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL as string;

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw error;
  }
};

export const verifyWebhookSignature = async (
  headers: Headers,
  body: any
): Promise<boolean> => {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`;

  const headersValues = Object.fromEntries(headers.entries());

  const requestBody = {
    auth_algo: headersValues["paypal-auth-algo"],
    cert_url: headersValues["paypal-cert-url"],
    transmission_id: headersValues["paypal-transmission-id"],
    transmission_sig: headersValues["paypal-transmission-sig"],
    transmission_time: headersValues["paypal-transmission-time"],
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: body,
  };

  const response = await axios.post(url, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data.verification_status === "SUCCESS";
};

/**
 * The PayPal button onApprove callback data. Verify the request and return the data.
 */
export const verifyResponse = async (data: OnApproveData) => {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_BASE_URL}/v2/checkout/orders/${data.orderID}`;

  const response = await axios.get<PayPalCapture>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data.status === "APPROVED";
};

export const createOrder = async (item: {
  currency: string;
  value: number;
}): Promise<PayPalCreate> => {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_BASE_URL}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: item.currency,
          value: item.value,
        },
      },
    ],
  };
  const response = await axios.post<PayPalCreate>(url, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};

export const getSubscription = async (
  subscriptionId: string
): Promise<PayPalSubscriptionResource> => {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`;

  const response = await axios.get<PayPalSubscriptionResource>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
