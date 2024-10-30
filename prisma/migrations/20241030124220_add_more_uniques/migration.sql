/*
  Warnings:

  - A unique constraint covering the columns `[subscription_id]` on the table `userPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscription_id]` on the table `userSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userPayment_subscription_id_key" ON "userPayment"("subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "userSubscription_subscription_id_key" ON "userSubscription"("subscription_id");
