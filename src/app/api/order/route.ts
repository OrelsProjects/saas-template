import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/app/api/_db/db";
import { authOptions } from "@/auth/authOptions";
import { createOrder } from "@/app/api/utils/payment";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { product }: { product: { id: string; amount: string } } =
      await req.json();

    const item = await prisma.product.findFirst({
      where: {
        id: product.id,
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const value = item.price * parseInt(product.amount);

    if (value <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order: { id: string; status: string } = await createOrder({
      currency: item.currency,
      value,
    });

    await prisma.userPurchase.create({
      data: {
        userId: session.user.userId,
        status: order.status,
        productId: item.id,
        orderId: order.id,
      },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error sending notification" },
      { status: 500 }
    );
  }
}
