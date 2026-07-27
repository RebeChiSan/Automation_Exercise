import { Page } from '@playwright/test';

export async function blockAnnoyingRequests(page: Page) {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (
      url.includes('google-analytics') ||
      url.includes('doubleclick') ||
      url.includes('adservice') ||
      url.includes('facebook.com') ||
      url.endsWith('.mp4')
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });
}
