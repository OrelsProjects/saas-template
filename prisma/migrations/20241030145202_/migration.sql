/*
  Warnings:

  - A unique constraint covering the columns `[subscription_id]` on the table `userPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `userPurchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscription_id]` on the table `userSubscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `userPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userPurchase" ADD COLUMN     "order_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userSubscription" ALTER COLUMN "next_billing_date" DROP NOT NULL,
ALTER COLUMN "last_payment_date" DROP NOT NULL,
ALTER COLUMN "last_payment_amount" DROP NOT NULL;

-- CreateTable
CREATE TABLE "userMetaData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "paid_status" TEXT NOT NULL,

    CONSTRAINT "userMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userMetaData_user_id_key" ON "userMetaData"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userPayment_subscription_id_key" ON "userPayment"("subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "userPurchase_order_id_key" ON "userPurchase"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "userSubscription_subscription_id_key" ON "userSubscription"("subscription_id");

-- AddForeignKey
ALTER TABLE "userMetaData" ADD CONSTRAINT "userMetaData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
