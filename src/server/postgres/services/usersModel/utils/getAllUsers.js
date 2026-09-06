import { prisma } from "../../../index.js";

export async function getAllUsers() {
  return prisma.user.findMany({});
}
