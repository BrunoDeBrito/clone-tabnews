import retry from "async-retry";
import db from "infra/database";

const url = `${process.env.BASE_URL}/${process.env.VERSION_V1}`;

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      minTimeout: 500,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${url}/status`);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      response.json();
    }
  }
}

async function clearDatabase() {
  await db.query("drop schema public cascade; create schema public;");
}

const orchestrator = { waitForAllServices, clearDatabase };

export default orchestrator;
