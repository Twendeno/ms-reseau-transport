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
CREATE UNIQUE INDEX "District_name_key" ON "District"("name");

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_town_uuid_fkey" FOREIGN KEY ("town_uuid") REFERENCES "Town"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
