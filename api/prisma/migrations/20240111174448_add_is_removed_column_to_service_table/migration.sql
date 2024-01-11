/*
  Warnings:

  - You are about to drop the column `is_removed` on the `Visit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "is_removed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "is_removed";
