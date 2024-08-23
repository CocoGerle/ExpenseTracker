import { eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { categories } from "../database/schema.js";

export const getCategories = async (req, res) => {
  const AllCategories = await db.query.categories.findMany({
    with: {
      records: true,
    },
    where: eq(categories.userId, req.user.id),
  });
  res.json(AllCategories);
};

export const createCategories = async (req, res) => {
  const { name, icon, color, userId } = req.body;

  const category = await db
    .insert(categories)
    .values({ name, icon, color, userId: req.user.id })
    .returning();

  res.json(category);
};
