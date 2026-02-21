function selectMood(tag) {
    document.querySelectorAll('.mood-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
  }

  function shuffleMoods() {
    const cloud = document.getElementById('moodCloud');
    const tags  = Array.from(cloud.children);
    tags.sort(() => Math.random() - 0.5);
    tags.forEach(t => cloud.appendChild(t));
  }