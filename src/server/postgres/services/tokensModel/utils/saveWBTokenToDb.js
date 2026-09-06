import { prisma } from "../../../index.js";

export async function saveWBTokenToDb(userId, token, client = prisma) {
  await client.token.update({ where: { userId }, data: { token, tokenHasBeenRemoved: false } });
}
