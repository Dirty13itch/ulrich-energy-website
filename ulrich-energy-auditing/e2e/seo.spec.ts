import { test, expect } from '@playwright/test';

test.describe('SEO', () => {
  test('homepage has correct meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Title
    await expect(page).toHaveTitle(/Ulrich Energy/);
    
    // Description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description?.length).toBeGreaterThan(50);
    expect(description?.length).toBeLessThan(160);
  });

  test('services page has correct meta tags', async ({ page }) => {
    await page.goto('/services');
    
    const title = await page.title();
    expect(title.toLowerCase()).toContain('service');
  });

  test('has robots.txt', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    
    const body = await response.text();
    expect(body).toContain('User-agent:');
  });

  test('has sitemap.xml', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    
    const body = await response.text();
    expect(body).toContain('urlset');
    expect(body).toContain('loc');
  });

  test('has canonical URLs', async ({ page }) => {
    await page.goto('/');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
  });

  test('has Open Graph tags', async ({ page }) => {
    await page.goto('/');
    
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toBeTruthy();
  });
});
