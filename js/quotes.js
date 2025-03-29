document.addEventListener('DOMContentLoaded', () => {
  loadQuoteOfTheDay();

  const refreshBtn = document.getElementById('refresh-quote');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadQuoteOfTheDay);
  }
});

function loadQuoteOfTheDay() {
  fetch('data/quotes.json')
    .then(res => res.json())
    .then(data => {
      const quote = getCalendarQuote(data);

      const quoteEl = document.getElementById('quote');
      const authorEl = document.getElementById('author');

      // Remove previous fade class if it exists
      quoteEl.classList.remove('fade-in');
      authorEl.classList.remove('fade-in');

      // Set text immediately
      quoteEl.textContent = `"${quote.text}"`;
      authorEl.textContent = `– ${quote.author}`;

      // Trigger reflow (forces transition)
      void quoteEl.offsetWidth;

      // Add fade-in class
      quoteEl.classList.add('fade-in');
      authorEl.classList.add('fade-in');
    })
    .catch(err => {
      console.error("Failed to load quotes:", err);
      document.getElementById('quote').textContent = "Failed to load quote.";
      document.getElementById('author').textContent = "";
    });
}

function getCalendarQuote(quotes) {
  const today = new Date();
  const day = today.getDate(); // 1 to 31

  // Adjust index (JavaScript arrays are 0-based)
  return quotes[day - 1] || null;
}
