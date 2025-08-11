import db from "infra/database.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await db.query("drop schema public cascade; create schema public;");
});

test("GET to /api/v1/migrations should return 200", async () => {
  const url = `${process.env.BASE_URL}/${process.env.VERSION_V1}`;

  const response = await fetch(`${url}/migrations`);
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
