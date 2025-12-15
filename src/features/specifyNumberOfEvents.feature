Feature: Specify Number of Events

    Scenario: When user hasn't specified a number, 32 events are shown by default
        Given the user has not entered any number of events to display
        When the event list is rendered
        Then the app should show 32 upcoming events by default.

    Scenario: User can change the number of events displayed
        Given the event list has been displayed
        When the user specifies a number of events between 1 and all
        Then the user should receive a list with that specified number of events.
