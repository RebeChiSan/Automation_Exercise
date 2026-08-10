import { Page, expect, Locator } from '@playwright/test';
import { logger } from '../utils/logger';

export class BasePage {
  protected page: Page;
  readonly logOutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly contactUsLink: Locator;
  readonly homeLink: Locator;
  readonly cartLink: Locator;
  readonly testsLink: Locator;
  readonly productsLink: Locator;
  readonly loginLink: Locator;
  readonly scrollUpIcon: Locator;
  readonly subscriptionTitle: Locator;
  readonly emailSubscriptionInput: Locator;
  readonly subscribeButton: Locator;
  readonly modalContent: Locator;
  readonly successSubscriptionMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.locator("//a[text()=' Products']");
    this.cartLink = page.locator("//a[text()=' Cart']");
    this.loginLink = page.locator("//a[text()=' Signup / Login']");
    this.logOutLink = page.locator("//a[text()=' Logout']");
    this.deleteAccountLink = page.locator("//a[text()=' Delete Account']");
    this.testsLink = page.locator("//a[text()=' Test Cases']");
    this.contactUsLink = page.locator("//a[text()=' Contact us']");
    this.homeLink = page.locator("//a[text()=' Home']");
    this.scrollUpIcon = page.locator('#scrollUp');
    this.subscriptionTitle = page.getByRole('heading', { name: 'Subscription' });
    this.emailSubscriptionInput = page.getByPlaceholder('Your email address');
    this.subscribeButton = page.locator('#subscribe');
    this.modalContent = page.locator('.show');
    this.successSubscriptionMessage = page.getByText('You have been successfully subscribed!');
  }

  async clickHome() {
    logger.debug('Clicking Home link');
    await this.homeLink.click();
  }

  async clickSignupLogin() {
    logger.debug('Clicking Signup/Login link');
    await this.loginLink.click();
  }

  async clickProducts() {
    logger.debug('Clicking Products link');
    await this.productsLink.click();
  }

  async clickCart() {
    logger.debug('Clicking Cart link');
    await this.cartLink.click();
  }

  async clickContactUs() {
    logger.debug('Clicking Contact Us link');
    await this.contactUsLink.click();
  }

  async clickTests() {
    logger.debug('Clicking Test Cases link');
    await this.testsLink.click();
  }

  async clickDeleteAccount() {
    logger.debug('Clicking Delete Account link');
    await this.deleteAccountLink.click();
  }

  async clickLogout() {
    logger.debug('Clicking Logout link');
    await this.logOutLink.click();
  }

  async scrollToTop() {
    logger.debug('Scrolling to top of page');
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async clickScrollUpArrow() {
    logger.debug('Clicking scroll-up arrow');
    await this.scrollUpIcon.click();
  }

  async goto(url: string) {
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async scrollDown() {
    logger.debug('Scrolling to bottom of page');
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTargetElement(element: Locator) {
    logger.debug('Scrolling element into view');
    await element.scrollIntoViewIfNeeded();
  }

  async subscribe(email: string) {
    logger.info(`Subscribing with email: ${email}`);
    await this.emailSubscriptionInput.fill(email);
    await this.subscribeButton.click();
  }

  async expectUrl(url: string) {
    logger.debug(`Expecting URL: ${url}`);
    await expect(this.page).toHaveURL(url);
  }

  async expectUrlToContain(text: string) {
    logger.debug(`Expecting URL to contain: ${text}`);
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  async waitForUrl(url: string) {
    logger.debug(`Waiting for URL: ${url}`);
    await this.page.waitForURL(url);
  }

  async waitModalToBeVisible() {
    logger.debug('Waiting for modal to be visible');
    await this.modalContent.waitFor({ state: 'visible' });
  }

  async waitForLoad() {
    logger.debug('Waiting for page load');
    await this.page.waitForLoadState('domcontentloaded');
  }
}
