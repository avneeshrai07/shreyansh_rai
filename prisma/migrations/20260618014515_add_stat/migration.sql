-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL,
    "valueEn" TEXT NOT NULL,
    "valueHi" TEXT,
    "labelEn" TEXT NOT NULL,
    "labelHi" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Stat_sortOrder_idx" ON "Stat"("sortOrder");
