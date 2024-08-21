import { db } from "../database/index.js";
import { categories } from "../database/schema.js";

export const getCategories = async (_, res) => {
  const categories = await db.query.categories.findMany({
    with: {
      records: true,
    },
  });
  res.json(categories);
};

export const createCategories = async (req, res) => {
  const { name, icon, color, userId } = req.body;

  const category = await db
    .insert(categories)
    .values({ name, icon, color, userId })
    .returning();

  res.json(category);
};
