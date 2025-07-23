document.addEventListener("DOMContentLoaded", function () {
  const inputs = [1, 2, 3, 4, 5].map(i => document.getElementById(`sla${i}`));
  const warningEl = document.getElementById('warning');
  const resultsBox = document.getElementById('results');

  const daysMap = {
    day: 1,
    month: 30.4375,
    quarter: 91.3125,
    year: 365.25
  };

  function formatDowntime(uptime, days) {
    if (!uptime || uptime >= 100 || uptime < 90) return { value: Infinity, label: '–' };
    const minutes = days * 24 * 60 * ((100 - uptime) / 100);
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return { value: minutes, label: `${h}h ${m}m` };
  }

  function updateComparison() {
    const slaValues = inputs.map(input => parseFloat(input.value.replace(",", ".")));
    const isValid = slaValues.every(v => !isNaN(v) && v < 100 && v >= 90);

    if (!isValid) {
      warningEl.style.display = 'block';
      resultsBox.style.display = 'none';
      return;
    }

    warningEl.style.display = 'none';
    resultsBox.style.display = 'block';

    for (const period in daysMap) {
      const days = daysMap[period];
      const downtimes = slaValues.map(uptime => formatDowntime(uptime, days));
      const minValue = Math.min(...downtimes.map(d => d.value));

      downtimes.forEach((downtime, i) => {
        const cell = document.getElementById(`${period}${i + 1}`);
        if (cell) {
          cell.textContent = downtime.label;
          cell.classList.toggle('table-success', downtime.value === minValue);
          cell.classList.toggle('fw-bold', downtime.value === minValue);
        }
      });
    }
  }

  inputs.forEach(input => input.addEventListener('input', updateComparison));
  updateComparison();
});

const copyBtn = document.getElementById("copyComparison");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const delimiter = typeof userPreferences !== 'undefined' ? userPreferences.delimiter || ',' : ',';

    const rows = document.querySelectorAll("#results table tbody tr");
    const headerCells = document.querySelectorAll("#results table thead th");

    let resultText = Array.from(headerCells)
      .map(th => th.textContent.trim())
      .join(delimiter) + "\n";

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const rowData = Array.from(cells)
        .map(cell => cell.textContent.trim())
        .join(delimiter);
      resultText += rowData + "\n";
    });

    navigator.clipboard.writeText(resultText).then(() => {
      copyBtn.textContent = "✅ Copied!";
      setTimeout(() => copyBtn.textContent = "📋 Copy Table", 2000);
    });
  });
}


