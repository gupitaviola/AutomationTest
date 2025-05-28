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

    async checkoutProcess() {
        //click the checkout button
        await this.checkoutButton.click();

        //fill the checkout information
        await this.firstNameInput.fill("Gupita");
        await this.lastNameInput.fill("Adeline");
        await this.zipCodeInput.fill("55789");

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