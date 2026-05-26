import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const outputDir = "output/playwright";
const server = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "5174"],
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
      const response = await fetch("http://127.0.0.1:5174/?version=interactive");
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

  await page.goto("http://127.0.0.1:5174/?version=interactive", { waitUntil: "networkidle" });
  await page.getByText("选一床会呼吸的蚕丝被").waitFor();
  await page.screenshot({ path: `${outputDir}/interactive-home-mobile.png`, fullPage: true });

  await page.getByPlaceholder("搜婚庆、长辈、四季被").fill("婚庆");
  await page.getByRole("button", { name: "搜索" }).click();
  await page.getByText("按场景筛，少走弯路").waitFor();
  await page.getByRole("button", { name: "优惠" }).click();
  await page.getByTitle("收藏").first().click();
  await page.getByText("已收藏").waitFor();
  await page.getByTitle("加入购物车").first().click();
  await page.getByText("已加入购物车").waitFor();
  await page.screenshot({ path: `${outputDir}/interactive-shop-mobile.png`, fullPage: true });

  await page.getByText("已加入购物车").waitFor({ state: "hidden" });
  await page.getByTitle("溯源").click();
  await page.getByText("扫码查验").waitFor();
  await page.screenshot({ path: `${outputDir}/interactive-trace-mobile.png`, fullPage: true });

  await page.locator('button[title="购物车"]').click();
  await page.getByText("会员券 ¥120").waitFor();
  await page.getByRole("button", { name: "结算" }).click();
  await page.getByText("模拟结算").waitFor();
  await page.screenshot({ path: `${outputDir}/interactive-checkout-mobile.png`, fullPage: true });

  await browser.close();
}

main()
  .then(() => {
    server.kill();
    console.log("Interactive browser verification passed.");
    console.log(`Screenshots saved to ${outputDir}`);
  })
  .catch((error) => {
    server.kill();
    console.error(error);
    process.exit(1);
  });
