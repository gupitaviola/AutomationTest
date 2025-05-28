import { expect } from "@playwright/test";

class LogoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.productsTitle = page.getByText("Products");
        this.openMenuButton = page.getByRole('button',{name: "Open Menu"});
        this.logoutLink = page.getByTestId("logout-sidebar-link");
        this.pageTitle = page.getByText("Swag Labs");
        this.loginButton = page.getByTestId("login-button");
    }

    async logout() {
        //wait for the hamburger menu to be visible and click it
        await expect(this.openMenuButton).toBeVisible()
        await this.openMenuButton.click();

        // wait for the logout link to be visible and click it
        await expect(this.logoutLink).toBeVisible();
        await this.logoutLink.click();
    }
}

export { LogoutPage }