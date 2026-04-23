function getStoryId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id")) || 1;
}

const MOOD_COLORS = {
  neutral: "#fdfbf7",
  love:    "#f9eef1",
  sad:     "#eef3f9",
  dark:    "#e8e8e8",
  calm:    "#eef6f1",
  hope:    "#fef8ed",
  dream:   "#f3effe",
  fear:    "#eaecf4",
  memory:  "#f6ede3",
};

function applyMood(mood) {
  document.body.style.backgroundColor = MOOD_COLORS[mood] || MOOD_COLORS.neutral;
}

function renderStory(story) {
  const container = document.getElementById("story-container");
  container.innerHTML = "";

  story.scenes.forEach((scene, idx) => {
    const section = document.createElement("section");
    section.dataset.index = idx;
    section.dataset.mood  = scene.mood || "neutral";

    if (scene.mood) {
      section.classList.add("mood-" + scene.mood);
    }

    if (scene.type === "image") {
      section.innerHTML = `
        <div class="img-box">
          <img src="${scene.src}" alt="">
        </div>
        ${scene.content ? `<div class="txt-box">${scene.content}</div>` : ""}
      `;
    } else if (scene.type === "text") {
      section.classList.add("scene-text-only");
      section.innerHTML = `<div class="txt-box">${scene.content}</div>`;
    }

    container.appendChild(section);
  });
}

function buildUI(story) {
  const back = document.createElement("a");
  back.id = "back-btn";
  back.href = "stories.html";
  back.textContent = "← Ana sayfa";
  document.body.appendChild(back);

  const bar = document.createElement("div");
  bar.id = "progress-bar";
  document.body.appendChild(bar);

  const counter = document.createElement("div");
  counter.id = "scene-counter";
  document.body.appendChild(counter);

  const hint = document.createElement("div");
  hint.className = "scroll-hint visible";
  hint.innerHTML = `<div class="scroll-dot"></div><span>Kaydır</span>`;
  document.body.appendChild(hint);

  return { bar, counter, hint };
}

function initScroll(story, ui) {
  const container = document.getElementById("story-container");
  let hintHidden = false;

  container.addEventListener("scroll", () => {
    const scrollTop = container.scrollTop;
    const scrollH   = container.scrollHeight - container.clientHeight;
    const progress  = scrollH > 0 ? (scrollTop / scrollH) * 100 : 0;

    ui.bar.style.width = progress + "%";

    if (!hintHidden && scrollTop > 40) {
      ui.hint.classList.remove("visible");
      hintHidden = true;
    }

    const vh = container.clientHeight;
    const containerRect = container.getBoundingClientRect();
    let activeSection = null;

    container.querySelectorAll("section").forEach(s => {
      const r = s.getBoundingClientRect();
      const top = r.top - containerRect.top;

      if (top > -vh * 0.5 && top < vh * 0.5) {
        s.classList.add("active");
        activeSection = s;
      } else {
        s.classList.remove("active");
      }
    });

    if (activeSection) {
      const mood  = activeSection.dataset.mood || "neutral";
      const index = parseInt(activeSection.dataset.index ?? -1);
      applyMood(mood);

      if (index >= 0) {
        ui.counter.textContent = (index + 1) + " / " + story.scenes.length;
      } else {
        ui.counter.textContent = "";
      }
    }
  });
}

function init() {
  const id    = getStoryId();
  const story = (window.STORIES || []).find(s => s.id === id);

  if (!story) {
    document.body.innerHTML = `<p style="padding:2rem;font-family:serif;color:#888;">Hikaye bulunamadı. ID: ${id}</p>`;
    return;
  }

  document.title = "Masal Gibi | " + story.title;

  renderStory(story);

  const ui = buildUI(story);

  const firstSection = document.querySelector("section");
  if (firstSection) {
    firstSection.classList.add("active");
    applyMood(firstSection.dataset.mood || "neutral");
    ui.counter.textContent = "1 / " + story.scenes.length;
  }

  initScroll(story, ui);
}

init();