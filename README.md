# Meet

**Meet** is a serverless event-discovery web app built with **React and Vite**. It helps users discover upcoming events across Germany, narrow them down by city, date, and category, save events for later, and explore the current results through lightweight data visualizations.

The app uses the **Ticketmaster Discovery API** through a serverless **AWS Lambda + API Gateway** backend, keeping the Ticketmaster API key out of the client.

**Live app:** https://meet-ten-alpha.vercel.app/

---

## Overview

Meet is designed around a simple question:

> **I want to go out, what is happening near me?**

Users can start with events across Germany or search for a specific city. Results update based on the selected city, date, category, and result limit.

The current version includes:

- live event data from Ticketmaster
- city autocomplete
- city-specific event fetching
- date and category filters
- expandable event cards
- saved events with localStorage
- a **My Plans** view
- data visualizations in **City Pulse**
- light and dark themes
- PWA support
- unit, integration, BDD, and end-to-end testing

---

## Tech Stack

| Category | Technologies |
| --- | --- |
| **Frontend** | React 18, JavaScript, HTML, CSS |
| **Build Tool** | Vite + SWC |
| **Event Data** | Ticketmaster Discovery API |
| **Serverless Backend** | AWS Lambda, API Gateway, Serverless Framework |
| **Data Visualization** | Recharts |
| **State / Persistence** | React state, localStorage |
| **Testing** | Jest, React Testing Library, jest-cucumber, Puppeteer |
| **PWA** | vite-plugin-pwa, Workbox |
| **Deployment** | Vercel |

---

## Key Features

### Event discovery

- Browse upcoming events across Germany
- Search for a city with live autocomplete suggestions
- Fetch city-specific event results when a city is selected
- Filter events by date
- Filter by categories such as **Music, Comedy, Culture, and Sports**
- Control how many event cards are displayed
- Reset the city or category filters independently

### Event cards

Each event card can include:

- Ticketmaster event image
- event name
- date
- category
- venue and city
- expandable event details
- link to the event on Ticketmaster
- **Add to Google Calendar** link

The Google Calendar action uses a normal calendar URL and does **not** require Google OAuth or the Google Calendar API.

### My Plans

Users can save events they are interested in.

Saved events are stored in `localStorage`, so they remain available after refreshing the browser.

The **My Plans** view gives users a separate place to review their saved events without requiring an account or database.

### City Pulse

The **City Pulse** section turns the currently loaded event data into simple visual insights.

It includes:

- event distribution across the most represented cities
- an **Other** group for remaining cities
- event distribution across weekdays

The charts are based on the app's current result set rather than a separate analytics API.

### Theme

Meet includes light and dark themes. The selected theme is persisted in `localStorage`.

---

## Architecture

The frontend does not call Ticketmaster directly.

```text
React / Vite frontend
        |
        v
AWS API Gateway
        |
        v
AWS Lambda
        |
        v
Ticketmaster Discovery API
```

The Lambda function stores the Ticketmaster API key as a server-side environment variable and forwards only the event data to the frontend.

This keeps sensitive API credentials out of the browser.

### Event endpoint

```http
GET /api/events
```

Returns upcoming events across Germany.

A city can optionally be supplied:

```http
GET /api/events?city=Berlin
```

The backend currently requests up to **100 events per Ticketmaster request**, sorted by date.

When no city is selected, Meet loads Germany-wide results. When a city is selected, the app requests events for that city instead of filtering only the Germany-wide sample in the browser.

---

## Progressive Web App

Meet uses `vite-plugin-pwa` and Workbox to provide PWA functionality.

The app can be installed on supported desktop and mobile browsers and includes a generated service worker.

Static assets and configured image resources can be cached by the service worker.

> **Note:** live Ticketmaster event requests still require a network connection. The current version does not guarantee a complete offline copy of previously loaded event data.

---

## Testing

The project uses several testing approaches.

### Jest + React Testing Library

Used for component, utility, and integration tests.

Examples include:

- rendering the event list
- city search behavior
- changing the result limit
- date filtering
- category filtering
- event normalization
- chart-data helpers

### jest-cucumber

BDD feature tests cover user-facing behavior such as:

- viewing events across cities
- searching for a city
- selecting a suggested city
- changing the number of displayed events
- expanding and collapsing event details

### Puppeteer

End-to-end tests verify the application in a real browser environment, including city search and event-card interactions.

Run the full test suite with:

```bash
npm test -- --runInBand --silent
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/annapgsm/meet.git
cd meet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will display the local development URL, usually:

```text
http://localhost:5173/
```

---

## Production Build

Create an optimized production build with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

The production files are generated inside the `dist/` directory.

---

## Serverless Backend

The Ticketmaster integration lives in the `auth-server` directory.

The backend uses:

- AWS Lambda
- AWS HTTP API / API Gateway
- Serverless Framework
- Node.js
- Ticketmaster Discovery API

The Lambda reads the Ticketmaster API key from an environment variable:

```text
TICKETMASTER_API_KEY
```

The key is never sent to the React frontend.

### Deploying your own backend

Create an `auth-server/config.json` file containing your own Ticketmaster API key:

```json
{
  "TICKETMASTER_API_KEY": "your-ticketmaster-api-key"
}
```

Do not commit this file or your API key to GitHub.

Then deploy the serverless backend from the `auth-server` directory using your configured AWS account and the Serverless Framework.

---

## Deployment

The frontend is deployed with **Vercel**:

https://meet-ten-alpha.vercel.app/

A typical deployment flow is:

```bash
npm test -- --runInBand --silent
npm run build
git push
```

Vercel can then build and deploy the connected repository automatically.

---

## Project Evolution

Meet originally used the **Google Calendar API with OAuth2** as part of its first implementation.

The project was later migrated to **Ticketmaster Discovery API + AWS Lambda/API Gateway** so the application could provide current public event data without requiring users to sign in.

The original Google Calendar/OAuth implementation is preserved in the branch:

```text
legacy-google-calendar
```

The current application does **not** use Google OAuth for event discovery.

---

## Main User Flows

### Discover events

```text
Open Meet
- browse Germany-wide events
- optionally select a city
- optionally choose a date
- optionally choose a category
- browse the results
```

### Save an event

```text
Find an event
- save it
- open My Plans
- review saved events later
```

### Explore event trends

```text
Apply filters
- scroll to City Pulse
- view city and weekday distribution
```

---

## What I Practiced

This project gave me hands-on experience with:

- building reusable React components
- managing state and derived UI
- integrating an external REST API
- creating a serverless API layer
- keeping API credentials out of the client
- normalizing third-party API data
- client-side filtering
- localStorage persistence
- responsive UI development
- data visualization
- PWA configuration
- TDD and BDD workflows
- integration and browser-based end-to-end testing
- migrating an existing application to a new API architecture

---

## Repository

GitHub: https://github.com/annapgsm/meet
