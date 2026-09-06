import { prisma } from "../../../index.js";

export async function getReportsWithAccountedFinances(userId) {
  var data = await prisma.reportsWithAccountedFinances.findMany({
    where: { userId },
  });

  return { reportsWithAccountedFinances: data };
}
