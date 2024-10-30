import { NextResponse } from "next/server";
import prisma from "@/app/api/_db/db";
import { PayPalEventResponse } from "@/models/payment";

export async function handleSubscriptionSuspended(event: PayPalEventResponse) {
  try {
    const subscriptionUpdate = await prisma.userSubscription.update({
      where: { subscriptionId: event.resource.id },
      data: {
        status: "suspended",
      },
    });

    const subscription = await prisma.userSubscription.findUnique({
      where: { subscriptionId: event.resource.id },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (subscription?.user) {
      await prisma.userMetaData.update({
        where: {
          userId: subscription.user.id,
        },
        data: {
          paidStatus: "suspended",
        },
      });
    }

    return NextResponse.json(
      { message: "Subscription cancelled successfully", subscriptionUpdate },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling subscription cancelled", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Failed to handle subscription cancelled" },
      { status: 500 }
    );
  }
}
