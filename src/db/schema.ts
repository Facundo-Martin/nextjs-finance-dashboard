import { integer, text, pgTable } from "drizzle-orm/pg-core";

export const account = pgTable("account", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});
