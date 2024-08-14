/*
  Warnings:

  - Added the required column `userId` to the `Happenings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Happenings" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Happenings" ADD CONSTRAINT "Happenings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
