-- DropForeignKey
ALTER TABLE "CoordinatePolygon" DROP CONSTRAINT "CoordinatePolygon_coordinate_uuid_fkey";

-- DropForeignKey
ALTER TABLE "CoordinatePolygon" DROP CONSTRAINT "CoordinatePolygon_geometry_uuid_fkey";

-- DropIndex
DROP INDEX "Geometry_name_key";

-- AlterTable
ALTER TABLE "Geometry" ALTER COLUMN "type" SET DEFAULT 'LineString';

-- AddForeignKey
ALTER TABLE "CoordinatePolygon" ADD CONSTRAINT "CoordinatePolygon_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatePolygon" ADD CONSTRAINT "CoordinatePolygon_coordinate_uuid_fkey" FOREIGN KEY ("coordinate_uuid") REFERENCES "Coordinate"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
