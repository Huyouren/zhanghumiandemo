import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("interactive bottom tabs", () => {
  it("uses four equal columns for the four interactive tab items", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

    expect(css).toMatch(/\.interactive-tabs\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\);/s);
  });
});
