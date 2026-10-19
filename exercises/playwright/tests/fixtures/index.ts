import { test as base, expect } from '@playwright/test';
import { BookingsApi, FlightsApi } from './api-clients';
import { FlightSearchPage } from '../pages/flight-search.page';

// Central fixtures. Specs import { test, expect } from here, never from '@playwright/test'.
type Fixtures = {
  flightsApi: FlightsApi;
  bookingsApi: BookingsApi;
  flightSearchPage: FlightSearchPage;
};

export const test = base.extend<Fixtures>({
  flightsApi: async ({ request }, use) => {
    await use(new FlightsApi(request));
  },
  bookingsApi: async ({ request }, use) => {
    await use(new BookingsApi(request));
  },
  flightSearchPage: async ({ page }, use) => {
    await use(new FlightSearchPage(page));
  },
});

export { expect };
