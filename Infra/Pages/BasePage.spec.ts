// playwright-dev-page.ts
import { expect, Locator, Page, Browser, BrowserContext } from '@playwright/test';
import { SignUpPage } from './SignUpPage.spec';

export class BasePage {

  readonly page: Page;
  readonly asosHeadlineText: Locator;
  readonly browser: Browser;
  protected signUpPage: SignUpPage;
  protected context: BrowserContext;

  constructor(page: Page) {
    this.page = page;
    this.asosHeadlineText = page.locator('h2', { hasText: 'This is ASOS' });
  }

  async getStarted() {
    // Create a new incognito browser context
    this.context = await this.browser.newContext();
    // Create a new page inside context.
    const page = await this.context.newPage(); 
    await expect(this.asosHeadlineText).toBeVisible();
  }

  async pageObjectModel() {
    await this.getStarted();
  }
  
}