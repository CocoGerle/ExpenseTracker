const { Router } = require("express");
const {
  getRecord,
  updateRecord,
  getAllRecords,
  createRecord,
  deleteRecord,
  deleteAllRecords,
} = require("../controllers/addRecord.controller");

const recordRouter = Router();

recordRouter
  .get("/", getAllRecords)
  .post("/", createRecord)
  .get("/:id", getRecord)
  .delete("/:id", deleteRecord)
  .delete("/", deleteAllRecords)
  .put("/:id", updateRecord);

module.exports = { recordRouter };
