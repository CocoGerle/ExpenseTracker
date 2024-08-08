const { Router } = require("express");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/category.controller");

const categoryRouter = Router();

categoryRouter.post("/", createCategory).get("/", getAllCategory);

module.exports = { categoryRouter };
