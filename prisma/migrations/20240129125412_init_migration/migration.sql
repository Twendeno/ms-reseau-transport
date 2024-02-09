-- CreateTable
CREATE TABLE "Coordinate" (
    "uuid" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "address" VARCHAR(255),
    "name" VARCHAR(50),
    "latLng" TEXT NOT NULL,
    "isStop" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Geometry" (
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'LineString',
    "name" VARCHAR(50) NOT NULL,
    "reference" VARCHAR(50) NOT NULL,
    "geodata" JSONB,
    "color" VARCHAR(7) NOT NULL,
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
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CoordinatePolygon_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Department" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "area" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "geometry_uuid" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "lastModifiedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Town" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "area" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coordinate_uuid" TEXT NOT NULL,
    "department_uuid" TEXT NOT NULL,
    "geometry_uuid" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "lastModifiedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Town_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "District" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "town_uuid" TEXT NOT NULL,
    "geometry_uuid" TEXT NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "lastModifiedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_latLng_key" ON "Coordinate"("latLng");

-- CreateIndex
CREATE INDEX "Coordinate_latLng_name_address_idx" ON "Coordinate"("latLng", "name", "address");

-- CreateIndex
CREATE UNIQUE INDEX "Geometry_name_key" ON "Geometry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Geometry_reference_key" ON "Geometry"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Geometry_color_key" ON "Geometry"("color");

-- CreateIndex
CREATE INDEX "Geometry_reference_name_idx" ON "Geometry"("reference", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE INDEX "Department_name_idx" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Town_name_key" ON "Town"("name");

-- CreateIndex
CREATE INDEX "Town_name_idx" ON "Town"("name");

-- CreateIndex
CREATE UNIQUE INDEX "District_name_key" ON "District"("name");

-- CreateIndex
CREATE INDEX "District_name_idx" ON "District"("name");

-- AddForeignKey
ALTER TABLE "CoordinatePolygon" ADD CONSTRAINT "CoordinatePolygon_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatePolygon" ADD CONSTRAINT "CoordinatePolygon_coordinate_uuid_fkey" FOREIGN KEY ("coordinate_uuid") REFERENCES "Coordinate"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_coordinate_uuid_fkey" FOREIGN KEY ("coordinate_uuid") REFERENCES "Coordinate"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_department_uuid_fkey" FOREIGN KEY ("department_uuid") REFERENCES "Department"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_town_uuid_fkey" FOREIGN KEY ("town_uuid") REFERENCES "Town"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
