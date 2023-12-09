/*
  Warnings:

  - The `type` column on the `Geometry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Geometry" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'LineString';
