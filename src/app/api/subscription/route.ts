import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { SubscriptionId } from "@/models/payment";
import { getSubscription } from "../utils/payment";
import prisma from "@/app/api/_db/db";
import { authOptions } from "@/auth/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { subscriptionId }: { subscriptionId: SubscriptionId } =
      await req.json();

    const subscriptionData = await getSubscription(subscriptionId);

    if (!subscriptionData) {
      console.error("Failed to verify subscription", session.user.userId, {
        data: { subscriptionId },
      });
      return NextResponse.json(
        { error: "Failed to verify subscription" },
        { status: 401 }
      );
    }

    const next_billing_time = subscriptionData.billing_info?.next_billing_time;
    const last_payment = subscriptionData.billing_info?.last_payment;

    const newSubscription = await prisma.userSubscription.create({
      data: {
        userId: session.user.userId,
        planId: subscriptionData.plan_id,
        subscriptionId: subscriptionData.id,
        startDate: new Date(subscriptionData.start_time),
        status: subscriptionData.status,
        nextBillingDate: next_billing_time ? new Date(next_billing_time) : null,
        lastPaymentDate: last_payment ? new Date(last_payment.time) : null,
        lastPaymentAmount: last_payment?.amount?.value
          ? parseFloat(last_payment.amount.value)
          : null,
      },
    });

    return NextResponse.json({ id: newSubscription.id }, { status: 200 });
  } catch (error) {
    console.error("Error sending notification", session.user.userId, {
      data: { error },
    });
    return NextResponse.json(
      { error: "Error sending notification" },
      { status: 500 }
    );
  }
}
