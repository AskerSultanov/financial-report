import { prisma } from "../../../index.js";

export async function getAllUserListGoodsIds() {
  return await prisma.listGoods.findMany();
}
