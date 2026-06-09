/**
 * 自动封面图脚本 v2
 * 1. 文章未设置 index_img/banner_img → 自动提取正文第一张图
 * 2. 确保 index_img（首页卡片）与 banner_img（文章页顶部）同步
 * 3. 相对路径自动解析为绝对路径（适配文章独立文件夹结构）
 */
hexo.extend.filter.register('before_post_render', function (data) {

  // 获取文章输出目录（用于解析相对路径）
  function getPostDir() {
    // data.path e.g. "2026/06/04/article-reading-2/index.html"
    var p = data.path || '';
    return p.replace(/\/[^/]+\.html$/, '/');  // → "2026/06/04/article-reading-2/"
  }

  // 将相对路径转为绝对路径
  function resolvePath(imgPath) {
    if (!imgPath) return null;
    // 已是绝对路径或外部URL → 直接返回
    if (/^(https?:|\/|\/\/)/.test(imgPath)) return imgPath;
    // 相对路径 → 拼上文章目录
    return '/' + getPostDir() + imgPath;
  }

  // 从 Markdown 正文中提取第一张图片 URL
  function extractFirstImage(content) {
    if (!content) return null;
    // 匹配 Markdown 图片: ![alt](url)
    var mdMatch = content.match(/!\[.*?\]\(\s*(.+?)\s*(?:"[^"]*")?\s*\)/);
    if (mdMatch) return mdMatch[1];
    // 匹配 HTML 图片: <img src="url">
    var htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    if (htmlMatch) return htmlMatch[1];
    return null;
  }

  // 同步两个封面字段（都转为绝对路径以保证首页卡片正确显示）
  function syncCover() {
    var img;
    // 优先用已设置的封面
    if (data.index_img) {
      img = resolvePath(data.index_img);
    } else if (data.banner_img) {
      img = resolvePath(data.banner_img);
    } else {
      // 都没设 → 提取正文第一张图
      img = resolvePath(extractFirstImage(data.content));
    }
    if (!img) return;
    data.index_img = img;
    data.banner_img = img;
  }

  syncCover();
  return data;
});
