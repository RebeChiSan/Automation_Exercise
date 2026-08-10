import { test, expect } from '../fixtures/baseTest';
import type { RegisterCleanup } from '../fixtures/baseTest';
import type { BasePage } from '../pages/BasePage';
import type { HomePage } from '../pages/HomePage';
import type { LoginPage } from '../pages/LoginPage';
import type { SignUpPage } from '../pages/SignUpPage';
import type { AccountCreatedPage } from '../pages/AccountCreatedPage';
import type { DeleteAccountPage } from '../pages/DeleteAccountPage';
import type { ProductsPage } from '../pages/ProductsPage';
import type { ViewCartPage } from '../pages/ViewCartPage';
import type { CheckoutPage } from '../pages/CheckoutPage';
import type { PaymentPage } from '../pages/PaymentPage';
import type { User, PaymentDetails } from '../types';
import { generateDynamicEmail } from './helpers';

/**
 * Composable multi-page flows shared across spec files. Extracted because several
 * checkout/signup test cases were repeating the same page sequences almost verbatim.
 * Each flow is wrapped in test.step() so the HTML/Allure report shows a breakdown
 * instead of one long flat list of actions.
 */

interface RegisterNewUserPages {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignUpPage;
  accountCreatedPage: AccountCreatedPage;
}

/**
 * Signs up a new user from the login/signup page and registers its cleanup so the
 * account is deleted in teardown even if a later assertion in the test fails.
 */
export async function registerNewUser(
  pages: RegisterNewUserPages,
  userData: User,
  deleteAccountPage: DeleteAccountPage,
  registerCleanup: RegisterCleanup,
): Promise<string> {
  return test.step(`Register new user: ${userData.userName}`, async () => {
    const { homePage, loginPage, signupPage, accountCreatedPage } = pages;
    const dynamicEmail = generateDynamicEmail(userData.emailAddress);

    await expect(loginPage.newUserSignupHeading).toBeVisible();
    await loginPage.signup(userData.userName, dynamicEmail);
    await expect(signupPage.accountInfoTitle).toBeVisible();
    await signupPage.fillAccountInfo(userData);
    await signupPage.clickOnCreateAccount();
    await accountCreatedPage.expectAccountCreatedVisible();
    await accountCreatedPage.clickContinue();
    await homePage.expectLoginUserVisible(userData.userName);

    registerCleanup(() => deleteCurrentAccount(homePage, deleteAccountPage));

    return dynamicEmail;
  });
}

/** Logs in an existing user from the home page and verifies the session started. */
export async function loginExistingUser(
  pages: { homePage: HomePage; loginPage: LoginPage },
  credentials: Pick<User, 'emailAddress' | 'password' | 'userName'>,
): Promise<void> {
  return test.step(`Login existing user: ${credentials.userName}`, async () => {
    const { homePage, loginPage } = pages;
    await homePage.clickSignupLogin();
    await expect(loginPage.loginHeading).toBeVisible();
    await loginPage.loginUser(credentials.emailAddress, credentials.password);
    await homePage.expectLoginUserVisible(credentials.userName);
  });
}

/** Deletes the currently logged-in account via the nav bar link, from any page. */
export async function deleteCurrentAccount(page: BasePage, deleteAccountPage: DeleteAccountPage): Promise<void> {
  return test.step('Delete current account', async () => {
    await page.clickDeleteAccount();
    await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();
  });
}

interface ShopToCartPages {
  homePage: HomePage;
  productsPage: ProductsPage;
  viewCartPage: ViewCartPage;
}

/** Adds N products to the cart from the products listing and lands on the cart page. */
export async function addProductsAndGoToCart(pages: ShopToCartPages, numberOfProducts: number): Promise<void> {
  return test.step(`Add ${numberOfProducts} product(s) to cart`, async () => {
    const { homePage, productsPage, viewCartPage } = pages;
    await homePage.clickProducts();
    await productsPage.waitForLoad();
    await expect(productsPage.allProductsTitle).toBeVisible();
    await productsPage.addProductsToCart(numberOfProducts);
    await productsPage.clickContinueButton();
    await productsPage.clickCart();
    await viewCartPage.waitForLoad();
  });
}

/** Fills delivery/comment, places the order and pays. Assumes the checkout page is open. */
export async function completeCheckoutAndPay(
  pages: { checkoutPage: CheckoutPage; paymentPage: PaymentPage },
  userData: User,
  paymentDetails: PaymentDetails,
  comment: string,
): Promise<void> {
  return test.step('Complete checkout and pay', async () => {
    const { checkoutPage, paymentPage } = pages;
    await checkoutPage.expectDeliveryAddressDetails(userData);
    await checkoutPage.fillComment(comment);
    await checkoutPage.clickOnPlaceOrder();
    await paymentPage.enterPaymentDetails(paymentDetails);
    await paymentPage.clickOnPay();
    await expect(paymentPage.successOrderMessage).toBeVisible();
  });
}
