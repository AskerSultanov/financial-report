/*
  Warnings:

  - You are about to drop the column `id` on the `SkuOfListGoods` table. All the data in the column will be lost.
  - You are about to drop the `AbandonedQueueItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmptyReportPeriodItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LastLoadedReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ListGoods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Metric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QueueItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportLoadingStates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `skuId` to the `SkuOfListGoods` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AbandonedQueueItem" DROP CONSTRAINT "AbandonedQueueItem_abandonedQueueItemId_fkey";

-- DropForeignKey
ALTER TABLE "EmptyReportPeriodItem" DROP CONSTRAINT "EmptyReportPeriodItem_emptyQueueItemId_fkey";

-- DropForeignKey
ALTER TABLE "LastLoadedReport" DROP CONSTRAINT "LastLoadedReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_metricId_fkey";

-- DropForeignKey
ALTER TABLE "QueueItem" DROP CONSTRAINT "QueueItem_queueItemId_fkey";

-- DropForeignKey
ALTER TABLE "SkuOfListGoods" DROP CONSTRAINT "SkuOfListGoods_skuName_fkey";

-- AlterTable
ALTER TABLE "SkuOfListGoods" DROP COLUMN "id",
ADD COLUMN     "skuId" INTEGER NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "discountedPrice" SET DEFAULT 0,
ALTER COLUMN "discountedPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "clubDiscountedPrice" SET DEFAULT 0,
ALTER COLUMN "clubDiscountedPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "errorText" DROP NOT NULL;

-- DropTable
DROP TABLE "AbandonedQueueItem";

-- DropTable
DROP TABLE "EmptyReportPeriodItem";

-- DropTable
DROP TABLE "LastLoadedReport";

-- DropTable
DROP TABLE "ListGoods";

-- DropTable
DROP TABLE "Metric";

-- DropTable
DROP TABLE "QueueItem";

-- DropTable
DROP TABLE "ReportLoadingStates";

-- CreateTable
CREATE TABLE "ReportLoadingState" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "loadingInProgress" BOOLEAN NOT NULL DEFAULT false,
    "lastReportRequestTimestamp" TIMESTAMP(3) NOT NULL,
    "freshReportPeriodIndex" SMALLINT NOT NULL,
    "isReportLoadingDelayed" BOOLEAN NOT NULL DEFAULT false,
    "isReportLoadingIsStopped" BOOLEAN NOT NULL DEFAULT false,
    "loadingStopReason" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ReportLoadingState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportsQueue" (
    "queueItemId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "index" SMALLINT NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "failedCount" SMALLINT NOT NULL DEFAULT 0,
    "isEmptyPeriod" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReportsQueue_pkey" PRIMARY KEY ("queueItemId")
);

-- CreateIndex
CREATE INDEX "ReportLoadingState_userId_idx" ON "ReportLoadingState"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportLoadingState_userId_key" ON "ReportLoadingState"("userId");

-- CreateIndex
CREATE INDEX "ReportsQueue_userId_dateFrom_dateTo_idx" ON "ReportsQueue"("userId", "dateFrom", "dateTo");

-- CreateIndex
CREATE UNIQUE INDEX "ReportsQueue_userId_dateFrom_dateTo_key" ON "ReportsQueue"("userId", "dateFrom", "dateTo");

-- AddForeignKey
ALTER TABLE "ReportsQueue" ADD CONSTRAINT "ReportsQueue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ReportLoadingState"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
