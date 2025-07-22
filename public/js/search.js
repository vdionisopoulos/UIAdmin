document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("searchToggle");
  const searchSidebar = document.getElementById("searchSidebar");

  if (searchToggle && searchSidebar) {
    searchToggle.addEventListener("click", function (e) {
      e.preventDefault();
      const sidebar = new bootstrap.Offcanvas(searchSidebar);
      sidebar.toggle();
    });
  }

  // Optional: Search input filtering
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (searchInput && searchResults) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      const items = searchResults.querySelectorAll("li");

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "block" : "none";
      });
    });
  }
});