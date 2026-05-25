import { describe, expect, it } from "vitest";
import { filterInteractiveProducts } from "./interactiveCatalog";

const sampleProducts = [
  {
    id: "gold",
    name: "Golden Silk Quilt",
    category: "golden",
    categoryName: "Golden",
    price: 2699,
    originalPrice: 3299,
    tags: ["heritage", "gift"],
    scene: "wedding gift"
  },
  {
    id: "classic",
    name: "Classic Mulberry Quilt",
    category: "mulberry",
    categoryName: "Mulberry",
    price: 1899,
    originalPrice: 2299,
    tags: ["daily", "healthy"],
    scene: "daily sleep"
  },
  {
    id: "gift",
    name: "Family Gift Box",
    category: "gift",
    categoryName: "Gift",
    price: 3299,
    originalPrice: 3999,
    tags: ["gift", "box"],
    scene: "family visit"
  }
];

describe("interactive catalog filtering", () => {
  it("filters by category and query across searchable fields", () => {
    const result = filterInteractiveProducts(sampleProducts, {
      category: "golden",
      query: "gift",
      sort: "recommended"
    });

    expect(result.map((product) => product.id)).toEqual(["gold"]);
  });

  it("sorts by price and discount depth", () => {
    expect(
      filterInteractiveProducts(sampleProducts, { sort: "price-asc" }).map((product) => product.id)
    ).toEqual(["classic", "gold", "gift"]);

    expect(
      filterInteractiveProducts(sampleProducts, { sort: "discount" }).map((product) => product.id)
    ).toEqual(["gift", "gold", "classic"]);
  });
});
