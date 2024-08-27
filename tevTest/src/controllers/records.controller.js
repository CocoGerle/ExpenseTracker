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

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRecord = await db.query.records.findFirst({
      where: eq(records.id, id),
    });

    if (!existingRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    await db.delete(records).where(eq(records.id, id));

    res.json({
      message: "Record successfully deleted",
      deletedRecord: existingRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
