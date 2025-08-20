import db from "infra/database.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await db.query("drop schema public cascade; create schema public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Retrieving pending migrations", () => {
    describe("Anonymous user", () => {
      test("For the first time", async () => {
        const url = `${process.env.BASE_URL}/${process.env.VERSION_V1}`;

        const response1 = await fetch(`${url}/migrations`, {
          method: "POST",
        });

        expect(response1.status).toBe(201);

        const response1Body = await response1.json();

        expect(Array.isArray(response1Body)).toBe(true);
        expect(response1Body.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const url = `${process.env.BASE_URL}/${process.env.VERSION_V1}`;

        const response2 = await fetch(`${url}/migrations`, {
          method: "POST",
        });
        expect(response2.status).toBe(200);

        const response2Body = await response2.json();

        expect(Array.isArray(response2Body)).toBe(true);
        expect(response2Body.length).toBe(0);
      });
    });
  });
});
