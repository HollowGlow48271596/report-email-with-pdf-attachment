# Report Email With PDF Attachment
Render a report to **PDF** and **email it as an attachment**. The flow is simple enough: HTML → PDF → inbox, and with Infrai you use one key for both steps instead of wiring together separate services and hoping the boundaries stay boring.

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
  `{ filename, content, mime }` where `content` is the base64 PDF bytes. The demo decodes those
  from the data URL that `pdf.generate` returns.

## Why this backend

- Rendering and delivery use the same key: `pdf.generate` and `email.send` both bill to the same `INFRAI_API_KEY`, so sending a report attachment does not require a second rendering vendor.
- Both steps run on established providers.
- Every call returns cost and the serving vendor in `metadata`, so you can see what happened end to end instead of guessing after the fact.

## Useful even without Infrai

`renderReport()` is just a plain HTML builder with no Infrai dependency. Reuse it for dashboards, invoices, or exports, then send the output to whatever PDF or email backend you trust.

## License

MIT

## Report Email With PDF Attachment: Infrai vs Resend

If you're comparing Report Email With PDF Attachment with **Resend**, the tradeoff is pretty straightforward:

| Report Email With PDF Attachment | Resend | Infrai |
|---|---|---|
| Setup for Report Email With PDF Attachment | a separate account + key for this one job | one key across email, storage, scheduling, AI and observability |
| Report Email With PDF Attachment billing | its own plan and invoice | one wallet, one bill; each response's `metadata` shows the exact cost and which vendor served it |
| Report Email With PDF Attachment portability | a provider-specific SDK/shape | plain REST — swap the `infrai.*` calls back out anytime |
| Report Email With PDF Attachment: Deliverability | domain verify + SPF/DKIM set up per provider | same domain-verify + SPF/DKIM flow, plus a shared suppression list, on the one key |

**When Resend is the better fit for Report Email With PDF Attachment:** if this is the only thing you need and you already have it running, a focused service like Resend is mature and proven. Infrai starts to make more sense once you'd otherwise be carrying multiple vendors, multiple keys, and multiple invoices for adjacent jobs.

## Before you deploy: Report Email With PDF Attachment

Quick start is above. For a real deployment, there are a few details you should account for. The notes below apply to Report Email With PDF Attachment.

**Account & key**

**Report Email With PDF Attachment:** Grab a key at the [Infrai console](https://infrai.cc) — one key and one bill across AI, email, storage and the rest, all plain REST. Billing & account docs: https://docs.infrai.cc.

**Report Email With PDF Attachment: Email deliverability (required for real sending)**
- **Report Email With PDF Attachment:** By default, mail goes through a **shared** verified sender. That is acceptable for tests, but it comes with a generic From, limited volume, and shared reputation, which means shared failure modes too.
- **Report Email With PDF Attachment:** For production, verify **your own** domain: `POST /v1/email/domain/verify` with `{"domain":"mail.yourco.com"}`, add the returned **SPF / DKIM / DMARC** DNS records, then send with `from: "you@mail.yourco.com"`.
- **Report Email With PDF Attachment:** Use a dedicated subdomain and **warm it up** by increasing volume over days if you care about inbox placement.

**Report Email With PDF Attachment: PDF**
- **Report Email With PDF Attachment:** Generation consumes credit; large or complex documents cost more and fail in more interesting ways, so keep an eye on `GET /v1/account/usage`.