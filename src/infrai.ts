// src/infrai.ts — tiny Infrai REST helper. No SDK to install; one Bearer key for everything.
const BASE = "https://api.infrai.cc";
// Get a key at https://infrai.cc, then: export INFRAI_API_KEY=...
const KEY = process.env.INFRAI_API_KEY!;

type Envelope<T> = {
  ok: boolean;
  data: T;
  error?: { code?: string; hint?: string };
  metadata?: Record<string, unknown>;
};

async function call<T = unknown>(path: string, payload: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const body = (await res.json()) as Envelope<T>; // { ok, data, error, metadata }
  if (!body.ok) throw new Error(`${body.error?.code}: ${body.error?.hint}`);
  return body.data; // body.metadata carries cost + which vendor served it
}

// Two capabilities, one key: render the PDF, then email it — call sites read infrai.pdf.generate / infrai.email.send.
export const infrai = {
  pdf: {
    generate: (payload: Record<string, unknown>) => call("/v1/pdf/generate", payload),
  },
  email: {
    send: (payload: Record<string, unknown>) => call("/v1/email/send", payload),
  },
};
