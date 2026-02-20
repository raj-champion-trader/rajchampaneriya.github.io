import Swup from 'swup';

const swup = new Swup({
    containers: ["#swup"],
    animateHistoryBrowsing: true,
    cache: true
});

// Expose globally so module scripts (mermaid, etc.) can hook into page transitions
window.swup = swup;

// Navigation Active State Update
function updateNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.bottom-nav .nav-item').forEach(el => {
        el.classList.remove('active');
        const href = el.getAttribute('href');
        if (href && (href === path || (href !== '/' && path.startsWith(href)))) {
            el.classList.add('active');
        }
    });
}

swup.hooks.on('page:view', updateNav);
updateNav(); // Initial run

// ------------------ Scroll reveal (Intersection Observer) ------------------
function initScrollReveal() {
  const container = document.querySelector('#swup');
  const root = container || document;
  const els = root.querySelectorAll('.scroll-reveal:not(.in-view)');
  if (!els.length) return;

  const viewH = window.innerHeight;
  const deferred = [];

  els.forEach((el) => {
    if (el.getBoundingClientRect().top < viewH + 40) {
      el.classList.add('in-view');
    } else {
      deferred.push(el);
    }
  });

  if (!deferred.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '40px 0px', threshold: 0.01 }
  );
  deferred.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);
swup.hooks.on('page:view', () => {
  requestAnimationFrame(initScrollReveal);
});

function initBlogTagFilter() {
  const feedGrid = document.querySelector('.feed-grid');
  if (!feedGrid) return;
  const params = new URLSearchParams(window.location.search);
  const tag = (params.get('tag') || params.get('tags'));
  if (!tag) return;

  const normalizedTag = tag.toString().toLowerCase();
  const cards = feedGrid.querySelectorAll('.feed-card');
  let found = 0;
  cards.forEach(card => {
    const tagsAttr = (card.getAttribute('data-tags') || '').toLowerCase();
    const tags = tagsAttr.split(',').map(t => t.trim()).filter(Boolean);
    if (tags.includes(normalizedTag)) {
      card.style.display = '';
      found++;
    } else {
      card.style.display = 'none';
    }
  });

  const existing = document.getElementById('blog-filter-empty');
  if (existing) existing.remove();
  if (found === 0) {
    const msg = document.createElement('div');
    msg.id = 'blog-filter-empty';
    msg.className = 'no-results surface-panel';
    msg.textContent = `No posts found for "${tag}".`;
    feedGrid.parentNode.insertBefore(msg, feedGrid.nextSibling);
  } else {
    window.scrollTo({ top: feedGrid.offsetTop - 20, behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', initBlogTagFilter);
swup.hooks.on('page:view', () => { requestAnimationFrame(initBlogTagFilter); });

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn?.querySelector('.theme-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Sync browser chrome color so mobile browser UI matches the site theme
    try {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0a0c' : '#ffffff');
    } catch (e) { /* noop */ }

    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        } else {
            themeIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
    }
} 

// Init Theme
const savedTheme = 'light';
setTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ------------------ Bottom navigation collapse control ------------------
(function initBottomNavCollapse() {
  const bottomNav = document.querySelector('.bottom-nav');
  const toggle = document.getElementById('bottom-nav-toggle');
  if (!bottomNav || !toggle) return;

  function applyCollapsed(collapsed) {
    bottomNav.classList.toggle('collapsed', collapsed);
    document.body.classList.toggle('bottom-nav-collapsed', collapsed);
    toggle.classList.toggle('collapsed', collapsed);
    // accessibility
    toggle.setAttribute('aria-expanded', String(!collapsed));
    localStorage.setItem('bottomNavCollapsed', collapsed ? '1' : '0');
  }

  // restore state on load
  const stored = localStorage.getItem('bottomNavCollapsed');
  const initialCollapsed = stored === '1';
  applyCollapsed(initialCollapsed);

  toggle.addEventListener('click', (e) => {
    const isCollapsed = bottomNav.classList.contains('collapsed');
    applyCollapsed(!isCollapsed);
  });

  // Re-apply after swup page swaps (persisted state)
  if (window.swup && window.swup.hooks) {
    window.swup.hooks.on('page:view', () => {
      const s = localStorage.getItem('bottomNavCollapsed');
      applyCollapsed(s === '1');
    });
  }
})();

// ------------------ Player-bar hide/show control ------------------
(function initPlayerBarToggle() {
  const playerBar = document.getElementById('audio-player-bar');
  const toggle = document.getElementById('player-bar-toggle');
  const audioEl = document.getElementById('global-audio');
  if (!playerBar || !toggle) return;

  function applyPlayerCollapsed(collapsed) {
    playerBar.classList.toggle('collapsed', collapsed);
    document.body.classList.toggle('player-bar-collapsed', collapsed);
    toggle.classList.toggle('collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    localStorage.setItem('playerBarCollapsed', collapsed ? '1' : '0');

    // When user explicitly hides the player, also hide the visible UI to avoid accidental reopen
    if (collapsed) playerBar.classList.add('hidden');
    else {
      // if audio is currently playing/showing, reveal; otherwise keep hidden until user triggers play
      const isPlaying = audioEl && !audioEl.paused && audioEl.src;
      if (isPlaying) playerBar.classList.remove('hidden');
    }
  }

  // restore state on load
  const stored = localStorage.getItem('playerBarCollapsed');
  const initialCollapsed = stored === '1';
  applyPlayerCollapsed(initialCollapsed);

  toggle.addEventListener('click', () => {
    const isCollapsed = playerBar.classList.contains('collapsed');
    applyPlayerCollapsed(!isCollapsed);
  });

  // Re-apply after swup page swaps (persisted state)
  if (window.swup && window.swup.hooks) {
    window.swup.hooks.on('page:view', () => {
      const s = localStorage.getItem('playerBarCollapsed');
      applyPlayerCollapsed(s === '1');
    });
  }
})();

import './audio-player.js';
import './ai-chat.js';

console.log('Frontier Theme: Swup & Interactivity Configuration Complete');
