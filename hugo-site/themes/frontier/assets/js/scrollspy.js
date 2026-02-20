/**
 * Responsive scrollspy navigation for article pages.
 * - Extracts h2/h3 from .post-content, builds TOC
 * - Intersection Observer for active section
 * - Smooth scroll with offset for fixed header
 * - Desktop: horizontal nav; mobile/tablet: collapsible dropdown
 * - Keyboard and ARIA support
 */

const SCROLLSPY_OFFSET = 80; // px from top to consider "active"
const HEADER_OFFSET = 56;
const ROOT_MARGIN = `-${HEADER_OFFSET + 24}px 0px -60% 0px`;

function getContentContainer() {
  const main = document.querySelector('#swup');
  return main ? main.querySelector('.single-post .post-content') : document.querySelector('.single-post .post-content');
}

function buildHeadings(content) {
  const headings = content.querySelectorAll('h2[id], h3[id]');
  return Array.from(headings).map((el) => ({
    id: el.id,
    text: el.textContent.replace(/\s*#\s*$/, '').trim(),
    level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
    element: el,
  }));
}

function createNavItem({ id, text, level }) {
  const li = document.createElement('li');
  li.className = 'scrollspy-item' + (level === 3 ? ' is-nested' : '');
  li.setAttribute('role', 'listitem');
  const a = document.createElement('a');
  a.href = `#${encodeURIComponent(id)}`;
  a.className = 'scrollspy-link';
  a.setAttribute('role', 'link');
  a.textContent = text;
  a.dataset.scrollspyId = id;
  li.appendChild(a);
  return li;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}

function initScrollspy() {
  const nav = document.getElementById('scrollspy-nav');
  const content = getContentContainer();
  if (!nav || !content) return;

  const headings = buildHeadings(content);
  if (headings.length === 0) {
    nav.setAttribute('hidden', '');
    return;
  }

  nav.removeAttribute('hidden');
  nav.classList.add('has-items');

  const list = nav.querySelector('#scrollspy-list');
  if (!list) return;
  list.innerHTML = '';
  list.setAttribute('role', 'list');

  /* Sentinel: when it scrolls above the header line, fix the scrollspy to the top */
  const sentinel = document.createElement('div');
  sentinel.className = 'scrollspy-sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  nav.parentNode.insertBefore(sentinel, nav);

  let spacer = null;
  const stickObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (!e) return;
      if (e.isIntersecting) {
        nav.classList.remove('is-stuck');
        if (spacer && spacer.parentNode) spacer.parentNode.removeChild(spacer);
        spacer = null;
      } else {
        if (spacer) return;
        const navHeight = nav.offsetHeight;
        nav.classList.add('is-stuck');
        spacer = document.createElement('div');
        spacer.className = 'scrollspy-spacer';
        spacer.style.height = `${navHeight}px`;
        nav.parentNode.insertBefore(spacer, nav.nextSibling);
      }
    },
    { root: null, rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`, threshold: 0 }
  );
  stickObserver.observe(sentinel);

  const trigger = nav.querySelector('.scrollspy-trigger');
  const fragment = document.createDocumentFragment();
  headings.forEach((h) => fragment.appendChild(createNavItem(h)));
  list.appendChild(fragment);

  const links = list.querySelectorAll('.scrollspy-link');
  const linkById = new Map(Array.from(links).map((a) => [a.dataset.scrollspyId, a]));
  const triggerLabel = trigger ? trigger.querySelector('.scrollspy-trigger-label') : null;
  const headingById = new Map(headings.map((h) => [h.id, h]));

  function setActive(id) {
    links.forEach((a) => a.classList.remove('is-active'));
    const active = linkById.get(id);
    if (active) {
      active.classList.add('is-active');
      active.setAttribute('aria-current', 'location');
      if (triggerLabel) {
        const h = headingById.get(id);
        triggerLabel.textContent = h ? h.text : 'Contents';
        trigger.setAttribute('aria-label', h ? `Current: ${h.text}. Tap to open table of contents.` : 'Table of contents');
      }
    } else {
      links.forEach((a) => a.removeAttribute('aria-current'));
      if (triggerLabel) {
        triggerLabel.textContent = 'Contents';
        trigger.setAttribute('aria-label', 'Table of contents');
      }
    }
  }

  function clearActive() {
    links.forEach((a) => {
      a.classList.remove('is-active');
      a.removeAttribute('aria-current');
    });
    if (triggerLabel) {
      triggerLabel.textContent = 'Contents';
      if (trigger) trigger.setAttribute('aria-label', 'Table of contents');
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entering = entries.filter((e) => e.isIntersecting);
      if (entering.length === 0) return;
      const byTop = [...entering].sort(
        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
      );
      const first = byTop[0];
      const id = first.target.id;
      if (id) setActive(id);
    },
    { root: null, rootMargin: ROOT_MARGIN, threshold: 0 }
  );

  headings.forEach((h) => observer.observe(h.element));

  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.scrollspyId;
      if (id) {
        scrollToSection(id);
        nav.classList.remove('is-open');
      }
    });
  });

  if (trigger) {
    trigger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    trigger.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('.post-content.surface-panel h2[id], .post-content.surface-panel h3[id]').forEach((h) => {
    h.setAttribute('tabindex', '-1');
  });

  const scrollThrottle = (fn, ms) => {
    let t = 0;
    return () => {
      const now = Date.now();
      if (now - t >= ms) {
        t = now;
        fn();
      }
    };
  };

  const checkActiveOnScroll = scrollThrottle(() => {
    const vy = window.scrollY;
    let current = null;
    let currentTop = -Infinity;
    headings.forEach((h) => {
      const rect = h.element.getBoundingClientRect();
      const top = rect.top + vy;
      if (vy >= top - SCROLLSPY_OFFSET && top > currentTop) {
        currentTop = top;
        current = h.id;
      }
    });
    if (current) setActive(current);
    else if (vy < 100) clearActive();
  }, 100);

  window.addEventListener('scroll', checkActiveOnScroll, { passive: true });
  checkActiveOnScroll();

  const focusable = Array.from(list.querySelectorAll('.scrollspy-link'));
  list.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('scrollspy-link')) {
      let i = focusable.indexOf(e.target);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        i = Math.min(i + 1, focusable.length - 1);
        focusable[i].focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        i = Math.max(i - 1, 0);
        focusable[i].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusable[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.click();
      }
    }
  });

  nav._scrollspyCleanup = () => {
    observer.disconnect();
    stickObserver.disconnect();
    if (sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
    if (spacer && spacer.parentNode) spacer.parentNode.removeChild(spacer);
    window.removeEventListener('scroll', checkActiveOnScroll);
  };
}

function destroyScrollspy() {
  const nav = document.getElementById('scrollspy-nav');
  if (nav && nav._scrollspyCleanup) {
    nav._scrollspyCleanup();
    nav._scrollspyCleanup = null;
  }
}

export function runScrollspy() {
  destroyScrollspy();
  requestAnimationFrame(initScrollspy);
}
