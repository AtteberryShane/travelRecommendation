document.addEventListener('DOMContentLoaded', () => {
    initSearchBar();
    initSearchPage();
    initHomePage();
    initAboutPage();
    initContactPage();
});

async function initSearchPage() {
    // find results container
    const resultsContainer = document.getElementById('results');

    // Verify results container exists
    if (!resultsContainer) {
        return;
    }

    // Find query parameter
    const query = getQueryFromUrl();

    // Verify Query Exists
    if (!query || !query.trim()) {
        resultsContainer.textContent = 'Please enter a valid destination.';
        return;
    }

    // Normalize Query
    const normalizedQuery = query.trim().toLowerCase();

    // Fetch data, search and display results
    try {
        const data = await fetchTravelData();
        const matches = searchTravelData(data, normalizedQuery);
        renderSearchResults(matches, query);
    } catch (error) {
        resultsContainer.textContent = 'There was a problem loading search results.';
    }
}

function getQueryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('query');
}

async function fetchTravelData() {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    return data;
}

function searchTravelData(data, query) {
    const matches = [];

    // Check category-level matches
    if ("beaches".includes(query) || query.includes("beach")) {
        for( const beach of data.beaches) {
            addResult(matches, {
                type: "beach",
                name: beach.name,
                imageUrl: beach.imageUrl,
                description: beach.description
            });
        }
    }

    if ("temples".includes(query) || query.includes("temple")) {
        for ( const temple of data.temples ) {
            addResult(matches, {
                type: "temple",
                name: temple.name,
                imageUrl: temple.imageUrl,
                description: temple.description
            });
        }
    }

    if ("countries".includes(query) || query.includes("country") ||
        "cities".includes(query) || query.includes("city")) {
        for ( const country of data.countries ) {
            for (const city of country.cities) {
                addResult(matches, {
                    type: "city",
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description
                });
            }
        }
    }

    // Check item level matches
    for (const beach of data.beaches ) {
        if (beach.name.toLowerCase().includes(query))
            addResult(matches, {
                type: "beach",
                name: beach.name,
                imageUrl: beach.imageUrl,
                description: beach.description
            });
    }

    for (const temple of data.temples) {
        if (temple.name.toLowerCase().includes(query))
            addResult(matches, {
                type: "temple",
                name: temple.name,
                imageUrl: temple.imageUrl,
                description: temple.description
            });
    }

    for (const country of data.countries) {
        if (country.name.toLowerCase().includes(query))
            for (const city of country.cities) {
                addResult(matches, {
                    type: "city",
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description
                });
            }
    

        for (const city of country.cities) {
            if (city.name.toLowerCase().includes(query))
                addResult(matches, {
                    type: "city",
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description
                });
        }
    }

    return matches;
}

function addResult(matches, result) {
    // Avoid duplicates
    const alreadyExists = matches.some((item) =>
        item.type === result.type && item.name === result.name
    );

    if (!alreadyExists) {
        matches.push(result);
    }
}

function renderSearchResults(results, query) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.textContent = `No results found for "${query}".`;
        return;
    }

    for (const result of results) {
        const card = document.createElement('div');
        card.classList.add('result-card');
        card.innerHTML = `
            <img src="${result.imageUrl}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        `;
        resultsContainer.appendChild(card);
    }
}

function initSearchBar() {
    const searchForm = document.querySelector('form[action="./search-results.html"]');
    const searchInput = searchForm?.querySelector('input[name="query"]');
    const resetButton = document.getElementById('btnReset');

    if (!searchForm || !searchInput || !resetButton) {
        return;
    }

    const query = getQueryFromUrl();

    if (query) {
        searchInput.value = query;
    }

    resetButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });
}

function initAboutPage() {
    const aboutHeading = document.querySelector('.about-heading');

    if (!aboutHeading || aboutHeading.textContent.trim() !== 'About Us') {
        return;
    }
}

function initHomePage() {
    const homeMain = document.querySelector('.main-content');

    if (!homeMain) {
        return;
    }

    const homeLink = document.getElementById('home');
    const searchInput = document.querySelector('form[action="./search-results.html"] input[name="query"]');

    if (homeLink) {
        homeLink.setAttribute('aria-current', 'page');
    }

    if (searchInput && !searchInput.value) {
        searchInput.focus();
    }
}

function initContactPage() {
    const contactForm = document.querySelector('.contact-form form');

    if (!contactForm) {
        return;
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    let feedback = document.getElementById('contact-feedback');

    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'contact-feedback';
        contactForm.appendChild(feedback);
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
    });
}