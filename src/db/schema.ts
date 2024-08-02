import { InferInsertModel } from "drizzle-orm";
import { integer, text, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  plaidId: text("plaid_id"),
});

export const insertAccountSchema = createInsertSchema(account).pick({
  name: true,
});
