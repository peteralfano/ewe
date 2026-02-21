let isPlaying = true;
  let progress = 37;

  // Progress ticker
  setInterval(() => {
    if (isPlaying) {
      progress += 0.02;
      if (progress > 100) progress = 0;
      document.getElementById('progressFill').style.width = progress + '%';
      document.querySelector('.progress-thumb').style.right = (100 - progress - 0.5) + '%';
    }
  }, 200);

  function togglePlay() {
    isPlaying = !isPlaying;
    document.getElementById('playIcon').style.display  = isPlaying ? 'none' : 'block';
    document.getElementById('pauseIcon').style.display = isPlaying ? 'block' : 'none';
    document.getElementById('nowArt').classList.toggle('playing', isPlaying);
    document.querySelectorAll('.playing-bar span').forEach(s => {
      s.style.animationPlayState = isPlaying ? 'running' : 'paused';
    });
  }
  // Start in playing state and show pause icon initially
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('playIcon').style.display  = 'none';
    document.getElementById('pauseIcon').style.display = 'block';
  });

  function seekTrack(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    progress = ((e.clientX - rect.left) / rect.width) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
  }

  let currentVol = 70;
  let isMuted = false;

  function updateVolIcon() {
    document.getElementById('volIconHigh').style.display = (!isMuted && currentVol >= 50) ? 'block' : 'none';
    document.getElementById('volIconLow').style.display  = (!isMuted && currentVol < 50)  ? 'block' : 'none';
    document.getElementById('volIconOff').style.display  = isMuted                         ? 'block' : 'none';
  }

  function setVolume(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    currentVol = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    document.getElementById('volFill').style.width = currentVol + '%';
    if (currentVol === 0) { isMuted = true; } else { isMuted = false; }
    const btn = e.currentTarget.previousElementSibling;
    btn.classList.toggle('active', isMuted);
    updateVolIcon();
  }

  function toggleMute(btn) {
    isMuted = !isMuted;
    btn.classList.toggle('active', isMuted);
    document.getElementById('volFill').style.width = isMuted ? '0%' : currentVol + '%';
    if (isMuted) {
      updateVolIcon();
    } else {
      setTimeout(updateVolIcon, 200);
    }
  }

  function toggleShuffle(btn) { btn.style.color = ''; btn.classList.toggle('active'); }
  function toggleRepeat(btn)  { btn.style.color = ''; btn.classList.toggle('active'); }

  const tracks = [
    {
      title: 'Float On', artist: 'Modest Mouse',
      gradient: 'linear-gradient(135deg,#1f2a3d,#2a1f3d)',
      felts: [
        { text: '"sounds like deciding things will probably be alright"', mine: true },
        { text: '"the specific relief of lowering your expectations in a good way"', mine: false },
        { text: '"driving nowhere in particular and feeling fine about it"', mine: false },
        { text: '"optimism that earned itself"', mine: false },
      ]
    },
    {
      title: 'Missed the Boat', artist: 'Modest Mouse',
      gradient: 'linear-gradient(135deg,#1f2a1f,#2a3a1f)',
      felts: [
        { text: '"realizing something too late but making peace with it"', mine: true },
        { text: '"the specific sadness of almost"', mine: false },
        { text: '"i played this until the almost stopped stinging"', mine: false },
      ]
    },
    {
      title: 'Taking up Space', artist: 'Mustard Service',
      gradient: 'linear-gradient(135deg,#1a2f3d,#0f1f2f)',
      felts: [
        { text: '"sitting with someone in the quiet before something changes"', mine: true },
        { text: '"the tenderness of being known by someone"', mine: false },
        { text: '"love that doesn\'t need to announce itself"', mine: false },
      ]
    },
    {
      title: 'Please Please Please', artist: 'Sabrina Carpenter',
      gradient: 'linear-gradient(135deg,#3d1f2a,#2a1520)',
      felts: [
        { text: '"wanting someone to just get it right this time"', mine: true },
        { text: '"hope and irritation at exactly the same time"', mine: false },
        { text: '"being charmed by someone you know you shouldn\'t be"', mine: false },
      ]
    },
    {
      title: 'Espresso', artist: 'Sabrina Carpenter',
      gradient: 'linear-gradient(135deg,#2a1f1a,#3d2a1f)',
      felts: [
        { text: '"confident and a little dangerous and fully aware of it"', mine: true },
        { text: '"the walk you do when you know you look good"', mine: false },
        { text: '"leaving first on purpose"', mine: false },
      ]
    },
  ];
  let currentTrack = 0;
  let feltIndex = 0;
  let feltTimer = null;

  function startFeltCycle(trackIdx) {
    clearInterval(feltTimer);
    feltIndex = 0;
    renderFelt(trackIdx, feltIndex, false);
    feltTimer = setInterval(() => {
      feltIndex = (feltIndex + 1) % tracks[trackIdx].felts.length;
      cycleFelt(trackIdx, feltIndex);
    }, 6500);
  }

  function renderFelt(trackIdx, idx, animate) {
    const wrap = document.querySelector('.now-felt-wrap');
    const existing = document.getElementById('nowFelt');
    const felt = tracks[trackIdx].felts[idx];
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'now-felt ' + (felt.mine ? 'yours' : 'theirs');
    if (animate) el.classList.add('entering');
    el.id = 'nowFelt';
    el.textContent = felt.text;
    wrap.appendChild(el);
    if (animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { el.classList.remove('entering'); });
      });
    }
  }

  function cycleFelt(trackIdx, idx) {
    const existing = document.getElementById('nowFelt');
    if (existing) {
      existing.classList.add('leaving');
      setTimeout(() => renderFelt(trackIdx, idx, true), 500);
    } else {
      renderFelt(trackIdx, idx, true);
    }
  }

  function playTrack(row) {
    document.querySelectorAll('.track-row').forEach(r => r.classList.remove('playing'));
    row.classList.add('playing');
    const idx = Array.from(document.querySelectorAll('.track-row')).indexOf(row);
    if (idx >= 0 && idx < tracks.length) { currentTrack = idx; updateNowPlaying(); }
    isPlaying = true;
    document.getElementById('playIcon').style.display  = 'none';
    document.getElementById('pauseIcon').style.display = 'block';
    document.getElementById('nowArt').classList.add('playing');
    progress = 0;
  }

  function playTrackFrom(idx) {
    currentTrack = idx;
    updateNowPlaying();
    isPlaying = true;
    document.getElementById('playIcon').style.display  = 'none';
    document.getElementById('pauseIcon').style.display = 'block';
    document.getElementById('nowArt').classList.add('playing');
    progress = 0;
  }

  function nextTrack() { currentTrack = (currentTrack + 1) % tracks.length; updateNowPlaying(); progress = 0; }
  function prevTrack() { currentTrack = (currentTrack - 1 + tracks.length) % tracks.length; updateNowPlaying(); progress = 0; }

  function updateNowPlaying() {
    const t = tracks[currentTrack];
    document.getElementById('nowTitle').textContent  = t.title;
    document.getElementById('nowArtist').textContent = t.artist;
    document.getElementById('nowArt').style.background = t.gradient;
    document.querySelectorAll('.track-row').forEach((r, i) => r.classList.toggle('playing', i === currentTrack));
    startFeltCycle(currentTrack);
  }

  // Kick off felt cycle on load
  startFeltCycle(0);