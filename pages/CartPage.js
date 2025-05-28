import { expect } from "@playwright/test";

class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.cartButton = page.getByTestId("shopping-cart-link");
    }

    async openCartPage() {
        //wait for the cart button to be visible and click it
        await expect(this.cartButton).toBeVisible();
        await this.cartButton.click();
    }
}
export { CartPage };