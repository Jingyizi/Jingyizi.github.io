# 网站维护指南

## 仓库概览

你的网站托管在 `https://github.com/Jingyizi/Jingyizi.github.io`，有两个分支：

| 分支 | 用途 | 你怎么用 |
|------|------|---------|
| **`master`** | 网站展示（GitHub Pages 直接读取） | 改主页、改配置后在这里提交 |
| **`source`** | Hexo 源文件（写文章的地方） | 写博客时切到这个分支 |

> **关键**：`https://jingyizi.github.io` 显示的是 **master** 分支的内容。推送 source 分支不会影响网站。

---

## 一、快速修改首页

首页文件路径：**`index.html`**（仓库根目录）

### 改个人信息

打开 `index.html`，搜索以下关键词定位到对应位置：

| 要改的内容 | 搜索关键词 | 怎么改 |
|-----------|-----------|--------|
| 头像 | 不用改文件 | 替换 `images/custom-logo.png` 即可 |
| 自我介绍 | `北京师范大学` | 直接改文字 |
| 研究方向 | `tag-pill` | 增删 `<span class="tag-pill">你的方向</span>` |
| 链接 | `fa fa-link` | 复制已有的 `<a href="...">` 行，改链接和文字 |

### 改完提交

```bash
git add index.html
git commit -m "更新首页内容"
git push origin master
```

---

## 二、写并发布一篇新博客

### 1. 切换到 source 分支

```bash
git checkout source
```

### 2. 创建文章

在 `source/_posts/` 目录下新建一个 `.md` 文件，文件名就是文章 URL（建议英文+连字符）：

```
source/_posts/my-research-note.md
```

文章开头必须写 frontmatter（用 `---` 包裹）：

```markdown
---
title: 我的第一篇科研日志
date: 2026-06-02 15:30:00
tags:
  - GIS
  - 遥感
categories:
  - 科研日常
---

## 这是二级标题

这里是正文……

### 这是三级标题

继续写……
```

### 3. 本地预览（需要 Node.js）

```bash
# 仅第一次需要安装依赖
npm install

# 启动预览服务器
hexo server
```

浏览器打开 `http://localhost:4000` 即可预览。

### 4. 生成静态文件并部署

```bash
# 生成静态文件到 public/ 目录
hexo generate

# 部署到 GitHub Pages（自动推送到 master 分支）
hexo deploy
```

> 如果 `hexo deploy` 因网络问题失败，也可以手动：
> ```bash
> git checkout master
> git add -A
> git commit -m "发布新文章"
> git push origin master
> ```

### 5. 把源文件也推上去（方便换电脑继续写）

```bash
git checkout source
git add source/_posts/
git commit -m "新增文章：我的第一篇科研日志"
git push origin source
```

---

## 三、配置文件速查

都在仓库根目录（source 分支）：

| 文件 | 作用 | 常用修改项 |
|------|------|-----------|
| `_config.yml` | Hexo 主配置 | 网站标题、URL、每页文章数 |
| `_config.next.yml` | 主题配置 | 侧栏、动画、菜单、社交链接 |
| `package.json` | 依赖声明 | 一般不需要改 |

### `_config.yml` 常用项

```yaml
title: 靖翼之憩              # 网站标题
subtitle: '挫其锐解其纷...'   # 副标题
description: '...'           # SEO 描述
author: 靖翼子               # 作者名
language: zh-CN              # 语言
index_generator:
  per_page: 10               # 首页每页显示文章数
  order_by: -date            # 按日期倒序
```

### `_config.next.yml` 常用项

```yaml
menu:                        # 导航菜单
  home: / || fa fa-home
  archives: /archives/ || fa fa-archive
  about: /about/ || fa fa-user

social:                      # 社交链接（显示在侧栏）
  GitHub: https://github.com/Jingyizi || fab fa-github
  Email: mailto:pengzhou_chen@mail.bnu.edu.cn || fa fa-envelope

darkmode: false              # 暗色模式开关
```

---

## 四、目录结构完整地图

```
Jingyizi.github.io/          （仓库根目录）
│
├── index.html               ← 首页，直接改这个
├── README.md                ← 仓库说明
│
├── source/                  ← Hexo 源文件目录（仅在 source 分支有意义）
│   ├── _posts/              ← ★ 所有博客文章放这里（.md 文件）
│   │   ├── hello-world.md   ← 旧文章（隐藏）
│   │   └── GISStory.md      ← 旧文章（隐藏）
│   ├── GISStory/            ← 旧的地图可视化项目（保留）
│   ├── 2023/                ← 旧的博客 HTML（保留）
│   ├── images/              ← 站点图标（头像 favicon 等）
│   └── hkService.html       ← 旧的独立页面
│
├── _config.yml              ← Hexo 主配置
├── _config.next.yml         ← NexT 主题配置
├── package.json             ← npm 依赖
├── scaffolds/               ← 文章模板
│
├── css/                     ← 主题样式（自动生成，不要手动改）
├── js/                      ← 主题脚本（自动生成，不要手动改）
└── archives/                ← 归档页面（自动生成）
```

---

## 五、日常操作速查

```bash
# ===== 每次写文章前 =====
git checkout source
git pull origin source        # 拉取最新源文件

# ===== 写文章 =====
# 在 source/_posts/ 下创建 .md 文件，写 frontmatter + 正文

# ===== 预览（可选） =====
hexo server                   # 浏览器打开 http://localhost:4000

# ===== 发布 =====
hexo generate                 # 生成静态文件
hexo deploy                   # 推送到 GitHub Pages

# ===== 备份源文件 =====
git add source/_posts/
git commit -m "新文章：xxx"
git push origin source

# ===== 改首页（可选） =====
git checkout master
# 编辑 index.html
git add index.html
git commit -m "更新首页"
git push origin master
```

---

## 六、常见问题

**Q: 为什么我推了 source 分支但网站没变化？**
A: 网站显示的是 **master** 分支。写文章后要运行 `hexo deploy`，它才会把生成的 HTML 推到 master。

**Q: 我在 master 上直接改了 index.html，运行 hexo deploy 会覆盖吗？**
A: 会。`hexo deploy` 会用 `public/` 的全部内容覆盖 master 分支。如果你改了 master 上的 index.html，记得同步修改 source 分支的首页配置（`_config.next.yml` 的 `custom_file_path`）。

**Q: npm install 或者 hexo 命令用不了？**
A: 需要先安装 [Node.js](https://nodejs.org/)，然后 `npm install -g hexo-cli`。
