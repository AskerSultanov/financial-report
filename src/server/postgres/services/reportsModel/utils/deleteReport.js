import { prisma } from "../../../index.js";

export async function deleteReport(client = prisma, userId, reportId) {
  var report = await client.sku.findMany({ where: { userId, reportId } });

  await client.sku.deleteMany({ where: { userId } });

  return { reportBeforeDeletion: report };
}
