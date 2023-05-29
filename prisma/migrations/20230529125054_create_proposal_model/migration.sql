-- CreateEnum
CREATE TYPE "ProposalStaus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MODERATOR';

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "constructionDate" TIMESTAMP(3) NOT NULL,
    "authors" TEXT[],
    "functions" TEXT[],
    "styles" TEXT[],
    "tags" TEXT[],
    "urls" TEXT[],
    "imgUrls" TEXT[],
    "status" "ProposalStaus" NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);
