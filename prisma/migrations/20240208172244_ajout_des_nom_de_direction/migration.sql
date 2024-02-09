/*
  Warnings:

  - A unique constraint covering the columns `[departure]` on the table `CoordinatePolygon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[arrival]` on the table `CoordinatePolygon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `CoordinatePolygon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `arrival` to the `CoordinatePolygon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure` to the `CoordinatePolygon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CoordinatePolygon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `CoordinatePolygon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoordinatePolygon" ADD COLUMN     "arrival" VARCHAR(50) NOT NULL,
ADD COLUMN     "departure" VARCHAR(50) NOT NULL,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" VARCHAR(50) NOT NULL,
ADD COLUMN     "reference" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatePolygon_departure_key" ON "CoordinatePolygon"("departure");

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatePolygon_arrival_key" ON "CoordinatePolygon"("arrival");

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatePolygon_reference_key" ON "CoordinatePolygon"("reference");
