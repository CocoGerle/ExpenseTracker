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

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    await db.delete(categories).where(eq(categories.id, id));

    res.json({
      message: "Category successfully deleted",
      deletedCategory: existingCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
