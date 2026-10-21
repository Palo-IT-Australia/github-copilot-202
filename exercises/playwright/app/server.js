const path = require('path');
const express = require('express');
const { flights } = require('./data/flights');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const bookings = [];

function toPublicFlight({ id, flightNo, from, to, departs, priceAud }) {
  return { id, flightNo, from, to, departs, priceAud };
}

function newBookingRef() {
  return Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, 'X');
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/flights', (req, res) => {
  const { from, to } = req.query;
  const result = flights
    .filter((f) => (!from || f.from === from) && (!to || f.to === to))
    .map(toPublicFlight);
  res.json(result);
});

app.post('/api/bookings', (req, res) => {
  const { flightId, passengerName } = req.body ?? {};
  if (!passengerName || typeof passengerName !== 'string' || !passengerName.trim()) {
    return res.status(400).json({ error: 'passengerName is required' });
  }
  const flight = flights.find((f) => f.id === flightId);
  if (!flight) {
    return res.status(404).json({ error: 'flight not found' });
  }

  const booking = {
    bookingRef: newBookingRef(),
    flightId: flight.id,
    passengerName: passengerName.trim(),
    status: 'CONFIRMED',
    totalAud: flight.priceAud + flight.taxAud,
  };
  bookings.push(booking);
  res.status(201).json(booking);
});

const PORT = process.env.PORT ?? 3100;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Skyline Air demo running on http://localhost:${PORT}`));
}

module.exports = { app };
