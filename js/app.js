const intro = document.getElementById("intro");
const closeBtn = document.getElementById("closeBtn");

intro.addEventListener("click", function(e) {
  if (e.target === intro) {
    intro.style.display = "none";
  }
});

closeBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  intro.style.display = "none";
});

function goToStory(id) {
  window.location.href = "story.html?id=" + id;
}

function renderStoryCards() {
  const container = document.querySelector(".container");
  if (!container || !window.STORIES) return;

  container.innerHTML = "";

  window.STORIES.forEach(story => {
    const card = document.createElement("div");

    if (!story.active) {
      card.className = "story-card disabled";
      card.innerHTML = `
        <div class="story-image">
          <img src="${story.cover}" alt="${story.title}">
        </div>
        <div class="story-content">
          <span class="story-tag">${story.tag}</span>
          <h2>${story.title}</h2>
          <p>${story.description}</p>
        </div>
        <div class="divider"></div>
      `;
    } else {
      card.className = "story-card";
      card.innerHTML = `
        <div class="story-image">
          <img src="${story.cover}" alt="${story.title}">
        </div>
        <div class="story-content">
          <span class="story-tag">${story.tag}</span>
          <h2>${story.title}</h2>
          <p>${story.description}</p>
        </div>
        <div class="divider"></div>
      `;
      card.addEventListener("click", () => {
        window.location.href = "story.html?id=" + story.id;
      });
    }

    container.appendChild(card);
  });
}

renderStoryCards();