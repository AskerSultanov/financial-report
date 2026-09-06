import { prisma } from "../../../index.js";

export async function getWBTokenByUserId(
  userId,
  updateLastUsedNow = false,
  client = prisma,
) {
  var { token, lastUsed } = await client.token.findUnique({
    where: { userId },
  });

  if (updateLastUsedNow) {
    await client.token.update({
      where: { userId },
      data: { lastUsed: new Date() },
    });
  }

  return { token, lastUsed };
}
