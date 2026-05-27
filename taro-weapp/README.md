# 张蝴绵 Taro 微信小程序副本

这是从现有 Vite + React Web Demo 拆出的方案 B 副本，目录独立于原 Web 版。

## 已迁移页面

- 首页：品牌首屏、搜索、场景入口、热卖商品
- 选购：分类筛选、排序、商品加购
- 溯源：溯源码输入、示例码、微信扫码 `Taro.scanCode`
- 购物车：数量调整、会员券、模拟结算
- 我的：会员卡、服务入口、一被一码、门店信息

## 本地构建

```bash
cd taro-weapp
npm install
npm run build:weapp
```

构建产物会生成到：

```text
taro-weapp/dist
```

## 微信开发者工具导入

1. 打开微信开发者工具。
2. 点击“导入项目”。
3. 项目目录选择：

```text
E:\cmau\Demo\taro-weapp
```

4. AppID 使用 `project.config.json` 中的 AppID，或者替换为你的正式小程序 AppID。
5. 导入后点击“编译”。
6. 点击“预览”即可生成手机体验二维码。

## 重要注意

- `taro-weapp/project.config.json` 设置了 `miniprogramRoot: "dist/"`，所以开发者工具会读取构建后的 `dist`。
- 商品图片目前使用 GitHub Pages 线上图片地址。正式发布时建议换成已备案并配置过的 HTTPS 域名，否则可能受小程序合法域名限制影响。
- 溯源页的“扫码”已经使用 `Taro.scanCode`。在开发者工具里也可以用“使用示例码”快速演示。
- 如果修改源码，需要重新运行 `npm run build:weapp`，再回到开发者工具编译。
