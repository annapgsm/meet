
# Meet App

**Meet App** is a serverless, progressive web application (PWA) built with **React** using **Vite**.  

Users can browse and filter upcoming events across different cities, view event details, and interact with data visualizations — all while supporting offline access and home screen installation.


## Overview 

...
## Tech Stack
| Category | Technologies |
|-----------|---------------|
| **Frontend** | React (Vite + SWC), JavaScript, HTML, CSS |
| **Testing** | Jest, Cucumber, Puppeteer |
| **Deployment** | GitHub Pages / Netlify |
| **Data Source** | Google Calendar API |
| **Build Tools** | Vite, npm |
| **Other** | Service Workers, AWS Lambda (serverless backend) |


## Features
- **Event Browsing:** View a list of upcoming events from various cities.
- **City Search:** Filter events by city with live suggestions.
- **Event Details:** Expand or collapse event information.
- **Customizable Event Count:** Set how many events to display at once.
- **Offline Use:** Save events locally and view them without internet access.
- **PWA Support:** Install the app directly on your device home screen.
- **Data Visualization:** View charts that show event distribution by city.
## Set up instructions

Follow these steps to get the Meet App running locally on your machine:

### Steps
1. **Clone the repository**  
   ```bash
   git clone https://github.com/annapgsm/meet.git
   cd meet
2. **Install dependencies** 
   ```bash
   npm install

3. **Start development server**
  ```bash
npm start
 ```
 
The app should now be accessible at http://localhost:5173/

4. **Build the app for production**
 ```bash
   npm run build
```


## Deployment

This app is deployed on Vercel and can be accessed here:

https://meet-ten-alpha.vercel.app/


To deploy your own version:

- Create a [Vercel](https://vercel.com/) account.
- Import the project repository into Vercel and follow the prompts to deploy the app.
- Your app will be live at the provided Vercel URL.
## User Stories

### Feature 1: Filter Events by City

**Scenario 1 – Show all events by default**  

As a user, I should be able to see all upcoming events by default so that I can explore what’s happening in all cities without searching first.

* Given user hasn’t searched for any city;  
* When the user opens the app;  
* Then the user should see a list of upcoming events.

**Scenario 2 – Show city suggestions**  

As a user, I should be able to see city suggestions as I type so that I can quickly find and select the city I’m interested in.

* Given the main page is open;  
* When the user starts typing in the city textbox;  
* Then the user should receive a list of cities (suggestions) that match what they’ve typed.

**Scenario 3 – Select a city from suggestions**  

As a user, I should be able to select a city from the suggested list so that I can view events specific to that city.

* Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing;  
* When the user selects a city (e.g., “Berlin, Germany”) from the list;  
* Then their city should be changed to that city and the user should receive a list of upcoming events there.

**Scenario 4 – No results found (optional)**  

As a user, I should be notified when no events are available for the city I searched for so that I know my search was valid but empty.

* Given the user searches for a city with no upcoming events;  
* When the app fetches event data;  
* Then a message like “No upcoming events found” should be displayed.

---

### Feature 2: Show/Hide Event Details

**Scenario 1 – View event details**  

As a user, I should be able to view details of an event so that I can learn more about it before deciding to attend.

* Given the event list has been displayed;  
* When the user selects an event;  
* Then the event details will be shown.

**Scenario 2 – Hide event details**  

As a user, I should be able to hide event details so that I can easily return to the main list of events.

* Given the event details have been displayed;  
* When the user clicks the Back button;  
* Then the list of events will be visible again.

**Scenario 3 – Expand multiple events (optional)**  

As a user, I should be able to open and close multiple event details independently so that I can compare information between events.

* Given the event list has been displayed;  
* When the user opens multiple event details;  
* Then each event’s details should expand or collapse independently.

---

### Feature 3: Specify Number of Events

**Scenario 1 – Set number of events**  

As a user, I should be able to set the number of events shown so that I can control how much information I see at once.

* Given the event list has been displayed;  
* When the user specifies a number of events between 1 and all;  
* Then the user should receive a list with that specified number of events.

**Scenario 2 – Show all by default**  

As a user, I should be able to see all events by default so that I don’t miss any if I haven’t chosen a specific limit.

* Given the user has not selected a number of events;  
* When the event list is displayed;  
* Then all upcoming events will be shown by default.

**Scenario 3 – Invalid number input (optional)**  

As a user, I should receive an error or warning if I enter an invalid number so that I understand how to correct it.

* Given the user has entered a number outside the valid range (e.g., 0 or negative);  
* When the user submits it;  
* Then a message should appear explaining the valid range.

---

### Feature 4: Use the App When Offline

**Scenario 1 – Save events for offline use**  

As a user, I should be able to save events while online so that I can access them later without an internet connection.

* Given the user has been online;  
* When the user saves an event;  
* Then the event will be stored for offline use.

**Scenario 2 – View saved events offline**  

As a user, I should be able to view saved events offline so that I can still see important information even without internet access.

* Given the user has saved events;  
* When the user opens the app while offline;  
* Then the saved events will be displayed.

**Scenario 3 – Sync when back online (optional)**  

As a user, I should be able to automatically sync my saved events once I reconnect so that my data stays up to date.

* Given the user has been offline and returns online;  
* When the app reconnects;  
* Then it should sync any saved events with the latest data.

---

### Feature 5: Add an App Shortcut to the Home Screen

**Scenario 1 – Add shortcut**  

As a user, I should be able to add the app to my home screen so that I can open it quickly without using the browser.

* Given the user has opened the app in the browser;  
* When the user selects the option to “Add to Home Screen”;  
* Then an app shortcut will be added to their device home screen.

**Scenario 2 – Open app from shortcut**  

As a user, I should be able to open the app from my home screen shortcut so that I can access it directly.

* Given the app shortcut has been added to the home screen;  
* When the user taps the app icon;  
* Then the app will open directly.

**Scenario 3 – Update or reinstall shortcut (optional)**  

As a user, I should be able to reinstall or update the app shortcut so that I can keep using the latest version of the app.

* Given a new version of the app is available;  
* When the user is prompted to update or reinstall the shortcut;  
* Then the new version should replace the old one.

---

### Feature 6: Display Charts Visualizing Event Details

**Scenario 1 – View event chart**  

As a user, I should be able to view charts of upcoming events so that I can understand event distribution across cities visually.

* Given the event data has been loaded;  
* When the user opens the charts section;  
* Then a chart showing upcoming events in each city will be displayed.

**Scenario 2 – Filter chart by city (optional)**  

As a user, I should be able to filter chart data by city so that I can focus on the city I’m interested in.

* Given the chart has been displayed;  
* When the user filters events by city;  
* Then the chart will update to reflect the selected city only.

**Scenario 3 – Interact with chart (optional)**  

As a user, I should be able to hover or tap on chart elements so that I can see more detailed event data.

* Given the chart has been displayed;  
* When the user hovers or taps on a data point;  
* Then a tooltip should display detailed information (e.g., number of events or city name).
