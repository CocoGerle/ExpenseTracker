import { Router } from "express";
import {
  getCategories,
  createCategories,
  deleteCategory,
} from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter
  .get("/", getCategories)
  .post("/", createCategories)
  .delete("/:id", deleteCategory);

export { categoriesRouter };
