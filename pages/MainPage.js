import { expect } from "@playwright/test";

class MainPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.productsTitle = page.getByText("Products");
        this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
    }

    /**
     * Adds a product to the cart by its name
     * @param {string} action - The action to perform (e.g., 'add', 'remove')
     * @param {string} productName - The name of the product (e.g., 'Sauce Labs Backpack')
     */
    async cartAction(action, productName) {
        const convertProductName = productName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[.()]/g, '\\$&'); //replace one or more spaces with '-'
        if (action === 'add') {
            const addToCartButton = `add-to-cart-${convertProductName}`;
            await this.page.getByTestId(addToCartButton).scrollIntoViewIfNeeded();
            await this.page.getByTestId(addToCartButton).click();
        } else if (action === 'remove') {
            const removeToCartButton = `remove-${convertProductName}`;
            await this.page.getByTestId(removeToCartButton).scrollIntoViewIfNeeded();
            await this.page.getByTestId(removeToCartButton).click();
        }
    }

    async getCartBadgeText() {
        const badgeText = await this.shoppingCartBadge.textContent();
        return parseInt(badgeText || '0' );
    }

    async scrollToTop() {
        await this.page.evaluate(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        // Wait for the scroll to complete
        await this.page.waitForTimeout(500);
    }

}

export { MainPage };