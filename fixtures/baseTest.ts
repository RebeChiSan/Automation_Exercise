import { test as base, expect } from '@playwright/test';
import { blockAnnoyingRequests } from '../utils/network';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { DeleteAccountPage } from '../pages/DeleteAccountPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductsPage } from '../pages/ProductsPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ViewCartPage } from '../pages/ViewCartPage';

type MyFixtures = {
  accountCreatedPage: AccountCreatedPage;
  checkoutPage: CheckoutPage;
  deleteAccountPage: DeleteAccountPage;
  homePage: HomePage;
  loginPage: LoginPage;
  paymentPage: PaymentPage;
  productDetailsPage: ProductDetailsPage;
  productsPage: ProductsPage;
  signupPage: SignUpPage;
  viewCartPage: ViewCartPage;
  blockAnnoying: void;
};

export const test = base.extend<MyFixtures>({
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  deleteAccountPage: async ({ page }, use) => {
    await use(new DeleteAccountPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  viewCartPage: async ({ page }, use) => {
    await use(new ViewCartPage(page));
  },
  blockAnnoying: [
    async ({ page }, use) => {
      await blockAnnoyingRequests(page);
      await use();
    },
    { auto: true },
  ],
});

export { expect };
