/*
  Warnings:

  - A unique constraint covering the columns `[geohash5]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_geohash5_key" ON "Location"("geohash5");
