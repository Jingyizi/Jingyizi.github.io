/**
 * 文章资产复制脚本
 * 将 source/_posts/<slug>/ 下的非 .md 文件（图片等）复制到文章输出目录
 * 例如: source/_posts/article-reading-2/sm-vpd.png → public/2026/06/04/article-reading-2/sm-vpd.png
 */
var fs = require('fs');
var path = require('path');

hexo.extend.generator.register('post-assets', function (locals) {
  var results = [];
  var sourceDir = hexo.source_dir;

  locals.posts.forEach(function (post) {
    // 文章源目录 e.g. "_posts/article-reading-2"
    var postSrcDir = path.dirname(post.source);
    var assetDir = path.join(sourceDir, postSrcDir);

    if (!fs.existsSync(assetDir)) return;

    var files = fs.readdirSync(assetDir);
    files.forEach(function (file) {
      // 跳过 .md 文件
      if (/\.(md|MD)$/.test(file)) return;

      var srcPath = path.join(assetDir, file);
      if (!fs.statSync(srcPath).isFile()) return;

      // 目标路径 = 文章输出路径 + 文件名
      // post.path e.g. "2026/06/04/article-reading-2/index.html"
      var targetPath = post.path.replace(/[^/]+$/, '') + file;

      results.push({
        path: targetPath,
        data: function () {
          return fs.createReadStream(srcPath);
        }
      });
    });
  });

  return results;
});
