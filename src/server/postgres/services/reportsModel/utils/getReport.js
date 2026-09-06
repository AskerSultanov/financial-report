import { prisma } from "../../../index.js";

export async function getReport(client = prisma, userId, reportId) {
  var report = await client.sku.findMany({ where: { userId, reportId } });
  return { report };
}
