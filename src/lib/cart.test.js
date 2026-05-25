import { describe, expect, it } from "vitest";
import { addToCart, changeQuantity, removeFromCart, summarizeCart } from "./cart";

const products = [
  { id: "gold", price: 2699 },
  { id: "gift", price: 3299 }
];

describe("cart logic", () => {
  it("adds a new product and merges the same product/spec by increasing quantity", () => {
    const first = addToCart([], { productId: "gold", spec: "200x230cm" });
    const second = addToCart(first, { productId: "gold", spec: "200x230cm" });

    expect(second).toEqual([{ productId: "gold", spec: "200x230cm", quantity: 2 }]);
  });

  it("keeps different specs as separate rows", () => {
    const cart = addToCart(
      [{ productId: "gold", spec: "200x230cm", quantity: 1 }],
      { productId: "gold", spec: "220x240cm" }
    );

    expect(cart).toHaveLength(2);
    expect(cart[1]).toEqual({ productId: "gold", spec: "220x240cm", quantity: 1 });
  });

  it("changes quantity and removes rows that reach zero", () => {
    const cart = [{ productId: "gold", spec: "200x230cm", quantity: 2 }];

    expect(changeQuantity(cart, "gold", "200x230cm", -1)[0].quantity).toBe(1);
    expect(changeQuantity(cart, "gold", "200x230cm", -2)).toEqual([]);
  });

  it("removes a matching product/spec row", () => {
    const cart = [
      { productId: "gold", spec: "200x230cm", quantity: 1 },
      { productId: "gift", spec: "礼盒装", quantity: 1 }
    ];

    expect(removeFromCart(cart, "gold", "200x230cm")).toEqual([
      { productId: "gift", spec: "礼盒装", quantity: 1 }
    ]);
  });

  it("summarizes item count, subtotal, discount, and total", () => {
    const cart = [
      { productId: "gold", spec: "200x230cm", quantity: 2 },
      { productId: "gift", spec: "礼盒装", quantity: 1 }
    ];

    expect(summarizeCart(cart, products, 120)).toEqual({
      itemCount: 3,
      subtotal: 8697,
      discount: 120,
      total: 8577
    });
  });
});
