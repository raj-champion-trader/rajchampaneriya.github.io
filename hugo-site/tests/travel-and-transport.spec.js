const { test, expect } = require('@playwright/test');

test.describe('Travel and Transport project page', () => {
  test('loads and displays tables with expected structure', async ({ page }) => {
    const res = await page.goto('/projects/travel-and-transport/');
    expect(res.status()).toBe(200);

    await expect(page).toHaveURL(/\/projects\/travel-and-transport\//);

    const tables = page.locator('.page-content table, .posts-toc table');
    await expect(tables.first()).toBeVisible();
    const count = await tables.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstTable = tables.first();
    await expect(firstTable.locator('thead')).toBeVisible();
    await expect(firstTable.locator('tbody')).toBeVisible();
  });
});
