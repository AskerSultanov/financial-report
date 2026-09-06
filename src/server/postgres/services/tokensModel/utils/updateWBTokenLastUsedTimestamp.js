import { prisma } from "../../../index.js";

var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

export async function updateWBTokenLastUsedTimestamp(userId, client = prisma) {
  await client.token.update({ where: { userId }, data: { lastUsed: Date.now() + mskTimeOffsetInMs } });
}
