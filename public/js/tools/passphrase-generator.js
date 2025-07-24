let wordList = [];

async function loadWordlist() {
  try {
    const res = await fetch('/assets/diceware.json');
    wordList = await res.json();
  } catch (err) {
    alert("Failed to load wordlist.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadWordlist();

  const form = document.getElementById('phraseForm');
  const output = document.getElementById('output');
  const result = document.getElementById('result');
  const entropyText = document.getElementById('entropy');
  const copyBtn = document.getElementById('copyBtn');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const count = +document.getElementById('wordCount').value;
    const delimiter = document.getElementById('delimiter').value;

    if (!wordList.length) {
      output.textContent = '⚠️ Wordlist not loaded.';
      result.style.display = 'block';
      return;
    }

    const passphrase = Array.from({ length: count }, () => {
      const idx = Math.floor(Math.random() * wordList.length);
      return wordList[idx];
    }).join(delimiter);

    output.textContent = passphrase;
    result.style.display = 'block';

    const entropy = count * Math.log2(wordList.length);
    entropyText.textContent = `Estimated Entropy: ${entropy.toFixed(2)} bits`;
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent).then(() => {
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => (copyBtn.textContent = '📋 Copy'), 1500);
    });
  });
});

function updateShareCountDisplay(count) {
  const el = document.getElementById('shareCount');
  if (el) el.textContent = count;
}

document.addEventListener('DOMContentLoaded', () => {
  // Load counter
  fetch('/api/share/passphrase-generator')
    .then(res => {
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      return res.json();
    })
    .then(data => updateShareCountDisplay(data.count))
    .catch(err => console.error('Error loading share count:', err));

  // Register share events
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      fetch('/api/share/increment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'passphrase-generator' })
      })
        .then(res => {
          if (!res.ok) throw new Error(`POST failed: ${res.status}`);
          return res.json();
        })
        .then(data => updateShareCountDisplay(data.count))
        .catch(err => console.error('Error updating share count:', err));
    });
  }); 
});

