# 靖翼之憩

> 挫其锐解其纷，和其光同其尘

记录科研日常的个人博客，基于 [Hexo](https://hexo.io/) + [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 构建，托管于 GitHub Pages。

👉 [jingyizi.github.io](https://jingyizi.github.io/)

## 关于本站

我的博客，记录一些日常思考、文献阅读笔记

## 技术栈

| 类别 | 技术 |
|------|------|
| 静态网站生成器 | Hexo 5.x |
| 主题 | Fluid (Material Design) |
| 托管 | GitHub Pages |
| CI/CD | GitHub Actions |

## 发布流程

```bash
# 1. 在 source/_posts/ 下写 .md 文章
# 2. 推送
git add source/_posts/xxx.md
git commit -m "新文章：xxx"
git push origin master
# 3. GitHub Actions 自动构建部署，等30秒上线 ✅
```

## 许可

MIT License

---

© 2023-2026 靖翼子
