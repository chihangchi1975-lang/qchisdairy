const list = document.getElementById("notesList");
const title = document.getElementById("noteTitle");
const text = document.getElementById("noteText");
const box = document.getElementById("noteBox");
const settingsPanel = document.getElementById("settingsPanel");
const audio = document.getElementById("bgMusic");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeSlider = document.getElementById("volumeSlider");


let musicStarted = false;
let targetVolume = parseFloat(localStorage.getItem("volume")) || 0.5;
audio.volume = targetVolume;
volumeSlider.value = targetVolume;
let fadeInterval = null;


notes.forEach((n, i) => {
  const div = document.createElement("div");
  div.className = "note-tab";
  div.innerHTML = `
    <small>${n.date}</small>
    <strong>${n.title}${n.locked ? " 🔒" : ""}</strong>
  `;
  div.onclick = () => openNote(i);
  list.appendChild(div);
});

playPauseBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸ Pause";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶ Play";
  }
};

audio.onplay = () => playPauseBtn.textContent = "⏸ Pause";
audio.onpause = () => playPauseBtn.textContent = "▶ Play";

volumeSlider.oninput = () => {
  targetVolume = volumeSlider.value;
  localStorage.setItem("volume", targetVolume);

  // nếu không fade thì cập nhật ngay
  if (!fadeInterval) {
    audio.volume = targetVolume;
  }
};

function openNote(i) {
  if (notes[i].locked) {
    const pass = prompt("This note is locked:");
    if (pass !== notes[i].password) return;
  }

  box.classList.remove("show");
  setTimeout(() => {
    title.textContent = notes[i].title;
    text.innerHTML = notes[i].content.replace(/\n/g, "<br>");
    box.classList.add("show");
  }, 200);
}

/* MUSIC */

function toggleSettings() {
  settingsPanel.classList.toggle("show");
}

function startMusicOnce() {
  if (musicStarted) return;

  audio.src = "The Walters -- I Love You So.mp3"; // bài mặc định
  audio.volume = targetVolume;
  audio.play();

  musicStarted = true;
  document.removeEventListener("click", startMusicOnce);
}

// gắn cho toàn trang
document.addEventListener("click", startMusicOnce);


function changeMusic(src) {
  if (!src) return;

  audio.src = src;
  audio.play();
  musicStarted = true; // đảm bảo trạng thái
}

function fadeIn() {
  clearInterval(fadeInterval);
  audio.volume = 0;

  fadeInterval = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume += 0.05;
    } else {
      audio.volume = targetVolume;
      clearInterval(fadeInterval);
      fadeInterval = null;
    }
  }, 50);
}

function fadeOut(cb) {
  clearInterval(fadeInterval);

  fadeInterval = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.volume = 0;
      clearInterval(fadeInterval);
      fadeInterval = null;
      cb();
    }
  }, 50);
}

function unlockBox(btn) {
  const box = btn.closest(".locked-box");
  const input = box.querySelector("input");
  const content = box.querySelector(".locked-content");
  const password = box.dataset.password;

  if (input.value === password) {
    content.style.display = "block";
    input.style.display = "none";
    btn.style.display = "none";
    box.querySelector(".locked-header").textContent = "🔓 Unlocked";
  } else {
    alert("Wrong password!");
  }
}
