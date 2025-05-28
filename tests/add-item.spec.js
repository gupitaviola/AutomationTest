// @ts-check
import { test, expect } from "@playwright/test";
import { BASE_URL, STANDARD_USER, PASSWORD } from '../config/env'; 

const PRODUCTS = [
  {
    id: "item_4_title_link",
    name: "Sauce Labs Backpack",
    price: '29.99',
    idAdd: "add-to-cart-sauce-labs-backpack",
  },
  {
    id: "item_0_title_link",
    name: "Sauce Labs Bolt T-Shirt",
    price: '15.99',
    idAdd: "add-to-cart-sauce-labs-bolt-t-shirt",
  },
  {
    id: "item_1_title_link",
    name: "Sauce Labs Bike Light",
    price: '9.99',
    idAdd: "add-to-cart-sauce-labs-bike-light",
  }
]

test.describe("Add Item To Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText("Swag Labs")).toBeVisible()

    await page.getByTestId("username").fill(STANDARD_USER);
    await page.getByTestId("password").fill(PASSWORD);
    await page.getByTestId("login-button").click();
    
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  }); 

  test("User can add items to cart and get the total items in the cart badge", async ({ page }) => {
    //add several products
    for(const product of PRODUCTS) {
      await page.getByTestId(product.idAdd).click();
    }

    //scroll to the top of the page
    await page.evaluate(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Wait for the scroll to complete
    await page.waitForTimeout(500);

    //assert the cart badge
    const badgeText = await page.getByTestId("shopping-cart-badge").textContent();
    const badgeNumber = parseInt(badgeText || "0");
    expect(await badgeNumber).toEqual(PRODUCTS.length);
  })

})