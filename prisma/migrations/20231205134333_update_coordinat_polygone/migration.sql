/*
  Warnings:

  - A unique constraint covering the columns `[latLng]` on the table `Coordinate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Coordinate" ALTER COLUMN "latLng" SET NOT NULL,
ALTER COLUMN "latLng" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_latLng_key" ON "Coordinate"("latLng");
