// Swup loaded from CDN in baseof.html (window.Swup) to avoid npm resolution in theme during Hugo js.Build
const Swup = window.Swup;
if (!Swup) throw new Error('Swup not loaded');

const swup = new Swup({
    containers: ["#swup"],
    animateHistoryBrowsing: true,
    cache: true
});

// Expose globally so module scripts (mermaid, etc.) can hook into page transitions
window.swup = swup;

// Navigation Active State Update + LinkedIn Share link (so Share always points to current page URL)
// + GitHub nav link sync (so client-side Swup navigation shows the correct repo or hides the link)
function updateNav() {
    const path = window.location.pathname;
    // Use current page URL so share works on client-side nav, localhost, and correct baseURL
    const shareURL = window.location.href;
    document.querySelectorAll('.bottom-nav .nav-item').forEach(el => {
        el.classList.remove('active');
        const href = el.getAttribute('href');
        if (!href) return;
        const hrefPath = href.startsWith('http') ? new URL(href).pathname : href;
        if (hrefPath === path || (hrefPath !== '/' && path.startsWith(hrefPath.replace(/\/$/, '')))) {
            el.classList.add('active');
        }
    });
    // Update every LinkedIn share link on the page (bottom nav + any in-content) to current URL
    document.querySelectorAll('a[href*="linkedin.com/sharing"]').forEach(el => {
        el.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shareURL);
    });

    // Sync bottom nav GitHub link from the current page's content (inside #swup) so it updates after Swup navigation
    const githubLink = document.getElementById('bottom-nav-github-link');
    if (githubLink) {
        const swupContainer = document.querySelector('#swup');
        const meta = swupContainer && swupContainer.querySelector('meta[name="page-github-repo"]');
        const repo = meta ? (meta.getAttribute('content') || '').trim() : '';
        if (repo) {
            githubLink.href = repo;
            githubLink.classList.remove('hidden');
            githubLink.removeAttribute('aria-hidden');
        } else {
            githubLink.href = '#';
            githubLink.classList.add('hidden');
            githubLink.setAttribute('aria-hidden', 'true');
        }
    }

    // Desktop top nav: sync active state (same path logic as bottom nav)
    document.querySelectorAll('.desktop-top-nav a.desktop-nav-link').forEach(el => {
        el.classList.remove('active');
        const href = el.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http')) return;
        const hrefPath = href.startsWith('http') ? new URL(href).pathname : href;
        if (hrefPath === path || (hrefPath !== '/' && path.startsWith(hrefPath.replace(/\/$/, '')))) {
            el.classList.add('active');
        }
    });
}

swup.hooks.on('page:view', updateNav);
// Run when DOM is ready and after Swup so share URL is always correct
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNav);
} else {
    updateNav();
}

// ------------------ Scroll reveal (Intersection Observer) ------------------
// Re-triggers every time elements enter/leave viewport (no unobserve).
function initScrollReveal() {
  const container = document.querySelector('#swup');
  const root = container || document;
  const els = root.querySelectorAll('.scroll-reveal');
  if (!els.length) return;

  const viewH = window.innerHeight;

  els.forEach((el) => {
    if (el.getBoundingClientRect().top < viewH + 40) {
      el.classList.add('in-view');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    },
    { root: null, rootMargin: '40px 0px', threshold: 0.01 }
  );
  els.forEach((el) => observer.observe(el));
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

// Init Theme — respect localStorage first, then system preference
const savedTheme = localStorage.getItem('theme');
const systemDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (systemDark ? 'dark' : 'light');
setTheme(initialTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ------------------ Desktop top nav: Listen button triggers audio player ------------------
function initDesktopAudioTrigger() {
  const desktopTrigger = document.querySelector('.desktop-audio-trigger');
  const mainTrigger = document.getElementById('audio-player-trigger');
  if (!desktopTrigger) return;
  // Avoid attaching the same listener multiple times (e.g. after Swup page:view)
  if (desktopTrigger.dataset.audioListenerAttached) return;
  desktopTrigger.dataset.audioListenerAttached = '1';

  desktopTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    // Read page audio from current page content so playback starts on first click (desktop)
    const dataEl = document.getElementById('page-audio-data');
    if (dataEl && dataEl.dataset.src) {
      if (typeof window.playAudio === 'function') {
        window.playAudio(dataEl.dataset.src, dataEl.dataset.title || 'Now Playing...');
      }
      return;
    }
    // No page audio: toggle play/pause or no-op via the main trigger (e.g. after nav away)
    if (mainTrigger) mainTrigger.click();
  });
}
document.addEventListener('DOMContentLoaded', initDesktopAudioTrigger);
swup.hooks.on('page:view', () => { initDesktopAudioTrigger(); });

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
import { runScrollspy } from './scrollspy.js';

document.addEventListener('DOMContentLoaded', runScrollspy);
if (window.swup && window.swup.hooks) {
  window.swup.hooks.on('page:view', () => requestAnimationFrame(runScrollspy));
}

console.log('Frontier Theme: Swup & Interactivity Configuration Complete');
