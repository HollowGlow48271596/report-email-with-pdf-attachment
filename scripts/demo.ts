import { emailReport } from "../src/report";

const recipient = process.env.DEMO_EMAIL_TO;
if (!recipient) throw new Error("Set DEMO_EMAIL_TO before running the demo.");

await emailReport(recipient, "Weekly metrics", [
  ["Signups", 128],
  ["Active users", 942],
  ["Revenue ($)", 5310],
]);
console.log("report emailed");
