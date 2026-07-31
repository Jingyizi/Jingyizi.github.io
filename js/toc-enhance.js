/* ============================================
   TOC 侧边栏 — 完整增强
   1. 移除 Fluid 默认的 d-none 限制（仅 ≥1200px → 改为 ≥992px）
   2. 移动端创建滑出式 TOC 面板
   3. 确保 TOC 链接平滑滚动
   4. 手动 scrollspy 作为 tocbot 回退方案
   ============================================ */
(function () {
  var tocEl = document.getElementById('toc');
  if (!tocEl) return;

  // ========== 1. 移除 Bootstrap 隐藏类 ==========
  function unhideTOC() {
    // 寻找包裹 #toc 的父容器并移除 d-none / d-xl-block 中的隐藏
    var parent = tocEl.parentElement;
    while (parent) {
      if (parent.classList.contains('d-none')) {
        parent.classList.remove('d-none');
      }
      // 如果父级是整个 TOC 列（同时有 d-none 和 d-xl-block）
      if (parent.tagName === 'DIV' &&
          (parent.classList.contains('d-xl-block') ||
           parent.classList.contains('col-xl-2') ||
           parent.classList.contains('col-xl-3'))) {
        parent.classList.remove('d-none');
      }
      // 遇到 article / body / .post 则停止
      if (parent.tagName === 'ARTICLE' ||
          parent.tagName === 'BODY' ||
          parent.classList.contains('post')) {
        break;
      }
      parent = parent.parentElement;
    }
  }

  // ========== 2. 移动端 TOC 面板 ==========
  var isMobile = window.matchMedia('(max-width: 991px)');
  var panel = null;
  var overlay = null;
  var toggleBtn = null;

  function createMobilePanel() {
    // 创建遮罩
    overlay = document.createElement('div');
    overlay.className = 'toc-overlay';
    overlay.addEventListener('click', closePanel);
    document.body.appendChild(overlay);

    // 创建面板
    panel = document.createElement('div');
    panel.className = 'toc-mobile-panel';
    panel.innerHTML =
      '<div class="toc-panel-header">' +
      '<span class="toc-panel-title">📑 目录</span>' +
      '<button class="toc-panel-close">&times;</button>' +
      '</div>';
    // 把 #toc 移入面板
    panel.appendChild(tocEl);
    document.body.appendChild(panel);

    panel.querySelector('.toc-panel-close').addEventListener('click', closePanel);

    // 创建浮动按钮
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'toc-toggle-btn';
    toggleBtn.innerHTML = '☰';
    toggleBtn.setAttribute('aria-label', '目录');
    toggleBtn.addEventListener('click', openPanel);
    document.body.appendChild(toggleBtn);
  }

  function openPanel() {
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  function closePanel() {
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function handleMobileChange(e) {
    if (e.matches) {
      // 移动端：创建面板
      if (!panel) createMobilePanel();
    } else {
      // 桌面端：把 #toc 放回原位
      if (panel && panel.contains(tocEl)) {
        var tocWidget = document.querySelector('.toc-widget');
        if (tocWidget) {
          tocWidget.appendChild(tocEl);
        }
      }
      closePanel();
    }
  }

  // ========== 3. TOC 链接平滑滚动 ==========
  function initSmoothScroll() {
    tocEl.addEventListener('click', function (e) {
      var link = e.target.closest('.toc-link');
      if (!link) return;
      e.preventDefault();

      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;

      var target = document.querySelector(href);
      if (!target) {
        // tocbot 有时用 toc- 前缀生成 id
        var altId = href.replace('#', '#toc-');
        target = document.querySelector(href) || document.getElementById(altId);
      }
      if (!target) return;

      var offset = 70; // 导航栏高度
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });

      // 移动端：点击后关闭面板
      if (isMobile.matches) closePanel();
    });
  }

  // ========== 4. 手动生成 TOC（tocbot CDN 加载失败时的回退）==========
  function buildFallbackTOC() {
    // 收集文章内容中的标题
    var content = document.querySelector('.post-content, .markdown-body, article');
    if (!content) return false;

    var headings = content.querySelectorAll('h2, h3, h4');
    if (headings.length === 0) return false;

    var topLevel = document.createElement('ol');
    topLevel.className = 'toc';
    var stack = [{ el: topLevel, level: 0 }];

    headings.forEach(function (h, index) {
      var level = parseInt(h.tagName.charAt(1), 10);
      // 生成 id（如果标题没有 id）
      if (!h.id) {
        h.id = 'heading-' + index;
      }

      var li = document.createElement('li');
      li.className = 'toc-item';
      var a = document.createElement('a');
      a.className = 'toc-link toc-link-' + level;
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);

      // 根据层级决定嵌套位置
      while (stack.length > 1 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (level > stack[stack.length - 1].level) {
        // 需要创建新的子列表
        var childList = stack[stack.length - 1].el.querySelector('.toc-child');
        if (!childList) {
          childList = document.createElement('ol');
          childList.className = 'toc-child';
          var lastLi = stack[stack.length - 1].el.lastElementChild;
          if (lastLi) lastLi.appendChild(childList);
        }
        stack.push({ el: li, level: level });
        childList.appendChild(li);
      } else {
        stack[stack.length - 1].el.parentElement.appendChild(li);
        stack[stack.length - 1] = { el: li, level: level };
      }
    });

    tocEl.appendChild(topLevel);
    return true;
  }

  // ========== 5. 手动 scrollspy（回退方案）==========
  function initScrollSpy() {
    // 如果 tocbot 已经在工作（DOM 中有 is-active-link），则跳过
    if (tocEl.querySelector('.is-active-link')) return;

    // 收集所有 TOC 链接对应的标题
    var links = Array.from(tocEl.querySelectorAll('.toc-link'));
    if (links.length === 0) {
      // tocbot 可能还没渲染，也可能加载失败 → 尝试手动生成
      if (!buildFallbackTOC()) {
        // 还没内容，稍后重试
        setTimeout(initScrollSpy, 500);
        return;
      }
      links = Array.from(tocEl.querySelectorAll('.toc-link'));
    }

    var headings = [];
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var id = href.replace('#', '');
      var target = document.getElementById(id);
      if (target) {
        headings.push({ link: link, target: target });
      }
    });

    if (headings.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        var visibleHeadings = entries
          .filter(function (e) { return e.isIntersecting; })
          .map(function (e) { return e.target; });

        if (visibleHeadings.length === 0) return;

        // 找到最靠前的可见标题
        var firstVisible = visibleHeadings.reduce(function (prev, curr) {
          var prevTop = prev.getBoundingClientRect().top;
          var currTop = curr.getBoundingClientRect().top;
          return (currTop < prevTop) ? curr : prev;
        });

        // 高亮对应 TOC 链接
        var match = headings.find(function (h) { return h.target === firstVisible; });
        if (match) {
          links.forEach(function (l) { l.classList.remove('active'); });
          match.link.classList.add('active');
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach(function (h) { observer.observe(h.target); });
  }

  // ========== 启动 ==========
  function init() {
    unhideTOC();

    if (isMobile.matches) {
      createMobilePanel();
    }
    isMobile.addEventListener('change', handleMobileChange);

    initSmoothScroll();

    // 延迟初始化 scrollspy（等 tocbot 先运行）
    setTimeout(initScrollSpy, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
