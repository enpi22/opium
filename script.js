var audio = document.getElementById('audio');
var playPauseBtn = document.getElementById('playPause');
var volumeSlider = document.getElementById('volume');
var progressSlider = document.getElementById('progress');
var timeDisplay = document.getElementById('time');
var isPlaying = false;
playPauseBtn.addEventListener('click', function () {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
    else {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
});
volumeSlider.addEventListener('input', function () {
    audio.volume = parseFloat(volumeSlider.value);
});
progressSlider.addEventListener('input', function () {
    var seekTime = (parseFloat(progressSlider.value) / 100) * audio.duration;
    audio.currentTime = seekTime;
});
audio.addEventListener('timeupdate', function () {
    var progress = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = progress.toString();
    updateTimeDisplay();
});
audio.addEventListener('loadedmetadata', function () {
    updateTimeDisplay();
});
function updateTimeDisplay() {
    var currentTime = formatTime(audio.currentTime);
    var duration = formatTime(audio.duration);
    timeDisplay.textContent = "".concat(currentTime, " / ").concat(duration);
}
function formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    var secsStr = secs < 10 ? '0' + secs : secs.toString();
    return "".concat(mins, ":").concat(secsStr);
}
