import { expect } from "@playwright/test";

class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.pageTitle = page.getByText("Checkout: Your Information");
        this.firstNameInput = page.getByTestId("firstName");
        this.lastNameInput = page.getByTestId("lastName");
        this.zipCodeInput = page.getByTestId("postalCode");
        this.continueButton = page.getByTestId("continue");
        this.cancelButton = page.getByTestId("cancel");
        this.errorMessage = page.getByTestId("error");
        this.checkoutButton = page.getByTestId("checkout");
        this.pageCheckoutOverview = page.getByText("Checkout: Overview");
        this.paymentInfo = page.getByText("SauceCard #31337");
        this.deliveryInfo = page.getByText("Free Pony Express Delivery!");
        this.finishButton = page.getByTestId("finish");
    }

    /**
     * @param {string} firstName - The first name to use
     * @param {string} lastName - The last name to use
     * @param {string} zipCode - The zip code to use
     */
    async checkoutProcess(firstName, lastName, zipCode) {
        //click the checkout button
        await this.checkoutButton.click();

        //fill the checkout information
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);

        //click the continue button
        await this.continueButton.click();

        //assert the checkout overview page
        await expect(this.pageCheckoutOverview).toBeVisible();
        await expect(this.paymentInfo).toBeVisible();
        await expect(this.deliveryInfo).toBeVisible();
    
        //click the finish button
        await this.finishButton.click();
    }
}

export { CheckoutPage };