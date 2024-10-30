-- CreateTable
CREATE TABLE "userMetaData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "paid_status" TEXT NOT NULL,

    CONSTRAINT "userMetaData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userMetaData" ADD CONSTRAINT "userMetaData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
