import { prisma } from "../../../index.js";

export async function deleteUserFromDb(userId) {
  return await prisma.$transaction(async (tx) => {
    tx.user.delete({ where: { userId } });
    tx.token.delete({ where: { userId } });
    tx.taxParams.delete({ where: { userId } });
  });
}
