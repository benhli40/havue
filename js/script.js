// script.js - Handles global behavior like theme & mood toggles
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    links.classList.toggle('show');
    toggle.classList.toggle('rotate');
  });  
});

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadMood();
  setupThemeToggle();
  setupMoodButtons();
});

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function loadMood() {
  const savedMood = localStorage.getItem('mood') || 'default';
  document.documentElement.setAttribute('data-mood', savedMood);
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById('toggle-theme');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

function setupMoodButtons() {
  const buttons = document.querySelectorAll('#mood-buttons button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mood = btn.getAttribute('data-mood');
      document.documentElement.setAttribute('data-mood', mood);
      localStorage.setItem('mood', mood);
    });
  });
}