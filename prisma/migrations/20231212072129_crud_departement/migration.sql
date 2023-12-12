/*
  Warnings:

  - Made the column `assignedBy` on table `CoordinatePolygon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Geometry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoordinatePolygon" ALTER COLUMN "assignedBy" SET NOT NULL;

-- AlterTable
ALTER TABLE "Geometry" ALTER COLUMN "name" SET NOT NULL;

-- DropEnum
DROP TYPE "Nature";

-- CreateTable
CREATE TABLE "Department" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "area" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "polygon" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "last_user_uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("uuid")
);
