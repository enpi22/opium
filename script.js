document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPause');
    const progressSlider = document.getElementById('progress');
    const timeDisplay = document.getElementById('time');

    if (!audio || !playPauseBtn || !progressSlider || !timeDisplay) {
        console.error('Required elements not found');
        return;
    }

    /* ---------------- PLAY / PAUSE ---------------- */

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(err => console.error(err));
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', () => {
        playPauseBtn.textContent = '⏸';
    });

    audio.addEventListener('pause', () => {
        playPauseBtn.textContent = '▶';
    });

    audio.addEventListener('ended', () => {
        playPauseBtn.textContent = '▶';
        progressSlider.value = 0;
        updateTimeDisplay();
    });

    /* ---------------- SEEK BAR ---------------- */

    // Seek when user drags slider
    progressSlider.addEventListener('input', () => {
        if (!audio.duration) return;

        const seekTime = (progressSlider.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        updateTimeDisplay();
    });

    // Update slider while audio plays
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;

        const progress = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progress;
        updateTimeDisplay();
    });

    /* ---------------- METADATA ---------------- */

    audio.addEventListener('loadedmetadata', () => {
        progressSlider.value = 0;
        updateTimeDisplay();
    });

    audio.addEventListener('error', () => {
        timeDisplay.textContent = 'Error loading audio';
    });

    /* ---------------- HELPERS ---------------- */

    function updateTimeDisplay() {
        if (!audio.duration || isNaN(audio.duration)) {
            timeDisplay.textContent = '0:00 / 0:00';
            return;
        }

        const current = formatTime(audio.currentTime);
        const total = formatTime(audio.duration);
        timeDisplay.textContent = `${current} / ${total}`;
    }

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
