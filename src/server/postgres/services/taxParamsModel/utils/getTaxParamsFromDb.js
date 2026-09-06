import { prisma } from "../../../index.js";

export async function getTaxParamsFromDb(client = prisma, userId, year) {
  if (year) {
    return await client.taxParams.findUnique({ where: { userId_year: { userId, year } } });
  }

  return await client.taxParams.findMany({ where: { userId } });
}
