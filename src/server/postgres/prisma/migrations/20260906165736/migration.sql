-- DropIndex
DROP INDEX "ReportPeriods_userId_dateFrom_idx";

-- CreateIndex
CREATE INDEX "ReportPeriods_userId_idx" ON "ReportPeriods"("userId");

-- CreateIndex
CREATE INDEX "ReportPeriods_userId_dateFrom_dateTo_idx" ON "ReportPeriods"("userId", "dateFrom", "dateTo");
