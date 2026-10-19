Feature: Flight search
  As a traveller I want to search flights by route so that I can pick one to book.

  Scenario: Shopper sees flights for a served route
    Given the traveller is on the Skyline Air home page
    When they search for flights from "SYD" to "MEL"
    Then 2 flight cards are shown
    And the first card shows "SYD to MEL"

  Scenario: Shopper is told when no flights serve the route
    Given the traveller is on the Skyline Air home page
    When they search for flights from "MEL" to "PER"
    Then the message "No flights found for this route." is shown
    And no flight cards are shown
