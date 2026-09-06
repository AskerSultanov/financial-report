-- CreateEnum
CREATE TYPE "MonthName" AS ENUM ('январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "ListGoods" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "ListGoods_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "SkuOfListGoods" (
    "id" INTEGER NOT NULL,
    "skuName" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "discountedPrice" INTEGER NOT NULL DEFAULT 0,
    "clubDiscountedPrice" INTEGER NOT NULL DEFAULT 0,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "lastFetch" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "isPriceUpdated" BOOLEAN NOT NULL DEFAULT false,
    "errorText" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SkuOfListGoods_pkey" PRIMARY KEY ("skuName")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "year" SMALLINT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "fines" INTEGER NOT NULL DEFAULT 0,
    "netProfit" INTEGER NOT NULL DEFAULT 0,
    "acceptance" INTEGER NOT NULL DEFAULT 0,
    "storageCost" INTEGER NOT NULL DEFAULT 0,
    "profitMargin" INTEGER NOT NULL DEFAULT 0,
    "returnAmount" INTEGER NOT NULL DEFAULT 0,
    "retailAmount" INTEGER NOT NULL DEFAULT 0,
    "insuranceFee" INTEGER NOT NULL DEFAULT 0,
    "deliveryCost" INTEGER NOT NULL DEFAULT 0,
    "taxableAmount" INTEGER NOT NULL DEFAULT 0,
    "otherExpenses" INTEGER NOT NULL DEFAULT 0,
    "sellerPayoutAmount" INTEGER NOT NULL DEFAULT 0,
    "deductionOrPayment" INTEGER NOT NULL DEFAULT 0,
    "additionalInsuranceFee" INTEGER NOT NULL DEFAULT 0,
    "metricId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "QueueItem" (
    "userId" TEXT NOT NULL,
    "index" SMALLINT NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "failedCount" SMALLINT NOT NULL DEFAULT 0,
    "queueItemId" TEXT NOT NULL,

    CONSTRAINT "QueueItem_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "AbandonedQueueItem" (
    "userId" TEXT NOT NULL,
    "index" SMALLINT NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "failedCount" SMALLINT NOT NULL DEFAULT 0,
    "abandonedQueueItemId" TEXT NOT NULL,

    CONSTRAINT "AbandonedQueueItem_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "LastLoadedReport" (
    "userId" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "periodIndex" SMALLINT NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "totalTaxAmount" INTEGER NOT NULL,

    CONSTRAINT "LastLoadedReport_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "EmptyReportPeriodItem" (
    "userId" TEXT NOT NULL,
    "index" SMALLINT,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "emptyQueueItemId" TEXT NOT NULL,

    CONSTRAINT "EmptyReportPeriodItem_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ReportLoadingStates" (
    "userId" TEXT NOT NULL,
    "queueLength" SMALLINT NOT NULL DEFAULT 0,
    "queueCapacity" SMALLINT NOT NULL DEFAULT 0,
    "loadingInProgress" BOOLEAN NOT NULL DEFAULT false,
    "lastReportRequestTimestamp" TIMESTAMP(3) NOT NULL,
    "freshReportPeriodIndex" SMALLINT NOT NULL,
    "isReportLoadingDelayed" BOOLEAN NOT NULL DEFAULT false,
    "isReportLoadingIsStopped" BOOLEAN NOT NULL DEFAULT false,
    "loadingStopReason" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ReportLoadingStates_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ReportTree" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "ReportTree_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Year" (
    "id" SERIAL NOT NULL,
    "year" SMALLINT NOT NULL,
    "reportsTreeId" TEXT NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Month" (
    "id" SERIAL NOT NULL,
    "month" "MonthName" NOT NULL,
    "yearId" INTEGER NOT NULL,

    CONSTRAINT "Month_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportOfMonth" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "monthId" INTEGER NOT NULL,

    CONSTRAINT "ReportOfMonth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sku" (
    "reportId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "skuId" INTEGER NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "skuName" TEXT NOT NULL,
    "taxRate" SMALLINT NOT NULL DEFAULT 6,
    "buybackReportIsExist" BOOLEAN NOT NULL DEFAULT false,
    "isCrossYearPeriod" BOOLEAN NOT NULL DEFAULT false,
    "isFinancesAccounted" BOOLEAN NOT NULL DEFAULT false,
    "financesAccountedAt" TIMESTAMP(3),
    "reportIsEmpty" BOOLEAN NOT NULL DEFAULT false,
    "recordedToYear" SMALLINT NOT NULL,
    "recordedToMonth" VARCHAR(8) NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "taxableAmount" DECIMAL(65,30) DEFAULT 0,
    "taxableAmountInCurrentYear" DECIMAL(65,30) DEFAULT 0,
    "taxableAmountInNextYear" DECIMAL(65,30) DEFAULT 0,
    "qtyInCurrentYear" DECIMAL(65,30),
    "qtyInNextYear" DECIMAL(65,30),
    "costPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "costPriceInCurrentYear" DECIMAL(65,30) DEFAULT 0,
    "costPriceInNextYear" DECIMAL(65,30) DEFAULT 0,
    "otherExpenses" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "otherExpensesInCurrentYear" DECIMAL(65,30) DEFAULT 0,
    "otherExpensesInNextYear" DECIMAL(65,30) DEFAULT 0,
    "revenue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "revenueInCurrentYear" DECIMAL(65,30),
    "revenueInNextYear" DECIMAL(65,30),
    "sellerPayoutAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "sellerPayoutAmountInCurrentYear" DECIMAL(65,30),
    "sellerPayoutAmountInNextYear" DECIMAL(65,30),
    "fines" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "finesInCurrentYear" DECIMAL(65,30),
    "finesInNextYear" DECIMAL(65,30),
    "returnAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "returnAmountInCurrentYear" DECIMAL(65,30),
    "returnAmountInNextYear" DECIMAL(65,30),
    "retailAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "retailAmountInCurrentYear" DECIMAL(65,30),
    "retailAmountInNextYear" DECIMAL(65,30),
    "deliveryCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "deliveryCostInCurrentYear" DECIMAL(65,30),
    "deliveryCostInNextYear" DECIMAL(65,30),
    "storageCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "storageCostInCurrentYear" DECIMAL(65,30),
    "storageCostInNextYear" DECIMAL(65,30),
    "acceptance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "acceptanceInCurrentYear" DECIMAL(65,30),
    "acceptanceInNextYear" DECIMAL(65,30),
    "deductionOrPayment" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "deductionOrPaymentInCurrentYear" DECIMAL(65,30),
    "deductionOrPaymentInNextYear" DECIMAL(65,30),
    "additionalPayment" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "additionalPaymentInCurrentYear" DECIMAL(65,30),
    "additionalPaymentInNextYear" DECIMAL(65,30),
    "tax" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "taxInCurrentYear" DECIMAL(65,30),
    "taxInNextYear" DECIMAL(65,30),
    "insuranceFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "insuranceFeeInCurrentYear" DECIMAL(65,30),
    "insuranceFeeInNextYear" DECIMAL(65,30),
    "additionalInsuranceFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "additionalInsuranceFeeInCurrentYear" DECIMAL(65,30),
    "additionalInsuranceFeeInNextYear" DECIMAL(65,30),
    "profit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "profitInCurrentYear" DECIMAL(65,30),
    "profitInNextYear" DECIMAL(65,30),
    "preTaxProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "preTaxProfitInCurrentYear" DECIMAL(65,30),
    "preTaxProfitInNextYear" DECIMAL(65,30),
    "finalProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "finalProfitInCurrentYear" DECIMAL(65,30),
    "finalProfitInNextYear" DECIMAL(65,30),
    "profitMargin" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "profitMarginInCurrentYear" DECIMAL(65,30),
    "profitMarginInNextYear" DECIMAL(65,30),
    "isCostPriceSet" BOOLEAN NOT NULL DEFAULT false,
    "isCostPriceSetInCurrentYear" BOOLEAN DEFAULT false,
    "isCostPriceSetInNextYear" BOOLEAN DEFAULT false,
    "isInsuranceFeeIncluded" BOOLEAN NOT NULL DEFAULT false,
    "isInsuranceFeeIncludedInCurrentYear" BOOLEAN DEFAULT false,
    "isInsuranceFeeIncludedInNextYear" BOOLEAN DEFAULT false,
    "averageProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageProfitInCurrentYear" DECIMAL(65,30),
    "averageProfitInNextYear" DECIMAL(65,30),
    "averageRetailPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageRetailPriceInCurrentYear" DECIMAL(65,30),
    "averageRetailPriceInNextYear" DECIMAL(65,30),
    "averageStorageCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageStorageCostInCurrentYear" DECIMAL(65,30),
    "averageStorageCostInNextYear" DECIMAL(65,30),
    "averageAdvertisingCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageAdvertisingCostInCurrentYear" DECIMAL(65,30),
    "averageAdvertisingCostInNextYear" DECIMAL(65,30),
    "schemaVersion" INTEGER
);

-- CreateTable
CREATE TABLE "TaxParams" (
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "taxRate" SMALLINT NOT NULL DEFAULT 6,
    "finalProfit" INTEGER NOT NULL DEFAULT 0,
    "paidTaxAmount" INTEGER NOT NULL DEFAULT 0,
    "retailAmount" INTEGER NOT NULL DEFAULT 0,
    "otherExpenses" INTEGER NOT NULL DEFAULT 0,
    "taxableAmount" INTEGER NOT NULL DEFAULT 0,
    "maxInsuranceFee" INTEGER NOT NULL,
    "isInsuranceFeePaid" BOOLEAN NOT NULL DEFAULT false,
    "excessInsuranceRate" SMALLINT NOT NULL DEFAULT 1,
    "mandatoryInsuranceFee" INTEGER NOT NULL DEFAULT 0,
    "additionalInsuranceFee" INTEGER NOT NULL DEFAULT 0,
    "insuranceFeePercentage" SMALLINT NOT NULL DEFAULT 10,
    "mandatoryInsuranceFeeRate" SMALLINT NOT NULL DEFAULT 10,
    "hasExcessIncomeForInsurance" BOOLEAN NOT NULL DEFAULT false,
    "mandatoryInsuranceFeeIsPaid" BOOLEAN NOT NULL DEFAULT false,
    "additionalInsuranceFeeIsPaid" BOOLEAN NOT NULL DEFAULT false,
    "requiresAdditionalInsuranceFee" BOOLEAN NOT NULL DEFAULT false,
    "excessIncomeForAdditionalInsuranceFee" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Token" (
    "userId" TEXT NOT NULL,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL DEFAULT '',
    "tokenHasBeenRemoved" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "passwd" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ListGoods_userId_idx" ON "ListGoods"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ListGoods_userId_key" ON "ListGoods"("userId");

-- CreateIndex
CREATE INDEX "SkuOfListGoods_skuName_idx" ON "SkuOfListGoods"("skuName");

-- CreateIndex
CREATE UNIQUE INDEX "SkuOfListGoods_skuName_key" ON "SkuOfListGoods"("skuName");

-- CreateIndex
CREATE INDEX "Metric_metricId_idx" ON "Metric"("metricId");

-- CreateIndex
CREATE UNIQUE INDEX "Metric_metricId_key" ON "Metric"("metricId");

-- CreateIndex
CREATE INDEX "QueueItem_queueItemId_idx" ON "QueueItem"("queueItemId");

-- CreateIndex
CREATE UNIQUE INDEX "QueueItem_queueItemId_key" ON "QueueItem"("queueItemId");

-- CreateIndex
CREATE UNIQUE INDEX "AbandonedQueueItem_abandonedQueueItemId_key" ON "AbandonedQueueItem"("abandonedQueueItemId");

-- CreateIndex
CREATE UNIQUE INDEX "LastLoadedReport_userId_key" ON "LastLoadedReport"("userId");

-- CreateIndex
CREATE INDEX "EmptyReportPeriodItem_emptyQueueItemId_idx" ON "EmptyReportPeriodItem"("emptyQueueItemId");

-- CreateIndex
CREATE UNIQUE INDEX "EmptyReportPeriodItem_userId_dateFrom_dateTo_key" ON "EmptyReportPeriodItem"("userId", "dateFrom", "dateTo");

-- CreateIndex
CREATE INDEX "Year_reportsTreeId_idx" ON "Year"("reportsTreeId");

-- CreateIndex
CREATE UNIQUE INDEX "Year_reportsTreeId_year_key" ON "Year"("reportsTreeId", "year");

-- CreateIndex
CREATE INDEX "Month_yearId_idx" ON "Month"("yearId");

-- CreateIndex
CREATE UNIQUE INDEX "Month_yearId_month_key" ON "Month"("yearId", "month");

-- CreateIndex
CREATE INDEX "ReportOfMonth_monthId_idx" ON "ReportOfMonth"("monthId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportOfMonth_monthId_reportId_key" ON "ReportOfMonth"("monthId", "reportId");

-- CreateIndex
CREATE INDEX "Sku_userId_idx" ON "Sku"("userId");

-- CreateIndex
CREATE INDEX "Sku_reportId_idx" ON "Sku"("reportId");

-- CreateIndex
CREATE INDEX "Sku_dateFrom_dateTo_idx" ON "Sku"("dateFrom", "dateTo");

-- CreateIndex
CREATE UNIQUE INDEX "Sku_userId_dateFrom_dateTo_skuName_key" ON "Sku"("userId", "dateFrom", "dateTo", "skuName");

-- CreateIndex
CREATE INDEX "TaxParams_userId_year_idx" ON "TaxParams"("userId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "TaxParams_userId_year_key" ON "TaxParams"("userId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "SkuOfListGoods" ADD CONSTRAINT "SkuOfListGoods_skuName_fkey" FOREIGN KEY ("skuName") REFERENCES "ListGoods"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "SkuOfListGoods"("skuName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueItem" ADD CONSTRAINT "QueueItem_queueItemId_fkey" FOREIGN KEY ("queueItemId") REFERENCES "ReportLoadingStates"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AbandonedQueueItem" ADD CONSTRAINT "AbandonedQueueItem_abandonedQueueItemId_fkey" FOREIGN KEY ("abandonedQueueItemId") REFERENCES "ReportLoadingStates"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastLoadedReport" ADD CONSTRAINT "LastLoadedReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ReportLoadingStates"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmptyReportPeriodItem" ADD CONSTRAINT "EmptyReportPeriodItem_emptyQueueItemId_fkey" FOREIGN KEY ("emptyQueueItemId") REFERENCES "ReportLoadingStates"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Year" ADD CONSTRAINT "Year_reportsTreeId_fkey" FOREIGN KEY ("reportsTreeId") REFERENCES "ReportTree"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Month" ADD CONSTRAINT "Month_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportOfMonth" ADD CONSTRAINT "ReportOfMonth_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE CASCADE ON UPDATE CASCADE;
