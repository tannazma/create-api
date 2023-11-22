import express from "express";
import user from "./prisma/data/user.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.send(allUsers);
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
