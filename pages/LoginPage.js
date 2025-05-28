import { expect } from "@playwright/test";

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByTestId("username");
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
        this.pageTitle = page.getByText("Swag Labs");
        this.errorMessage = page.getByTestId("error");
    }

    /**
     * Login with the given credentials
     * @param {string} username - The username to use
     * @param {string} password - The password to use
     */
    async login(username, password) {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Assert that the error message matches the expected message
     * @param {string} actualMessage - The expected error message
     */
    async assertErrorMessage(actualMessage) {
        await expect(this.errorMessage).toHaveText(actualMessage);
    }
}

export { LoginPage }