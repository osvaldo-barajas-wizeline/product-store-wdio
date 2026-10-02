import { LoginPage } from "../pages/LoginPage";
import { CREDENTIALS } from "../data/testData";
import { loginLocators } from "../locators/loginLocators";

describe("Login tests", () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.navigate();
  });

  it("should log in successfully with valid credentials", async () => {
    await loginPage.login(
      CREDENTIALS.valid.username,
      CREDENTIALS.valid.password
    );

    const welcomeText = await loginPage.getWelcomeText();
    expect(welcomeText).toContain(`Welcome ${CREDENTIALS.valid.username}`);

    const isLogoutVisible = await loginPage.isLogoutVisible();
    expect(isLogoutVisible).toBe(true);
  });

  it("should not log in with invalid credentials", async () => {
    await loginPage.openLoginModal();
    await loginPage.fillCredentials(
      CREDENTIALS.invalid.username,
      CREDENTIALS.invalid.password
    );

    // The site fires an alert instead of closing the modal when credentials are wrong
    await $(loginLocators.submitButton).click();
    await browser.waitUntil(
      async () => {
        try {
          await browser.getAlertText();
          return true;
        } catch {
          return false;
        }
      },
      { timeout: 5_000, timeoutMsg: "Error alert did not appear" }
    );
    await browser.acceptAlert();

    const loggedIn = await loginPage.isLoggedIn();
    expect(loggedIn).toBe(false);
  });
});
