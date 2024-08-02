import { db } from "@/db/drizzle";
import { account } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    throw new HTTPException(401, {
      res: c.json({ error: "Unauthorized" }, 401),
    });
  }

  const data = await db
    .select({ id: account.id, name: account.name })
    .from(account);

  return c.json({ data });
});

export default app;

// export const GET = handle(app);
// export const POST = handle(app);
