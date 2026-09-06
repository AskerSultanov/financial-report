import { prisma } from "../../../index.js";

var getSkusLastCostPrice = async (userId, selectedFields = { lastCostPrice: true, skuId: true, skuName: true }) => {
  var data = await prisma.listGoods.findMany({ where: { userId }, select: selectedFields });
  return { skusLastCostPrice: data };
};

export default getSkusLastCostPrice;
