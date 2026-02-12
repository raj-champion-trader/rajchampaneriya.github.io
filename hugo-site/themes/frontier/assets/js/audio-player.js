console.log('Frontier Theme: Audio Player Module Loaded');

const playerBar = document.getElementById('audio-player-bar');
const audio = document.getElementById('global-audio');
const playPauseBtn = document.getElementById('player-play-pause');
const closeBtn = document.getElementById('player-close');
const triggerBtn = document.getElementById('audio-player-trigger');
const titleDisplay = document.getElementById('player-title');

// State Management
function saveState() {
    const state = {
        src: audio.src,
        currentTime: audio.currentTime,
        paused: audio.paused,
        title: titleDisplay.textContent,
        visible: !playerBar.classList.contains('hidden')
    };
    localStorage.setItem('frontier_audio_state', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('frontier_audio_state');
    if (saved) {
        const state = JSON.parse(saved);
        if (state.src) {
            audio.src = state.src;
            audio.currentTime = state.currentTime;
            titleDisplay.textContent = state.title || 'Now Playing...';
            if (state.visible) playerBar.classList.remove('hidden');
            // Don't auto-play on load to avoid browser policies blocking
        }
    }
}

// Controls
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    }
    saveState();
}

function closePlayer() {
    audio.pause();
    playerBar.classList.add('hidden');
    saveState();
}

function showPlayer() {
    playerBar.classList.remove('hidden');
    saveState();
}

// Event Listeners
if (triggerBtn) triggerBtn.addEventListener('click', showPlayer);
if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
if (closeBtn) closeBtn.addEventListener('click', closePlayer);

audio.addEventListener('timeupdate', () => {
    // Save state occasionally or on pause, not every tick to avoid performance hit
    if (Math.floor(audio.currentTime) % 5 === 0) saveState();
});

// Load on init
loadState();

// Export global for other scripts to use
window.playAudio = (src, title) => {
    audio.src = src;
    titleDisplay.textContent = title;
    showPlayer();
    audio.play();
    playPauseBtn.textContent = '⏸️';
    saveState();
};
