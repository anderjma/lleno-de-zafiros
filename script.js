const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const currentLineEl = document.getElementById("current-line");

const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

const lyrics = [
  { time: 0, text: "..." },
  { time: 11.8, text: "No perder la rabia pa' gritar" },
  { time: 13.5, text: "Ni la calma pa' habitar el caudal de mi alma" },
  { time: 16.5, text: "Mi magma interior me salva, entro a erupcionar" },
  { time: 19.5, text: "Ese es mi estado de alarma, pa' que nada invada mi lugar" },
  { time: 23, text: "Y no hay serenidad que valga, hoy soy de los que bailan" },
  { time: 26.4, text: "Sin seriedad, dejo que la furia salga" },
  { time: 29, text: "Voy a emborrachar al karma" },
  { time: 31, text: "Que para mezclar emociones soy un barman de alta calidad" },
  { time: 34.3, text: "Y recordá que sabio es aquel que llora" },
  { time: 37, text: "El llanto abre el sendero que tapa la droga" },
  { time: 40, text: "Si el camino no me lleva a Roma, al menos que vaya a tu pieza" },
  { time: 43, text: "Así me tiro de cabeza a quemar las horas" },
  { time: 46, text: "Otro domingo de ansiedad donde hasta la paz me incomoda" },
  { time: 49.7, text: "Vago del pantano hasta mi Andrómeda y no es novedad" },
  { time: 53, text: "Mi corazón sigue en la bóveda de la soledad" },
  { time: 56, text: "Y no creo que eso vaya a cambiar por ahora" },
  { time: 58, text: "Veo pasar las horas y me río" },
  { time: 60.3, text: "Pienso que si no estás pierden un poco el sentido" },
  { time: 63.5, text: "Pero me digo: 'no mires tanto para atrás, que el pasado está muy frío" },
  { time: 67, text: "Y capaz que te congelás en un recuerdo vivo'" },
  { time: 71, text: "Me da lo mismo si un retiro espiritual o un pasaje en Retiro" },
  { time: 74, text: "Quiero algún paisaje que me dé un respiro" },
  { time: 76, text: "Perderme en un viaje, corte el de Chihiro" },
  { time: 79, text: "Y encontrarme ese paraje lleno de zafiros" },
  { time: 83, text: "..." },
  { time: 89, text: "Como un animal que busca paz" },
  { time: 91, text: "Pero cae siempre en sus redes" },
  { time: 94, text: "¿Hace cuánto que no vemo' el mar?" },
  { time: 97, text: "'Tamos rayando las paredes" },
  { time: 100, text: "Como un animal que busca paz" },
  { time: 103, text: "Pero cae siempre en sus redes" },
  { time: 105, text: "No te enredes entre credos y dictámenes" },
  { time: 108, text: "No se puede vivir como rindiendo examen" },
  { time: 111, text: "Está bien que exhales y que no examines tanto" },
  { time: 114, text: "Cada cosa que no te sale, parate y dale" },
  { time: 117, text: "Estoy alterado, como previendo otro altercado" },
  { time: 120.2, text: "Sigo admirando al gato por caer parado" },
  { time: 123, text: "Por escapar por el tejado" },
  { time: 125, text: "Lo sagrado camina por los techos menos iluminados" },
  { time: 129, text: "El sol de verano picando a varios grados" },
  { time: 131, text: "Ya no sé si te agrado y te necesito al lado" },
  { time: 134, text: "Es que resucito con tu beso helado, sos un hada" },
  { time: 137, text: "En este plano te estampás contra mi cara, es el mejor regalo" },
  { time: 141, text: "Ya no tranzo con mezquinos del corazón" },
  { time: 143, text: "Acá se deja todo en cada ocasión" },
  { time: 146, text: "O ni nos vimo', en cada trazo le ponemo' amor" },
  { time: 148.7, text: "Y en cada paso sale un dolor que exorcizamo' en el camino" },
  { time: 152, text: "Puede que me vea alicaído, pero tirado no" },
  { time: 156, text: "Es como ver a Ali caído" },
  { time: 158, text: "Ves un tono sombrío, hasta cuando sonrío" },
  { time: 161, text: "Me quedo estos problemas o mejor me los olvido" },
  { time: 164, text: "..." },
  { time: 171, text: "Como un animal que busca paz" },
  { time: 173, text: "Pero cae siempre en sus redes" },
  { time: 176, text: "¿Hace cuánto que no vemo' el mar?" },
  { time: 180, text: "'Tamos rayando las paredes" },
  { time: 182, text: "Como un animal que busca paz" },
  { time: 185, text: "Pero cae siempre en sus redes" },
  { time: 187, text: "..." }
];

let currentIndex = -1;
let lyricTimeout = null;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getCurrentLyricIndex(currentTime) {
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].time) {
      return i;
    }
  }
  return -1;
}

function setLyricText(index) {
  currentLineEl.textContent = index >= 0 ? lyrics[index].text : "";
}

function animateLyricChange(newIndex) {
  clearTimeout(lyricTimeout);

  currentLineEl.classList.remove("fade-in");
  currentLineEl.classList.add("fade-out");

  lyricTimeout = setTimeout(() => {
    setLyricText(newIndex);

    currentLineEl.classList.remove("fade-out");

    // Fuerza reflow para que la transición sí se vea
    void currentLineEl.offsetWidth;

    currentLineEl.classList.add("fade-in");
  }, 260);
}

function updateLyrics(force = false) {
  const newIndex = getCurrentLyricIndex(audio.currentTime);

  if (!force && newIndex === currentIndex) return;

  currentIndex = newIndex;
  animateLyricChange(newIndex);
}

function updateProgress() {
  if (!audio.duration) return;

  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);

  updateLyrics();
}

function updatePlayPauseButton() {
  if (audio.paused) {
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
  } else {
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function restartSong() {
  audio.currentTime = 0;
  updateLyrics(true);
  audio.play();
}

function tryAutoplay() {
  audio.play().catch(() => {
    updatePlayPauseButton();
  });
}

playPauseBtn.addEventListener("click", togglePlayPause);
restartBtn.addEventListener("click", restartSong);

progressBar.addEventListener("input", () => {
  if (!audio.duration) return;

  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  updateLyrics(true);
});

audio.addEventListener("play", updatePlayPauseButton);
audio.addEventListener("pause", updatePlayPauseButton);

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
  currentTimeEl.textContent = formatTime(audio.currentTime);
  progressBar.value = 0;

  setLyricText(getCurrentLyricIndex(audio.currentTime));
  currentIndex = getCurrentLyricIndex(audio.currentTime);

  updatePlayPauseButton();
  tryAutoplay();
});

audio.addEventListener("timeupdate", updateProgress);

audio.addEventListener("ended", () => {
  updatePlayPauseButton();
});

window.addEventListener("load", () => {
  updatePlayPauseButton();
  setLyricText(getCurrentLyricIndex(0));
  currentIndex = getCurrentLyricIndex(0);
});