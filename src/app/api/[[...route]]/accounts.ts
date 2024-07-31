import { db } from "@/db/drizzle";
import { account } from "@/db/schema";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const accounts = await db
    .select({ id: account.id, name: account.name })
    .from(account);

  return c.json(accounts);
});

export default app;

// export const GET = handle(app);
// export const POST = handle(app);
