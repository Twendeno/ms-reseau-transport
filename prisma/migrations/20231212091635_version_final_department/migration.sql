/*
  Warnings:

  - You are about to drop the column `last_user_uid` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `polygon` on the `Department` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Geometry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `geometry_uuid` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastModifiedBy` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Department" DROP COLUMN "last_user_uid",
DROP COLUMN "polygon",
ADD COLUMN     "geometry_uuid" TEXT NOT NULL,
ADD COLUMN     "lastModifiedBy" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Geometry_name_key" ON "Geometry"("name");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
