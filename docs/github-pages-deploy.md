# 张蝴绵电商小程序 GitHub Pages 部署说明

## 线上入口

部署后会得到类似下面的地址：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
https://<你的 GitHub 用户名>.github.io/<仓库名>/?version=interactive
```

默认地址打开原版，带 `?version=interactive` 打开互动副本。

注意：GitHub Pages 更适合静态展示和 Demo 发布。本项目目前是模拟电商流程，不包含真实支付、登录、订单后台或敏感交易。

## 部署步骤

1. 在 GitHub 新建一个仓库，例如 `zhanghumian-miniapp`。
2. 把本地项目推送到这个仓库的 `main` 分支。
3. 打开仓库 `Settings -> Pages`。
4. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
5. 推送到 `main` 后，`.github/workflows/deploy-pages.yml` 会自动执行测试、构建并发布到 Pages。

## 二维码

拿到线上互动版地址后执行：

```bash
npm run qr -- https://<你的 GitHub 用户名>.github.io/<仓库名>/?version=interactive
```

脚本会生成：

```text
public/qr-interactive.svg
```

把这个 SVG 放到海报、PPT、微信文章或线下门店物料中，扫码会直接打开互动副本。

## 本项目已准备好的部署文件

- `.github/workflows/deploy-pages.yml`：GitHub Pages 自动部署工作流。
- `vite.config.js`：自动适配 GitHub Pages 仓库子路径。
- `scripts/generate-qr.mjs`：二维码生成脚本。
- `.gitignore`：避免上传本地依赖、构建产物、截图输出和大文件素材包。
