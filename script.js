let quranData = [];

// Set dark theme as default
document.body.classList.add('dark-theme');
document.getElementById('theme-toggle').textContent = 'Switch to Light Mode';

fetch('quran.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Quran data loaded:', data); // Debugging
    quranData = data;
    displayRandomVerse(); // Display a random verse immediately
    setInterval(displayRandomVerse, 3600000); // Update every hour
  })
  .catch(error => {
    console.error('Error loading Quran data:', error);
    document.getElementById('verse-text').textContent = 'Failed to load Quran data. Please check the console for details.';
  });

function displayRandomVerse() {
  console.log('Displaying random verse...'); // Debugging
  if (quranData.length === 0) {
    console.error('Quran data is empty.'); // Debugging
    return;
  }

  const randomSurah = quranData[Math.floor(Math.random() * quranData.length)];
  const randomVerse = randomSurah.verses[Math.floor(Math.random() * randomSurah.verses.length)];

  console.log('Selected verse:', randomVerse); // Debugging
  document.getElementById('verse-text').textContent = randomVerse.text;
  document.getElementById('verse-reference').textContent = `Surah ${randomSurah.name} (${randomSurah.transliteration}), Verse ${randomVerse.id}`;
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLightMode = document.body.classList.contains('light-theme');
  themeToggle.textContent = isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});