-- AlterTable
ALTER TABLE "userSubscription" ALTER COLUMN "next_billing_date" DROP NOT NULL,
ALTER COLUMN "last_payment_date" DROP NOT NULL,
ALTER COLUMN "last_payment_amount" DROP NOT NULL;
