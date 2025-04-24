const CLOUD_FLARE_URL = "https://dingusproxy.barstaxjolster.workers.dev";
const VERCEL_FALLBACK_URL = "https://dingus-api.vercel.app";

async function parseResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text); // Try to parse as JSON
  } catch {
    return { message: text }; // Fallback to text wrapped in an object
  }
}

async function dingusFetch(endpoint, body = {}, method = "POST") {
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  const payload = new URLSearchParams(body);

  try {
    const cloudflareResponse = await fetch(`${CLOUD_FLARE_URL}${endpoint}`, {
      method,
      headers,
      body: payload,
    });

    const data = await parseResponse(cloudflareResponse);

    if (!cloudflareResponse.ok || data.message?.includes("Exception") || data.message?.includes("Error")) {
      throw new Error("Cloudflare failed with bad data");
    }

    return data;
  } catch (err) {
    // Try Vercel fallback
    try {
      const vercelResponse = await fetch(`${VERCEL_FALLBACK_URL}${endpoint}`, {
        method,
        headers,
        body: payload,
      });

      const data = await parseResponse(vercelResponse);
      return data;
    } catch (vercelErr) {
      throw vercelErr;
    }
  }
}


window.dingusFetch = dingusFetch;
