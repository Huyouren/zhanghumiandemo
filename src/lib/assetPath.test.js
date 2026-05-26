import { describe, expect, it } from "vitest";
import { assetPath } from "./assetPath";

describe("assetPath", () => {
  it("keeps local asset paths rooted at the dev server", () => {
    expect(assetPath("/assets/hero-silk-bedroom.png", "/")).toBe("/assets/hero-silk-bedroom.png");
  });

  it("prefixes GitHub Pages project base for deployed assets", () => {
    expect(assetPath("/assets/hero-silk-bedroom.png", "/zhanghumiandemo/")).toBe(
      "/zhanghumiandemo/assets/hero-silk-bedroom.png"
    );
  });
});
