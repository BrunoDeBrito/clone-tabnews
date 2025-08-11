import retry from "async-retry";

const url = `${process.env.BASE_URL}/${process.env.VERSION_V1}`;

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 5,
      minTimeout: 1000,
      maxTimeout: 6000,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${url}/status`);
      const responseBody = response.json();
    }
  }
}

export default { waitForAllServices };
