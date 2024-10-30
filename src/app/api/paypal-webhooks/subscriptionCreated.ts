import { NextResponse } from "next/server";
import prisma from "@/app/api/_db/db";
import { CreateSubscriptionBody, PayPalEventResponse } from "@/models/payment";

export async function handleSubscriptionCreated(
  event: PayPalEventResponse,
): Promise<NextResponse>;
export async function handleSubscriptionCreated(
  data: CreateSubscriptionBody,
): Promise<NextResponse>;

export async function handleSubscriptionCreated(data: any) {
  try {
    let subscriptionId = data.subscriptionId;

    // check if the data is coming from the webhook event (PayPalEventResponse)
    if (data.id) {
      subscriptionId = data.resource.id;
    }

    const existingSubscription = await prisma.userSubscription.findFirst({
      where: { subscriptionId },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { message: "Subscription already exists", existingSubscription },
        { status: 200 },
      );
    } else {
      throw new Error("Subscription not found");
    }
  } catch (error) {
    console.error("Error handling subscription created", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Failed to handle subscription created" },
      { status: 500 },
    );
  }
}
