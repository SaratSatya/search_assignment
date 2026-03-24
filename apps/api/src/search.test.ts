import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app";

const app = createApp();

describe("GET /search", () => {
  it("returns all results when no filters are provided", async () => {
    const response = await request(app).get("/search");
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(12);
  });

  it("supports case-insensitive partial product name search", async () => {
    const response = await request(app).get("/search").query({ q: "wireless" });
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.results[0].productName).toBe("Wireless Mouse");
  });

  it("supports combining category and price filters", async () => {
    const response = await request(app)
      .get("/search")
      .query({ category: "Electronics", minPrice: 500, maxPrice: 1000 });

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(2);
  });

  it("returns 400 when minPrice is greater than maxPrice", async () => {
    const response = await request(app)
      .get("/search")
      .query({ minPrice: 1000, maxPrice: 100 });

    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid numeric filters", async () => {
    const response = await request(app).get("/search").query({ minPrice: "cheap" });
    expect(response.status).toBe(400);
  });
});
