import { pgTable, uuid, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
});
