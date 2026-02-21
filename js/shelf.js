// View switcher
  const views = ['pasture', 'shelf'];
  function switchView(view, el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (el) el.classList.add('active');
    // Show/hide views
    document.getElementById('view-pasture').style.display = view === 'pasture' ? '' : 'none';
    const shelfEl = document.getElementById('view-shelf');
    if (shelfEl) shelfEl.style.display = view === 'shelf' ? '' : 'none';
  }

  // Shelf tab switcher
  function switchShelfTab(tab, el) {
    document.querySelectorAll('.shelf-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    el.classList.add(tab);
    document.getElementById('shelf-albums').style.display   = tab === 'albums'   ? '' : 'none';
    document.getElementById('shelf-songs').style.display    = tab === 'songs'    ? '' : 'none';
    document.getElementById('shelf-mixtapes').style.display = tab === 'mixtapes' ? '' : 'none';
  }