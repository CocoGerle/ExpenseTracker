import { config } from "dotenv";
import express from "express";
import cors from "cors";
import {
  authRouter,
  usersRouter,
  recordsRouter,
  categoriesRouter,
} from "./routes/index.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/category", categoriesRouter);
app.use("/auth", authRouter);

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
