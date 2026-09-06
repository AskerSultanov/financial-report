import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./prisma/schemas/generated/client.ts";

console.log({ url: process.env.DATABASE_URL });

var adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export var prisma = new PrismaClient({ adapter });
