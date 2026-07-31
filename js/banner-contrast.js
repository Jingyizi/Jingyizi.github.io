/* ============================================
   Banner 封面图背景 — 文字自动对比度
   1. 检测 banner 背景图的明暗
   2. 自动切换文字颜色（深色底→白字 / 浅色底→深色字）
   3. 确保在任何自定义封面图上标题都清晰可读

   使用方式（per-post 自定义封面）：
   在文章 frontmatter 中添加：
   banner_img: /images/your-cover.jpg
   ============================================ */
(function () {
  // 阈值：平均亮度低于此值视为"深色背景"
  var LUMINANCE_THRESHOLD = 128;

  function getBannerImgUrl() {
    // Fluid 将 banner 图设为 .banner 或 #banner 的内联 background-image
    var banner = document.querySelector('#banner, .banner, [style*="background-image"]');
    if (!banner) return null;
    var style = banner.style.backgroundImage || getComputedStyle(banner).backgroundImage;
    if (!style || style === 'none') return null;
    var match = style.match(/url\(["']?([^"')]+)["']?\)/);
    return match ? match[1] : null;
  }

  function calcLuminance(r, g, b) {
    // 相对亮度公式 (sRGB)
    var toLinear = function (c) {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  function sampleImageAndApply(img) {
    try {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      // 采样图片上部区域（banner 文字通常在此）
      var sampleH = Math.min(80, img.naturalHeight * 0.3);
      var sampleW = Math.min(img.naturalWidth, 400);
      canvas.width = sampleW;
      canvas.height = sampleH;
      ctx.drawImage(img, 0, 0, sampleW, sampleH, 0, 0, sampleW, sampleH);

      var imageData = ctx.getImageData(0, 0, sampleW, sampleH).data;
      var totalLum = 0, pixelCount = 0;
      for (var i = 0; i < imageData.length; i += 4) {
        var lum = calcLuminance(imageData[i], imageData[i + 1], imageData[i + 2]);
        totalLum += lum;
        pixelCount++;
      }
      var avgLum = (totalLum / pixelCount) * 255; // 缩放到 0-255

      var bannerEl = document.querySelector('#banner, .banner');
      if (!bannerEl) return;

      // 移除旧类名
      bannerEl.classList.remove('banner-light-text', 'banner-dark-text');

      if (avgLum > LUMINANCE_THRESHOLD) {
        // 浅色背景 → 深色文字
        bannerEl.classList.add('banner-light-text');
      } else {
        // 深色背景 → 白色文字（默认 CSS text-shadow 已处理，手动加类确保）
        bannerEl.classList.add('banner-dark-text');
      }
    } catch (e) {
      // Canvas 跨域或读取失败 → 回退到默认深色投影
      console.warn('[banner-contrast] 图片分析失败，使用默认深色文字投影', e);
      var bannerEl = document.querySelector('#banner, .banner');
      if (bannerEl) bannerEl.classList.add('banner-dark-text');
    }
  }

  function init() {
    var imgUrl = getBannerImgUrl();
    if (!imgUrl) return;

    var img = new Image();
    img.crossOrigin = 'Anonymous';  // 避免跨域问题（本地图片一般不需要）
    img.onload = function () {
      sampleImageAndApply(img);
    };
    img.onerror = function () {
      // 加载失败 → 使用默认深色投影
      var bannerEl = document.querySelector('#banner, .banner');
      if (bannerEl) bannerEl.classList.add('banner-dark-text');
    };
    img.src = imgUrl;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
