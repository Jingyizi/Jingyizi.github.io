/* 首页个人介绍卡片 — 在文章列表上方插入 */
(function () {
  // 仅在首页执行
  if (!document.querySelector('.index')) return;

  var content = document.querySelector('.index .post-list');
  if (!content) {
    content = document.querySelector('.index #board');
  }
  if (!content) return;

  // 避免重复插入
  if (document.querySelector('.intro-card-wrapper')) return;

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

  // 插入到文章列表最前面
  content.insertBefore(card, content.firstChild);
})();
