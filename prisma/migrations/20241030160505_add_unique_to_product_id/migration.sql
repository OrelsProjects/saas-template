/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `userPurchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userPurchase_product_id_key" ON "userPurchase"("product_id");
