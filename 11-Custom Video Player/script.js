const video = document.querySelector(".viewer");
const player = document.querySelector(".player");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player__slider");

// 播放和暂停
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

// 切换状态图标
function updateIcon() {
  if (video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "❚ ❚";
  }
}
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);

// 快进快退
function skip() {
  // data-**这样的属性需要通过 .dataset.**来访问。因为我们获取到的是字符串，所以要通过 `parseFloat` 来转换一下。
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach((item) => item.addEventListener("click", skip));
// 音量和播放速度
function handleRangeUpdate() {
  video[this.name] = this.value;
}
ranges.forEach((item) => item.addEventListener("change", handleRangeUpdate));
ranges.forEach((item) => item.addEventListener("mousemove", handleRangeUpdate));
// 进度条展示播放进度

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener("timeupdate", handleProgress);
// 拖动进度条改变播放进度
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
