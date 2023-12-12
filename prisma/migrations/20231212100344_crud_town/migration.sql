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

-- CreateIndex
CREATE UNIQUE INDEX "Town_name_key" ON "Town"("name");

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_coordinate_uuid_fkey" FOREIGN KEY ("coordinate_uuid") REFERENCES "Coordinate"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_department_uuid_fkey" FOREIGN KEY ("department_uuid") REFERENCES "Department"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_geometry_uuid_fkey" FOREIGN KEY ("geometry_uuid") REFERENCES "Geometry"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
