/*
  Warnings:

  - You are about to drop the column `slug` on the `Country` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[alpha2]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Country_slug_key";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "slug";

-- CreateIndex
CREATE UNIQUE INDEX "Country_alpha2_key" ON "Country"("alpha2");
