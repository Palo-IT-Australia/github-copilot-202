import { test, expect } from '../fixtures';
import { Booking } from '../fixtures/types';

test.describe('Create booking API', () => {
  test('creates a confirmed booking with the correct total', { tag: ['@tc2', '@api'] }, async ({ flightsApi, bookingsApi }) => {
    // SYD to MEL, first flight: fare $320 + $35 tax
    const { body: flights } = await flightsApi.search('SYD', 'MEL');
    const flight = flights[0];

    const { response, body } = await bookingsApi.create({ flightId: flight.id, passengerName: 'Alex Tester' });
    const booking = body as Booking;

    expect(response.status()).toBe(201);
    expect(booking.bookingRef).toMatch(/^[A-Z0-9]{6}$/);
    expect(booking.status).toBe('CONFIRMED');
    expect(booking.totalAud).toBe(355);
  });

  test('rejects a booking without a passenger name', { tag: ['@tc2', '@api'] }, async ({ bookingsApi }) => {
    const { response, body } = await bookingsApi.create({ flightId: 1 });

    expect(response.status()).toBe(400);
    expect(body).toEqual({ error: 'passengerName is required' });
  });
});
