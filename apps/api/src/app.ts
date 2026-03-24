import cors from "cors";
import express from "express";
import { z } from "zod";
import { getAvailableCategories, searchInventory } from "./lib/search.js";

const searchQuerySchema = z
  .object({
    q: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional()
  })
  .superRefine((value, ctx) => {
    if (
      value.minPrice !== undefined &&
      value.maxPrice !== undefined &&
      value.minPrice > value.maxPrice
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "minPrice cannot be greater than maxPrice",
        path: ["minPrice"]
      });
    }
  });

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.get("/meta/categories", (_req, res) => {
    res.json({ categories: getAvailableCategories() });
  });

  app.get("/search", (req, res) => {
    const parsed = searchQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid search query",
        issues: parsed.error.issues.map((issue) => issue.message)
      });
    }

    const results = searchInventory(parsed.data);
    return res.json({
      count: results.length,
      results
    });
  });

  return app;
}
