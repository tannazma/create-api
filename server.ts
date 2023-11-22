import express from "express";
import user from "./prisma/data/user.json";
import { PrismaClient } from "@prisma/client";
import { json } from "express";

const prisma = new PrismaClient();

const app = express();
app.use(json());
const port = 3001;

app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      age: true,
    },
  });
  res.send(allUsers);
});

// an endpoint to return the user with an id equal to the :id in the route
app.get("/users/:id", async (req, res) => {
  //   const idFromParams = req.params.id;
  //   const idAsNumber = parseInt(req.params.id);
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    res.status(400).send({ message: "id should be a number" });
    return; //empty return means that we are done
  }
  const oneUser = await prisma.user.findUnique({
    where: {
      id: idAsNumber,
    },
  });
  if (!oneUser) {
    res.status(404).send({ message: "Could not find that user" });
  }
  res.send(oneUser);
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});

app.post("/users", async (req, res) => {
  const requestBody = req.body;
  if (
    "age" in requestBody &&
    "username" in requestBody &&
    "password" in requestBody
  ) {
    console.log(requestBody);
    try {
      await prisma.user.create({
        data: requestBody,
      });
      res.status(201).send({ message: "User created!" });
    } catch (error) {
      // If we get an error, send back HTTP 500 (Server Error)
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    // If we are missing fields, send back a HTTP 400
    res
      .status(400)
      .send({ message: '"username", "password" and "age" are required.' });
  }
});

app.patch("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const requestBody = req.body;

  if (isNaN(userId)) {
    res.status(400).send({ message: "User id should be a number" });
    return;
  }
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: requestBody,
    });
    res.status(201).send({ message: "User updated!" });
  } catch(error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});
