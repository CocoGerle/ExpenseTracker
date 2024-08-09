const { Router } = require("express");
const {
  createCategory,
  getAllCategory,
  getCategory,
} = require("../controllers/category.controller");

const categoryRouter = Router();

categoryRouter
  .post("/", createCategory)
  .get("/", getAllCategory)
  .get("/:id", getCategory);

module.exports = { categoryRouter };
