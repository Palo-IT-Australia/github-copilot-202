import { Locator, Page } from '@playwright/test';

// Page object for the Skyline Air flight search page.
// All locators for this page live here, not in the specs.
export class FlightSearchPage {
  readonly fromSelect: Locator;
  readonly toSelect: Locator;
  readonly searchButton: Locator;
  readonly flightCards: Locator;
  readonly noResultsMessage: Locator;

  constructor(private readonly page: Page) {
    this.fromSelect = page.getByLabel('From');
    this.toSelect = page.getByLabel('To');
    this.searchButton = page.locator('#search-btn');
    this.flightCards = page.locator('.flight-row');
    this.noResultsMessage = page.getByText('No flights found for this route.');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(from: string, to: string) {
    await this.fromSelect.selectOption(from);
    await this.toSelect.selectOption(to);
    await this.searchButton.click();
  }
}
