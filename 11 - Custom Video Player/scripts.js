/* Get our elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]"); // The brackets are used for attributes
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".fullscreen");

/* Build out functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function spacePlay(e) {
  if (video.paused && e.keyCode == 32) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

let isDragging = false;

function handleRangeUpdate() {
  if (!isDragging) return; // Stop the function when they're not mouseDown
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  if (!isDragging) return; // Stop the function when they're not mouseDown
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function bigScreen() {
  video.requestFullscreen();
  console.log("Now entering fullscreen mode!");
}

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
window.addEventListener("keydown", e => spacePlay(e));
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
ranges.forEach(range =>
  range.addEventListener("mousedown", () => (isDragging = true))
);
ranges.forEach(range =>
  range.addEventListener("mouseup", () => (isDragging = false))
);
// Functions same as #52 with range
// Takes the event XY data and if isDragging
// Runs scrub() passing in event data
progress.addEventListener("mousemove", e => isDragging && scrub(e));
progress.addEventListener("mousedown", () => (isDragging = true));
progress.addEventListener("mouseup", () => (isDragging = false));

fullScreen.addEventListener("click", bigScreen);
