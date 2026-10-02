import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";
import { CREDENTIALS, PRODUCTS, ORDER } from "../data/testData";

describe("Cart tests", () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    cartPage = new CartPage();

    await loginPage.navigate();
    await loginPage.login(
      CREDENTIALS.valid.username,
      CREDENTIALS.valid.password
    );
    await loginPage.getWelcomeText(); // wait until login is confirmed
  });

  it("should add a phone product to the cart", async () => {
    const product = PRODUCTS.samsungGalaxyS6;

    await cartPage.navigateToProduct(product.name);
    await cartPage.addToCart();
    await cartPage.goToCart();

    const isInCart = await cartPage.isProductInCart(product.name);
    expect(isInCart).toBe(true);

    await cartPage.removeFromCart(product.name);
  });

  it("should add a laptop product to the cart", async () => {
    const product = PRODUCTS.sonyVaioI5;

    await cartPage.navigateToProduct(product.name);
    await cartPage.addToCart();
    await cartPage.goToCart();

    const isInCart = await cartPage.isProductInCart(product.name);
    expect(isInCart).toBe(true);

    await cartPage.removeFromCart(product.name);
  });

  it("should complete purchase flow with confirmation pop-up validation", async () => {
    const product = PRODUCTS.samsungGalaxyS6;

    await cartPage.navigateToProduct(product.name);
    await cartPage.addToCart();
    await cartPage.goToCart();
    await cartPage.placeOrder(ORDER);

    const confirmationTitle = await cartPage.getConfirmationTitle();
    expect(confirmationTitle?.trim()).toBe("Thank you for your purchase!");

    await cartPage.confirmPurchase();
  });
});
