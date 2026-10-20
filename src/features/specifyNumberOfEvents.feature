Feature: Specify Number of Events

    Scenario: 32 events are shown by default
        Given the user has not changed the result limit
        When the event list is rendered
        Then the app should show 32 upcoming events by default.

    Scenario: User can change the number of events displayed
        Given the event list has been displayed
        When the user selects 16 events
        Then the app should show 16 events.