/* =====================
   HEADER.JS
   Temaya göre header rengi
   + aktif nav link
   ===================== */

const HEADER_THEMES = {
  "stories.html": {
  bg:      "rgba(253, 251, 247, 0.95)",
  border:  "rgba(0,0,0,0.05)",
  logo:    "#1a1a1a",
  link:    "rgba(44,44,44,0.55)",
  active:  "#b59b7c"
},
  "index.html":  {
    bg:      "rgba(253, 251, 247, 0.95)",
    border:  "rgba(0,0,0,0.05)",
    logo:    "#1a1a1a",
    link:    "rgba(44,44,44,0.55)",
    active:  "#b59b7c"
  },
  "story.html": {
    bg:      "rgba(253, 251, 247, 0.95)",
    border:  "rgba(0,0,0,0.05)",
    logo:    "#1a1a1a",
    link:    "rgba(44,44,44,0.55)",
    active:  "#b59b7c"
  },
  "stars.html": {
    bg:      "rgba(0, 0, 0, 0.6)",
    border:  "rgba(255,255,255,0.08)",
    logo:    "#ffffff",
    link:    "rgba(255,255,255,0.5)",
    active:  "#ffffff"
  },
  "bucket.html": {
    bg:      "rgba(253, 251, 247, 0.95)",
    border:  "rgba(0,0,0,0.05)",
    logo:    "#1a1a1a",
    link:    "rgba(44,44,44,0.55)",
    active:  "#b59b7c"
  }
};

function applyHeaderTheme() {
  const path    = window.location.pathname;
  const file    = path.split("/").pop() || "index.html";
  const theme   = HEADER_THEMES[file] || HEADER_THEMES["index.html"];

  const header  = document.querySelector(".header");
  const logo    = document.querySelector(".logo-text");
  const links   = document.querySelectorAll(".nav-link");

  if (!header) return;

  header.style.background   = theme.bg;
  header.style.borderBottom = `1px solid ${theme.border}`;
  if (logo) logo.style.color = theme.logo;

  links.forEach(link => {
    const href = link.getAttribute("href");
    const isActive = href === file;
    link.style.color = isActive ? theme.active : theme.link;

    if (isActive) {
      link.style.background = file === "stars.html"
        ? "rgba(255,255,255,0.08)"
        : "rgba(181,155,124,0.08)";
    } else {
      link.style.background = "transparent";
    }
  });

  /* Nav divider rengi */
  document.querySelectorAll(".nav-divider").forEach(d => {
    d.style.background = file === "stars.html"
      ? "rgba(255,255,255,0.15)"
      : "rgba(0,0,0,0.1)";
  });
}

applyHeaderTheme();