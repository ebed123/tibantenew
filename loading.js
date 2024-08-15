/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
function searchBlog() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const blogCards = document.querySelectorAll('.cards-container .card');
  const loadingSpinner = document.getElementById('loadingSpinner');

  // Show loading spinner
  loadingSpinner.style.display = 'block';

  // Simulate a delay to mimic loading time (e.g., fetching data from server)
  setTimeout(() => {
    blogCards.forEach((card) => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const content = card.querySelector('p').innerText.toLowerCase();

      if (title.includes(searchInput) || content.includes(searchInput)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Hide loading spinner
    loadingSpinner.style.display = 'none';
  }, 350); // Adjust the timeout duration as needed
}
