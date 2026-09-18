import { contactSettings } from "@/lib/contact-settings";
import { tasks } from "@/lib/site";
import { deliverContact } from "@/lib/contact-delivery";

export const runtime = "nodejs";

export function GET() {
  return Response.json(contactSettings(), {
    headers: { "Cache-Control": "no-store" },
  });
}

const attempts = new Map<string, { count: number; expires: number }>();
const delivered = new Map<string, number>();

function failure(error: string, status: number) {
  return Response.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const settings = contactSettings();
  if (!settings.enabled)
    return failure("Форма пока недоступна. Напишите Георгию в Telegram.", 503);
  // This endpoint is for the same-origin browser form. The proxy must preserve Host.
  const origin = request.headers.get("origin");
  try {
    if (!origin || new URL(origin).host !== request.headers.get("host"))
      return failure("Недопустимый источник запроса.", 403);
  } catch {
    return failure("Недопустимый источник запроса.", 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return failure("Ожидается JSON.", 415);

  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires < now) attempts.delete(key);
  for (const [key, expires] of delivered)
    if (expires < now) delivered.delete(key);
  // Bound per-process memory. For multiple replicas use a rate limit at the proxy.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const limit = attempts.get(ip);
  if (limit && limit.count >= 5)
    return failure("Слишком много попыток. Попробуйте через 10 минут.", 429);
  if (attempts.size >= 5000 && !limit) return failure("Попробуйте позже.", 429);
  attempts.set(ip, {
    count: (limit?.count ?? 0) + 1,
    expires: limit?.expires ?? now + 600_000,
  });

  let body: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return failure("Пустой запрос.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16_384) {
        await reader.cancel();
        return failure("Слишком длинное сообщение.", 413);
      }
      chunks.push(value);
    }
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return failure("Некорректный запрос.", 400);
    body = parsed;
  } catch {
    return failure("Некорректный запрос.", 400);
  }

  const text = (key: string, max: number) =>
    typeof body[key] === "string" && body[key].length <= max
      ? body[key].trim()
      : "";
  const name = text("name", 100);
  const contact = text("contact", 200);
  const role = text("role", 20);
  const task = text("task", 30);
  const grade = text("grade", 40);
  const comment = text("comment", 2000);
  const requestId = text("requestId", 36);
  if (
    body.website ||
    !name ||
    !contact ||
    !["student", "parent"].includes(role) ||
    body.consent !== true ||
    (task && !tasks.some((item) => item.value === task)) ||
    !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(
      requestId,
    ) ||
    (typeof body.comment === "string" && body.comment.length > 2000)
  )
    return failure("Проверьте обязательные поля и согласие.", 400);
  if (delivered.has(requestId)) return Response.json({ ok: true });

  const source: Record<string, string> = {};
  if (body.source && typeof body.source === "object") {
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
    ]) {
      const value = (body.source as Record<string, unknown>)[key];
      if (typeof value === "string") source[key] = value.slice(0, 200);
    }
  }
  try {
    await deliverContact(
      {
        name,
        role,
        contact,
        task,
        grade,
        comment,
        source,
        requestId,
        consent: {
          accepted: true,
          text: settings.consentText,
          url: settings.consentUrl,
          privacyUrl: settings.privacyUrl,
          at: new Date().toISOString(),
        },
      },
      {
        provider: process.env.CONTACT_WEBHOOK_PROVIDER || "webhook",
        url: process.env.CONTACT_WEBHOOK_URL!,
        token: process.env.CONTACT_WEBHOOK_TOKEN || "",
      },
    );
    delivered.set(requestId, now + 86_400_000);
    if (delivered.size > 5000) delivered.delete(delivered.keys().next().value!);
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return failure("Не удалось отправить заявку.", 502);
  }
}
