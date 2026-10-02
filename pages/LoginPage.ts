import { loginLocators } from "../locators/loginLocators";

export class LoginPage {
  // Takes you to the home page of the app
  async navigate() {
    await browser.url("/index.html");
    await browser.execute(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await browser.deleteCookies();
    await browser.url("/index.html");
  }

  // Clicks the login button in the nav and waits for the modal to fully open
  async openLoginModal() {
    await $(loginLocators.navLoginButton).click();
    // Wait for Bootstrap modal animation to complete (adds 'show' class)
    await browser.waitUntil(
      async () => {
        const classes = await $(loginLocators.modal).getAttribute("class");
        return !!classes?.includes("show");
      },
      { timeout: 5_000, timeoutMsg: "Login modal did not open" }
    );
    await browser.pause(300);
  }

  // Types the username and password into the login form fields
  async fillCredentials(username: string, password: string) {
    await $(loginLocators.usernameInput).setValue(username);
    await $(loginLocators.passwordInput).setValue(password);
  }

  // Clicks the submit button and waits for the modal to disappear
  async submitLogin() {
    await $(loginLocators.submitButton).click();
    // Wait for the modal to close after submitting
    await $(loginLocators.modal).waitForDisplayed({ reverse: true });
  }

  // Does the whole login flow in one shot: opens the modal, fills in the creds, and submits
  async login(username: string, password: string) {
    await this.openLoginModal();
    await this.fillCredentials(username, password);
    await this.submitLogin();
  }

  // Reads the welcome message that shows up after a successful login
  async getWelcomeText() {
    // #nameofuser is always in DOM but hidden; wait until it has text content
    await browser.waitUntil(
      async () => {
        const text = await $(loginLocators.welcomeLabel).getText();
        return text.trim().length > 0;
      },
      { timeout: 10_000, timeoutMsg: "Welcome label did not appear" }
    );
    return $(loginLocators.welcomeLabel).getText();
  }

  // Returns true if the user is currently logged in, false otherwise
  async isLoggedIn() {
    try {
      const text = await this.getWelcomeText();
      return text.toLowerCase().includes("welcome");
    } catch {
      return false;
    }
  }

  // Checks if the logout button is showing in the nav
  async isLogoutVisible() {
    return $(loginLocators.logoutButton).isDisplayed();
  }
}
