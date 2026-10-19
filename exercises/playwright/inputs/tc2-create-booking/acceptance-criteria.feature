Feature: Create booking
  As a traveller I want to book a flight so that I receive a confirmed booking.

  Scenario: A valid booking is confirmed with the correct total
    Given flight SK101 (SYD to MEL) has a fare of 320 AUD and 35 AUD tax
    When a booking is created for that flight with passenger name "Alex Tester"
    Then the API responds with status 201
    And the booking reference is 6 uppercase letters or digits
    And the booking status is "CONFIRMED"
    And the booking total is 355 AUD as a number

  Scenario: A booking without a passenger name is rejected
    When a booking is created without a passenger name
    Then the API responds with status 400
    And the error is "passengerName is required"
