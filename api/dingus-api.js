const CLOUD_FLARE_URL = "https://dingusproxy.barstaxjolster.workers.dev";
const VERCEL_FALLBACK_URL = "https://vercel-dingus-proxy.vercel.app";

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

  // Try Cloudflare first
  try {
    const cloudflareResponse = await fetch(`${CLOUD_FLARE_URL}${endpoint}`, {
      method,
      headers,
      body: payload,
    });

    if (!cloudflareResponse.ok) throw new Error("Cloudflare failed");

    const data = await parseResponse(cloudflareResponse);
    console.log("✅ Using Cloudflare");
    return data;
  } catch (err) {
    console.warn("⚠️ Cloudflare failed, switching to Vercel:", err.message);

    // Try Vercel fallback
    try {
      const vercelResponse = await fetch(`${VERCEL_FALLBACK_URL}${endpoint}`, {
        method,
        headers,
        body: payload,
      });

      if (!vercelResponse.ok) throw new Error("Vercel also failed");

      const data = await parseResponse(vercelResponse);
      console.log("✅ Using Vercel fallback");
      return data;
    } catch (vercelErr) {
      console.error("❌ Both Cloudflare and Vercel failed:", vercelErr.message);
      throw vercelErr;
    }
  }
}

window.dingusFetch = dingusFetch;
