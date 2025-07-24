document.addEventListener("DOMContentLoaded", function () {
  if (typeof feather !== "undefined" && feather.replace) {
    feather.replace();
  }

  const toggle = document.querySelector(".js-sidebar-toggle");
  const wrapper = document.querySelector(".wrapper");
  if (toggle && wrapper) {
    toggle.addEventListener("click", () => wrapper.classList.toggle("toggled"));
  }

  const uptimeInput = document.getElementById("uptime");
  const resultsBox = document.getElementById("results");
  const copyBtn = document.getElementById("copyResults");

  if (!uptimeInput || !resultsBox) return;

  // 🧠 Helper: format downtime
  function calculateDowntime(uptime, days) {
    const totalMinutes = days * 24 * 60;
    const downtime = totalMinutes * ((100 - uptime) / 100);
    const totalSeconds = Math.round(downtime * 60);

    const daysPart = Math.floor(totalSeconds / (24 * 3600));
    const hoursPart = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutesPart = Math.floor((totalSeconds % 3600) / 60);
    const secondsPart = totalSeconds % 60;

    const parts = [];
    if (daysPart > 0) parts.push(`${daysPart}d`);
    if (hoursPart > 0 || parts.length) parts.push(`${hoursPart}h`);
    if (minutesPart > 0 || parts.length) parts.push(`${minutesPart}m`);
    if (secondsPart > 0 || parts.length) parts.push(`${secondsPart}s`);

    return parts.join(" ");
  }

  // ✅ Update downtime table
  function updateResults() {
    let raw = uptimeInput.value.replace(",", ".");
    let uptime = parseFloat(raw);

    if (isNaN(uptime) || uptime <= 90.000 || uptime >= 99.999 || !raw.startsWith("9")) {
      resultsBox.style.display = "none";
      uptimeInput.classList.remove("is-valid");
      uptimeInput.classList.add("is-invalid");
      return;
    }

    uptimeInput.classList.remove("is-invalid");
    uptimeInput.classList.add("is-valid");

    const setRow = (days, resultId) => {
      const result = calculateDowntime(uptime, days);
      const elem = document.getElementById(resultId);
      if (elem) elem.textContent = result;
    };

    setRow(1, "dayResult");
    setRow(30.4375, "monthResult");
    setRow(91.3125, "quarterResult");
    setRow(365.25, "yearResult");

    resultsBox.style.display = "flex";
  }

  // 🎯 Real-time input filter
  uptimeInput.addEventListener("input", () => {
    // Only allow digits, comma, dot
    uptimeInput.value = uptimeInput.value.replace(/[^0-9.,]/g, '');

    // Clear input if it doesn't start with 9
    if (uptimeInput.value && !uptimeInput.value.startsWith("9")) {
      uptimeInput.value = "";
    }

    updateResults();
  });

  updateResults(); // Initial render

  // 📋 Copy table to clipboard
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const rows = document.querySelectorAll("#results table tbody tr");
      const text = Array.from(rows).map(row => {
        const cells = row.querySelectorAll("td");
        return `${cells[0].textContent}: ${cells[1].textContent}`;
      }).join("\n");

      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => copyBtn.textContent = "📋 Copy Results", 2000);
      });
    });
  }
});
 