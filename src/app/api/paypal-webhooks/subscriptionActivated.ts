import { NextResponse } from "next/server";
import prisma from "@/app/api/_db/db";
import { handleSubscriptionCreated } from "./subscriptionCreated";

export async function handleSubscriptionActivated(data: {
  subscriptionId: string;
  userId: string;
  nextBillingDate: Date | null;
  lastPaymentDate: Date | null;
  lastPaymentAmount: number | null;
  planId: string;
  startDate: Date;
  status: string;
}): Promise<NextResponse> {
  let subscriptionId = data.subscriptionId;
  let nextBillingDate = data.nextBillingDate;
  let lastPaymentDate = data.lastPaymentDate;
  let lastPaymentAmount = data.lastPaymentAmount;
  let status = data.status;
  
  const user = await prisma.userMetaData.findFirst({
    where: {
      userId: data.userId,
    },
    include: {
      user: {
        select: { id: true },
      },
    },
  });

  if (!user) {
    console.error("User not found", "system-webhook", {
      data: { data },
    });
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingSubscription = await prisma.userSubscription.findFirst({
    where: { subscriptionId },
  });

  if (!existingSubscription) {
    await handleSubscriptionCreated(data);
  }

  try {
    const subscriptionUpdate = await prisma.userSubscription.update({
      where: { subscriptionId },
      data: {
        userId: user.userId,
        status,
        nextBillingDate,
        lastPaymentDate,
        lastPaymentAmount,
      },
    });
    return NextResponse.json(
      { message: "Subscription activated successfully", subscriptionUpdate },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling subscription activated", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Failed to handle subscription activated" },
      { status: 500 },
    );
  }
}
