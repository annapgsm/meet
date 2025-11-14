
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

**Scenario 1 – When user hasn’t searched for a city, show upcoming events from all cities**  

As a user, I should be able to see all upcoming events by default so that I can explore what’s happening in all cities without searching first.

* Given user hasn’t searched for any city;  
* When the user opens the app;  
* Then the user should see a list of upcoming events.

**Scenario 2 – User should see a list of suggestions when they search for a city**  

As a user, I should be able to see city suggestions so that I can quickly find and select the city I’m interested in.

* Given the main page is open;  
* When the user starts typing in the city textbox;  
* Then the user should receive a list of cities (suggestions) that match what they’ve typed.

**Scenario 3 – User can select a city from the suggested list**  

As a user, I should be able to select a city from the suggested list so that I can view events specific to that city.

* Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing;  
* When the user selects a city (e.g., “Berlin, Germany”) from the list;  
* Then their city should be changed to that city and the user should receive a list of upcoming events there.

---

### Feature 2: Show/Hide Event Details

**Scenario 1 – An event element is collapsed by default**  

As a user, I should see event elements collapsed by default so that I can quickly browse a list of events.

* Given the event list is displayed;
* When an event item loads;
* Then the event details should be hidden by default.

**Scenario 2 - User can expand an event to see details.**  

As a user, I should be able to expand an event to see more details so that I can learn additional information about it.

* Given the event list is displayed and events are collapsed;
* When the user clicks or taps on an event;
* Then that specific event should expand to show additional information such as description, location, and organizer.

**Scenario 3 - User can collapse an event to hide details**  

As a user, I should be able to collapse an expanded event so that I can return to the clean event list view.

* Given the user has expanded an event;
* When the user clicks or taps on the expanded event again;
* Then the event details should hide, returning the event to its collapsed state.

---

### Feature 3: Specify Number of Events

**Scenario 1 – When user hasn’t specified a number, 32 events are shown by default**  

As a user, I should see 32 events by default when I haven’t specified a number so that I get a reasonable list of upcoming events.

* Given the user has not entered any number of events to display;
* When the event list is rendered;
* Then the app should show 32 upcoming events by default.

**Scenario 2 – User can change the number of events displayed**  

As a user, I should be able to change the number of events displayed so that I can view more or fewer events at once.

* Given the event list has been displayed;  
* When the user specifies a number of events between 1 and all;  
* Then the user should receive a list with that specified number of events.

---

### Feature 4: Use the App When Offline

**Scenario 1 – Show cached data when there’s no internet connection**  

As a user, I should be able to use the app and view cached event data when offline so that I can still access previous information.

* Given the device has no internet connection;
* When the user opens the app;
* Then the app should display cached event data from the last successful connection.

**Scenario 2 – Show error when user changes search settings (city, number of events)**  

As a user, I should see an error message when I try to change the search settings (city or number of events) while offline so that I understand my request can’t be processed.

* Given the device has no internet connection;
* When the user attempts to search for a new city or change the number of events;
* Then the app should show an error message stating that changes cannot be made while offline.

---

### Feature 5: Add an App Shortcut to the Home Screen

**Scenario 1 – User can install the meet app as a shortcut on their device home screen**  

As a user, I should be able to install the Meet app as a shortcut on my device’s home screen so that I can easily access it.

* Given the user has installed or opened the web app in a browser;
* When the app offers an “Add to Home Screen” prompt;
* Then the user can choose to install the shortcut, adding the Meet app icon to their device’s home screen.

---

### Feature 6: Display Charts Visualizing Event Details

**Scenario 1 – Show a chart with the number of upcoming events in each city**  

As a user, I should see a chart displaying the number of upcoming events in each city so that I can quickly understand event distribution.

* Given the user is viewing the dashboard or summary section of the app;
* When event data is loaded;
* Then a chart should appear showing the number of upcoming events per city.
