/* ============================================
   首页动态效果 & 个人介绍卡片
   1. 导航栏透明 → 滚动后显色
   2. 文章卡片滚动渐显
   3. 首页个人介绍卡片注入
   ============================================ */
(function () {
  // ========== 1. 导航栏滚动变色 ==========
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var scrollThreshold = 50;
    function updateNavbar() {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('navbar-colored');
      } else {
        navbar.classList.remove('navbar-colored');
      }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    // 初始检查（防止刷新时已滚动）
    updateNavbar();
  }

  // ========== 2. 内容渐显 (IntersectionObserver) ==========
  // 监听所有文章卡片和可动效元素
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
          // 可见后不再观察
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
  );

  // 延迟观察 — 等 DOM 可能被 JS 修改后再抓取
  function observeCards() {
    // Fluid 可能用不同 class 渲染文章卡片
    var cards = document.querySelectorAll('.index-card, .post-card, .article-card, #board article, .post-list .post');
    cards.forEach(function (card) {
      observer.observe(card);
    });
    // 也观察简介卡片
    var intro = document.querySelector('.intro-card-wrapper');
    if (intro) observer.observe(intro);
  }

  // 初次观察
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(observeCards, 100);
    });
  } else {
    setTimeout(observeCards, 100);
  }

  // ========== 3. 首页个人介绍卡片 ==========
  function injectIntroCard() {
    if (!document.querySelector('.index')) return;
    if (document.querySelector('.intro-card-wrapper')) return;

    // Fluid 首页文章列表容器（兼容多种 class 名）
    var content = document.querySelector('.index .post-list')
      || document.querySelector('.index #board')
      || document.querySelector('.index .post-container');

    if (!content) return;

    var card = document.createElement('div');
    card.className = 'intro-card-wrapper';
    card.innerHTML =
      '<img class="intro-avatar" src="/images/custom-logo.png" alt="靖翼子">' +
      '<div class="intro-name">靖翼子</div>' +
      '<div class="intro-affiliation">北京师范大学 地图学与地理信息系统 博士生</div>' +
      '<div class="intro-subtitle">挫其锐解其纷，和其光同其尘</div>' +
      '<div class="intro-tags">' +
      '  <span>复合水旱灾害遥感监测</span>' +
      '  <span>地理智能</span>' +
      '</div>' +
      '<div class="intro-links">' +
      '  <a href="https://geo.bnu.edu.cn/cdrr/cdrr_cysyy/ec752a1b376c4360a746e52d1d746b35.html" target="_blank" rel="noopener">🏫 机构主页</a>' +
      '  <a href="https://www.researchgate.net/profile/Pengzhou-Chen" target="_blank" rel="noopener">🔬 ResearchGate</a>' +
      '  <a href="https://github.com/Jingyizi" target="_blank" rel="noopener">💻 GitHub</a>' +
      '  <a href="mailto:pengzhou_chen@mail.bnu.edu.cn">✉️ Email</a>' +
      '</div>';

    content.insertBefore(card, content.firstChild);
    observer.observe(card);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectIntroCard);
  } else {
    injectIntroCard();
  }
})();
