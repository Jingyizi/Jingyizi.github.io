# 靖翼之憩

> 挫其锐解其纷，和其光同其尘

我的个人网站，基于 [Hexo](https://hexo.io/) 构建，使用 [NexT.Gemini](https://theme-next.js.org/) 主题，托管于 GitHub Pages。

## 🗺️ GIS 地图故事

网站核心内容是一系列独立的地图可视化页面，主要围绕香港地理数据展开：

### 三维地形
- [香港 3D 地形图](https://jingyizi.github.io/GISStory/hongkong.html) — Mapbox GL JS + terrain DEM

### 经济数据
- [香港 GDP 季度变化 (2018–2021)](https://jingyizi.github.io/GISStory/hkGDP.html) — ECharts 折线图
- [香港服务业饼图 (2018)](https://jingyizi.github.io/hkService.html) — ECharts 饼图
- [香港服务业年度变化](https://jingyizi.github.io/GISStory/hkServiceVerify.html) — ECharts

### 人口与犯罪
- [香港人口分布](https://jingyizi.github.io/GISStory/hkPopulation.html) — ECharts
- [香港犯罪变化](https://jingyizi.github.io/GISStory/hkCrime.html) — ECharts
- [香港警署分布](https://jingyizi.github.io/GISStory/hkPolice.html) — Mapbox
- [香港海关聚类](https://jingyizi.github.io/GISStory/hkControl.html) — Mapbox

### 教育与公共设施
- [香港学校分布](https://jingyizi.github.io/GISStory/hkSchool.html) — Mapbox

### 事件与可视化实验
- [香港飞行动画](https://jingyizi.github.io/GISStory/hkFly.html) — Mapbox 飞行浏览
- [雷电 + 暴雨动画](https://jingyizi.github.io/GISStory/lightning.html) — CSS 动画 + Canvas
- [修例风波事例点 (6–9月)](https://jingyizi.github.io/GISStory/hkInstance6.html) — Mapbox 点标记

### 成都街道噪音
- [街道噪音热力图](https://jingyizi.github.io/GISStory/townnoise.html) — ECharts + GeoJSON
- [噪音仪表盘](https://jingyizi.github.io/GISStory/gaugenoise.html) — ECharts
- [噪音饼图](https://jingyizi.github.io/GISStory/noisepie.html) — ECharts

## 🏗️ 技术栈

| 类别 | 技术 |
|------|------|
| 静态网站生成器 | Hexo 5.4.2 |
| 主题 | NexT.Gemini v8.15.1 |
| 地图 | Mapbox GL JS v2.13 |
| 图表 | ECharts 5.4.2 |
| 动画 | anime.js 3.2.1 · animate.css |
| 图标 | Font Awesome 6.4.0 |
| 托管 | GitHub Pages |

## 📁 项目结构

```
jingyizi.github.io/
├── index.html              # 首页
├── hkService.html          # 独立 ECharts 页面
├── css/                    # NexT 主题样式
│   ├── main.css
│   └── noscript.css
├── js/                     # NexT 主题脚本
│   ├── config.js           # 运行时配置
│   ├── utils.js            # 工具函数
│   ├── motion.js           # 动画引擎
│   ├── next-boot.js        # 启动引导
│   ├── pjax.js             # PJAX 无刷新跳转
│   ├── bookmark.js         # 阅读书签
│   ├── schedule.js         # Google Calendar
│   └── comments*.js        # 评论系统
├── images/                 # 站点图标与头像
├── image/                  # 背景图
├── 2023/                   # 博客文章
│   └── 04/02/
│       ├── GISStory/       # 地图故事资源
│       └── hello-world/    # 第一篇文章
├── archives/               # 归档页面
└── GISStory/               # 地图可视化页面集合
    ├── *.html              # 各可视化页面
    ├── *.geojson           # 地理数据文件
    └── chengdu/            # 成都街道噪音项目
```

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动本地服务器
hexo server

# 生成静态文件
hexo generate

# 部署到 GitHub Pages
hexo deploy
```

## 📝 待改进

- [ ] 补充更多博客文章
- [ ] 升级 Hexo 与 NexT 主题
- [ ] 优化移动端适配
- [ ] 更新 GISStory 页面中的 Mapbox/echarts 版本
- [ ] 添加关于页面

## 📄 许可

MIT License

---

© 2023 靖翼子 · Powered by [Hexo](https://hexo.io/) & [NexT.Gemini](https://theme-next.js.org/)
