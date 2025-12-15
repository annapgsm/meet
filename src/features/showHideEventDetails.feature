Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default
        Given the event list is displayed
        When an event item loads
        Then the event details should be hidden by default.

    Scenario: User can expand an event to see details
        Given the event list is displayed and events are collapsed
        When the user clicks on an event
        Then the event should expand to show additional information.

    Scenario: User can collapse an event to hide details
        Given the user has expanded an event
        When the user clicks on the expanded event again
        Then the event details should collapse and hide again.