import { prisma } from "../../../index.js";

export async function removeWBTokenFromDb(userId) {
  return await prisma.token.update({ where: { userId }, data: { token: "", tokenHasBeenRemoved: true } });
}
