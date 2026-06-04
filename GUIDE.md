# 网站维护指南

## 写一篇新博客

### 1. 在 `source/_posts/` 下创建 `.md` 文件

文件名格式：`2026-06-02-my-title.md`（日期-英文标题）

### 2. 写 frontmatter（文章头信息）

```markdown
---
title: 文章标题（中文即可）
date: 2026-06-02 15:30:00
tags:
  - GIS
  - 遥感
categories:
  - 科研日常
banner_img: /images/your-cover.jpg   # 可选：自定义封面图，不填则用全局默认图
---

## 正文标题

在这里写正文……
```

> **自定义封面图**：将图片放到 `source/images/` 下，在 frontmatter 中加入 `banner_img: /images/xxx.jpg`。站点会自动分析封面图的明暗，深色图用白字、浅色图用深色字，确保标题始终清晰可读。不填则使用全局默认封面。

### 3. 推送

```bash
git add source/_posts/2026-06-02-my-title.md
git commit -m "新文章：xxx"
git push origin master
```

### 4. 等 30 秒，网站自动更新 ✅

---

## 修改个人信息

### 首页 banner / 导航栏 / 颜色 / 页脚

编辑 **`_config.fluid.yml`**，参考 [Fluid 官方文档](https://hexo.fluid-dev.com/docs/guide/)。

| 要改什么 | 配置项 |
|---------|--------|
| 网站标题 | `navbar.blog_title` |
| 标语 | `index.slogan.text` |
| 头像 | `about.avatar` |
| 个人简介 | `about.name` + `about.intro` |
| 社交链接 | `about.icons` |
| 主题色 | `color.primary_color` |
| 导航栏菜单 | `navbar.menu` |
| 背景图 | `source/images/background.jpg`（直接替换即可） |

### 关于页面内容

编辑 **`source/about/index.md`**，支持 Markdown 和 HTML。

### 自定义样式

全站样式：`source/css/custom.css`

首页/导航栏动态效果：`source/js/intro-card.js`

封面图对比度检测：`source/js/banner-contrast.js`

---

## 配置文件速查

| 文件 | 作用 |
|------|------|
| `_config.yml` | Hexo 主配置（网站标题、URL、跳转渲染等） |
| `_config.fluid.yml` | **★ Fluid 主题配置**（导航栏、首页、颜色、关于页、搜索、评论等） |
| `.github/workflows/deploy.yml` | 自动部署（一般不需要改） |
| `source/css/custom.css` | 全站自定义样式（banner、卡片、TOC、标签、成果页等） |
| `source/js/intro-card.js` | 首页个人介绍卡片 + 导航栏滚动效果 |
| `source/js/banner-contrast.js` | 封面图明暗自动检测，文字对比色切换 |

---

## 目录结构

```
├── source/
│   ├── _posts/              ← ★ 所有博客文章 .md 放这里
│   ├── about/index.md        ← 关于页内容
│   ├── archives/index.md     ← 归档页（自动生成）
│   ├── tags/index.md         ← 标签页（自动生成）
│   ├── categories/index.md   ← 分类页（自动生成）
│   ├── css/custom.css         ← 自定义样式
│   ├── js/
│   │   ├── intro-card.js       ← 首页个人卡片 + 导航栏效果
│   │   └── banner-contrast.js  ← 封面图对比度自动检测
│   ├── images/               ← 图片资源（头像、背景图、封面图等）
│   └── publications/          ← 成果页
├── _config.yml               ← Hexo 配置
├── _config.fluid.yml         ← ★ Fluid 主题配置
├── _archive/                 ← 旧 NexT 文件归档
├── .github/workflows/        ← 自动部署
└── CHANGELOG.md              ← 更新日志
```

---

## 常见问题

**Q: 推送后网站没变化？**
A: 去 `https://github.com/Jingyizi/Jingyizi.github.io/actions` 看看 workflow 是否运行成功（绿色✓）。

**Q: 想隐藏某篇文章？**
A: 在文章的 frontmatter 里加上 `hide: true`。

**Q: 想置顶某篇文章？**
A: 在文章的 frontmatter 里加上 `sticky: 100`（数值越大越靠前）。

**Q: 如何给文章设置自定义封面图？**
A: 把图片放到 `source/images/` 下，在文章 frontmatter 中加入 `banner_img: /images/xxx.jpg`。站点会自动分析封面明暗，切换标题文字颜色。

**Q: 如何开启评论？**
A: 编辑 `_config.fluid.yml`，搜索 `comments`，选择一种评论系统（如 Giscus/Waline），填写对应配置即可。
