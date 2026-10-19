import { test, expect } from '../fixtures';

test.describe('Flight search', () => {
  test.beforeEach(async ({ flightSearchPage }) => {
    await flightSearchPage.goto();
  });

  test('shows matching flights for a served route', { tag: ['@tc1', '@ui'] }, async ({ flightSearchPage }) => {
    await flightSearchPage.search('SYD', 'MEL');

    await expect(flightSearchPage.flightCards).toHaveCount(2);
    await expect(flightSearchPage.flightCards.first()).toContainText('SYD to MEL');
  });

  test('shows a message when no flights serve the route', { tag: ['@tc1', '@ui'] }, async ({ flightSearchPage }) => {
    await flightSearchPage.search('MEL', 'PER');

    await expect(flightSearchPage.noResultsMessage).toBeVisible();
    await expect(flightSearchPage.flightCards).toHaveCount(0);
  });
});
