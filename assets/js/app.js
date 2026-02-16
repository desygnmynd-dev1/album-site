// assets/js/app.js
// ALBUM-9: render cards dynamically into the album grid

(function () {
  // Simple HTML escaping to prevent XSS vulnerabilities
  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
  // Generate HTML for a single card based on the provided data
  function cardTemplate(card) {
    const title = escapeHtml(card.title ?? 'Placeholder');
    const description = escapeHtml(card.description ?? '');
    const minutes = escapeHtml(card.minutes ?? '');

    return `
      <!-- Card -->
      <div class="col">
        <div class="card shadow-sm">
          <svg 
            aria-label="${title}: Thumbnail"
            class="bd-placeholder-img card-img-top"
            height="225"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>${title}</title>
            <rect width="100%" height="100%" fill="#55595c"></rect>
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            Thumbnail
            </text>
          </svg>

          <div class="card-body">
            <p class="card-text">${description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
              </div>
              <small class="text-body-secondary">${minutes}</small>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render an array of card data into the album grid
  function renderCards(cards) {
    const grid = document.getElementById('albumGrid');
    if (!grid) return;

    const safeCards = Array.isArray(cards) ? cards : [];
    grid.innerHTML = safeCards.map(cardTemplate).join('');
  }

  // Wait for the DOM to be fully loaded before rendering cards
  document.addEventListener('DOMContentLoaded', function () {
    renderCards(window.ALBUM_CARDS);
  });
})();
