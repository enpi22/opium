const audio = document.getElementById('audio') as HTMLAudioElement;
const playPauseBtn = document.getElementById('playPause') as HTMLButtonElement;
const volumeSlider = document.getElementById('volume') as HTMLInputElement;
const progressSlider = document.getElementById('progress') as HTMLInputElement;
const timeDisplay = document.getElementById('time') as HTMLSpanElement;

let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    } else {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volumeSlider.value);
});

progressSlider.addEventListener('input', () => {
    const seekTime = (parseFloat(progressSlider.value) / 100) * audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = progress.toString();
    updateTimeDisplay();
});

audio.addEventListener('loadedmetadata', () => {
    updateTimeDisplay();
});

function updateTimeDisplay() {
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeDisplay.textContent = `${currentTime} / ${duration}`;
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const secsStr = secs < 10 ? '0' + secs : secs.toString();
    return `${mins}:${secsStr}`;
}