-- CreateEnum
CREATE TYPE "Nature" AS ENUM ('Polygon', 'Point', 'LineString', 'Multipoints', 'MultiLineString', 'MultiPolygon');

-- CreateTable
CREATE TABLE "Coordinate" (
    "uuid" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "latLng" TEXT NOT NULL,
    "isStop" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Geometry" (
    "uuid" TEXT NOT NULL,
    "type" "Nature" NOT NULL DEFAULT 'Polygon',
    "name" VARCHAR(50),
    "reference" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Geometry_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CoordinatePolygon" (
    "uuid" TEXT NOT NULL,
    "geometry_uuid" TEXT NOT NULL,
    "coordinate_uuid" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT,

    CONSTRAINT "CoordinatePolygon_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Geometry_name_key" ON "Geometry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Geometry_reference_key" ON "Geometry"("reference");

-- AddForeignKey
ALTER TABLE "CoordinatePolygon" ADD CONSTRAINT "CoordinatePolygon_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatePolygon" ADD CONSTRAINT "CoordinatePolygon_coordinate_uuid_fkey" FOREIGN KEY ("coordinate_uuid") REFERENCES "Coordinate"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
