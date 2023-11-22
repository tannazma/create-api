import user from "./data/user.json";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  // Seed every user
  for (let i = 0; i < user.length; i++) {
    const thisUser = user[i];
    await prisma.user.create({
      data: thisUser,
    });
  }
};

seed();
