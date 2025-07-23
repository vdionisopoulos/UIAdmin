function updateShareCountDisplay(count) {
  document.getElementById('shareCount').textContent = count;
}

// Fetch initial count
fetch('/api/share/passphrase-generator')
  .then(res => res.json())
  .then(data => updateShareCountDisplay(data.count));

// On share button click
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    fetch('/api/share/increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool: 'passphrase-generator' })
    })
    .then(res => res.json())
    .then(data => updateShareCountDisplay(data.count));
  });
});
