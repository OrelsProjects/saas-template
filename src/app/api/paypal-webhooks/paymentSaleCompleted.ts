import { NextResponse } from "next/server";
import prisma from "@/app/api/_db/db";
import { PayPalSaleCompletedEvent } from "@/models/payment";

export async function handlePaymentSaleCompleted(
  event: PayPalSaleCompletedEvent,
) {
  try {
    const existingPayment = await prisma.userPayment.findFirst({
      where: { paymentID: event.resource.id },
    });

    if (existingPayment) {
      return NextResponse.json(
        { message: "Payment already exists", existingPayment },
        { status: 200 },
      );
    }

    const payment = await prisma.userPayment.create({
      data: {
        subscriptionId: event.resource.billing_agreement_id, // Assuming you link payment to subscription by ID
        paymentID: event.resource.id,
        paidAmount: parseFloat(event.resource.amount.total),
        paymentStatus: event.resource.state,
        paymentDate: new Date(event.resource.create_time),
      },
    });

    return NextResponse.json(
      { message: "Payment processed successfully", payment },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling payment sale completed", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Failed to handle payment sale completed" },
      { status: 500 },
    );
  }
}
