import { mkdir } from "node:fs/promises";
import QRCode from "qrcode";

const targetUrl = process.argv[2];
const outputPath = process.argv[3] ?? "public/qr-interactive.svg";

if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
  console.error("Usage: npm run qr -- https://<user>.github.io/<repo>/?version=interactive [output.svg]");
  process.exit(1);
}

await mkdir(outputPath.split(/[\\/]/).slice(0, -1).join("/") || ".", { recursive: true });
await QRCode.toFile(outputPath, targetUrl, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 2,
  color: {
    dark: "#12382b",
    light: "#fffdf7"
  }
});

console.log(`QR code generated: ${outputPath}`);
console.log(`Target URL: ${targetUrl}`);
