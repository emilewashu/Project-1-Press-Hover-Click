const lyrics = [
  `In soft <span class="hover-word-bleeding">bleeding</span>, we will unite`,
  ' We <span class="strike"> OOZ </span>two souls, pastel blues ',
  'Heightened <span class="hover-word-touch">touch</span> from losing sight',
  '<span class="text-wiggle"> Swimming through the blue lagoon </span>',
  '<span class="hover-word-darken"> Basking in the dark of night</span>',
  '<span class="text-fall">Of depths unknown to be explored</span>',
  '<span class="text-rise">We sink together through the sky</span>',
];

let currentIndex = 0;
const contentDisplay = document.getElementById("lyric");
const backButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const carousel = document.getElementById("carousel");

const flashlight = document.querySelector(".flashlight");

const music = document.getElementById("bg-music");
const toggle = document.getElementById("music-toggle");
let isPlaying = false;

const swimmerLayer = document.getElementById("swimmer-layer");

function playMusic() {
  toggle.addEventListener("click", () => {
    if (!isPlaying) {
      music.volume = 0.4;
      music.play();
      toggle.textContent = "🔇";
    } else {
      music.pause();
      toggle.textContent = "🔊";
    }
    isPlaying = !isPlaying;
  });
}

function createCarouselDots() {
  carousel.innerHTML = "";
  lyrics.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    if (index === currentIndex) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateContent();
    });

    carousel.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// SWIMMING EFFECT
function splitLetters() {
  const el = document.querySelector(".text-wiggle");
  if (!el) return;

  const text = el.innerText;
  el.innerHTML = text
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      return `<span class="shift-letter ${
        i % 2 === 0 ? "even" : "odd"
      }">${char}</span>`;
    })
    .join("");
}

function spawnBubbles(x, y, count = 6) {
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    bubble.style.left = x + offsetX + "px";
    bubble.style.top = y + offsetY + "px";

    document.body.appendChild(bubble);

    bubble.addEventListener("animationend", () => bubble.remove());
  }
}

// FALLING EFFECT
function splitLettersFall() {
  const el = document.querySelector(".text-fall");
  if (!el) return;

  const text = el.innerText;
  el.innerHTML = text
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      return `<span class="fall-letter">${char}</span>`;
    })
    .join("");
}

function lockLetterFall() {
  document.querySelectorAll(".fall-letter").forEach((letter) => {
    let moved = false;

    letter.addEventListener("click", () => {
      if (moved) return;

      const rect = letter.getBoundingClientRect();

      spawnBubbles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      letter.style.transform = `translateY(${800}px)`;
      const bubbleInterval = setInterval(() => {
        const r = letter.getBoundingClientRect();
        spawnBubbles(r.left + r.width / 2, r.top + r.height / 2, 2);
      }, 120);

      setTimeout(() => clearInterval(bubbleInterval), 1200);

      moved = true;
    });
  });
}

//RISING EFFECT
function splitLettersRise() {
  const el = document.querySelector(".text-rise");
  if (!el) return;

  const text = el.innerText;
  el.innerHTML = text
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      return `<span class="rise-letter">${char}</span>`;
    })
    .join("");
}

function lockLetterRise() {
  document.querySelectorAll(".rise-letter").forEach((letter) => {
    let moved = false;

    letter.addEventListener("click", () => {
      if (moved) return;

      const rect = letter.getBoundingClientRect();

      spawnBubbles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      letter.style.transform = `translateY(${-800}px)`;
      const bubbleInterval = setInterval(() => {
        const r = letter.getBoundingClientRect();
        spawnBubbles(r.left + r.width / 2, r.top + r.height / 2, 2);
      }, 120);

      setTimeout(() => clearInterval(bubbleInterval), 1200);

      moved = true;
    });
  });
}

//ROCKET OOZ EFFECT
function triggerPageStrike() {
  const strike = document.createElement("div");
  strike.className = "page-strike";
  document.body.appendChild(strike);

  document.body.classList.add("impact");
  setTimeout(() => document.body.classList.remove("impact"), 8000);

  strike.addEventListener("animationend", () => strike.remove());
}

//flashlight
const moveFlashlight = (e) => {
  flashlight.style.left = e.clientX + "px";
  flashlight.style.top = e.clientY + "px";
};

//fish swimming
function spawnSwimmer() {
  const swimmer = document.createElement("img");
  swimmer.src = "media/tuna.gif";
  swimmer.className = "swimmer";

  const y = Math.random() * (window.innerHeight - 100);
  const duration = 6 + Math.random() * 8;

  swimmer.style.top = `${y}px`;
  swimmer.style.animationDuration = `${duration}s`;

  swimmerLayer.appendChild(swimmer);

  swimmer.addEventListener("animationend", () => {
    swimmer.remove();
  });
}

function startSwimmers() {
  if (!window.swimmerInterval) {
    window.swimmerInterval = setInterval(spawnSwimmer, 3000);
  }
}

function stopSwimmers() {
  clearInterval(window.swimmerInterval);
  window.swimmerInterval = null;
}

// HOVER EFFECTS
function attachHoverEffects() {
  document.querySelectorAll(".hover-word-bleeding").forEach((word) => {
    word.addEventListener("mouseenter", () => {
      document.body.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
    });
    word.addEventListener("mouseleave", () => {
      document.body.style.backgroundColor = "";
    });
  });

  document.querySelectorAll(".hover-word-darken").forEach((word) => {
    word.addEventListener("mouseenter", () => {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    });
  });

  document.querySelectorAll(".hover-word-touch").forEach((word) => {
    word.addEventListener("click", () => {
      console.log("h");
      document.body.style.backgroundImage = "url('media/ocean1.gif')";
    });
  });
  document.querySelectorAll(".strike").forEach((word) => {
    word.addEventListener("click", () => {
      triggerPageStrike();
    });
  });
}

//UPDATE CONTENT FUNCTION TO SEE EFFECTS
function updateContent() {
  contentDisplay.classList.remove("fade-in");
  contentDisplay.classList.add("fade-out");

  setTimeout(() => {
    contentDisplay.innerHTML = lyrics[currentIndex];
    contentDisplay.classList.remove("fade-out");
    void contentDisplay.offsetWidth;
    contentDisplay.classList.add("fade-in");

    // your existing logic
    switch (currentIndex) {
      case 0:
        document.body.style.backgroundImage = "url('media/sky.gif')";
        document.body.style.backgroundColor = "";
        flashlight.style.display = "none";
        document.body.style.cursor = "auto";
        swimmerLayer.classList.add("hidden");
        stopSwimmers();
        break;
      case 1:
        document.body.style.backgroundImage = "url('media/sky.gif')";
        document.body.style.backgroundColor = "";
        flashlight.style.display = "none";
        document.body.style.cursor = "auto";
        swimmerLayer.classList.add("hidden");
        stopSwimmers();
        break;
      case 2:
        document.body.style.backgroundImage = "url('media/sky.gif')";
        document.body.style.backgroundColor = "";
        flashlight.style.display = "none";
        document.body.style.cursor = "auto";
        swimmerLayer.classList.add("hidden");
        stopSwimmers();
        break;
      case 3:
        document.body.style.backgroundImage = "url('media/ocean1.gif')";
        document.body.style.backgroundColor = "";
        flashlight.style.display = "none";
        document.body.style.cursor = "auto";
        swimmerLayer.classList.remove("hidden");
        startSwimmers();
        break;
      case 4:
      case 5:
      case 6:
        document.body.style.backgroundImage = "url('media/ocean1.gif')";
        window.addEventListener("mousemove", moveFlashlight);
        flashlight.style.display = "block";
        document.body.style.cursor = "none";
        break;
    }

    attachHoverEffects();
    splitLetters();
    splitLettersFall();
    splitLettersRise();
    lockLetterFall();
    lockLetterRise();
    createCarouselDots();
    updateDots();
    playMusic();
  }, 600);
}

function nextItem() {
  currentIndex = (currentIndex + 1) % lyrics.length;
  updateContent();
}

function prevItem() {
  currentIndex = (currentIndex - 1 + lyrics.length) % lyrics.length;
  updateContent();
}

nextButton.addEventListener("click", nextItem);
backButton.addEventListener("click", prevItem);
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextButton.click();
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    backButton.click();
  }
  if (event.key === "p") {
    event.preventDefault();
    toggle.click();
  }
});

updateContent();
