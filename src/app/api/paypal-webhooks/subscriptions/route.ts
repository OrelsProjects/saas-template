// pages/api/paypal-webhooks.ts

import { NextRequest, NextResponse } from "next/server";
import { handleSubscriptionCreated } from "@/app/api/paypal-webhooks/subscriptionCreated";
import { handlePaymentFailed } from "@/app/api/paypal-webhooks/paymentFailed";
import { handlePaymentSaleCompleted } from "@/app/api/paypal-webhooks/paymentSaleCompleted";
import { handleSubscriptionActivated } from "@/app/api/paypal-webhooks/subscriptionActivated";
import { handleSubscriptionCancelled } from "@/app/api/paypal-webhooks/subscriptionCancelled";
import { handleSubscriptionSuspended } from "@/app/api/paypal-webhooks/subscriptionSuspended";
import { handleSubscriptionExpired } from "@/app/api/paypal-webhooks/subscriptionExpired";
import prisma from "@/app/api/_db/db";
import { PayPalPaymentStatus } from "@/models/payment";
import { verifyWebhookSignature } from "@/app/api/utils/payment";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    const eventType = event.event_type;
    console.info("Received webhook event", "system-webhook", {
      data: { eventType, event },
    });

    const isHookVerified = await verifyWebhookSignature(req.headers, event);
    if (!isHookVerified) {
      console.error("Webhook signature verification failed", "system-webhook", {
        data: { event },
      });
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 401 }
      );
    }

    const isBillingEvent = eventType.startsWith("BILLING.SUBSCRIPTION");
    let response: any = {};
    switch (eventType) {
      // case "BILLING.SUBSCRIPTION.CREATED":
      //   response = await handleSubscriptionCreated(event);
      //   break;
      // case "BILLING.SUBSCRIPTION.ACTIVATED":
      //   response = await handleSubscriptionActivated(event);
      //   break;
      case "BILLING.SUBSCRIPTION.CANCELLED":
        response = await handleSubscriptionCancelled(event);
        break;
      // case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
      //   response = await handlePaymentFailed(event);
      //   break;
      case "BILLING.SUBSCRIPTION.SUSPENDED":
        response = await handleSubscriptionSuspended(event);
        break;
      case "BILLING.SUBSCRIPTION.EXPIRED":
        response = await handleSubscriptionExpired(event);
        break;
      case "PAYMENT.SALE.COMPLETED":
        response = await handlePaymentSaleCompleted(event);
        break;
      default:
        console.info("Unhandled event type", "system-webhook", {
          data: { event },
        });
        return NextResponse.json({}, { status: 200 });
    }

    if (response.status === 500) {
      return response;
    }

    if (isBillingEvent) {
      const subscription = await prisma.userSubscription.findFirst({
        where: {
          subscriptionId: event.resource.id,
        },
        include: {
          User: {
            select: {
              id: true,
            },
          },
        },
      });

      const userId = subscription?.userId;
      const isSubscriptionActive =
        subscription?.status === PayPalPaymentStatus.ACTIVATE;

      if (userId) {
        await prisma.userMetaData.update({
          where: { userId },
          data: {
            paidStatus: isSubscriptionActive ? "premium" : "free",
          },
        });
      }
    }
    return response;
  } catch (error) {
    console.error("Error processing webhook", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}
