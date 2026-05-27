const IMAGE_BASE = "https://huyouren.github.io/zhanghumiandemo/assets";

export function imageUrl(file) {
  return `${IMAGE_BASE}/${file}`;
}

export const products = [
  {
    id: "golden-silk",
    name: "黄金丝非遗手作被",
    category: "golden",
    categoryName: "黄金丝蚕丝被",
    price: 2699,
    originalPrice: 3299,
    image: imageUrl("product-golden-silk.png"),
    value: "精选昭通优质长丝，轻暖贴身，适合新婚与品质自用。",
    scene: "婚庆礼赠 / 品质自用",
    specs: ["200x230cm 春秋款", "220x240cm 冬厚款", "定制礼盒装"],
    tags: ["非遗手作", "一被一码", "黄金丝", "门店可体验"]
  },
  {
    id: "mulberry-classic",
    name: "经典桑蚕丝四季被",
    category: "mulberry",
    categoryName: "桑蚕丝被",
    price: 1899,
    originalPrice: 2299,
    image: imageUrl("product-mulberry-classic.png"),
    value: "天然透气，四季可用，适合家庭日常睡眠升级。",
    scene: "品质自用 / 家庭健康",
    specs: ["150x210cm 单人款", "200x230cm 双人款", "220x240cm 加大款"],
    tags: ["天然健康", "可溯源", "日常优选"]
  },
  {
    id: "parent-child",
    name: "子母调温蚕丝被",
    category: "parent-child",
    categoryName: "子母被",
    price: 2399,
    originalPrice: 2899,
    image: imageUrl("product-parent-child.png"),
    value: "两被组合，厚薄可拆，照顾老人、小孩和换季温差。",
    scene: "孝亲健康 / 四季调温",
    specs: ["200x230cm 子母款", "220x240cm 加大子母款"],
    tags: ["孝亲推荐", "四季可拆", "门店可体验"]
  },
  {
    id: "gift-heritage",
    name: "一丝传家礼盒套装",
    category: "gift",
    categoryName: "礼盒套装",
    price: 3299,
    originalPrice: 3999,
    image: imageUrl("gift-set-scene.png"),
    value: "婚嫁、乔迁、孝亲场景礼盒，附非遗工艺卡与溯源码。",
    scene: "婚庆礼赠 / 孝亲送礼",
    specs: ["婚庆礼盒", "孝亲礼盒", "企业团购礼盒"],
    tags: ["礼赠推荐", "非遗故事卡", "可定制"]
  }
];

export const categories = [
  { id: "all", label: "全部" },
  { id: "golden", label: "黄金丝" },
  { id: "mulberry", label: "桑蚕丝" },
  { id: "parent-child", label: "子母被" },
  { id: "gift", label: "礼盒" }
];

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

export const traceRecord = {
  code: "ZHM-2026-0518",
  origin: "云南昭通乌蒙山蚕桑基地",
  material: "优质桑蚕长丝，手工剥茧铺丝",
  artisan: "张氏手作工坊第 5 代工艺组",
  batch: "2026 春夏礼赠批次 A18",
  inspection: "填充重量、面料针脚、蓬松度已完成出库复核",
  image: imageUrl("trace-code-card.png"),
  careTips: ["避免长时间暴晒", "定期通风轻拍", "建议使用被套保护", "收纳前保持干燥"],
  steps: [
    ["选茧", "筛选饱满蚕茧，为整床被子的蓬松度打底。"],
    ["煮茧", "用温和水煮软化茧层，保留丝质韧性。"],
    ["剥茧", "手工剥开茧衣，减少机械拉扯造成的断丝。"],
    ["开棉", "把小片蚕丝轻轻展开，形成均匀丝网。"]
  ]
};

export const memberProfile = {
  name: "张蝴绵会员",
  points: 2680,
  level: "传家银卡"
};

export const store = {
  name: "张蝴绵昭通非遗体验店",
  phone: "0870-000-2026",
  hours: "10:00-20:00",
  image: imageUrl("store-experience.png")
};

export function filterProducts(filters = {}) {
  const category = filters.category ?? "all";
  const query = (filters.query ?? "").trim().toLowerCase();
  const sort = filters.sort ?? "recommended";

  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const text = [product.name, product.categoryName, product.scene, product.value, ...product.tags]
      .join(" ")
      .toLowerCase();
    return matchesCategory && (!query || text.includes(query));
  });

  return [...filtered].sort((first, second) => {
    if (sort === "price-asc") return first.price - second.price;
    if (sort === "discount") return getDiscount(second) - getDiscount(first);
    return 0;
  });
}

export function getDiscount(product) {
  return Math.max(0, (product.originalPrice ?? product.price) - product.price);
}
