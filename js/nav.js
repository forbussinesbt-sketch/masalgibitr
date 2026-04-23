const PAGES = ["bucket.html", "stories.html", "stars.html"];

function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.split("/").pop() || "index.html";
  if (file === "index.html" || file === "") return "bucket.html";
  return file;
}

function getCurrentIndex() {
  const current = getCurrentPage();
  const idx = PAGES.indexOf(current);
  return idx === -1 ? 0 : idx;
}

function goToPage(idx) {
  if (idx < 0 || idx >= PAGES.length) return;
  window.location.href = PAGES[idx];
}

function initSwipe() {
  let startX = 0;
  let startY = 0;

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    const diffX = startX - e.changedTouches[0].clientX;
    const diffY = Math.abs(startY - e.changedTouches[0].clientY);

    if (Math.abs(diffX) < 60 || diffY > 80) return;

    const currentIdx = getCurrentIndex();

    if (diffX > 0) {
      goToPage(currentIdx + 1);
    } else {
      goToPage(currentIdx - 1);
    }
  }, { passive: true });
}

initSwipe();