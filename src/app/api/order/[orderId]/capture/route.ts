import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/app/api/_db/db";
import { authOptions } from "@/auth/authOptions";
import { captureOrder } from "@/app/api/utils/payment";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { orderId } = params;

    const captureResponse = await captureOrder(orderId);
    const isCaptureSuccessful = !captureResponse?.details?.[0]?.issue;

    if (isCaptureSuccessful) {
      await prisma.userPurchase.update({
        where: {
          orderId,
        },
        data: {
          status: captureResponse.status,
        },
      });

      await prisma.userMetaData.update({
        where: { userId: session.user.userId },
        data: {
          paidStatus: "premium",
        },
      });
    }

    return NextResponse.json(captureResponse, { status: 200 });
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
