document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const strengthText = document.getElementById("strength");
  const strengthFill = document.getElementById("strengthFill");
  const feedbackText = document.getElementById("feedback");
  const entropyText = document.getElementById("entropy");
  const crackTimeText = document.getElementById("crackTime");
  const theoreticalEntropyText = document.getElementById("theoreticalEntropy");
  const strengthTooltip = document.getElementById("strengthTooltip");
  const resultBox = document.getElementById("results");
  const toggleVisibility = document.getElementById("toggleVisibility");
  const copyMsg = document.getElementById("copyMsg");

  const scoreColors = ["danger", "warning", "warning", "info", "success"];
  const scoreTexts = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const estimatedEntropyFromScore = [10, 28, 36, 60, 80];

  toggleVisibility.addEventListener("change", (e) => {
    passwordInput.type = e.target.checked ? "text" : "password";
  });

  passwordInput.addEventListener("input", (e) => {
    updateStrength(e.target.value);
  });

  window.copyPassword = function () {
    const pwd = passwordInput.value;
    if (!pwd) return;
    navigator.clipboard.writeText(pwd).then(() => {
      copyMsg.style.display = "inline";
      setTimeout(() => {
        copyMsg.style.display = "none";
      }, 1500);
    });
  };

  function updateStrength(password) {
    if (typeof zxcvbn !== "function") {
      console.error("zxcvbn not loaded");
      return;
    }

    const result = zxcvbn(password);
    if (!result || typeof result !== "object") {
      console.warn("Invalid result from zxcvbn");
      return;
    }

    const score = result.score ?? 0;
    const feedback = result.feedback?.suggestions?.join(" ") || "No suggestions needed.";
    const crackTime = result.crack_times_display?.offline_slow_hashing_1e4_per_second || "N/A";

    strengthText.textContent = `Strength: ${scoreTexts[score]}`;
    strengthFill.style.width = `${(score + 1) * 20}%`;
    strengthFill.className = `progress-bar bg-${scoreColors[score]}`;

    feedbackText.textContent = feedback;
    entropyText.textContent = `Estimated Entropy: ~${estimatedEntropyFromScore[score]} bits`;
    crackTimeText.textContent = `Estimated Crack Time: ${crackTime}`;
    theoreticalEntropyText.textContent = `Theoretical Entropy: ${calculateTheoreticalEntropy(password)} bits`;

    strengthTooltip.textContent = scoreTexts[score];
    strengthTooltip.style.left = `calc(${(score + 1) * 20}% - 40px)`;
    strengthTooltip.style.opacity = "1";

    resultBox.style.display = "block";
  }

  function calculateTheoreticalEntropy(password) {
    const length = password.length;
    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/\d/.test(password)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(password)) pool += 33; // estimated printable symbols

    if (pool === 0 || length === 0) return "0.00";
    return (length * Math.log2(pool)).toFixed(2);
  }
});
 