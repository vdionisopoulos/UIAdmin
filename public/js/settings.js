document.addEventListener("DOMContentLoaded", function () {
  // ----------- THEME SETUP -----------
  const html = document.documentElement;
  const storedTheme = localStorage.getItem("theme") || "light";
  applyTheme(storedTheme);

  // Listen for theme changes
  document.querySelectorAll(".theme-toggle").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedTheme = this.dataset.theme;
      localStorage.setItem("theme", selectedTheme);
      applyTheme(selectedTheme);
    });
  });

  function applyTheme(theme) {
    if (theme === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.setAttribute("data-bs-theme", isDark ? "dark" : "light");
    } else {
      html.setAttribute("data-bs-theme", theme);
    }
  }

  // ----------- SIDEBAR MODE SETUP -----------
  const wrapper = document.querySelector(".wrapper");
  const sidebarIndicator = document.querySelector(".sidebar-mode-indicator");
  const storedSidebarMode = localStorage.getItem("sidebarMode") || "default";
  applySidebarMode(storedSidebarMode);

  // Listen for sidebar mode changes
  document.querySelectorAll(".sidebar-mode").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedMode = this.dataset.mode;
      localStorage.setItem("sidebarMode", selectedMode);
      applySidebarMode(selectedMode);
    });
  });

  function applySidebarMode(mode) {
    if (wrapper) {
      wrapper.classList.toggle("compact-sidebar", mode === "compact");
    }
    if (sidebarIndicator) {
      sidebarIndicator.textContent = "Mode: " + capitalize(mode);
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
