/*
  Warnings:

  - You are about to drop the column `locationId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[geohash5]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `geohash5` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_locationId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "locationId",
ADD COLUMN     "geohash5" VARCHAR(5) NOT NULL;

-- DropTable
DROP TABLE "Location";

-- CreateIndex
CREATE UNIQUE INDEX "Project_geohash5_key" ON "Project"("geohash5");
