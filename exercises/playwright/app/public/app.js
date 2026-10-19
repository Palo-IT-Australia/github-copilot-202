const searchForm = document.getElementById('search-form');
const flightList = document.getElementById('flight-list');
const noResults = document.getElementById('no-results');
const bookingPanel = document.getElementById('booking-panel');
const bookingForm = document.getElementById('booking-form');
const confirmation = document.getElementById('booking-confirmation');
const bookingError = document.getElementById('booking-error');
let selectedFlight = null;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const res = await fetch(`/api/flights?from=${from}&to=${to}`);
  const flights = await res.json();

  flightList.innerHTML = '';
  bookingPanel.hidden = true;
  noResults.hidden = flights.length > 0;

  for (const f of flights) {
    const li = document.createElement('li');
    li.className = 'flight-card';
    li.dataset.testid = 'flight-card';
    li.setAttribute('data-testid', 'flight-card');
    li.innerHTML = `<strong>${f.flightNo}</strong> ${f.from} to ${f.to} - departs ${f.departs} - $${f.priceAud}`;
    const book = document.createElement('button');
    book.textContent = 'Book';
    book.addEventListener('click', () => {
      selectedFlight = f;
      document.getElementById('booking-flight').textContent = f.flightNo;
      confirmation.hidden = true;
      bookingError.hidden = true;
      bookingPanel.hidden = false;
    });
    li.appendChild(book);
    flightList.appendChild(li);
  }
});

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  confirmation.hidden = true;
  bookingError.hidden = true;
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      flightId: selectedFlight.id,
      passengerName: document.getElementById('passenger').value,
    }),
  });
  const body = await res.json();
  if (!res.ok) {
    bookingError.textContent = body.error;
    bookingError.hidden = false;
    return;
  }
  confirmation.textContent = `Booking ${body.bookingRef} confirmed. Total $${body.totalAud}`;
  confirmation.hidden = false;
});
