document.addEventListener('DOMContentLoaded', () => {
  // Load saved theme + mood
  loadTheme();
  loadMood();

  // Toggle light/dark theme
  const toggleBtn = document.getElementById('toggle-theme');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme;
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Mood buttons
  const moodButtons = document.querySelectorAll('#mood-buttons button');
  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mood = btn.dataset.mood;
      setMood(mood);
    });
  });
});

// ========== THEME ==========
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('havue_theme', theme);
}

function loadTheme() {
  const saved = localStorage.getItem('havue_theme') || 'light';
  setTheme(saved);
}

// ========== MOOD ==========
function setMood(mood) {
  document.documentElement.dataset.mood = mood;
  localStorage.setItem('havue_mood', mood);
}

function loadMood() {
  const saved = localStorage.getItem('havue_mood') || 'default';
  setMood(saved);
}