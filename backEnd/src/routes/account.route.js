const { Router } = require("express");

const {
  getAllAccounts,
  createAccount,
  getAccount,
  deleteAccount,
  deleteAllAccounts,
} = require("../controllers/account.controller");

const accountRouter = Router();

accountRouter
  .get("/", getAllAccounts)
  .post("/", createAccount)
  .get("/:id", getAccount)
  .delete("/:id", deleteAccount)
  .delete("/", deleteAllAccounts)

module.exports = { accountRouter };
