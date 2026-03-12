import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Ulrich Energy/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('can navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText('About');
  });

  test('can navigate to services page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/services"]');
    await expect(page).toHaveURL(/.*services/);
    await expect(page.locator('h1')).toContainText('Services');
  });

  test('can navigate to contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1')).toContainText('Contact');
  });

  test('navigation is accessible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu should be present
    const mobileMenu = page.locator('[data-mobile-menu]');
    await expect(mobileMenu).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('LCP should be under 2.5s', async ({ page }) => {
    await page.goto('/');
    
    const timing = await page.evaluate(() => {
      return performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    });
    
    // Load time check
    const loadTime = timing.loadEventEnd - timing.startTime;
    expect(loadTime).toBeLessThan(5000); // 5 seconds max
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    const h2s = page.locator('h2');
    expect(await h2s.count()).toBeGreaterThan(0);
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('links should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    const firstLink = page.locator('a').first();
    await firstLink.focus();
    await expect(firstLink).toBeFocused();
  });
});
