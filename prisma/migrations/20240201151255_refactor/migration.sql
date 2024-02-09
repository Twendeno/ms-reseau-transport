/*
  Warnings:

  - You are about to drop the column `geometry_uuid` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `geometry_uuid` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `geometry_uuid` on the `Town` table. All the data in the column will be lost.
  - Added the required column `department_uuid` to the `Geometry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `town_uuid` to the `Geometry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_geometry_uuid_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_geometry_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Town" DROP CONSTRAINT "Town_geometry_uuid_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "geometry_uuid";

-- AlterTable
ALTER TABLE "District" DROP COLUMN "geometry_uuid";

-- AlterTable
ALTER TABLE "Geometry" ADD COLUMN     "department_uuid" TEXT NOT NULL,
ADD COLUMN     "town_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Town" DROP COLUMN "geometry_uuid";

-- AddForeignKey
ALTER TABLE "Geometry" ADD CONSTRAINT "Geometry_department_uuid_fkey" FOREIGN KEY ("department_uuid") REFERENCES "Department"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geometry" ADD CONSTRAINT "Geometry_town_uuid_fkey" FOREIGN KEY ("town_uuid") REFERENCES "Town"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
