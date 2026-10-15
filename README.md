# QuickNotes

QuickNotes is a lightweight, responsive web application for capturing, organizing, and managing daily notes in real time. Built with HTML5, CSS3, and modern vanilla JavaScript, it allows users to categorize notes, filter through saved entries instantly, and persist data seamlessly across browser sessions.

## Features

- **Categorized Note Creation**: Assign notes to distinct categories (Personal, Work, Study) with visual color coding.
- **Real-Time Live Search**: Instant case-insensitive keyword filtering across all note content.
- **Form Validation**: Strict character length limits (1–200 characters) with dynamic, clear user error feedback.
- **Data Persistence**: Uses `localStorage` to preserve notes across page refreshes and browser restarts.
- **Responsive Layout**: Designed mobile-first with CSS Flexbox, Grid, and media queries for smooth rendering on all device sizes.
- **Safe DOM Rendering**: Prevents XSS vulnerabilities by using native DOM manipulation (`createElement` and `textContent`).

## How to Run Locally

1. Clone or download the repository to your local computer.
2. Navigate into the root project directory:
   ```bash
   cd quicknotes-app
   ```
3. Open index.html in your web browser or launch it with the Live Server extension in Visual Studio Code/antigravity IDE.

## What I Learned

DOM Manipulation & Security: Building UI elements programmatically with document.createElement() and textContent guarantees safe content rendering and avoids security risks associated with innerHTML.

State Management & Persistence: Synchronizing an array of JavaScript objects with browser localStorage using JSON.stringify() and JSON.parse() provides smooth data persistence without relying on external databases.

Responsive UI Architecture: Combining CSS custom properties, Flexbox layouts, and @media queries ensures that both form controls and note cards adapt cleanly to desktop and mobile screens.
