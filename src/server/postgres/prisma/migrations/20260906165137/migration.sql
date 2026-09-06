-- DropIndex
DROP INDEX "ReportPeriods_userId_dateFrom_dateTo_idx";

-- CreateIndex
CREATE INDEX "ReportPeriods_userId_dateFrom_idx" ON "ReportPeriods"("userId", "dateFrom");
