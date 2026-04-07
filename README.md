# TravelOut

TravelOut is a small travel recommendation site built with HTML, CSS, and JavaScript. It includes a homepage search bar, a dedicated search results page, an About page, and a Contact page.

## Features

- Search destinations from a local JSON data source
- Display matching cities, temples, and beaches on a results page
- Locally hosted destination and background images
- Styled About and Contact pages
- Client-side contact form behavior without a backend

## Project Structure

- `travel_recommendation.html` - homepage
- `search-results.html` - search results page
- `about.html` - About page
- `contact.html` - Contact page
- `travel_recommendation.js` - shared client-side logic
- `styles.css` - site styling
- `travel_recommendation_api.json` - travel data used for search
- `ATTRIBUTION.md` - image attribution and license information

## Running the Project

Open `travel_recommendation.html` in a browser.

If your browser blocks local JSON fetching from the `file://` protocol, run the project from a simple local server instead. For example:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/travel_recommendation.html
```

## Notes

- Search results are powered by `travel_recommendation_api.json`.
- Destination images and the background image are stored locally in this repository.
- Attribution for all third-party image assets is documented in `ATTRIBUTION.md`.
