/**
 * 自动封面图脚本
 * 1. 如果文章未设置 index_img/banner_img，自动提取正文第一张图
 * 2. 确保 index_img（首页卡片）与 banner_img（文章页顶部）一致
 */
hexo.extend.filter.register('before_post_render', function (data) {
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

  var firstImage = extractFirstImage(data.content);

  // 如果没设置封面图，用正文第一张图
  if (!data.index_img && !data.banner_img) {
    if (firstImage) {
      data.index_img = firstImage;
      data.banner_img = firstImage;
    }
    return data;
  }

  // 同步：只设了 index_img 没设 banner_img → 复制过去
  if (data.index_img && !data.banner_img) {
    data.banner_img = data.index_img;
  }

  // 同步：只设了 banner_img 没设 index_img → 复制过去
  if (data.banner_img && !data.index_img) {
    data.index_img = data.banner_img;
  }

  return data;
});
