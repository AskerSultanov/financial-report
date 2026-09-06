import { prisma } from "../../../index.js";

export async function saveListGoodsToDb(userId, listGoods, client = prisma) {
  listGoods.forEach((sku) => (sku.userId = userId));

  return await client.listGoods.createMany({ data: listGoods });
}
