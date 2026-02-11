const scrollButtons = document.querySelectorAll("[data-scroll]");
const noteReveal = document.getElementById("noteReveal");
const revealButton = document.getElementById("reveal");
const sparkleButton = document.getElementById("sparkle");
const yesButton = document.getElementById("yesBtn");
const hugButton = document.getElementById("hugBtn");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const musicBurst = document.getElementById("musicBurst");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseReveal = document.getElementById("surpriseReveal");
const surpriseTiles = document.querySelectorAll(".surprise-tile");
const unlockSecretsButton = document.getElementById("unlockSecrets");
const secretCodeInput = document.getElementById("secretCode");
const secretHint = document.getElementById("secretHint");
const secretCards = document.querySelectorAll(".secret-card");
const shuffleNotesButton = document.getElementById("shuffleNotes");
const specialNoteCards = document.querySelectorAll("[data-note-slot]");
const gameTiles = document.querySelectorAll(".game-tile");
const gameStatus = document.getElementById("gameStatus");
const resetGameButton = document.getElementById("resetGame");
const proposalYes = document.getElementById("proposalYes");
const proposalMaybe = document.getElementById("proposalMaybe");
const lovePopup = document.getElementById("lovePopup");
const closePopup = document.getElementById("closePopup");
const lovePopupTitle = document.querySelector(".love-popup-title");
const lovePopupBody = document.querySelector(".love-popup-body");

const loveNotes = [
  "You are the calm in my chaos and the sparkle in my day. ✨",
  "Every hug with you feels like home. 🫂",
  "Kunal, you are my favorite forever. 💞",
  "My heart smiles every time I think of you. 😊",
  "You + me = magic, always. 💫",
  "One kiss from you turns any day into a holiday. 💋",
  "Your voice is my favorite love song. 🎶"
];

const surpriseMessages = [
  "Surprise! A thousand hugs wrapped in one message just for you. 🫂",
  "A romantic kiss is floating your way right now. 💋",
  "Every day with you is Valentine’s Day. ❤️",
  "You are the reason love feels easy and bright. ✨",
  "Your smile is the secret spark that keeps me glowing. 💖",
  "A soft kiss, a warm hug, and all my love. 😘",
  "You make ordinary moments feel magical. 💫",
  "Sending a shower of hearts for Kunal. 💗",
  "Your name is written on every beat of my heart. 💘",
  "Forever looks beautiful with you in it. 🌹",
  "You are the sweetest surprise in my life. 🎁",
  "A hug for now, a kiss for later, and love forever. 💞"
];

const specialLoveNotes = [
  "Good morning, Kunal — your name is the first smile of my day. ☀️💗",
  "Every hug with you is a soft place for my heart to land. 🫂",
  "You are my favorite secret, my sweetest yes, my safest home. 🏡💞",
  "A thousand tiny moments with you feel like one giant love story. ✨",
  "Your laughter is my favorite love note in the universe. 🌙💌",
  "If love had a color, it would look like you. 🎨💘",
  "My heart whispers your name in every quiet moment. 🤍",
  "Holding your hand feels like the warmest promise. 🤝💖"
];

const floatingEmojis = ["💋", "💖", "💘", "💗", "💞", "❤️", "😘", "🫶", "🫂"];
const fireworkEmojis = ["🎆", "🎇", "✨", "💖", "💥"];

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

revealButton.addEventListener("click", () => {
  const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
  noteReveal.textContent = randomNote;
  noteReveal.classList.add("visible");
});

function shuffleArray(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function fillSpecialNotes() {
  if (!specialNoteCards.length) return;
  const notes = shuffleArray(specialLoveNotes);
  specialNoteCards.forEach((card, index) => {
    const note = notes[index % notes.length];
    card.innerHTML = `<span>Love note ${index + 1}</span>${note}`;
  });
}

fillSpecialNotes();

if (shuffleNotesButton) {
  shuffleNotesButton.addEventListener("click", () => {
    fillSpecialNotes();
    burstEmojis(["💌", "💗", "✨"]);
  });
}

sparkleButton.addEventListener("click", () => {
  burstEmojis(["✨", "💖", "💫", "🌟"]);
});

yesButton.addEventListener("click", () => {
  triggerAcceptanceEffects({
    title: "Forever yes, Kunal! 💖",
    body: "The love story keeps glowing, and the fireworks are all for you. 🎆💋"
  });
});

hugButton.addEventListener("click", () => {
  burstEmojis(["🫂", "🤗", "💕", "🥰"]);
});

proposalYes.addEventListener("click", () => {
  triggerAcceptanceEffects({
    title: "Love you, Kunal! 💗",
    body: "You said yes, and my heart just danced in fireworks. 🎆💋"
  });
});

proposalMaybe.addEventListener("click", () => {
  burstEmojis(["💞", "💌", "🥰", "✨"]);
});

closePopup.addEventListener("click", () => {
  hideLovePopup();
});

lovePopup.addEventListener("click", (event) => {
  if (event.target === lovePopup) {
    hideLovePopup();
  }
});

surpriseButton.addEventListener("click", () => {
  const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
  surpriseReveal.textContent = randomMessage;
  surpriseReveal.classList.add("revealed");
  burstEmojis(["💝", "💋", "💘", "❤️"]);
});

surpriseTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    tile.textContent = tile.dataset.surprise;
    tile.classList.add("opened");
    burstEmojis(["💖", "✨", "💋"]);
  });
});

let secretsUnlocked = false;

unlockSecretsButton.addEventListener("click", () => {
  const code = secretCodeInput.value.trim().toLowerCase();
  if (code === "kunal") {
    secretsUnlocked = true;
    secretHint.textContent = "Unlocked! Tap the cards to reveal secret messages. 💝";
    burstEmojis(["🔓", "💗", "💋"]);
  } else {
    secretHint.textContent = "That code is shy. Try KUNAL. 💌";
    burstEmojis(["🔒", "💞"]);
  }
});

secretCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!secretsUnlocked) {
      secretHint.textContent = "Enter the love code to unlock the secrets. 💗";
      burstEmojis(["🔒", "💖"]);
      return;
    }

    card.textContent = card.dataset.secret;
    card.classList.add("revealed");
    burstEmojis(["💝", "💋", "✨"]);
  });
});

let secretHeartIndex = Math.floor(Math.random() * gameTiles.length);
let gameTries = 0;

function resetGame() {
  secretHeartIndex = Math.floor(Math.random() * gameTiles.length);
  gameTries = 0;
  if (gameStatus) {
    gameStatus.textContent = "Tap a tile to find the hidden heart. 💖";
  }
  gameTiles.forEach((tile) => {
    tile.textContent = "?";
    tile.classList.remove("revealed", "miss");
    tile.disabled = false;
  });
}

gameTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (tile.classList.contains("revealed")) return;
    const tileIndex = Number(tile.dataset.tile);
    gameTries += 1;

    if (tileIndex === secretHeartIndex) {
      tile.textContent = "💖";
      tile.classList.add("revealed");
      tile.disabled = true;
      if (gameStatus) {
        gameStatus.textContent = `You found the secret heart in ${gameTries} tap${gameTries > 1 ? "s" : ""}! Secret love message unlocked: “Kunal, you are my forever surprise.” 💞`;
      }
      burstEmojis(["💖", "💘", "🎉"]);
      launchFireworks();
      gameTiles.forEach((otherTile) => {
        if (otherTile !== tile) {
          otherTile.disabled = true;
        }
      });
    } else {
      tile.textContent = "✨";
      tile.classList.add("miss");
      tile.disabled = true;
      if (gameStatus) {
        gameStatus.textContent = `Not there yet — try again! Attempts: ${gameTries}. 💫`;
      }
      burstEmojis(["💫", "💌"]);
    }
  });
});

if (resetGameButton) {
  resetGameButton.addEventListener("click", () => {
    resetGame();
    burstEmojis(["🫶", "💖"]);
  });
}

resetGame();

let audioContext;
let masterGain;
let isPlaying = false;
let chordTimer;
let activeOscillators = [];

const chords = [
  [261.63, 329.63, 392.0],
  [293.66, 369.99, 440.0],
  [329.63, 415.3, 493.88],
  [246.94, 311.13, 392.0]
];

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.08;
    masterGain.connect(audioContext.destination);
  }
}

function stopChord() {
  activeOscillators.forEach((oscillator) => {
    oscillator.stop();
  });
  activeOscillators = [];
}

function playChord(frequencies) {
  stopChord();
  frequencies.forEach((frequency) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.value = 0.35;
    osc.connect(gain).connect(masterGain);
    osc.start();
    activeOscillators.push(osc);
  });
}

function startMusic() {
  ensureAudio();
  audioContext.resume();
  let index = 0;
  playChord(chords[index]);
  index = 1;
  chordTimer = setInterval(() => {
    playChord(chords[index]);
    index = (index + 1) % chords.length;
  }, 4500);
  isPlaying = true;
  musicToggle.textContent = "Pause love music ⏸️";
  musicStatus.textContent = "Music is playing softly in the background. 🎶";
}

function stopMusic() {
  clearInterval(chordTimer);
  stopChord();
  isPlaying = false;
  musicToggle.textContent = "Play love music ▶️";
  musicStatus.textContent = "Music is resting. Press play to begin. 💗";
}

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

musicBurst.addEventListener("click", () => {
  burstEmojis(["💋", "❤️", "💗", "💞"]);
});

function spawnFloatingEmoji() {
  const emoji = document.createElement("span");
  emoji.className = "floating-emoji";
  emoji.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
  emoji.style.left = `${Math.random() * 92 + 4}%`;
  emoji.style.bottom = `${Math.random() * 20 - 10}%`;
  emoji.style.fontSize = `${Math.random() * 1.2 + 1.2}rem`;
  emoji.style.animationDuration = `${Math.random() * 4 + 6}s`;
  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 10000);
}

setInterval(spawnFloatingEmoji, 1200);

function burstEmojis(emojis) {
  for (let i = 0; i < 24; i += 1) {
    const emoji = document.createElement("span");
    emoji.className = "emoji-pop";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 90 + 5}%`;
    emoji.style.bottom = `${Math.random() * 20 + 10}%`;
    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 2600);
  }
}

function launchFireworks() {
  for (let i = 0; i < 36; i += 1) {
    const firework = document.createElement("span");
    firework.className = "firework";
    firework.textContent = fireworkEmojis[Math.floor(Math.random() * fireworkEmojis.length)];
    firework.style.left = `${Math.random() * 90 + 5}%`;
    firework.style.top = `${Math.random() * 50 + 10}%`;
    firework.style.animationDuration = `${Math.random() * 0.8 + 1.2}s`;
    document.body.appendChild(firework);

    setTimeout(() => firework.remove(), 2200);
  }
}

let popupTimer;
let acceptanceTimer;

function triggerAcceptanceEffects(message) {
  document.body.classList.add("accepting");
  launchFireworks();
  burstEmojis(["💖", "💘", "💋", "❤️"]);
  if (message) {
    lovePopupTitle.textContent = message.title;
    lovePopupBody.textContent = message.body;
  }
  showLovePopup();
  clearTimeout(acceptanceTimer);
  acceptanceTimer = setTimeout(() => {
    document.body.classList.remove("accepting");
  }, 4200);
}

function showLovePopup() {
  lovePopup.classList.add("show");
  lovePopup.setAttribute("aria-hidden", "false");
  clearTimeout(popupTimer);
  popupTimer = setTimeout(() => {
    hideLovePopup();
  }, 4500);
}

function hideLovePopup() {
  lovePopup.classList.remove("show");
  lovePopup.setAttribute("aria-hidden", "true");
}