import argon2 from "argon2";
import { prisma } from "../../../index.js";

export async function createUser(newUser) {
  var registeredAt = new Date();
  var hashedPasswd = await argon2.hash(
    newUser.passwd + "",
    process.env.SECRET_KEY,
  );

  return await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: { passwd: hashedPasswd, registeredAt, ...newUser },
    });
  });
}
