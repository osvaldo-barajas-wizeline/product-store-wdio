import { cartLocators } from "../locators/cartLocators";

export class CartPage {
  // Clicks on a product by name and waits for its detail page to load
  async navigateToProduct(productName: string) {
    await $(cartLocators.productLink(productName)).click();
    // Wait for the product detail page to render (Add to cart button appears)
    await $(cartLocators.addToCartButton).waitForDisplayed();
  }

  // Clicks "Add to cart" and automatically accepts the confirmation dialog that pops up
  async addToCart() {
    await $(cartLocators.addToCartButton).click();
    // Wait for the browser alert to appear, then accept it
    await browser.waitUntil(
      async () => {
        try {
          await browser.getAlertText();
          return true;
        } catch {
          return false;
        }
      },
      { timeout: 5_000, timeoutMsg: "Add to cart alert did not appear" }
    );
    await browser.acceptAlert();
  }

  // Navigates to the cart page by clicking the cart icon in the nav
  async goToCart() {
    await $(cartLocators.navCartButton).click();
    // Wait for cart page container (present whether cart is empty or not)
    await $("#page-wrapper").waitForDisplayed();
  }

  // Reads the cart table and returns a list with the name of each item in it
  async getCartItemNames() {
    // Cart rows load asynchronously; allow up to 8 s for them to appear
    await browser.waitUntil(
      async () => (await $$(cartLocators.cartTableRows)).length > 0,
      { timeout: 8_000, timeoutMsg: "Cart rows did not appear" }
    );
    const rows = await $$(cartLocators.cartTableRows);
    const names: string[] = [];
    for (const row of rows) {
      const cells = await row.$$("td");
      if (cells[1]) {
        names.push((await cells[1].getText()).trim());
      }
    }
    return names;
  }

  // Checks if a specific product is already sitting in the cart
  async isProductInCart(productName: string) {
    const names = await this.getCartItemNames();
    return names.some((n) => n.toLowerCase() === productName.toLowerCase());
  }

  // Finds the product row by name and clicks its delete button, then waits for it to disappear
  async removeFromCart(productName: string) {
    const row = $(cartLocators.cartTableRow(productName));
    await row.$(cartLocators.deleteButton).click();
    await row.waitForExist({ reverse: true });
  }

  // Opens the order form, fills in all the shipping and payment details, then submits it
  async placeOrder(orderData: {
    name: string;
    country: string;
    city: string;
    creditCard: string;
    month: string;
    year: string;
  }) {
    await $(cartLocators.placeOrderButton).click();
    await $(cartLocators.orderNameInput).waitForDisplayed();
    await $(cartLocators.orderNameInput).setValue(orderData.name);
    await $(cartLocators.orderCountryInput).setValue(orderData.country);
    await $(cartLocators.orderCityInput).setValue(orderData.city);
    await $(cartLocators.orderCreditCardInput).setValue(orderData.creditCard);
    await $(cartLocators.orderMonthInput).setValue(orderData.month);
    await $(cartLocators.orderYearInput).setValue(orderData.year);
    await $(cartLocators.purchaseButton).click();
  }

  // Waits for the confirmation popup to show and grabs its title text
  async getConfirmationTitle() {
    await $(cartLocators.confirmationModal).waitForDisplayed();
    return $(cartLocators.confirmationTitle).getText();
  }

  // Clicks the OK button to close the confirmation dialog and wrap up the order
  async confirmPurchase() {
    await $(cartLocators.confirmationOkButton).click();
  }
}
