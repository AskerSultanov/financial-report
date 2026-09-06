-- CreateEnum
CREATE TYPE "MonthsList" AS ENUM ('январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "ListGoods" (
    "userId" TEXT NOT NULL,
    "skuId" INTEGER NOT NULL,
    "skuName" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "discount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "discountedPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "clubDiscountedPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "lastFetch" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "isPriceUpdated" BOOLEAN NOT NULL DEFAULT false,
    "errorText" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ListGoods_pkey" PRIMARY KEY ("skuName")
);

-- CreateTable
CREATE TABLE "ReportLoadingState" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "loadingInProgress" BOOLEAN NOT NULL DEFAULT false,
    "lastReportRequestTimestamp" TIMESTAMP(3) NOT NULL,
    "freshReportPeriodIndex" SMALLINT NOT NULL,
    "isReportLoadingIsStopped" BOOLEAN NOT NULL DEFAULT false,
    "loadingStopReason" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ReportLoadingState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportPeriods" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    "monthName" "MonthsList" NOT NULL,
    "monthIndex" SMALLINT NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL
);

-- CreateTable
CREATE TABLE "ReportsQueue" (
    "queuePosition" SERIAL NOT NULL,
    "queueItemId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "failedCount" SMALLINT NOT NULL DEFAULT 0,
    "isEmptyPeriod" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReportsQueue_pkey" PRIMARY KEY ("queueItemId")
);

-- CreateTable
CREATE TABLE "ReportsWithAccountedFinances" (
    "userId" TEXT NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "reportId" INTEGER NOT NULL,
    "financesAccountedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Sku" (
    "skuId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "skuName" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    "dateFrom" VARCHAR(10) NOT NULL,
    "dateTo" VARCHAR(10) NOT NULL,
    "reportIsEmpty" BOOLEAN NOT NULL DEFAULT false,
    "isCrossYearPeriod" BOOLEAN NOT NULL DEFAULT false,
    "buybackReportIsExist" BOOLEAN NOT NULL DEFAULT false,
    "isFinancesAccounted" BOOLEAN NOT NULL DEFAULT false,
    "financesAccountedAt" TIMESTAMP(3),
    "year" SMALLINT NOT NULL,
    "recordedToYear" SMALLINT NOT NULL,
    "recordedToMonth" VARCHAR(8) NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "tax" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fines" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "revenue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "costPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "acceptance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "storageCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "retailAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "returnAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "deliveryCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "taxableAmount" DECIMAL(65,30) DEFAULT 0,
    "otherExpenses" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "sellerPayoutAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "deductionOrPayment" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "additionalPayment" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "insuranceFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "additionalInsuranceFee" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "isInsuranceFeeIncluded" BOOLEAN NOT NULL DEFAULT false,
    "profit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "preTaxProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "finalProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "profitMargin" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "isCostPriceSet" BOOLEAN NOT NULL DEFAULT false,
    "averageProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageStorageCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageAdvertisingCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
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
    "lastUsed" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "tokenHasBeenRemoved" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "passwd" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ListGoods_skuName_idx" ON "ListGoods"("skuName");

-- CreateIndex
CREATE UNIQUE INDEX "ListGoods_userId_skuName_key" ON "ListGoods"("userId", "skuName");

-- CreateIndex
CREATE INDEX "ReportLoadingState_userId_idx" ON "ReportLoadingState"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportLoadingState_userId_key" ON "ReportLoadingState"("userId");

-- CreateIndex
CREATE INDEX "ReportPeriods_userId_dateFrom_dateTo_idx" ON "ReportPeriods"("userId", "dateFrom", "dateTo");

-- CreateIndex
CREATE UNIQUE INDEX "ReportPeriods_userId_dateFrom_dateTo_key" ON "ReportPeriods"("userId", "dateFrom", "dateTo");

-- CreateIndex
CREATE INDEX "ReportsQueue_userId_dateFrom_dateTo_idx" ON "ReportsQueue"("userId", "dateFrom", "dateTo");

-- CreateIndex
CREATE UNIQUE INDEX "ReportsQueue_userId_dateFrom_dateTo_key" ON "ReportsQueue"("userId", "dateFrom", "dateTo");

-- CreateIndex
CREATE INDEX "ReportsWithAccountedFinances_userId_reportId_idx" ON "ReportsWithAccountedFinances"("userId", "reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportsWithAccountedFinances_userId_reportId_key" ON "ReportsWithAccountedFinances"("userId", "reportId");

-- CreateIndex
CREATE INDEX "Sku_userId_idx" ON "Sku"("userId");

-- CreateIndex
CREATE INDEX "Sku_reportId_idx" ON "Sku"("reportId");

-- CreateIndex
CREATE INDEX "Sku_dateFrom_dateTo_idx" ON "Sku"("dateFrom", "dateTo");

-- CreateIndex
CREATE UNIQUE INDEX "Sku_userId_dateFrom_dateTo_skuName_year_key" ON "Sku"("userId", "dateFrom", "dateTo", "skuName", "year");

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
ALTER TABLE "ReportsQueue" ADD CONSTRAINT "ReportsQueue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ReportLoadingState"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
