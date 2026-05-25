export const imagePrompts = [
  {
    file: "public/assets/hero-silk-bedroom.png",
    useCase: "product-mockup",
    size: "1024x1536",
    quality: "high",
    prompt:
      "Photorealistic Chinese premium silk quilt in a bright natural-light bedroom, subtle Yunnan mountain and craft atmosphere, soft white silk texture, refined but not luxurious, no logo, no text, no watermark, mobile hero composition."
  },
  {
    file: "public/assets/product-golden-silk.png",
    useCase: "product-mockup",
    size: "1024x1024",
    quality: "high",
    prompt:
      "Catalog-quality golden silk quilt product photo, folded quilt with visible soft silk filling detail, clean ivory background, natural texture, premium home textile, no text, no watermark."
  },
  {
    file: "public/assets/product-mulberry-classic.png",
    useCase: "product-mockup",
    size: "1024x1024",
    quality: "high",
    prompt:
      "Catalog-quality classic mulberry silk quilt product photo, neatly folded white quilt with subtle cotton cover texture, clean warm white background, soft natural shadow, premium but practical home textile, no text, no logo, no watermark."
  },
  {
    file: "public/assets/product-parent-child.png",
    useCase: "product-mockup",
    size: "1024x1024",
    quality: "high",
    prompt:
      "Product photo of a detachable parent-child four-season silk quilt set, two layered quilts partially separated to show thickness difference, clean bright home textile catalog style, ivory and pale green palette, no text, no logo, no watermark."
  },
  {
    file: "public/assets/gift-set-scene.png",
    useCase: "ads-marketing",
    size: "1024x1024",
    quality: "high",
    prompt:
      "Elegant Chinese silk quilt gift box on a warm home table, subtle wedding and family gift atmosphere, refined packaging, red accent ribbon, no brand text, no watermark, realistic product photography."
  },
  {
    file: "public/assets/craft-hands-silk.png",
    useCase: "photorealistic-natural",
    size: "1024x1024",
    quality: "high",
    prompt:
      "Close-up of artisan hands stretching white silk floss by hand in a real workshop, authentic craft texture, natural light, calm documentary style, no text, no watermark."
  },
  {
    file: "public/assets/store-experience.png",
    useCase: "photorealistic-natural",
    size: "1536x1024",
    quality: "high",
    prompt:
      "Photorealistic boutique silk quilt experience store, warm Chinese contemporary interior, a small craft demonstration table with white silk floss, neatly displayed quilts and gift boxes, calm premium retail atmosphere, no text, no logo, no watermark."
  }
];

export const products = [
  {
    id: "golden-silk",
    name: "黄金丝非遗手作被",
    category: "golden",
    categoryName: "黄金丝蚕丝被",
    price: 2699,
    originalPrice: 3299,
    imageKey: "product-golden-silk",
    imageFile: "/assets/product-golden-silk.png",
    value: "精选昭通优质长丝，轻暖贴身，适合新婚与品质自用。",
    scene: "婚庆礼赠 / 品质自用",
    specs: ["200x230cm 春秋款", "220x240cm 冬厚款", "定制礼盒装"],
    tags: ["非遗手作", "一被一码", "黄金丝", "门店可体验"],
    proofItems: ["18道手工工序记录", "批次溯源码", "填充物检测说明", "3年蓬松养护咨询"],
    comments: [
      "摸起来很轻，但保暖感很稳，送长辈也体面。",
      "线下看过拉丝过程以后再买，心里踏实很多。"
    ]
  },
  {
    id: "mulberry-classic",
    name: "经典桑蚕丝四季被",
    category: "mulberry",
    categoryName: "桑蚕丝被",
    price: 1899,
    originalPrice: 2299,
    imageKey: "product-mulberry-classic",
    imageFile: "/assets/product-mulberry-classic.png",
    value: "天然透气，四季可用，适合家庭日常睡眠升级。",
    scene: "品质自用 / 家庭健康",
    specs: ["150x210cm 单人款", "200x230cm 双人款", "220x240cm 加大款"],
    tags: ["天然健康", "可溯源", "日常优选"],
    proofItems: ["桑蚕长丝说明", "门店实物体验", "老客评价", "售后养护指南"],
    comments: [
      "没有压身感，春秋盖刚好。",
      "页面里能看到溯源和养护说明，购买决策更快。"
    ]
  },
  {
    id: "parent-child",
    name: "子母调温蚕丝被",
    category: "parent-child",
    categoryName: "子母被",
    price: 2399,
    originalPrice: 2899,
    imageKey: "product-parent-child",
    imageFile: "/assets/product-parent-child.png",
    value: "两被组合，厚薄可拆，照顾老人、小孩和换季温差。",
    scene: "孝亲健康 / 四季调温",
    specs: ["200x230cm 子母款", "220x240cm 加大子母款"],
    tags: ["孝亲推荐", "四季可拆", "门店可体验"],
    proofItems: ["分层结构说明", "手工铺丝展示", "过敏友好材料说明", "售后保养提醒"],
    comments: [
      "给父母买的，厚薄可以自己调。",
      "比单纯讲非遗更有用，能看出适合什么季节。"
    ]
  },
  {
    id: "gift-heritage",
    name: "一丝传家礼盒套装",
    category: "gift",
    categoryName: "礼盒套装",
    price: 3299,
    originalPrice: 3999,
    imageKey: "gift-set-scene",
    imageFile: "/assets/gift-set-scene.png",
    value: "婚嫁、乔迁、孝亲场景礼盒，附非遗工艺卡与溯源码。",
    scene: "婚庆礼赠 / 孝亲送礼",
    specs: ["婚庆礼盒", "孝亲礼盒", "企业团购礼盒"],
    tags: ["礼赠推荐", "非遗故事卡", "可定制"],
    proofItems: ["礼盒仪式说明", "非遗工艺卡", "一被一码", "推荐有礼权益"],
    comments: [
      "礼盒比普通家纺更有记忆点。",
      "送礼时能讲清楚产地和工艺，显得更用心。"
    ]
  }
];

export const sceneFilters = [
  { id: "gift", title: "婚庆礼赠", description: "礼盒、非遗故事卡、定制祝福", category: "gift" },
  { id: "health", title: "孝亲健康", description: "轻暖透气，适合长辈换季睡眠", category: "parent-child" },
  { id: "self", title: "品质自用", description: "日常睡眠升级，天然舒适", category: "mulberry" }
];

export const categories = [
  { id: "all", label: "全部" },
  { id: "golden", label: "黄金丝" },
  { id: "mulberry", label: "桑蚕丝" },
  { id: "parent-child", label: "子母被" },
  { id: "gift", label: "礼盒" }
];

export const craftTimeline = [
  ["选茧", "筛选饱满蚕茧，为整床被子的蓬松度打底。"],
  ["煮茧", "用温和水煮软化茧层，保留丝质韧性。"],
  ["剥茧", "手工剥开茧衣，减少机械拉扯造成的断丝。"],
  ["开棉", "把小片蚕丝轻轻展开，形成均匀丝网。"],
  ["拉丝", "多人配合拉伸丝网，让纤维层层交错。"],
  ["铺丝", "按规格铺叠，保证四角和中部厚薄一致。"],
  ["定型", "整理边角，形成稳定被芯轮廓。"],
  ["翻被", "反复检查丝层走向，减少局部结块。"],
  ["绗缝", "固定被芯与面料，兼顾贴合与蓬松。"],
  ["封边", "细密收边，减少跑丝和变形。"],
  ["晾整", "自然舒展，让蚕丝恢复蓬松状态。"],
  ["检重", "核对填充重量与规格标签一致。"],
  ["验丝", "查看纤维长度、色泽和均匀度。"],
  ["质检", "检查面料、针脚、边角和手感。"],
  ["编码", "生成一被一码，记录批次与工艺信息。"],
  ["装盒", "放入养护卡、工艺卡和售后说明。"],
  ["复核", "出库前再次核对规格、码号与包装。"],
  ["交付", "把产品与养护提醒一起交到用户手中。"]
].map(([title, text], index) => ({ id: index + 1, title, text }));

export const traceRecords = [
  {
    code: "ZHM-2026-0518",
    origin: "云南昭通乌蒙山蚕桑基地",
    material: "优质桑蚕长丝，手工剥茧铺丝",
    artisan: "张氏手作工坊第 5 代工艺组",
    batch: "2026 春夏礼赠批次 A18",
    inspection: "填充重量、面料针脚、蓬松度已完成出库复核",
    careTips: ["避免长时间暴晒", "定期通风轻拍", "建议使用被套保护", "收纳前保持干燥"],
    timeline: craftTimeline
  }
];

export const memberProfile = {
  name: "张蝴绵会员",
  level: "传家银卡",
  points: 2680,
  nextBenefit: "再积 320 分可解锁免费到店养护检测",
  benefits: ["生日礼券", "老客推荐礼", "养护提醒", "门店优先预约"]
};

export const stores = [
  {
    name: "张蝴绵昭通非遗体验店",
    address: "云南省昭通市非遗生活体验街 18 号",
    phone: "0870-000-2026",
    hours: "10:00-20:00"
  }
];
