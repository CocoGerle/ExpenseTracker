import { Router } from "express";
import { getUsers, createUser } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getUsers).post("/", createUser);

export { usersRouter };
