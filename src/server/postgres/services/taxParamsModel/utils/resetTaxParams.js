import { prisma } from "../../../index.js";

export async function resetTaxParams(userId, client = prisma) {
  var data = await client.taxParams.findFirst({ where: { userId } });

  if (data?.length) {
    await client.taxParams.delete({ where: { userId } });
  }
}
