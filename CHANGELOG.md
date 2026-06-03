# 更新日志

> 记录 `jingyizi.github.io` 网站每次重要变动，便于日后维护回溯。

---

## 2026-06-03 (下午)

### 🎨 主题切换：NexT.Gemini → Fluid

- **动机**：NexT 外观过时，希望换一个更现代、有学者气质（顶部导航栏 + 严肃但不死板）的主题。
- **新主题**：[Fluid](https://github.com/fluid-dev/hexo-theme-fluid) v1.x —— Material Design 风格，中文社区活跃，性能优异。
- **配置**：创建 `_config.fluid.yml`，包含毛玻璃导航栏、打字机标语、本地搜索、CC 版权声明等。
- **背景图**：保留 `background.jpg`，通过 `source/css/background.css` 引入（仅 5 行 CSS），替代原来的 2517 行 `css/main.css`。
- **首页**：不再手写 HTML，由 Fluid 自动生成（banner 大图 + 个人信息 + 文章列表）。
- **导航**：顶部导航栏（Home / Archives / Tags / About），毛玻璃效果。
- **新页面**：创建 About、Archives、Tags、Categories 四个功能页。

### 🗂️ 归档旧文件

- 创建 `_archive/` 目录，将所有 NexT 相关自定义文件归档：
  - `_archive/nexT-theme/`：手写首页、CSS、归档页、NexT 配置、favicon
  - `_archive/docs/`：旧版 CHANGELOG、GUIDE、README
- 清理根目录旧构建产物（`css/`、`js/`、`archives/`、`2023/`、`2026/`、`images/`、`GISStory/`）。

### 简化部署

- `deploy.yml` 移除 `cp source/index.html` 和 `cp css/main.css` 覆盖步骤（不再需要）。
- 移除 `_config.next.yml`，废弃 `index_generator.enable: false`（Fluid 需要它）。
- `package.json`：`hexo-theme-next` → `hexo-theme-fluid`，新增 `hexo-generator-search`。

### 关键配置变更速查

| 变更 | 旧值 | 新值 |
|------|------|------|
| 主题 | `hexo-theme-next ^8.15.0` | `hexo-theme-fluid ^1.0.0` |
| 主题配置 | `_config.next.yml` | `_config.fluid.yml` |
| 首页 | 手写 `source/index.html` (329行) | Fluid 自动生成 |
| 样式 | `css/main.css` (2517行) | `source/css/background.css` (5行) |
| 背景图 | 保留 | 保留（路径 `/images/background.jpg`） |
| 部署覆盖 | `cp source/index.html` + `cp css/main.css` | 无需覆盖 |

---

## 2026-06-03 (上午)

### 修复自动部署 + 背景图

- 将 `deploy.yml` 改为 `peaceiris/actions-gh-pages@v4`，推送到 `gh-pages` 分支，避免 Pages 源设置冲突。
- 背景图 CSS 从绝对 URL 改为相对路径 `/image/background.jpg`。
- 添加 workflow 步骤 `cp css/main.css public/css/main.css` 确保样式覆盖生效。
- 添加 `.nojekyll` 防止 GitHub Pages 运行 Jekyll。

### 发布第一篇科研日常博客

- 手写 `2026/06/02/hello-world/index.html`。
- 更新 `archives/index.html` 为真实文章列表。
- 更新 `index.html` 侧边栏日志计数 0 → 3。

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
| 主题 | `_config.fluid.yml` | Fluid v1.x (Material Design) | 从 NexT.Gemini 迁移 |
| 首页生成 | `_config.yml` | `index_generator` 已启用 | Fluid 自动生成首页 |
| 跳过渲染 | `_config.yml` | `skip_render: [GUIDE.md, GISStory/**, 2023/**]` | 旧页面保持原样 |
| 背景图 | `source/css/background.css` | `url("/images/background.jpg")` | 保留原图 |
| 自动部署 | `.github/workflows/deploy.yml` | `peaceiris/actions-gh-pages@v4` | 无覆盖步骤 |
| Jekyll 跳过 | `.nojekyll` | 空文件 | 防止 GitHub Pages 运行 Jekyll |
