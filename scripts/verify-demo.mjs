import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const outputDir = "output/playwright";
const server = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "5173"],
  {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    shell: false
  }
);

let logs = "";
server.stdout.on("data", (chunk) => {
  logs += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  logs += chunk.toString();
});

async function waitForServer() {
  const started = Date.now();
  while (Date.now() - started < 15000) {
    try {
      const response = await fetch("http://127.0.0.1:5173/");
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
  throw new Error(`Vite server did not start. Logs:\n${logs}`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await waitForServer();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.getByText("一生一被，一丝传家").waitFor();
  await page.screenshot({ path: `${outputDir}/home-mobile.png`, fullPage: true });

  await page.getByRole("button", { name: "分类" }).click();
  await page.getByRole("button", { name: "加入购物车" }).first().click();
  await page.getByText("已加入购物车").waitFor();

  await page.locator('button[title="购物车"]').click();
  await page.getByText("合计").waitFor();
  await page.screenshot({ path: `${outputDir}/cart-mobile.png`, fullPage: true });

  await page.locator('button[title="溯源"]').click();
  await page.getByRole("button", { name: "查询" }).click();
  await page.getByText("ZHM-2026-0518").waitFor();
  await page.screenshot({ path: `${outputDir}/trace-mobile.png`, fullPage: true });

  await page.getByRole("textbox", { name: "溯源码" }).fill("bad-code");
  await page.getByRole("button", { name: "查询" }).click();
  await page.getByText("没有找到该溯源码").waitFor();

  await page.locator('button[title="我的"]').click();
  await page.getByRole("button", { name: /预约到店体验/ }).click();
  await page.getByRole("button", { name: "提交预约" }).click();
  await page.getByText("请填写联系人").waitFor();
  await page.screenshot({ path: `${outputDir}/appointment-validation-mobile.png`, fullPage: true });

  await browser.close();
}

main()
  .then(() => {
    server.kill();
    console.log("Browser verification passed.");
    console.log(`Screenshots saved to ${outputDir}`);
  })
  .catch((error) => {
    server.kill();
    console.error(error);
    process.exit(1);
  });
