import { NextResponse } from "next/server";
import prisma from "@/app/api/_db/db";
import { PayPalEventResponse } from "@/models/payment";

export async function handleSubscriptionExpired(event: PayPalEventResponse) {
  try {
    const existingSubscription = await prisma.userSubscription.findFirst({
      where: { subscriptionId: event.resource.id },
      include: {
        User: {
          select: { id: true },
        },
      },
    });

    if (!existingSubscription || !existingSubscription.userId) {
      console.error("Subscription not found", "system-webhook", {
        data: { event },
      });
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 },
      );
    }

    const subscriptionUpdate = await prisma.userSubscription.update({
      where: { subscriptionId: event.resource.id },
      data: {
        status: "expired",
      },
    });

    await prisma.userMetaData.update({
      where: { userId: existingSubscription.userId },
      data: {
        paidStatus: "free",
      },
    });

    return NextResponse.json(
      { message: "Subscription cancelled successfully", subscriptionUpdate },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling subscription cancelled", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Failed to handle subscription cancelled" },
      { status: 500 },
    );
  }
}
