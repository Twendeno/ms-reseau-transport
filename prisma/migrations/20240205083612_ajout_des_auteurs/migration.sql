/*
  Warnings:

  - Added the required column `assignedBy` to the `Geometry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastModifiedBy` to the `Geometry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Geometry" ADD COLUMN     "assignedBy" TEXT NOT NULL,
ADD COLUMN     "lastModifiedBy" TEXT NOT NULL;
