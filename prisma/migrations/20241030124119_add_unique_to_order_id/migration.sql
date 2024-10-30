/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `userPurchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userPurchase_order_id_key" ON "userPurchase"("order_id");
