import { prisma } from "../../../index.js";

export async function getSkuFromListGoods(userId, skuId, skuName, client = prisma) {
  var data = await collection.findOne({ userId, "listGoods.id": skuId, "listGoods.skuName": skuName }, { "listGoods.$": 1 }, { session: session });

  var data = await client.listGoods.findFirst({ where: { userId, skuId, skuName } });

  return { skuFromListGoods: data[0] };
}
