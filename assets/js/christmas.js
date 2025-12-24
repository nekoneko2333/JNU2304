/**
 * 圣诞节主题脚本 🎄
 * 雪花飘落 + 随机边缘装饰（不遮挡文字）
 * 有效期：12月20日 - 1月5日
 */

(function() {
  'use strict';
  
  // 检查是否在圣诞节期间（12月20日 - 1月5日）
  function isChristmasSeason() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return (month === 12 && day >= 20) || (month === 1 && day <= 5);
  }
  
  if (!isChristmasSeason()) return;
  
  // 加载CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/JNU2304/assets/css/christmas.css';
  document.head.appendChild(link);
  
  // 雪花字符
  const flakes = ['❄', '❅', '❆', '✻', '✼', '❉', '✲', '✱'];
  let snowflakeCount = 0;
  const maxSnowflakes = 50;
  
  function createSnowflake() {
    if (snowflakeCount >= maxSnowflakes) return;
    
    const el = document.createElement('div');
    el.className = 'snowflake';
    el.textContent = flakes[Math.floor(Math.random() * flakes.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
    
    const duration = Math.random() * 4 + 4;
    el.style.animationDuration = duration + 's';
    
    document.body.appendChild(el);
    snowflakeCount++;
    
    setTimeout(() => {
      el.remove();
      snowflakeCount--;
    }, duration * 1000);
  }
  
  // 装饰元素 - 确保圣诞老人和圣诞树一定出现
  const decorItems = ['🎅', '🎄', '🦌', '🎁', '⭐', '🔔', '☃️', '🎀', '✨', '🧣'];
  const mustHaveItems = ['🎅', '🎄', '🦌', '🎁']; // 这些一定要出现
  const animations = ['anim-float', 'anim-pulse', 'anim-swing', 'anim-twinkle'];
  
  // 生成边缘安全区域的随机位置（只在页面边缘，不遮挡中间内容）
  function getEdgePosition() {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const margin = 60; // 边缘距离
    const edgeWidth = 120; // 边缘区域宽度
    
    // 随机选择一条边
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(edge) {
      case 0: // 左边缘
        x = margin + Math.random() * edgeWidth;
        y = margin + Math.random() * (vh - margin * 2);
        break;
      case 1: // 右边缘
        x = vw - margin - edgeWidth + Math.random() * edgeWidth;
        y = margin + Math.random() * (vh - margin * 2);
        break;
      case 2: // 上边缘（避开导航栏）
        x = margin + Math.random() * (vw - margin * 2);
        y = 100 + Math.random() * 80;
        break;
      case 3: // 下边缘
        x = margin + Math.random() * (vw - margin * 2);
        y = vh - margin - 80 + Math.random() * 60;
        break;
    }
    
    return { x, y };
  }
  
  // 创建单个装饰
  function createSingleDecor(emoji, size) {
    const el = document.createElement('div');
    el.className = 'christmas-decor ' + animations[Math.floor(Math.random() * animations.length)];
    el.textContent = emoji;
    
    const pos = getEdgePosition();
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    el.style.fontSize = size || ((Math.random() * 1.5 + 1.5) + 'rem');
    el.style.animationDelay = (Math.random() * 2) + 's';
    
    document.body.appendChild(el);
  }
  
  // 创建装饰元素
  function createDecorations() {
    // 必须出现的4个元素 - 更大更醒目
    mustHaveItems.forEach(item => {
      createSingleDecor(item, '3rem');
    });
    
    // 再随机添加3-4个额外装饰
    const extraCount = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < extraCount; i++) {
      const emoji = decorItems[Math.floor(Math.random() * decorItems.length)];
      createSingleDecor(emoji, '1.8rem');
    }
  }
  
  // 在首页添加节日祝福卡片
  function createGreetingCard() {
    // 只在首页显示
    const path = window.location.pathname;
    const isHomePage = path === '/JNU2304/' || 
                       path === '/JNU2304/index.html' ||
                       path === '/' ||
                       (path.endsWith('/') && !path.includes('/posts/') && !path.includes('/tags/') && !path.includes('/categories/'));
    
    if (!isHomePage) return;
    
    // 查找文章列表容器 - Chirpy主题结构
    const postList = document.querySelector('#post-list') || 
                     document.querySelector('.post-list') ||
                     document.querySelector('main .container .row');
    
    if (!postList) return;
    
    // 创建祝福卡片
    const greeting = document.createElement('div');
    greeting.className = 'christmas-greeting';
    greeting.innerHTML = `
      <div class="christmas-greeting-header">
        <span class="christmas-greeting-icon">🎄</span>
        <span class="christmas-greeting-title">Merry Christmas & Happy New Year</span>
        <span class="christmas-greeting-icon">🎅</span>
      </div>
      <div class="christmas-greeting-divider"></div>
      <p class="christmas-greeting-text">
        祝同学们<span class="christmas-greeting-wish">节日快乐，假期愉快，新的一年万事顺遂！</span>
        <span class="christmas-greeting-emoji">🎁</span><span class="christmas-greeting-emoji">✨</span>
      </p>
    `;
    
    // 插入到文章列表前面
    postList.parentNode.insertBefore(greeting, postList);
  }
  
  // 启动雪花
  function startSnowing() {
    for (let i = 0; i < 15; i++) {
      setTimeout(createSnowflake, i * 200);
    }
    setInterval(createSnowflake, 300);
  }
  
  // 窗口大小改变时重新布置装饰
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      document.querySelectorAll('.christmas-decor').forEach(el => el.remove());
      if (window.innerWidth > 768) {
        createDecorations();
      }
    }, 300);
  });
  
  // ===== 点击烟花效果 =====
  function createClickEffect(x, y) {
    const particles = ['❄️', '✨', '⭐', '🎄', '🎁', '❤️', '💚'];
    const count = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      
      // 随机方向和距离
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const distance = 60 + Math.random() * 80;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      particle.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
  }
  
  // 监听点击事件（桌面端）
  document.addEventListener('click', function(e) {
    // 避免在输入框等元素上触发
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
      return;
    }
    createClickEffect(e.clientX, e.clientY);
  });
  
  // 监听触摸事件（手机端）
  document.addEventListener('touchend', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
      return;
    }
    // 使用最后一个触摸点的坐标
    const touch = e.changedTouches[0];
    if (touch) {
      createClickEffect(touch.clientX, touch.clientY);
    }
  });

  // 启动
  function start() {
    startSnowing();
    createGreetingCard(); // 添加节日祝福卡片
    if (window.innerWidth > 768) {
      createDecorations();
    }
    console.log('🎄 Merry Christmas! 圣诞主题已启用');
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
