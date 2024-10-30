/*
  Warnings:

  - Added the required column `order_id` to the `userPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userPurchase" ADD COLUMN     "order_id" TEXT NOT NULL;
