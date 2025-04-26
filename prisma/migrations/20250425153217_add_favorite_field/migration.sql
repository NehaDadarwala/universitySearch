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

    CONSTRAINT "universitis_pkey" PRIMARY KEY ("id")
);
