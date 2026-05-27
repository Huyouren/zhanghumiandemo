import { products } from "./catalog";

let cartRows = [];

export function getCart() {
  return cartRows.map((row) => ({ ...row }));
}

export function addToCart(productId, spec) {
  const existing = cartRows.find((row) => row.productId === productId && row.spec === spec);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartRows = [...cartRows, { productId, spec, quantity: 1 }];
  }
  return getCart();
}

export function changeQuantity(productId, spec, delta) {
  cartRows = cartRows
    .map((row) => {
      if (row.productId !== productId || row.spec !== spec) return row;
      return { ...row, quantity: row.quantity + delta };
    })
    .filter((row) => row.quantity > 0);
  return getCart();
}

export function removeFromCart(productId, spec) {
  cartRows = cartRows.filter((row) => row.productId !== productId || row.spec !== spec);
  return getCart();
}

export function cartWithProducts(rows = cartRows) {
  return rows.map((row) => ({
    ...row,
    product: products.find((product) => product.id === row.productId)
  }));
}

export function summarizeCart(rows = cartRows, discount = 0) {
  const subtotal = rows.reduce((sum, row) => {
    const product = products.find((item) => item.id === row.productId);
    return sum + (product?.price ?? 0) * row.quantity;
  }, 0);
  const itemCount = rows.reduce((sum, row) => sum + row.quantity, 0);
  const safeDiscount = Math.min(discount, subtotal);

  return {
    itemCount,
    subtotal,
    discount: safeDiscount,
    total: subtotal - safeDiscount
  };
}
