Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given user received a list with upcoming events
When the user scrolls through the list of events
Then the user should see all event elements without their details

Scenario: User can expand an event to see its details
Given a list of collapsed event elements is displayed
When the user clicks on the button to show details
Then the user should see the event element expanding and showing the events details

Scenario: User can collapse an event to hide its details
Given user has expanded an event to see the details
When the user clicks on the button to hide details
Then the user should see the event collapsing and hiding the details