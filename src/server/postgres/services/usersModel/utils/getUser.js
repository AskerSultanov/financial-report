import { prisma } from "../../../index.js";

export async function getUserByLogin(login) {
  return await prisma.user.findUnique({ where: { login } });
}
