export default defineAppConfig({
  pages: [
    "pages/home/index",
    "pages/shop/index",
    "pages/trace/index",
    "pages/cart/index",
    "pages/mine/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#12382b",
    navigationBarTitleText: "张蝴绵非遗商城",
    navigationBarTextStyle: "white",
    backgroundColor: "#fffdf7"
  },
  tabBar: {
    color: "#6b7a72",
    selectedColor: "#173b2e",
    backgroundColor: "#fffdf7",
    borderStyle: "white",
    list: [
      { pagePath: "pages/home/index", text: "首页" },
      { pagePath: "pages/shop/index", text: "选购" },
      { pagePath: "pages/trace/index", text: "溯源" },
      { pagePath: "pages/cart/index", text: "购物车" },
      { pagePath: "pages/mine/index", text: "我的" }
    ]
  }
});
