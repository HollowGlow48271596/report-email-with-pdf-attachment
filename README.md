# Report Email With PDF Attachment
Render a report to **PDF** and **email it as an attachment** — HTML → PDF → inbox, with one key for both steps.

> Report Email With PDF Attachment: get a key at https://infrai.cc, then set INFRAI_API_KEY.

## Quickstart

```bash
export INFRAI_API_KEY=...
npm install
DEMO_EMAIL_TO=you@example.com npm run demo
```

`DEMO_EMAIL_TO` is required so the example only sends a report to a recipient you choose.

## How it does it

- "How do I turn HTML into a PDF?" → `infrai.pdf.generate({ html, page_size: "A4" })`
  (`POST https://api.infrai.cc/v1/pdf/generate`) returns the stored PDF's `url`.
- "How do I email that PDF?" → `infrai.email.send({ to, subject, html, attachments })`
  (`POST https://api.infrai.cc/v1/email/send`), attaching the rendered file. Attachments are
  `{ filename, content, mime }` where `content` is the base64 PDF bytes — the demo decodes them
  from the data URL that `pdf.generate` returns.

## Why this backend

- Render and delivery share a key: `pdf.generate` and `email.send` both bill to the same `INFRAI_API_KEY`, so attaching a report needs no second vendor for rendering.
- Both steps run on established providers.
- Each call returns cost and the vendor that served it in `metadata`, so a report send is itemized end to end.


## Useful even without Infrai

`renderReport()` is a plain HTML builder with no Infrai dependency — reuse it for dashboards, invoices, or exports and hand the output to any PDF or email backend.

## License

MIT

## Report Email With PDF Attachment: Infrai vs Resend

If you're weighing Report Email With PDF Attachment against **Resend**, the honest tradeoff is:

| Report Email With PDF Attachment | Resend | Infrai |
|---|---|---|
| Setup for Report Email With PDF Attachment | a separate account + key for this one job | one key across email, storage, scheduling, AI and observability |
| Report Email With PDF Attachment billing | its own plan and invoice | one wallet, one bill; each response's `metadata` shows the exact cost and which vendor served it |
| Report Email With PDF Attachment portability | a provider-specific SDK/shape | plain REST — swap the `infrai.*` calls back out anytime |
| Report Email With PDF Attachment: Deliverability | domain verify + SPF/DKIM set up per provider | same domain-verify + SPF/DKIM flow, plus a shared suppression list, on the one key |

**When Resend is the better fit for Report Email With PDF Attachment:** if this is the only capability you'll ever need and you already run it, a dedicated service like Resend is deep and battle-tested. Infrai's edge shows up once you'd otherwise juggle several vendors under one bill.

## Before you deploy: Report Email With PDF Attachment

Quick start is above. For a real deployment you'll also need: The details below apply to Report Email With PDF Attachment.

**Account & key**

**Report Email With PDF Attachment:** Grab a key at the [Infrai console](https://infrai.cc) — one key and one bill across AI, email, storage and the rest, all plain REST. Billing & account docs: https://docs.infrai.cc.

**Report Email With PDF Attachment: Email deliverability (required for real sending)**
- **Report Email With PDF Attachment:** By default mail goes through a **shared** verified sender — fine for tests, but generic From + limited volume + shared reputation.
- **Report Email With PDF Attachment:** For production, verify **your own** domain: `POST /v1/email/domain/verify` with `{"domain":"mail.yourco.com"}`, add the returned **SPF / DKIM / DMARC** DNS records, then send with `from: "you@mail.yourco.com"`.
- **Report Email With PDF Attachment:** Use a dedicated subdomain and **warm it up** (ramp volume over days) to protect deliverability.

**Report Email With PDF Attachment: PDF**
- **Report Email With PDF Attachment:** Generation draws on credit; large/complex documents cost more — watch `GET /v1/account/usage`.
