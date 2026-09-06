import { prisma } from "../../../index.js";

export async function updateWBTokenLastUsedTimestamp(userId, client = prisma) {
  await client.token.update({
    where: { userId },
    data: { lastUsed: new Date() },
  });
}
