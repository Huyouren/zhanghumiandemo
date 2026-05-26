import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("interactive bottom tabs", () => {
  it("uses five equal columns for home, shop, trace, cart, and mine", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");
    const app = readFileSync(resolve(process.cwd(), "src/interactive/InteractiveApp.jsx"), "utf8");

    expect(app).toMatch(/id:\s*"trace",\s*label:\s*"溯源"/);
    expect(css).toMatch(/\.interactive-tabs\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*1fr\);/s);
  });
});
