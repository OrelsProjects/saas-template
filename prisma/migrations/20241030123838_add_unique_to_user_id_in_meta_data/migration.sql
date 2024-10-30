/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `userMetaData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userMetaData_user_id_key" ON "userMetaData"("user_id");
