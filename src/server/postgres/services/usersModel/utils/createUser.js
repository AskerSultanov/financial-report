import { prisma } from "../../../index.js";

export async function createUser(newUser) {
  console.log(newUser);

  return await prisma.$transaction(async (tx) => {
    await tx.user.create({ data: newUser });
  });
}
