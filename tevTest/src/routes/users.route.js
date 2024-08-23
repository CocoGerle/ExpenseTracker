import { Router } from "express";
import { getMe } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/me", getMe);

export { usersRouter };
