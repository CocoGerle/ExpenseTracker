import { Router } from "express";
import {
  getCategories,
  createCategories,
} from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories).post("/", createCategories);

export { categoriesRouter };
