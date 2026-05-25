export function addToCart(cart, item) {
  const next = cart.map((row) => ({ ...row }));
  const existing = next.find((row) => row.productId === item.productId && row.spec === item.spec);

  if (existing) {
    existing.quantity += item.quantity ?? 1;
    return next;
  }

  return [...next, { productId: item.productId, spec: item.spec, quantity: item.quantity ?? 1 }];
}

export function changeQuantity(cart, productId, spec, delta) {
  return cart
    .map((row) => {
      if (row.productId !== productId || row.spec !== spec) return row;
      return { ...row, quantity: row.quantity + delta };
    })
    .filter((row) => row.quantity > 0);
}

export function removeFromCart(cart, productId, spec) {
  return cart.filter((row) => row.productId !== productId || row.spec !== spec);
}

export function summarizeCart(cart, products, discount = 0) {
  const subtotal = cart.reduce((sum, row) => {
    const product = products.find((item) => item.id === row.productId);
    return sum + (product?.price ?? 0) * row.quantity;
  }, 0);
  const itemCount = cart.reduce((sum, row) => sum + row.quantity, 0);
  const safeDiscount = Math.min(discount, subtotal);

  return {
    itemCount,
    subtotal,
    discount: safeDiscount,
    total: subtotal - safeDiscount
  };
}
