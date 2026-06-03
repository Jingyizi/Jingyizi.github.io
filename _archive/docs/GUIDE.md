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
---

## 正文标题

在这里写正文……
```

### 3. 推送

```bash
git add source/_posts/2026-06-02-my-title.md
git commit -m "新文章：xxx"
git push origin master
```

### 4. 等 30 秒，网站自动更新 ✅

---

## 修改首页

首页文件：**`source/index.html`**

| 要改什么 | 改哪里 |
|---------|--------|
| 自我介绍 | 搜索 `北京师范大学` |
| 研究方向 | 搜索 `tag-pill` |
| 链接 | 搜索 `fa fa-link` |
| 头像 | 替换 `source/images/custom-logo.png` |

改完推送：

```bash
git add source/index.html
git commit -m "更新首页"
git push origin master
```

---

## 配置文件

| 文件 | 作用 |
|------|------|
| `_config.yml` | Hexo 主配置（网站标题、URL 等） |
| `_config.next.yml` | 主题配置（侧栏、菜单、动画等） |
| `.github/workflows/deploy.yml` | 自动部署（一般不需要改） |

---

## 目录结构

```
├── source/
│   ├── index.html          ← 首页（直接改）
│   ├── _posts/             ← ★ 所有博客文章 .md 放这里
│   ├── images/             ← 图片资源
│   ├── GISStory/           ← 旧项目
│   └── 2023/               ← 旧文章
├── _config.yml             ← Hexo 配置
├── _config.next.yml        ← 主题配置
├── .github/workflows/      ← 自动部署
└── README.md
```

---

## 常见问题

**Q: 推送后网站没变化？**
A: 去 `https://github.com/Jingyizi/Jingyizi.github.io/actions` 看看 workflow 是否运行成功（绿色✓）。

**Q: 旧链接还能用吗？**
A: 能。`/GISStory/hongkong.html`、`/2023/04/02/GISStory/` 等旧 URL 都保留。

**Q: 首页上的文章列表在哪？**
A: Hexo 会自动把 `source/_posts/` 下没有 `hide: true` 的文章列在首页。你的手写首页 (`source/index.html`) 会覆盖这个列表。如果你想让文章列表出现，删除 `source/index.html` 即可。

**Q: 想隐藏某篇文章？**
A: 在文章的 frontmatter 里加上 `hide: true`。
