document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('generatorForm');
  const output = document.getElementById('output');
  const result = document.getElementById('result');
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');
  const entropyText = document.getElementById('entropy');
  const copyBtn = document.getElementById('copyBtn');

  lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const length = +lengthSlider.value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charset = lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset.length === 0) {
      output.textContent = '⚠️ No character set selected!';
      result.style.display = 'block';
      entropyText.textContent = '';
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    output.textContent = password;
    result.style.display = 'block';

    const bitsPerChar = Math.log2(charset.length);
    const entropy = bitsPerChar * length;
    entropyText.textContent = `Estimated Entropy: ${entropy.toFixed(2)} bits`;
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent).then(() => {
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => (copyBtn.textContent = '📋 Copy'), 1500);
    });
  });
}); 
