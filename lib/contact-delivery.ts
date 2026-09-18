export type ContactPayload = {
  name: string;
  role: string;
  contact: string;
  task: string;
  grade: string;
  comment: string;
  source: Record<string, string>;
  requestId: string;
  consent: {
    accepted: true;
    text: string;
    url: string;
    privacyUrl: string;
    at: string;
  };
};

type DeliveryConfig = { provider: string; url: string; token: string };

export async function deliverContact(
  payload: ContactPayload,
  config: DeliveryConfig,
  fetcher: typeof fetch = fetch,
) {
  const url = new URL(config.url);
  if (
    url.username || url.password ||
    (url.protocol !== "https:" && !(
      process.env.NODE_ENV !== "production" &&
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname)
    ))
  ) throw new Error("Invalid delivery URL");

  if (config.provider === "google-sheets") {
    if (
      url.origin !== "https://script.google.com" ||
      !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname) ||
      url.search || url.hash || config.token.length < 32
    ) throw new Error("Invalid Google Sheets configuration");

    const signal = AbortSignal.timeout(20_000);
    let response = await fetcher(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Apps Script exposes the POST body, not arbitrary HTTP headers.
      body: JSON.stringify({ token: config.token, ...payload }),
      signal,
      redirect: "manual",
    });
    // ContentService serves its result through a one-time Google URL.
    // Read it with GET; never forward the token or contact data to a redirect.
    if ([302, 303].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Missing Google response URL");
      const resultUrl = new URL(location);
      if (
        resultUrl.origin !== "https://script.googleusercontent.com" ||
        resultUrl.username || resultUrl.password
      ) throw new Error("Unexpected Google redirect");
      response = await fetcher(resultUrl, { signal, redirect: "error" });
    }
    if (!response.ok) throw new Error("Google Sheets delivery failed");
    const result = await response.json();
    if (result?.ok !== true || result.requestId !== payload.requestId)
      throw new Error("Google Sheets did not confirm the application");
    return;
  }

  if (config.provider !== "webhook") throw new Error("Unknown delivery provider");
  const response = await fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": payload.requestId,
      ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Webhook delivery failed");
}
