const { Router } = require("express");
const {
  createCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const categoryRouter = Router();

categoryRouter
  .post("/", createCategory)
  .get("/", getAllCategory)
  .get("/:id", getCategory)
  .delete(":id", deleteCategory);

module.exports = { categoryRouter };
