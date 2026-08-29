# 要有 AI，不要重复劳动

一份持续更新的个人工作手册，记录 AI 时代的工作流、工具与思考。

## 本地开发

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
npm run preview
```

## 内容维护

内容放在 `src/content/` 下的三个目录：

- `workflows/`：可执行的工作流与 Prompt
- `components/`：值得收藏的界面组件
- `articles/`：文章阅读记录与个人批注

每篇 Markdown 的 frontmatter 会在构建时校验。`draft: true` 的条目不会进入生产站点，可以用来保存正在整理的内容。

公共字段：

```yaml
title: 标题
slug: url-slug
description: 一句话说明
tags: [AI, 研究]
status: active
draft: false
createdAt: 2026-08-20
updatedAt: 2026-08-28
```

状态值按内容类型使用：

- 工作流：`active`、`experimental`、`archived`
- 组件：`saved`、`testing`、`used`
- 文章：`unread`、`read`、`revisit`

## GitHub Pages

仓库可以保持私有，网站通过 GitHub Pages 公开发布。首次配置时：

1. 将本目录推送到 GitHub 仓库。
2. 在仓库 Settings → Pages 中选择 GitHub Actions。
3. workflow 会从仓库名自动设置子路径，并构建 `dist/`。
4. 如果绑定自定义域名，可在 Actions 的环境变量中设置 `SITE_URL`，并将 `BASE_PATH` 改为 `/`。

本地默认使用根路径；GitHub Actions 会使用仓库名作为 `BASE_PATH`，保证项目页资源路径正确。
