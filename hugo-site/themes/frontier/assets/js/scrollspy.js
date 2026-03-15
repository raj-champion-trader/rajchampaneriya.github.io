/**
 * Responsive scrollspy navigation for article pages.
 * - When in header (.scrollspy-nav--header): no sentinel/stick; uses full header height for scroll offset.
 * - Extracts h2 from .post-content or .page-content, builds TOC (H2 only)
 * - Intersection Observer for active section
 * - Smooth scroll with offset for sticky header
 * - Collapsible dropdown; keyboard and ARIA support
 */

const SCROLLSPY_OFFSET = 80; // px from top to consider "active"
const HEADER_OFFSET = 56; // fallback when header height not measurable
const ROOT_MARGIN = `-${HEADER_OFFSET + 24}px 0px -60% 0px`;

function getScrollspyOffset() {
  const header = document.querySelector('.site-header');
  if (!header) return HEADER_OFFSET;
  return header.getBoundingClientRect().height;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = getScrollspyOffset();
  const top = el.getBoundingClientRect().top + window.scrollY - offset - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}

function getContentContainer() {
  const main = document.querySelector('#swup');
  const singleContent = main ? main.querySelector('.single-post .post-content') : document.querySelector('.single-post .post-content');
  if (singleContent) return singleContent;
  return main ? main.querySelector('.page-header .page-content') || main.querySelector('.page-content') : document.querySelector('.page-header .page-content') || document.querySelector('.page-content');
}

function buildHeadings(content) {
  const headings = content.querySelectorAll('h2[id]');
  return Array.from(headings).map((el) => ({
    id: el.id,
    text: el.textContent.replace(/\s*#\s*$/, '').trim(),
    element: el,
  }));
}

function createNavItem({ id, text }) {
  const li = document.createElement('li');
  li.className = 'scrollspy-item';
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

function initScrollspy() {
  const nav = document.getElementById('scrollspy-nav');
  if (!nav) return;

  /* Reset nav state so navigation never shows stale content (e.g. after Swup page change) */
  nav.classList.remove('has-items', 'scrollspy-row-hidden');
  const listEl = nav.querySelector('#scrollspy-list');
  if (listEl) listEl.innerHTML = '';
  const triggerEl = nav.querySelector('.scrollspy-trigger');
  const triggerLabelEl = triggerEl ? triggerEl.querySelector('.scrollspy-trigger-label') : null;
  if (triggerLabelEl) triggerLabelEl.textContent = 'Contents';
  nav.setAttribute('hidden', '');

  const content = getContentContainer();
  if (!content) return;

  const headings = buildHeadings(content);
  if (headings.length === 0) {
    nav.setAttribute('hidden', '');
    return;
  }

  /* Page title for trigger label (replaces "Contents") */
  const singlePost = content.closest('.single-post');
  const pageHeader = content.closest('.page-header');
  const pageTitle = singlePost?.querySelector('.post-header h1, h1')?.textContent?.trim() ||
    pageHeader?.querySelector('h1')?.textContent?.trim() ||
    document.title.split('|')[0].trim() ||
    'Contents';

  nav.removeAttribute('hidden');
  nav.classList.add('has-items');

  const isInHeader = nav.classList.contains('scrollspy-nav--header');
  if (isInHeader) {
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
      const updateHeaderHeightVar = () => {
        const h = siteHeader.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height-with-scrollspy', `${Math.ceil(h) + 8}px`);
      };
      updateHeaderHeightVar();
      const ro = new ResizeObserver(updateHeaderHeightVar);
      ro.observe(siteHeader);
      nav._scrollspyResizeObserver = ro;
    }
    /* Smart auto-hide: hide scrollspy row when viewport is outside main content */
    const contentArea = content.closest('.single-post') || content.closest('.page-header') || content;
    if (contentArea) {
      const autoHideObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          if (e.isIntersecting) {
            nav.classList.remove('scrollspy-row-hidden');
          } else {
            nav.classList.add('scrollspy-row-hidden');
          }
        },
        { root: null, rootMargin: '0px', threshold: 0 }
      );
      autoHideObserver.observe(contentArea);
      nav._scrollspyAutoHideObserver = autoHideObserver;
      nav._scrollspyContentArea = contentArea;
      /* Set initial state to avoid flash */
      const rect = contentArea.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const inView = rect.top < viewHeight && rect.bottom > 0;
      if (!inView) nav.classList.add('scrollspy-row-hidden');
    }
  }

  const list = nav.querySelector('#scrollspy-list');
  if (!list) return;
  list.innerHTML = '';
  list.setAttribute('role', 'list');

  let sentinel = null;
  let spacer = null;
  let stickObserver = null;

  if (!isInHeader) {
    /* Sentinel: when it scrolls above the header line, fix the scrollspy to the top (standalone only) */
    sentinel = document.createElement('div');
    sentinel.className = 'scrollspy-sentinel';
    sentinel.setAttribute('aria-hidden', 'true');
    nav.parentNode.insertBefore(sentinel, nav);

    stickObserver = new IntersectionObserver(
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
  }

  const trigger = nav.querySelector('.scrollspy-trigger');
  const fragment = document.createDocumentFragment();
  headings.forEach((h) => fragment.appendChild(createNavItem(h)));
  list.appendChild(fragment);

  const links = list.querySelectorAll('.scrollspy-link');
  const linkById = new Map(Array.from(links).map((a) => [a.dataset.scrollspyId, a]));
  const triggerLabel = trigger ? trigger.querySelector('.scrollspy-trigger-label') : null;
  const headingById = new Map(headings.map((h) => [h.id, h]));

  if (triggerLabel) triggerLabel.textContent = pageTitle;
  if (trigger) trigger.setAttribute('aria-label', `Table of contents: ${pageTitle}`);

  function setActive(id) {
    links.forEach((a) => a.classList.remove('is-active'));
    const active = linkById.get(id);
    if (active) {
      active.classList.add('is-active');
      active.setAttribute('aria-current', 'location');
      if (triggerLabel) {
        const h = headingById.get(id);
        triggerLabel.textContent = h ? h.text : pageTitle;
        trigger.setAttribute('aria-label', h ? `Current: ${h.text}. Tap to open table of contents.` : `Table of contents: ${pageTitle}`);
      }
    } else {
      links.forEach((a) => a.removeAttribute('aria-current'));
      if (triggerLabel) {
        triggerLabel.textContent = pageTitle;
        if (trigger) trigger.setAttribute('aria-label', `Table of contents: ${pageTitle}`);
      }
    }
  }

  function clearActive() {
    links.forEach((a) => {
      a.classList.remove('is-active');
      a.removeAttribute('aria-current');
    });
    if (triggerLabel) {
      triggerLabel.textContent = pageTitle;
      if (trigger) trigger.setAttribute('aria-label', `Table of contents: ${pageTitle}`);
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

  document.querySelectorAll('.post-content.surface-panel h2[id], .page-content.surface-panel h2[id]').forEach((h) => {
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
    const offset = getScrollspyOffset() + 24; /* use actual header height so first section activates correctly on mobile */
    let current = null;
    let currentTop = -Infinity;
    headings.forEach((h) => {
      const rect = h.element.getBoundingClientRect();
      const top = rect.top + vy;
      if (vy >= top - offset && top > currentTop) {
        currentTop = top;
        current = h.id;
      }
    });
    if (current) setActive(current);
    else if (vy < 100) setActive(headings[0].id); /* at top of page, highlight first section */
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
    if (stickObserver) stickObserver.disconnect();
    if (sentinel && sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
    if (spacer && spacer.parentNode) spacer.parentNode.removeChild(spacer);
    if (nav._scrollspyResizeObserver) {
      const siteHeader = document.querySelector('.site-header');
      if (siteHeader) nav._scrollspyResizeObserver.unobserve(siteHeader);
      nav._scrollspyResizeObserver = null;
    }
    if (nav._scrollspyAutoHideObserver && nav._scrollspyContentArea) {
      nav._scrollspyAutoHideObserver.unobserve(nav._scrollspyContentArea);
      nav._scrollspyAutoHideObserver = null;
      nav._scrollspyContentArea = null;
    }
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
