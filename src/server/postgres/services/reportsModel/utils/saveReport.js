import { randomInt } from "node:crypto";
import { prisma } from "../../../index.js";

export async function saveReport(client = prisma, userId, report) {
  report.skus.forEach((sku) => {
    sku.userId = report.userId;
    sku.recordedToYear = 2025;
    sku.recordedToMonth = "июль";
    sku.dateFrom = report.dateFrom;
    sku.dateTo = report.dateTo;
    sku.taxRate = report.taxRate;
    sku.reportId = report.reportId;
    sku.skuId = sku.id;
    delete sku.id;
  });

  return await client.sku.createMany({ data: report.skus });
}
