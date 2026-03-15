const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BLOG_URL = '/blog/2026/03/travel_n_transport/day-01-rail-maintenance-big-picture/';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots', 'mobile');

test.describe('Scrollspy mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('captures scrollspy styling at top, dropdown open, and active state', async ({ page }) => {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

    const res = await page.goto(BLOG_URL);
    expect(res.status()).toBe(200);
    await expect(page).toHaveURL(/day-01-rail-maintenance-big-picture/);

    const scrollspyNav = page.locator('#scrollspy-nav');
    const scrollspyList = page.locator('#scrollspy-list');
    const trigger = page.locator('.scrollspy-trigger');

    await page.waitForSelector('#scrollspy-nav.has-items', { timeout: 10000 });
    await expect(scrollspyNav).not.toHaveAttribute('hidden');
    await expect(trigger).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    if (await scrollspyNav.evaluate((el) => el.classList.contains('scrollspy-row-hidden'))) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
    }

    await expect(scrollspyNav).toBeVisible();
    await expect(trigger).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-top-collapsed.png'),
      fullPage: true,
    });
    await scrollspyNav.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-top-collapsed-header.png'),
    });

    await trigger.click();
    await expect(scrollspyNav).toHaveClass(/is-open/);
    await expect(scrollspyList).toBeVisible();
    const linkCount = await scrollspyList.locator('.scrollspy-link').count();
    expect(linkCount).toBeGreaterThanOrEqual(1);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-dropdown-open.png'),
      fullPage: true,
    });
    await scrollspyNav.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-dropdown-open-header.png'),
    });

    const secondH2 = page.locator('.post-content h2[id]').nth(1);
    await secondH2.scrollIntoViewIfNeeded();
    await page.evaluate((offset) => {
      window.scrollBy(0, -offset);
    }, 100);
    await page.waitForTimeout(400);

    const activeLink = page.locator('.scrollspy-link.is-active');
    await expect(activeLink).toHaveCount(1, { timeout: 2000 });

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03-active-state.png'),
      fullPage: true,
    });
    await scrollspyNav.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03-active-state-header.png'),
    });

    expect(await trigger.locator('.scrollspy-trigger-label').textContent()).toBeTruthy();
  });
});
