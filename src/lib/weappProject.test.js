import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(process.cwd(), "taro-weapp");

describe("Taro WeChat mini program copy", () => {
  it("contains the five core pages and tab bar configuration", () => {
    const appConfigPath = resolve(root, "src/app.config.js");

    expect(existsSync(resolve(root, "package.json"))).toBe(true);
    expect(existsSync(resolve(root, "project.config.json"))).toBe(true);
    expect(existsSync(appConfigPath)).toBe(true);

    const appConfig = readFileSync(appConfigPath, "utf8");
    for (const page of ["home", "shop", "trace", "cart", "mine"]) {
      expect(existsSync(resolve(root, `src/pages/${page}/index.jsx`))).toBe(true);
      expect(appConfig).toContain(`pages/${page}/index`);
    }

    expect(appConfig).toContain("tabBar");
  });
});
