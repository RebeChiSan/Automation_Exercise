import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '../types';

export class CheckoutPage extends BasePage {
  readonly placeOrderButton: Locator;
  readonly commentInput: Locator;
  readonly fullName: Locator;
  readonly company: Locator;
  readonly address1: Locator;
  readonly address2: Locator;
  readonly city: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly productDescription: Locator;
  readonly fullNameInvoice: Locator;
  readonly companyInvoice: Locator;
  readonly address1Invoice: Locator;
  readonly address2Invoice: Locator;
  readonly cityInvoice: Locator;
  readonly countryInvoice: Locator;
  readonly phoneInvoice: Locator;

  constructor(page: Page) {
    super(page);
    const deliveryList = page.locator("ul[id='address_delivery']");
    const deliveryAddressLines = deliveryList.locator('.address_address1.address_address2');
    this.fullName = deliveryList.locator('.address_firstname.address_lastname');
    this.company = deliveryAddressLines.nth(0);
    this.address1 = deliveryAddressLines.nth(1);
    this.address2 = deliveryAddressLines.nth(2);
    this.city = deliveryList.locator('.address_city.address_state_name.address_postcode');
    this.country = deliveryList.locator('.address_country_name');
    this.phone = deliveryList.locator('.address_phone');
    this.commentInput = page.locator("textarea[name='message']");
    this.placeOrderButton = page.getByText('Place Order');
    this.productDescription = page.locator("//td[@class='cart_description']/h4");

    const invoiceList = page.locator("ul[id='address_invoice']");
    const invoiceAddressLines = invoiceList.locator('.address_address1.address_address2');
    this.fullNameInvoice = invoiceList.locator('.address_firstname.address_lastname');
    this.companyInvoice = invoiceAddressLines.nth(0);
    this.address1Invoice = invoiceAddressLines.nth(1);
    this.address2Invoice = invoiceAddressLines.nth(2);
    this.cityInvoice = invoiceList.locator('.address_city.address_state_name.address_postcode');
    this.countryInvoice = invoiceList.locator('.address_country_name');
    this.phoneInvoice = invoiceList.locator('.address_phone');
  }

  async expectDeliveryAddressDetails(user: User) {
    await expect(this.fullName).toHaveText(user.fullName);
    await expect(this.company).toHaveText(user.companyName);
    await expect(this.address1).toHaveText(user.address1);
    await expect(this.address2).toHaveText(user.address2);
    await expect(this.city).toHaveText(user.fullAddress);
    await expect(this.country).toHaveText(user.country);
    await expect(this.phone).toHaveText(user.phoneNumber);
  }

  async expectBillingAddressDetails(user: User) {
    await expect(this.fullNameInvoice).toHaveText(user.fullName);
    await expect(this.companyInvoice).toHaveText(user.companyName);
    await expect(this.address1Invoice).toHaveText(user.address1);
    await expect(this.address2Invoice).toHaveText(user.address2);
    await expect(this.cityInvoice).toHaveText(user.fullAddress);
    await expect(this.countryInvoice).toHaveText(user.country);
    await expect(this.phoneInvoice).toHaveText(user.phoneNumber);
  }

  async fillComment(message: string) {
    await this.commentInput.fill(message);
  }

  async clickOnPlaceOrder() {
    await this.placeOrderButton.click();
  }
}