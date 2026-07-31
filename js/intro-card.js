/* ============================================
   首页动态效果 + 个人介绍卡片
   1. 导航栏 scroll 变色 (#navbar)
   2. 文章卡片 IntersectionObserver 渐显
   3. 首页注入个人介绍卡片
   ============================================ */
(function () {
  // ========== 1. 导航栏滚动变色 ==========
  var navbar = document.querySelector('#navbar');
  if (navbar) {
    function updateNavbar() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-colored');
      } else {
        navbar.classList.remove('navbar-colored');
      }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  // ========== 2. IntersectionObserver 卡片渐显 ==========
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
  );

  function observeCards() {
    // Fluid 首页文章卡片的真实 class: .index-card
    var cards = document.querySelectorAll('.index-card');
    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  // ========== 3. 首页个人介绍卡片 ==========
  function injectIntroCard() {
    if (!document.querySelector('.index')) return;
    if (document.querySelector('.intro-card-wrapper')) return;

    // 找到文章卡片所在的父容器（#board 内的 col）
    // 真实 DOM: #board > .container > .row > .col-12.col-md-10.m-auto
    var container = document.querySelector('#board .col-md-10');
    if (!container) {
      container = document.querySelector('#board');
    }
    if (!container) return;

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

    container.insertBefore(card, container.firstChild);
  }

  // ========== 启动 ==========
  function init() {
    injectIntroCard();
    setTimeout(observeCards, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
