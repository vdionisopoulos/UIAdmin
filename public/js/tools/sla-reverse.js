document.addEventListener("DOMContentLoaded", function () {
  const downtimeInput = document.getElementById('downtime');
  const periodInput = document.getElementById('period');
  const slaResult = document.getElementById('slaResult');
  const resultsBox = document.getElementById('results');

  function updateSla() {
    const downtime = parseFloat(downtimeInput.value);
    const days = parseFloat(periodInput.value);
    if (isNaN(downtime) || downtime < 0 || isNaN(days)) {
      resultsBox.style.display = 'none';
      return;
    }

    const totalSeconds = days * 24 * 60 * 60;
    const uptimeRatio = (1 - downtime / totalSeconds) * 100;
    slaResult.textContent = uptimeRatio.toFixed(3) + '%';
    resultsBox.style.display = 'flex';
  }

  downtimeInput.addEventListener('input', updateSla);
  periodInput.addEventListener('change', updateSla);
  updateSla();
});

const copyBtn = document.getElementById('copySla');

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const text = slaResult.textContent;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "✅ Copied!";
      setTimeout(() => copyBtn.textContent = "📋 Copy Result", 2000);
    });
  });
}

