# 更新日志

> 记录 `jingyizi.github.io` 网站每次重要变动，便于日后维护回溯。

---

## 2026-06-03

### 修复自动部署（第 N 次尝试，终于搞对）

- **问题**：`deploy.yml` 用的 `actions/deploy-pages` 要求 Pages 源设为 "GitHub Actions"，但之前一直设为 "Deploy from a branch"，导致 Hexo 自动构建从未真正生效。
- **解决**：将 `deploy.yml` 改为 `peaceiris/actions-gh-pages@v4`，把 Hexo 生成的静态文件推送到 `gh-pages` 分支。Pages 源只需选 "Deploy from a branch" → `gh-pages` → `/ (root)` 即可。
- **权限**：workflow 需要 `contents: write`（对应仓库 Settings → Actions → General → "Read and write permissions"）。

### 发布第一篇科研日常博客（手写 HTML 过渡版）

- 因 Hexo 自动部署尚未跑通，直接手写了 `2026/06/02/hello-world/index.html` 作为过渡。
- 更新 `archives/index.html`，从占位文字改为真实文章列表（2026 + 2023 共 3 篇）。
- 更新 `index.html` 侧边栏日志计数：0 → 3。

### 添加 .nojekyll（解决 CDN 缓存问题）

- 问题：GitHub Pages 默认用 Jekyll 处理站点，非 Jekyll 站点（如 Hexo 生成的）若不加 `.nojekyll`，Jekyll 静默失败，GitHub 返回旧的缓存版本，导致页面迟迟不刷新。
- 解决：在根目录创建空文件 `.nojekyll`，告知 GitHub 跳过 Jekyll 处理。

---

## 2026-06-02

### 恢复静态文件

- 因 GitHub Actions 反复失败，将 `css/`、`js/`、`images/`、`archives/`、`index.html` 等静态文件从旧提交（`552c48c`）恢复到 master 根目录，确保网站至少能用 "Deploy from a branch" 方式正常展示。

### GitHub Actions 排错（三轮）

1. **缺少 `package-lock.json`**：`setup-node` 的 `cache: npm` 需要 lockfile → 移除 cache 配置，node 版本从 18 升到 20。
2. **NexT 主题版本不匹配**：`package.json` 声明 `hexo-theme-next@^8.15.0`，但实际安装 8.27。新版 `creative_commons.license` 必须是字符串，`false`（布尔值）导致 `license.replace is not a function` → 改为空字符串 `''`。
3. **权限 403（两次）**：`peaceiris/actions-gh-pages` 推送到 `gh-pages` 分支被拒 → 换成官方 `actions/deploy-pages@v4`，赋予 `pages: write` 和 `id-token: write` 权限。

### 禁用 Hexo 首页生成器

- `_config.yml` 中 `index_generator.enable: false`，防止 Hexo 生成默认首页覆盖手写的 `index.html`。

### 设置 GitHub Actions 自动部署

- 创建 `.github/workflows/deploy.yml`：每次 push 到 master → 安装依赖 → `hexo generate` → 部署。
- 目标工作流：**本地只需写 .md → git push → 网站自动更新**，不需要本地安装 Node.js。

### 自定义首页与个人信息

- 将 `index.html` 改为个人简介卡片式首页，包含：
  - 头像（`custom-logo.png`）
  - 身份：北京师范大学 地图学与地理信息系统 博士生
  - 研究方向：复合水旱灾害遥感监测、地理智能
  - 链接：机构主页、ResearchGate、GitHub、Email
- 旧 Hexo 首页生成器关闭，首页不再显示博客文章列表。

### 清理旧内容

- 两篇旧文章（`hello-world.md`、`GISStory.md`）设置 `hide: true` frontmatter，不在首页显示。
- `archives/index.html` 重写为占位页（"即将开始记录科研日常……"）。
- 旧的 GIS 可视化页面（`GISStory/`）和 2023 年归档保留，可直链访问。

### 文档整理

- 新增 `README.md`：英文项目简介。
- 新增 `GUIDE.md`：中文维护指南，记录目录结构、发布流程、常见问题。
- `_config.yml` 中 `skip_render` 添加 `index.html`、`GUIDE.md`、`GISStory/**`、`2023/**`，确保这些文件不经 Hexo 模板引擎处理，原样输出。

---

## 2023-04 ~ 2023-05

### 旧版网站

- 基于 Hexo 5.4.2 + NexT.Gemini 主题构建。
- 包含 GIS 可视化项目（香港地图故事系列：GDP、犯罪、交通等）。
- 部署方式：本地 `hexo generate` → 推送到 master 分支 → GitHub Pages 直接托管。

---

## 关键配置速查

| 配置项 | 文件 | 当前值 | 说明 |
|--------|------|--------|------|
| Pages 源 | GitHub Settings | `gh-pages` / `/(root)` | 由 Actions 自动推送 |
| 首页生成 | `_config.yml` | `index_generator.enable: false` | 禁用以保护手写首页 |
| 跳过渲染 | `_config.yml` | `skip_render: [index.html, GUIDE.md, GISStory/**, 2023/**]` | Hexo 原样复制 |
| 主题 | `_config.next.yml` | `scheme: Gemini` | NexT v8.27 |
| 协议 | `_config.next.yml` | `creative_commons.license: ''` | 必须是空字符串，不能是 `false` |
| 自动部署 | `.github/workflows/deploy.yml` | `peaceiris/actions-gh-pages@v4` | push master → 生成 → 推送到 gh-pages |
| Jekyll 跳过 | `.nojekyll` | 空文件 | 防止 GitHub Pages 运行 Jekyll |
