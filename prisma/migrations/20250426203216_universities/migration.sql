/*
  Warnings:

  - You are about to drop the `universities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "universities";

-- CreateTable
CREATE TABLE "universities" (
    "name" TEXT NOT NULL,
    "domains" TEXT[],
    "web_pages" TEXT[],
    "country" TEXT,
    "alpha_two_code" VARCHAR(2),
    "state_province" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "id" SERIAL NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);
