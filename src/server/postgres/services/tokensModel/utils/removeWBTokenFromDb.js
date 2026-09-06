import { prisma } from "../../../index.js";

export async function removeWBTokenFromDb(userId) {
  return await prisma.token.delete({ where: { userId } });
}
