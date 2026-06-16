-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL DEFAULT 'about',
    "fullName" TEXT NOT NULL,
    "designationEn" TEXT NOT NULL,
    "designationHi" TEXT,
    "courtEn" TEXT NOT NULL,
    "courtHi" TEXT,
    "taglineEn" TEXT,
    "taglineHi" TEXT,
    "photoUrl" TEXT,
    "bioEn" TEXT[],
    "bioHi" TEXT[],
    "education" JSONB NOT NULL DEFAULT '[]',
    "barEnrollmentNumber" TEXT,
    "enrolledSinceYear" TEXT,
    "highlightsEn" TEXT[],
    "highlightsHi" TEXT[],
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL DEFAULT 'contact',
    "headingEn" TEXT,
    "headingHi" TEXT,
    "subheadingEn" TEXT,
    "subheadingHi" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "officeAddressEn" TEXT,
    "officeAddressHi" TEXT,
    "officeHoursEn" TEXT,
    "officeHoursHi" TEXT,
    "googleMapsEmbedUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseResult" (
    "id" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT,
    "outcome" TEXT NOT NULL,
    "court" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "category" TEXT,
    "summaryEn" TEXT NOT NULL,
    "summaryHi" TEXT,
    "isHighlight" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientRoleEn" TEXT,
    "clientRoleHi" TEXT,
    "quoteEn" TEXT NOT NULL,
    "quoteHi" TEXT,
    "rating" INTEGER DEFAULT 5,
    "caseType" TEXT,
    "isHighlight" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CaseResult_isHighlight_idx" ON "CaseResult"("isHighlight");

-- CreateIndex
CREATE INDEX "CaseResult_year_idx" ON "CaseResult"("year");

-- CreateIndex
CREATE INDEX "Testimonial_isHighlight_idx" ON "Testimonial"("isHighlight");

-- CreateIndex
CREATE INDEX "Testimonial_publishedAt_idx" ON "Testimonial"("publishedAt");
