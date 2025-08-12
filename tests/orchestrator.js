import retry from "async-retry";

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

export default { waitForAllServices };
