import { eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { records } from "../database/schema.js";

export const getRecords = async (req, res) => {
  const recorduud = await db.query.records.findMany({
    with: {
      category: true,
    },
    where: eq(records.userId, req.user.id),
  });
  res.json(recorduud);
};

export const createRecords = async (req, res) => {
  const { type, amount, categoryId, date, time, note, payee } = req.body;

  const record = await db
    .insert(records)
    .values({
      type,
      amount,
      categoryId,
      date,
      time,
      note,
      payee,
      userId: req.user.id,
    })
    .returning();

  res.json(record);
};
