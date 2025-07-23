document.addEventListener("DOMContentLoaded", function () {
  // ----------- THEME SETUP -----------
  const html = document.documentElement;
  const storedTheme = localStorage.getItem("theme") || "light";
  applyTheme(storedTheme);

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

  // ----------- SIDEBAR TOGGLE BUTTON -----------
  const toggleBtn = document.getElementById("toggleSidebar");
  const toggleIcon = document.getElementById("sidebarToggleIcon");

  // Load persisted mode icon
  if (wrapper && toggleIcon) {
    const currentMode = localStorage.getItem("sidebarMode") || "default";
    toggleIcon.className = currentMode === "compact" ? "bi bi-chevron-right" : "bi bi-chevron-left";
  }

  // Handle button toggle
  if (toggleBtn && toggleIcon) {
    toggleBtn.addEventListener("click", () => {
      const isCompact = wrapper.classList.toggle("compact-sidebar");

      // Update localStorage and icon
      localStorage.setItem("sidebarMode", isCompact ? "compact" : "default");
      toggleIcon.className = isCompact ? "bi bi-chevron-right" : "bi bi-chevron-left";

      // Update sidebar indicator
      if (sidebarIndicator) {
        sidebarIndicator.textContent = "Mode: " + (isCompact ? "Compact" : "Default");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");

  // Flyout logic: only in compact-sidebar mode
  if (wrapper && wrapper.classList.contains("compact-sidebar")) {
    const navItems = document.querySelectorAll(".sidebar .nav-item.position-relative");

    navItems.forEach((item) => {
      let timeout;

      item.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
        item.classList.add("flyout-open");
      });

      item.addEventListener("mouseleave", () => {
        timeout = setTimeout(() => {
          item.classList.remove("flyout-open");
        }, 250); // delay hiding
      });

      const flyout = item.querySelector(".sidebar-flyout");
      if (flyout) {
        flyout.addEventListener("mouseenter", () => clearTimeout(timeout));
        flyout.addEventListener("mouseleave", () => {
          timeout = setTimeout(() => {
            item.classList.remove("flyout-open");
          }, 250);
        });
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");
  const sidebarCollapseBtn = document.getElementById("sidebarCollapseBtn");

  if (wrapper && sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener("click", function () {
      wrapper.classList.toggle("sidebar-hidden");
    });
  }
});

