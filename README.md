# 张蝴绵电商小程序 Demo

这是一个面向张蝴绵消费者群体的电商小程序 Web Demo，使用 Vite + React 构建。

## 本地预览

```bash
npm install
npm run dev -- --port 5173
```

打开：

```text
http://127.0.0.1:5173/
http://127.0.0.1:5173/?version=interactive
```

## 两个版本

- `/`：当前保留版，包含首页、分类、溯源、购物车、我的。
- `/?version=interactive`：互动副本，增加搜索、筛选、排序、收藏、规格选择、优惠券和浮动购物车。

## 部署到 GitHub Pages

项目已内置 `.github/workflows/deploy-pages.yml`。推送到 `main` 后，可通过 GitHub Pages 发布。

详细步骤见：

```text
docs/github-pages-deploy.md
```

## 生成二维码

拿到 GitHub Pages 线上地址后执行：

```bash
npm run qr -- https://<你的 GitHub 用户名>.github.io/<仓库名>/?version=interactive
```

二维码会生成到：

```text
public/qr-interactive.svg
```
