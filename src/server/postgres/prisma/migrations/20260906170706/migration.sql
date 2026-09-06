/*
  Warnings:

  - You are about to drop the column `isEmptyPeriod` on the `ReportsQueue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReportsQueue" DROP COLUMN "isEmptyPeriod";

-- CreateTable
CREATE TABLE "EmptyReportPeriods" (
    "userId" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL
);

-- CreateIndex
CREATE INDEX "EmptyReportPeriods_userId_dateFrom_dateTo_idx" ON "EmptyReportPeriods"("userId", "dateFrom", "dateTo");

-- CreateIndex
CREATE UNIQUE INDEX "EmptyReportPeriods_userId_dateFrom_dateTo_key" ON "EmptyReportPeriods"("userId", "dateFrom", "dateTo");
