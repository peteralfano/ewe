function toggleFelt(btn) {
    btn.classList.toggle('active');
    const num = parseInt(btn.textContent.match(/\d+/)[0]);
    btn.textContent = '♥ ' + (btn.classList.contains('active') ? num + 1 : num - 1) + ' felt this';
  }

  function addToShelf(btn) { btn.textContent = '✓ shelved'; btn.style.color = 'var(--green)'; }
  function passToBranch(btn) { btn.textContent = '↗ passed'; btn.style.color = 'var(--teal)'; }
  function followDrift(card) {
    card.style.borderColor = 'rgba(232,196,122,0.4)';
    card.style.background  = 'rgba(232,196,122,0.06)';
  }