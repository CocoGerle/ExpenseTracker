import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { postsRouter, usersRouter } from "./routes/index.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
