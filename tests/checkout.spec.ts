import { test, expect } from '../fixtures/baseTest';
import { URLs } from '../utils/constants';
import data from '../utils/test-data/data.json';
import { addProductsAndGoToCart, completeCheckoutAndPay, loginExistingUser, registerNewUser } from '../utils/flows';

test.describe('Checkout Page functionalities', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto('/');
    await expect(homePage.homeTitle.first()).toBeVisible();
  });

  test('TC_14: Place Order: Register while Checkout', async ({
    homePage,
    productsPage,
    viewCartPage,
    loginPage,
    signupPage,
    accountCreatedPage,
    paymentPage,
    deleteAccountPage,
    checkoutPage,
    registerCleanup,
  }) => {
    const numberOfProducts = 4;
    await addProductsAndGoToCart({ homePage, productsPage, viewCartPage }, numberOfProducts);
    await viewCartPage.clickOnCheckout();
    await viewCartPage.clickOnRegisterLogin();
    await loginPage.expectUrl(URLs.login);
    await registerNewUser(
      { homePage, loginPage, signupPage, accountCreatedPage },
      data.newUser,
      deleteAccountPage,
      registerCleanup,
    );
    await homePage.clickCart();
    await viewCartPage.waitForLoad();
    await viewCartPage.clickOnCheckout();
    await completeCheckoutAndPay({ checkoutPage, paymentPage }, data.newUser, data.paymentDetails, data.comment);
  });

  test('TC_15: Place Order: Register before Checkout', async ({
    homePage,
    loginPage,
    signupPage,
    accountCreatedPage,
    productsPage,
    viewCartPage,
    checkoutPage,
    paymentPage,
    deleteAccountPage,
    registerCleanup,
  }) => {
    const numberOfProducts = 3;
    await homePage.clickSignupLogin();
    await registerNewUser(
      { homePage, loginPage, signupPage, accountCreatedPage },
      data.newUser,
      deleteAccountPage,
      registerCleanup,
    );
    await addProductsAndGoToCart({ homePage, productsPage, viewCartPage }, numberOfProducts);
    await viewCartPage.clickOnCheckout();
    await completeCheckoutAndPay({ checkoutPage, paymentPage }, data.newUser, data.paymentDetails, data.comment);
  });

  test('TC_16: Place Order: Login before Checkout', async ({
    homePage,
    loginPage,
    productsPage,
    viewCartPage,
    checkoutPage,
    paymentPage,
  }) => {
    const numberOfProducts = 2;
    await loginExistingUser({ homePage, loginPage }, data.existingUser);
    await addProductsAndGoToCart({ homePage, productsPage, viewCartPage }, numberOfProducts);
    await viewCartPage.clickOnCheckout();
    await completeCheckoutAndPay({ checkoutPage, paymentPage }, data.existingUser, data.paymentDetails, data.comment);
  });

  test('TC_23: Verify address details in checkout page', async ({
    homePage,
    loginPage,
    signupPage,
    productsPage,
    viewCartPage,
    checkoutPage,
    accountCreatedPage,
    deleteAccountPage,
    registerCleanup,
  }) => {
    const numberOfProducts = 2;
    await homePage.clickSignupLogin();
    await registerNewUser(
      { homePage, loginPage, signupPage, accountCreatedPage },
      data.newUser,
      deleteAccountPage,
      registerCleanup,
    );
    await addProductsAndGoToCart({ homePage, productsPage, viewCartPage }, numberOfProducts);
    await viewCartPage.clickOnCheckout();
    await checkoutPage.expectDeliveryAddressDetails(data.newUser);
    await checkoutPage.expectBillingAddressDetails(data.newUser);
  });

  test('TC_24: Download Invoice after purchase order', async ({
    page,
    homePage,
    productsPage,
    viewCartPage,
    loginPage,
    signupPage,
    accountCreatedPage,
    checkoutPage,
    paymentPage,
    deleteAccountPage,
    registerCleanup,
  }) => {
    const numberOfProducts = 3;
    await addProductsAndGoToCart({ homePage, productsPage, viewCartPage }, numberOfProducts);
    await viewCartPage.clickOnCheckout();
    await viewCartPage.clickOnRegisterLogin();
    await registerNewUser(
      { homePage, loginPage, signupPage, accountCreatedPage },
      data.newUser,
      deleteAccountPage,
      registerCleanup,
    );
    await homePage.clickCart();
    await viewCartPage.waitForLoad();
    await viewCartPage.clickOnCheckout();
    await checkoutPage.waitForUrl(URLs.checkout);
    await completeCheckoutAndPay({ checkoutPage, paymentPage }, data.newUser, data.paymentDetails, data.comment);

    const downloadPromise = page.waitForEvent('download');
    await paymentPage.clickOnDownloadInvoice();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.txt');
    await paymentPage.clickOnContinue();
  });
});
