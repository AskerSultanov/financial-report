import { prisma } from "../../../index.js";

export async function changeTaxParamsToDb(client = prisma, userId, ...updatedTaxParams) {
  return await client.taxParams.updateMany({ data: updatedTaxParams });
}
