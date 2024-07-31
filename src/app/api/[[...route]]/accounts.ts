import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  return c.json({
    accounts: [],
  });
});

export default app;

// export const GET = handle(app);
// export const POST = handle(app);
