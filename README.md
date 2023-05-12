# Meet-App

This project is a simple web-application that shows upcoming events in different cities.
It is built as a task for Achievement 4 of [CareerFoundry's Full-Stack Web Development program](https://careerfoundry.com/en/courses/become-a-web-developer).

## About

The achievement objective is to build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique.
The application should use the Google Calendar API to fetch upcoming events in different cities and display them to the user.
Serverless functions will be used to authorize users, by requesting and delivering an authorization token from the authorization server AWS Lambda.

## Key Features

-   Filter events by city
-   Show/hide event details
-   Specify number of events
-   Use the app when offline
-   View a chart showing the number of upcoming events by city
-   Add an app shortcut to the home screen

## User Stories

### FEATURE 1: FILTER EVENTS BY CITY

As a user I should be able to filter events by city, so that I can see the list of events that take place in a specific city.

_TEST SCENARIO 1: When user hasn't searched for a city, show upcoming events from all cities._

**Given** user hasn’t searched for any city, **when** the user opens the app, **then** the user should see a list of all upcoming events.

**TESTS**

-   Render city search component
-   Render number of events component
-   Render list of events
-   Render correct number of events

_TEST SCENARIO 2: User should see a list of suggestions when they search for a city._

**Given** the main page is open, **when** the user starts typing in the city text box, **then** the user should see a list of cities (suggestions) that match what they’ve typed.

**TESTS**

-   Render text input field
-   Render a list of suggestions
-   Render user input correctly
-   Change state when text input changes
-   Render list of suggestions correctly
-   Suggestion list match the query when changed

_TEST SCENARIO 3: User can select a city from the suggested list._

**Given** user was typing “Berlin” in the city text box and the list of suggested cities is showing, **when** the user selects a city (e.g., “Berlin, Germany”) from the list, **then** the city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city **and** the list of suggestions should disappear **and** the user should receive a list of upcoming events in that city.

**TESTS**

-   Selecting a suggestion should change query state

---

### FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS

As a user I should be able to show and hide an event's details so that I can get more or less information about a specific event.

_TEST SCENARIO 1: An event element is collapsed by default._

**Given** user received a list with upcoming events, **when** the user scrolls through the list of events, **then** the user should see all event elements without their details.

**TESTS**

-   Render event component
-   Event is collapsed by default
-   Render event overview when collapsed
-   Render button to show details when collapsed

_TEST SCENARIO 2: User can expand an event to see its details._

**Given** a list of collapsed event elements is displayed, **when** the user clicks on the event, **then** the user should see the event element expanding and showing the events details.

**TESTS**

-   Expand details when button is clicked
-   Render details when expanded

_TEST SCENARIO 3: User can collapse an event to hide its details._

**Given** user has expanded an event to see the details,**when** the user clicks on the event,**then** the user should see the event collapsing and hiding the details again.

**TESTS**

-   Collapse details when button is clicked

---

### FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user I should be able to specify the number of events on screen so that I can get a better and faster overview of events at once.

_TEST SCENARIO 1: When user hasn’t specified a number, 32 is the default number._

**Given** user hasn't specified a number of events, **when** the user receives a list of events, **then** the user should see 32 events by default.

**TESTS**

-   Render number input field
-   Render 32 as default value for number of events

_TEST SCENARIO 2: User can change the number of events they want to see._

**Given** user is seeing 32 events by default, **when** the user specifies the number of events, **then** the user should see the desired number of events on screen.

**TESTS**

-   Render user input correctly
-   Change state when number input changes

---

### FEATURE 4: USE THE APP WHEN OFFLINE

As a user I should be able to use the app in an offline mode so that I can see events and details that I last viewed online.

_TEST SCENARIO 1: Show cached data when there’s no internet connection._

**Given** user has looked at events and details for a specific city while online, **when** the user goes offline, **then** the user should still see the events and details that were previously looked at.

_TEST SCENARIO 2: Show error when user changes the settings (city, time range)._

**Given** user has looked at a cached list of events for a specific city while offline, **when** the user changes the city, **then** the user should see an error message.

---

### FEATURE 5: DATA VISUALISATION

As a user I should be able to see chart about events in each city, so that I can get a quick overview of upcoming events in different cities.

_TEST SCENARIO 1: Show a chart with the number of upcoming events in each city._

**Given** user hasn't searched for a specific city, **when** the user opens the app, **then** the user should see a chart that is showing what events are organised in which city.

---

## Technical requirements

-   Built with React and TDD technique
-   Uses Google Calendar API and OAuth2 authentication
-   Uses serverless functions (AWS lambda) for authorization server
-   Hostet in Git repository on GitHub and deployed on GitHub Pages
-   Displays well on all screen sizes (responsive) and works on latest versions of Chrome, Firefox, Safari, Edge, Opera and IE11
-   Passes [Lighthouse’s PWA checklist](https://developer.chrome.com/docs/lighthouse/overview/)
-   Works offline or in slow network conditions with the help of a service worker
-   Can be installed on desktop or added to home screen
-   Uses React axios and async/await for API call
-   Implements alert system using an OOP approach
-   Uses data visualization (recharts)
-   Covered by tests with coverage rate >= 90%.
-   Monitored by an online monitoring tool

## Live Version

https://neleschallenberg.github.io/meet-app/

## Links

[Project Brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A4-Project-Brief-Jan2023.pdf)
<br>
[Google Calendar API](https://developers.google.com/calendar/api/guides/overview)

## Web View

![Meet App web view](https://github.com/NeleSchallenberg/meet-app/blob/main/files/screenshot-large.png)
![Meet App web view](https://github.com/NeleSchallenberg/meet-app/blob/main/files/screenshot-detail.png)
