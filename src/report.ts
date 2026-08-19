import { infrai } from "./infrai";

// Build the report HTML however you like — this stays plain and reusable.
export function renderReport(title: string, rows: [string, number][]): string {
  const body = rows
    .map(([label, value]) => `<tr><td>${label}</td><td>${value}</td></tr>`)
    .join("");
  return `<h1>${title}</h1><table>${body}</table>`;
}

// Two capabilities, one key: render the PDF, then email it as an attachment.
export async function emailReport(to: string, title: string, rows: [string, number][]) {
  const pdf = (await infrai.pdf.generate({
    html: renderReport(title, rows),
    page_size: "A4",
  })) as { url: string };

  const url = pdf.url;
  return infrai.email.send({
    to,
    subject: `${title} — attached`,
    html: "<p>Your report is attached as a PDF.</p>",
    attachments: [{ filename: "report.pdf", url }],
  });
}
