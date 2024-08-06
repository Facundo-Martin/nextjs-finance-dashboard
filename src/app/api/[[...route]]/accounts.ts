import { db } from "@/db/drizzle";
import { account, insertAccountSchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({ id: account.id, name: account.name })
      .from(account)
      .where(eq(account.userId, auth.userId));

    return c.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const values = c.req.valid("json");

      // Note: We need to destructure to get the actual record
      const [data] = await db
        .insert(account)
        .values({
          id: createId(),
          userId: auth.userId,
          name: values.name,
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const values = c.req.valid("json");

      const data = await db
        .delete(account)
        .where(
          and(eq(account.userId, auth.userId), inArray(account.id, values.ids))
        )
        .returning({
          id: account.id,
        });

      return c.json({ data });
    }
  );

export default app;
