import { prisma } from "../../../index.js";

export async function getAll(client = prisma) {
  return await client.sku.findMany({});
}
