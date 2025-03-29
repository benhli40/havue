document.addEventListener('DOMContentLoaded', () => {
  initGreeting();
  updateTime();
  setInterval(updateTime, 1000);
});

function setTimeBackground(hour) {
  const body = document.body;
  body.classList.remove(
    'time-sunrise', 'time-morning', 'time-noon',
    'time-afternoon', 'time-evening', 'time-night'
  );

  if (hour >= 5 && hour < 8) {
    body.classList.add('time-sunrise');
  } else if (hour >= 8 && hour < 11) {
    body.classList.add('time-morning');
  } else if (hour >= 11 && hour < 13) {
    body.classList.add('time-noon');
  } else if (hour >= 13 && hour < 17) {
    body.classList.add('time-afternoon');
  } else if (hour >= 17 && hour < 19) {
    body.classList.add('time-evening');
  } else {
    body.classList.add('time-night');
  }
}

function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}:${seconds}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString(undefined, options);

  setTimeBackground(hours);
  document.getElementById('datetime').textContent = `${dateStr} | ${timeStr}`;
}

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  if (hour >= 18 && hour < 22) return "Good evening";
  return "Good night";
}

function initGreeting() {
  const greetingEl = document.getElementById('greeting');
  const container = document.getElementById('time-widget');
  let name = localStorage.getItem('havue_user_name');

  // If no name, prompt for it
  if (!name) {
    const prompt = document.createElement('div');
    prompt.innerHTML = `
      <label for="name-input">Welcome! What’s your name?</label><br>
      <input type="text" id="name-input" placeholder="Enter your name" />
      <button id="save-name">Save</button>
    `;
    prompt.style.marginTop = "1rem";
    container.appendChild(prompt);

    document.getElementById('save-name').addEventListener('click', () => {
      const input = document.getElementById('name-input').value.trim();
      if (input) {
        localStorage.setItem('havue_user_name', input);
        container.removeChild(prompt);
        updateGreeting(input);
      }
    });
  } else {
    updateGreeting(name);
  }
}

function updateGreeting(name) {
  const greetingEl = document.getElementById('greeting');
  const hour = new Date().getHours();
  const greeting = getGreeting(hour);
  greetingEl.textContent = `${greeting}, ${name}`;

  // Add "Change Name" button
  let existingBtn = document.getElementById('change-name');
  if (!existingBtn) {
    const btn = document.createElement('button');
    btn.textContent = "Change Name";
    btn.id = "change-name";
    btn.style.marginTop = "0.5rem";
    btn.addEventListener('click', () => {
      localStorage.removeItem('havue_user_name');
      location.reload(); // re-trigger prompt
    });
    greetingEl.insertAdjacentElement('afterend', btn);
  }
}
