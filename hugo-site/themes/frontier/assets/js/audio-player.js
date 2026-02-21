/**
 * Frontier Theme — Audio Player Module
 * ─────────────────────────────────────
 * Full-featured persistent audio player with:
 *  - Progress bar with click/drag seeking
 *  - Time display (current / duration)
 *  - Rewind / Forward 15 seconds
 *  - Variable playback speed (1×, 1.25×, 1.5×, 2×)
 *  - Context-aware bottom nav Listen button (only active on pages with audio)
 *  - State persistence across page navigations (Swup)
 *  - Distraction-free: player hides when not in use
 */

console.log('Frontier Theme: Audio Player Module Loaded');

// --- DOM references ---
const playerBar = document.getElementById('audio-player-bar');
const audio = document.getElementById('global-audio');
const playPauseBtn = document.getElementById('player-play-pause');
const closeBtn = document.getElementById('player-close');
const rewindBtn = document.getElementById('player-rewind');
const forwardBtn = document.getElementById('player-forward');
const speedBtn = document.getElementById('player-speed');
const triggerBtn = document.getElementById('audio-player-trigger');
const titleDisplay = document.getElementById('player-title');
const timeDisplay = document.getElementById('player-time');
const progressContainer = document.getElementById('player-progress-container');
const progressFilled = document.getElementById('player-progress-filled');
const progressThumb = document.getElementById('player-progress-thumb');

// --- Constants ---
const SPEEDS = [1, 1.25, 1.5, 2];
const SKIP_SECONDS = 15;
const SAVE_INTERVAL = 5;

const ICON_PLAY = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
const ICON_PAUSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';

// --- State ---
let currentSpeedIndex = 0;
let isSeeking = false;

// --- Utilities ---
function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// --- State persistence ---
function saveState() {
  try {
    const state = {
      src: audio.src,
      currentTime: audio.currentTime,
      paused: audio.paused,
      title: titleDisplay ? titleDisplay.textContent : '',
      speed: audio.playbackRate,
      visible: playerBar && !playerBar.classList.contains('hidden')
    };
    localStorage.setItem('frontier_audio_state', JSON.stringify(state));
  } catch (e) { /* storage full or unavailable */ }
}

function loadState() {
  try {
    const saved = localStorage.getItem('frontier_audio_state');
    if (saved) {
      const state = JSON.parse(saved);
      if (state.src && state.src !== window.location.origin + '/') {
        audio.src = state.src;
        audio.currentTime = state.currentTime || 0;
        if (titleDisplay) titleDisplay.textContent = state.title || 'Now Playing...';
        if (state.speed) {
          audio.playbackRate = state.speed;
          currentSpeedIndex = SPEEDS.indexOf(state.speed);
          if (currentSpeedIndex < 0) currentSpeedIndex = 0;
          updateSpeedDisplay();
        }
      }
    }
  } catch (e) { /* corrupt state */ }
  // Never auto-show on load — only when user explicitly plays
  if (playerBar) playerBar.classList.add('hidden');
}

// --- UI updates ---
function updatePlayPauseIcon() {
  if (!playPauseBtn) return;
  playPauseBtn.innerHTML = audio.paused ? ICON_PLAY : ICON_PAUSE;
}

function updateSpeedDisplay() {
  if (!speedBtn) return;
  const speed = SPEEDS[currentSpeedIndex];
  speedBtn.textContent = speed === 1 ? '1\u00d7' : `${speed}\u00d7`;
}

function updateProgress() {
  if (isSeeking || !audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  if (progressFilled) progressFilled.style.width = `${pct}%`;
  if (progressThumb) progressThumb.style.left = `${pct}%`;
  if (progressContainer) progressContainer.setAttribute('aria-valuenow', String(Math.round(pct)));
}

function updateTimeDisplay() {
  if (!timeDisplay) return;
  timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}

function showBar() {
  if (!playerBar) return;
  playerBar.classList.remove('hidden');
  document.body.classList.add('player-bar-visible');
}

function hideBar() {
  if (!playerBar) return;
  playerBar.classList.add('hidden');
  document.body.classList.remove('player-bar-visible');
  if (triggerBtn) triggerBtn.classList.remove('is-playing');
}

function updateBottomNavTrigger() {
  if (!triggerBtn) return;
  if (!audio.paused && audio.src) {
    triggerBtn.classList.add('is-playing');
  } else {
    triggerBtn.classList.remove('is-playing');
  }
}

// --- Player controls ---
function togglePlay() {
  if (!audio.src) return;
  if (audio.paused) {
    audio.play().catch(() => {});
    showBar();
  } else {
    audio.pause();
  }
  updatePlayPauseIcon();
  updateBottomNavTrigger();
  saveState();
}

function closePlayer() {
  audio.pause();
  audio.currentTime = 0;
  hideBar();
  updatePlayPauseIcon();
  updateBottomNavTrigger();
  if (progressFilled) progressFilled.style.width = '0%';
  if (progressThumb) progressThumb.style.left = '0%';
  if (timeDisplay) timeDisplay.textContent = '0:00 / 0:00';
  saveState();
}

function skipBy(seconds) {
  if (!audio.src || !audio.duration) return;
  audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
  updateProgress();
  updateTimeDisplay();
  saveState();
}

function cycleSpeed() {
  currentSpeedIndex = (currentSpeedIndex + 1) % SPEEDS.length;
  audio.playbackRate = SPEEDS[currentSpeedIndex];
  updateSpeedDisplay();
  saveState();
}

// --- Seeking (progress bar interaction) ---
function getSeekPosition(e) {
  if (!progressContainer) return 0;
  const rect = progressContainer.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
}

function seekTo(fraction) {
  if (!audio.duration) return;
  audio.currentTime = fraction * audio.duration;
  const pct = fraction * 100;
  if (progressFilled) progressFilled.style.width = `${pct}%`;
  if (progressThumb) progressThumb.style.left = `${pct}%`;
  updateTimeDisplay();
}

function onSeekStart(e) {
  if (!audio.src) return;
  isSeeking = true;
  if (progressContainer) progressContainer.classList.add('seeking');
  seekTo(getSeekPosition(e));
  e.preventDefault();
}

function onSeekMove(e) {
  if (!isSeeking) return;
  seekTo(getSeekPosition(e));
  e.preventDefault();
}

function onSeekEnd() {
  if (!isSeeking) return;
  isSeeking = false;
  if (progressContainer) progressContainer.classList.remove('seeking');
  saveState();
}

function onProgressKeydown(e) {
  if (!audio.src || !audio.duration) return;
  const step = audio.duration * 0.02;
  if (e.key === 'ArrowRight') { audio.currentTime = Math.min(audio.duration, audio.currentTime + step); e.preventDefault(); }
  if (e.key === 'ArrowLeft')  { audio.currentTime = Math.max(0, audio.currentTime - step); e.preventDefault(); }
  updateProgress();
  updateTimeDisplay();
}

// --- Context-aware bottom nav Listen button ---
function detectPageAudio() {
  const dataEl = document.getElementById('page-audio-data');
  if (dataEl) {
    const src = dataEl.dataset.src;
    const title = dataEl.dataset.title;
    if (triggerBtn) {
      triggerBtn.classList.remove('no-audio');
      triggerBtn.classList.add('has-audio');
      triggerBtn.dataset.audioSrc = src;
      triggerBtn.dataset.audioTitle = title;
    }
  } else {
    if (triggerBtn) {
      // If audio is currently playing, keep button active for play/pause toggle
      if (!audio.paused && audio.src) {
        triggerBtn.classList.remove('no-audio');
        triggerBtn.classList.add('has-audio');
      } else {
        triggerBtn.classList.add('no-audio');
        triggerBtn.classList.remove('has-audio');
        delete triggerBtn.dataset.audioSrc;
        delete triggerBtn.dataset.audioTitle;
      }
    }
  }
}

function onTriggerClick(e) {
  e.preventDefault();
  // If audio is currently playing, toggle play/pause
  if (!audio.paused && audio.src) {
    togglePlay();
    return;
  }
  // If page has audio data, start playing it
  if (triggerBtn && triggerBtn.dataset.audioSrc) {
    window.playAudio(triggerBtn.dataset.audioSrc, triggerBtn.dataset.audioTitle || 'Now Playing...');
    return;
  }
  // If audio was paused but has a source, resume
  if (audio.paused && audio.src) {
    togglePlay();
    return;
  }
}

// --- Bind event listeners ---
if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
if (closeBtn) closeBtn.addEventListener('click', closePlayer);
if (rewindBtn) rewindBtn.addEventListener('click', () => skipBy(-SKIP_SECONDS));
if (forwardBtn) forwardBtn.addEventListener('click', () => skipBy(SKIP_SECONDS));
if (speedBtn) speedBtn.addEventListener('click', cycleSpeed);
if (triggerBtn) triggerBtn.addEventListener('click', onTriggerClick);

// Progress bar — pointer events for mouse + touch
if (progressContainer) {
  progressContainer.addEventListener('mousedown', onSeekStart);
  progressContainer.addEventListener('touchstart', onSeekStart, { passive: false });
  progressContainer.addEventListener('keydown', onProgressKeydown);
}
document.addEventListener('mousemove', onSeekMove);
document.addEventListener('touchmove', onSeekMove, { passive: false });
document.addEventListener('mouseup', onSeekEnd);
document.addEventListener('touchend', onSeekEnd);

// Audio element events
audio.addEventListener('timeupdate', () => {
  updateProgress();
  updateTimeDisplay();
  if (Math.floor(audio.currentTime) % SAVE_INTERVAL === 0) saveState();
});

audio.addEventListener('loadedmetadata', () => {
  updateTimeDisplay();
  updateProgress();
});

audio.addEventListener('play', () => {
  updatePlayPauseIcon();
  updateBottomNavTrigger();
  showBar();
});

audio.addEventListener('pause', () => {
  updatePlayPauseIcon();
  updateBottomNavTrigger();
  saveState();
});

audio.addEventListener('ended', () => {
  updatePlayPauseIcon();
  updateBottomNavTrigger();
  hideBar();
  saveState();
});

// --- Global playAudio function (called from Listen buttons in content) ---
window.playAudio = (src, title) => {
  if (!src) return;
  // If same source and playing, just toggle
  if (audio.src && audio.src.endsWith(src) && !audio.paused) {
    togglePlay();
    return;
  }
  audio.src = src;
  if (titleDisplay) titleDisplay.textContent = title || 'Now Playing...';
  audio.playbackRate = SPEEDS[currentSpeedIndex];
  showBar();
  audio.play().catch(() => {});
  updatePlayPauseIcon();
  updateBottomNavTrigger();
  saveState();
};

// --- Init ---
loadState();
detectPageAudio();

// Re-detect page audio on Swup page transitions
if (window.swup && window.swup.hooks) {
  window.swup.hooks.on('page:view', () => {
    requestAnimationFrame(() => {
      detectPageAudio();
      updateBottomNavTrigger();
    });
  });
} else {
  const waitId = setInterval(() => {
    if (window.swup && window.swup.hooks) {
      window.swup.hooks.on('page:view', () => {
        requestAnimationFrame(() => {
          detectPageAudio();
          updateBottomNavTrigger();
        });
      });
      clearInterval(waitId);
    }
  }, 100);
  setTimeout(() => clearInterval(waitId), 5000);
}
