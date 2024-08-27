import { Router } from "express";
import {
  getRecords,
  createRecords,
  deleteRecord,
} from "../controllers/records.controller.js";

const recordsRouter = Router();

recordsRouter
  .get("/", getRecords)
  .post("/", createRecords)
  .delete("/:id", deleteRecord);

export { recordsRouter };
