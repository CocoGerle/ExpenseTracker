import { db } from "../database/index.js";
import { records } from "../database/schema.js";

export const getRecords = async (_, res) => {
  const records = await db.query.records.findMany({
    with: {
      category: true,
    },
  });
  res.json(records);
};

export const createRecords = async (req, res) => {
  const { type, amount, categoryId, date, time, note, payee, userId } =
    req.body;

  const record = await db
    .insert(records)
    .values({ type, amount, categoryId, date, time, note, payee, userId })
    .returning();

  res.json(record);
};
