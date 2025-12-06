import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
});

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    courseId: uuid()
      .notNull()
      .references(() => courses.id),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex().on(table.userId, table.courseId)]
);
