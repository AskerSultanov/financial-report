import { prisma } from "../../../index.js";

var projectQueries = ["listGoods.id", "listGoods.skuName", "listGoods.metrics"];

export async function getListGoodsFromDb(userId, skuNames, client = prisma, selectedFields = { skuId: true, skuName: true }) {
  return await client.listGoods.findMany({ where: { userId, skuName: { in: skuNames } }, select: selectedFields });
}
