export const quickNeeds = [
  { id: "gift", label: "送礼", category: "gift" },
  { id: "daily", label: "自用", category: "mulberry" },
  { id: "elder", label: "长辈", category: "parent-child" },
  { id: "newlywed", label: "婚庆", category: "golden" }
];

export const sortOptions = [
  { id: "recommended", label: "推荐" },
  { id: "price-asc", label: "价格" },
  { id: "discount", label: "优惠" }
];

export const commerceTips = [
  "首页先给搜索和场景入口",
  "商品卡减少长段解释",
  "详情页让规格选择更明显",
  "用收藏、评价、加购反馈增强互动"
];

export function filterInteractiveProducts(products, filters = {}) {
  const category = filters.category ?? "all";
  const query = (filters.query ?? "").trim().toLowerCase();
  const sort = filters.sort ?? "recommended";

  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const searchableText = [
      product.name,
      product.categoryName,
      product.scene,
      product.value,
      ...(product.tags ?? [])
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || searchableText.includes(query);

    return matchesCategory && matchesQuery;
  });

  return [...filtered].sort((first, second) => {
    if (sort === "price-asc") return first.price - second.price;
    if (sort === "discount") {
      const firstDiscount = (first.originalPrice ?? first.price) - first.price;
      const secondDiscount = (second.originalPrice ?? second.price) - second.price;
      return secondDiscount - firstDiscount;
    }
    return 0;
  });
}

export function getProductDiscount(product) {
  return Math.max(0, (product.originalPrice ?? product.price) - product.price);
}
