import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { OnApproveData } from "@/models/payment";
import prisma from "@/app/api/_db/db";
import { authOptions } from "@/auth/authOptions";
import { getSubscription, verifyResponse } from "@/app/api/utils/payment";
import { handleSubscriptionActivated } from "../../paypal-webhooks/subscriptionActivated";
import { handleSubscriptionCreated } from "../../paypal-webhooks/subscriptionCreated";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { data }: { data: OnApproveData } = await req.json();
    const isVerified = await verifyResponse(data);

    if (!isVerified) {
      console.error("Failed to verify response", session.user.userId, {
        data: { data },
      });
      return NextResponse.json(
        { error: "Failed to verify response" },
        { status: 401 }
      );
    }

    const subscriptionId = data.subscriptionID;

    if (subscriptionId) {
      const subscriptionData = await getSubscription(subscriptionId);

      const responseCreate = await handleSubscriptionCreated({
        status: subscriptionData.status,
        subscriptionId: subscriptionId,
        startDate: new Date(subscriptionData.start_time),
        planId: subscriptionData.plan_id,
      });

      if (responseCreate.status !== 200) {
        return responseCreate;
      }

      const next_billing_time =
        subscriptionData.billing_info?.next_billing_time;
      const last_payment = subscriptionData.billing_info?.last_payment;

      const responseActivate = await handleSubscriptionActivated({
        subscriptionId: subscriptionId,
        userId: session.user.userId,
        nextBillingDate: next_billing_time ? new Date(next_billing_time) : null,
        lastPaymentDate: last_payment ? new Date(last_payment.time) : null,
        lastPaymentAmount: last_payment?.amount?.value
          ? parseFloat(last_payment.amount.value)
          : null,
        planId: subscriptionData.plan_id,
        startDate: new Date(subscriptionData.start_time),
        status: subscriptionData.status,
      });

      if (responseActivate.status !== 200) {
        return responseActivate;
      }
    }

    await prisma.userMetaData.update({
      where: { userId: session.user.userId },
      data: {
        paidStatus: "premium",
      },
    });

    return NextResponse.json(
      {
        id: data.subscriptionID,
      },
      { status: 200 }
    );
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