-- AlterTable
ALTER TABLE "Coordinate" ADD COLUMN     "isArrival" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeparture" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CoordinatePolygon" ADD COLUMN     "arrival_coordinate_uuid" TEXT DEFAULT 'NULL',
ADD COLUMN     "departure_coordinate_uuid" TEXT DEFAULT 'NULL';
