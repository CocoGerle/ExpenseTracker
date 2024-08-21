import { Router } from "express";
import {
  getRecords,
  createRecords,
} from "../controllers/records.controller.js";

const recordsRouter = Router();

recordsRouter.get("/", getRecords).post("/", createRecords);

export { recordsRouter };
