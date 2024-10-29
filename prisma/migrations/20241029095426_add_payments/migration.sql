-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPurchase" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userSubscription" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "plan_id" TEXT NOT NULL,
    "subscription_id" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "next_billing_date" TIMESTAMP(3) NOT NULL,
    "last_payment_date" TIMESTAMP(3) NOT NULL,
    "last_payment_amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "userSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPayment" (
    "id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "paid_amount" DOUBLE PRECISION NOT NULL,
    "payment_status" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userPurchase" ADD CONSTRAINT "userPurchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPurchase" ADD CONSTRAINT "userPurchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userSubscription" ADD CONSTRAINT "userSubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPayment" ADD CONSTRAINT "userPayment_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "userSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
