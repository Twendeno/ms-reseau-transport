/*
  Warnings:

  - The `latLng` column on the `Coordinate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Coordinate" DROP COLUMN "latLng",
ADD COLUMN     "latLng" DOUBLE PRECISION[];
