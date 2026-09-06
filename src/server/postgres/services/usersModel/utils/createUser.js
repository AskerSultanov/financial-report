import { prisma } from "../../../index.js";

export async function createUser(newUser) {
  var { userId } = newUser;
  console.log(newUser);

  return await prisma.$transaction(async (tx) => {
    await tx.user.create({ data: newUser });
    await tx.token.create({ data: { userId } });
    await tx.reports.create({ data: { userId } });
    await tx.taxParams.create({ data: { userId } });
    await tx.listGoods.create({ data: { userId } });
    await tx.reportTree.create({ data: { userId } });
  });
}
