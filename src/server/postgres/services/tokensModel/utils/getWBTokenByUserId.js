import { prisma } from "../../../index.js";
var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

export async function getWBTokenByUserId(userId, updateLastUsedNow = false, client = prisma) {
  var { token, lastUsed } = await client.token.findUnique({ where: { userId } });

  if (updateLastUsedNow) {
    await client.token.update({ where: { userId }, data: { lastUsed: Date.now() + mskTimeOffsetInMs } });
  }

  return { token, lastUsed };
}
