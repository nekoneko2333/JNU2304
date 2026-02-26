/**
 * 新学期开学主题脚本 🎓
 * 有效期：2月20日 - 3月31日
 */

(function() {
    'use strict';
    
    // 检查是否在开学季 (2月20日 - 3月7日)
    // 稍微放宽一点时间为了展示效果
    function isSchoolSeason() {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      // 2月20日 - 2月底 OR 3月1日 - 3月7日
      if (month === 2 && day >= 20) return true;
      if (month === 3 && day <= 7) return true;
      return false;
    }
    
    // 如果不在时间范围内，也可以通过URL参数强制开启 ?theme=school
    const urlParams = new URLSearchParams(window.location.search);
    if (!isSchoolSeason() && !urlParams.has('theme')) return;
    
    // 加载CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/JNU2304/assets/css/new-term.css';
    document.head.appendChild(link);
    
    // 飘落元素 (加入计算机元素)
    const items = ['🌸', '💻', '☁️', '101', '{ }'];
    let itemCount = 0;
    const maxItems = 15; // 减少数量，保持清爽
    
    function createFallingItem() {
      if (itemCount >= maxItems) return;
      
      const el = document.createElement('div');
      el.className = 'falling-item';
      el.textContent = items[Math.floor(Math.random() * items.length)];
      el.style.left = Math.random() * 100 + 'vw';
      
      // 大小随机
      const size = Math.random() * 1 + 0.8;
      el.style.fontSize = size + 'rem';
      
      // 时间随机
      const duration = Math.random() * 5 + 8; // 8-13秒，比较慢
      el.style.animationDuration = duration + 's';
      
      document.body.appendChild(el);
      itemCount++;
      
      setTimeout(() => {
        el.remove();
        itemCount--;
      }, duration * 1000);
    }
    
    // 装饰元素 - 学习用品 + 计算机元素
    const decorItems = ['🎒', '📚', '🎓', '💻', '🖱️', '⌨️', '💾', '🤖', '🖥️'];
    const animations = ['anim-bounce', 'anim-shake', 'anim-spin-slow', 'anim-pulse'];
    
    // 生成边缘随机位置
    function getEdgePosition() {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const margin = 80;
      const edgeWidth = 150;
      
      const edge = Math.floor(Math.random() * 4);
      let x, y;
      
      switch(edge) {
        case 0: // Left
          x = margin + Math.random() * edgeWidth;
          y = margin + Math.random() * (vh - margin * 2);
          break;
        case 1: // Right
          x = vw - margin - edgeWidth + Math.random() * edgeWidth;
          y = margin + Math.random() * (vh - margin * 2);
          break;
        case 2: // Top
          x = margin + Math.random() * (vw - margin * 2);
          y = 120 + Math.random() * 80; // Avoid header
          break;
        case 3: // Bottom
          x = margin + Math.random() * (vw - margin * 2);
          y = vh - margin - 80 + Math.random() * 60;
          break;
      }
      return { x, y };
    }
    
    function createSingleDecor(emoji, size) {
      const el = document.createElement('div');
      el.className = 'term-decor ' + animations[Math.floor(Math.random() * animations.length)];
      el.textContent = emoji;
      
      const pos = getEdgePosition();
      el.style.left = pos.x + 'px';
      el.style.top = pos.y + 'px';
      el.style.fontSize = size || ((Math.random() * 1.5 + 2) + 'rem');
      el.style.animationDelay = (Math.random() * 2) + 's';
      
      document.body.appendChild(el);
    }
    
    function createDecorations() {
      // 随机添加3-5个装饰
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const emoji = decorItems[Math.floor(Math.random() * decorItems.length)];
        createSingleDecor(emoji);
      }
    }
    
    // 首页欢迎卡片
    function createGreetingCard() {
      const path = window.location.pathname;
      const isHomePage = path === '/JNU2304/' || 
                         path === '/JNU2304/index.html' ||
                         path === '/' ||
                         (path.endsWith('/') && !path.includes('/posts/') && !path.includes('/tags/'));
      
      if (!isHomePage) return;
      
      const postList = document.querySelector('#post-list') || 
                       document.querySelector('.post-list') ||
                       document.querySelector('main .container .row');
      
      if (!postList) return;
      
      const greeting = document.createElement('div');
      greeting.className = 'term-greeting';
      greeting.innerHTML = `
        <div class="term-greeting-header">
          <span class="term-greeting-icon">💻</span>
          <span class="term-greeting-title">Welcome Back! 新学期 新征程</span>
          <span class="term-greeting-icon">🚀</span>
        </div>
        <div class="term-greeting-divider"></div>
        <p class="term-greeting-text">
          迎接美好新学期~
        </p>
      `;
      
      postList.parentNode.insertBefore(greeting, postList);
    }
    
    // 点击特效
    function createClickEffect(x, y) {
      const particles = ['⭐', '✨', '0', '1', '{ }', '🚀'];
      const count = 6;
      
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'click-pop';
        p.textContent = particles[Math.floor(Math.random() * particles.length)];
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        
        const angle = (Math.PI * 2 * i) / count;
        const dist = 50 + Math.random() * 30;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        
        p.style.setProperty('--tx', tx + 'px');
        p.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
    }
    
    document.addEventListener('click', (e) => {
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      createClickEffect(e.clientX, e.clientY);
    });
  
    // Start
    function start() {
      // 启动飘落
      setInterval(createFallingItem, 800);
      createGreetingCard();
      
      if (window.innerWidth > 900) {
        createDecorations();
      }
      
      console.log('🎒 New Semester Theme Loaded!');
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  
  })();
