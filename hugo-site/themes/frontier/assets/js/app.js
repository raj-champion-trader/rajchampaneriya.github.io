import Swup from 'swup';

const swup = new Swup({
    containers: ["#swup"],
    animateHistoryBrowsing: true,
    cache: true
});

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

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn?.querySelector('.theme-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌕' : '🌗';
}

// Init Theme
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

import './audio-player.js';
import './ai-chat.js';

console.log('Frontier Theme: Swup & Interactivity Configuration Complete');
