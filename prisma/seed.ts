import user from "./data/user.json";
import petData from "./data/pets.json";
import ownerData from "./data/owner.json";
import foodData from "./data/food.json";
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
  for (let i = 0; i < ownerData.length; i++) {
    const thisOwner = ownerData[i];
    await prisma.owner.create({
      data: thisOwner,
    });
  }

  // Seed every food
  for (let i = 0; i < foodData.length; i++) {
    const thisFood = foodData[i];
    await prisma.food.create({
      data: thisFood,
    });
  }

  // Seed every pet
  for (let i = 0; i < petData.length; i++) {
    const thisPet = petData[i];
    await prisma.pet.create({
      data: thisPet,
    });
  }
};

seed();
