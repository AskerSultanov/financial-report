import { prisma } from "../../../index.js";

export async function deleteListGoods(userId, client = prisma) {
  return await client.listGoods.deleteMany({ where: { userId } });
}
