import { test, expect } from '../fixtures';

// Baseline check for Step 1 (setup). If these pass, your environment is ready.
test.describe('Environment smoke', () => {
  test('app health endpoint responds', { tag: '@smoke' }, async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  test('home page loads', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Skyline Air' })).toBeVisible();
  });
});
