// weather.js - Handles fetching and displaying weather
const API_KEY = 'd33b5dad9f8779faaf1248945394b88f';
let units = localStorage.getItem('havue_units') || 'metric';

document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('weather-city-input');
  const searchBtn = document.getElementById('weather-search-btn');

  // Restore unit selection on load
  const savedUnitRadio = document.querySelector(`input[name="units"][value="${units}"]`);
  if (savedUnitRadio) savedUnitRadio.checked = true;

  // Listen for unit change
  document.querySelectorAll('input[name="units"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      units = e.target.value;
      localStorage.setItem('havue_units', units);
      const city = cityInput.value.trim();
      if (city) fetchWeather(city);
    });
  });

  // Search button
  searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  });

  // Enter key support
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    updateWeatherUI(data);
  } catch (error) {
    document.getElementById('weather-info').innerHTML = `<p class="error">❌ ${error.message}</p>`;
  }
}

function updateWeatherUI(data) {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  document.getElementById('weather-info').innerHTML = `
    <h3>${data.name}</h3>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
    <p>${Math.round(data.main.temp)} ${tempUnit}</p>
    <p>${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} ${windUnit}</p>
  `;
}