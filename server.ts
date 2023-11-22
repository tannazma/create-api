import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send({ message: "Here is server" });
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
