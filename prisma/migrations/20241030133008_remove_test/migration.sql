/*
  Warnings:

  - You are about to drop the column `order_id` on the `userPurchase` table. All the data in the column will be lost.
  - You are about to drop the `userMetaData` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `next_billing_date` on table `userSubscription` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_payment_date` on table `userSubscription` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_payment_amount` on table `userSubscription` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "userMetaData" DROP CONSTRAINT "userMetaData_user_id_fkey";

-- DropIndex
DROP INDEX "userPayment_subscription_id_key";

-- DropIndex
DROP INDEX "userPurchase_order_id_key";

-- DropIndex
DROP INDEX "userSubscription_subscription_id_key";

-- AlterTable
ALTER TABLE "userPurchase" DROP COLUMN "order_id";

-- AlterTable
ALTER TABLE "userSubscription" ALTER COLUMN "next_billing_date" SET NOT NULL,
ALTER COLUMN "last_payment_date" SET NOT NULL,
ALTER COLUMN "last_payment_amount" SET NOT NULL;

-- DropTable
DROP TABLE "userMetaData";
