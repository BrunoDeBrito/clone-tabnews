import orchestrator from "tests/orchestrator.js";
import db from "infra/database";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      await db.query({
        text: "insert into users (username, email, password) values ($1, $2, $3)",
        values: ["BrunoDeBrito", "contato@gmail.com", "password"],
      });

      const users = await db.query("select * from users;");
      console.log(users.rows);

      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
      });
      expect(response.status).toBe(201);
    });
  });
});
