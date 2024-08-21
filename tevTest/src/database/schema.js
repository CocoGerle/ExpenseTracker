import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
});

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  type: varchar("type"),
  amount: integer("amount"),
  categoryId: integer("categoryId"),
  date: varchar("date"),
  time: varchar("time"),
  note: varchar("note", { length: 256 }),
  payee: varchar("payee", { length: 256 }),
  userId: integer("userId"),
});

export const categories = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  icon: varchar("icon"),
  color: varchar("color"),
  userId: integer("userId"),
});

export const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
  categories: many(categories),
}));

export const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [records.categoryId],
    references: [categories.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  records: many(records),
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
}));
