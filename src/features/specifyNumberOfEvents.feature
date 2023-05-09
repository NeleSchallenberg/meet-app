Feature: Specify number of events

Scenario: When user has not specified a number, 32 is the default number
Given user has not specified a number of events
When the user receives a list of events
Then the user should see 32 events by default

Scenario: User can change the number of events they want to see
Given user is seeing 32 events by default
When the user specifies the number of events
Then the user should see the desired number of events on screen