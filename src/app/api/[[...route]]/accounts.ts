import { db } from "@/db/drizzle";
import { account, insertAccountSchema } from "@/db/schema";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
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
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
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
  );

export default app;
