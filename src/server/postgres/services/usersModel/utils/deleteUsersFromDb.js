import { prisma } from "../../../index.js";

export async function deleteUsersFromDb(userId) {
  return prisma.user.deleteMany({});
}
