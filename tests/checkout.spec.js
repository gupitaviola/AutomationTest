// @ts-check
import { test, expect } from "@playwright/test";
import { BASE_URL, STANDARD_USER, PASSWORD } from '../config/env'; 

const PRODUCTSADD = [
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

test.describe("Checkout Process", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText("Swag Labs")).toBeVisible()

    await page.getByTestId("username").fill(STANDARD_USER);
    await page.getByTestId("password").fill(PASSWORD);
    await page.getByTestId("login-button").click();
    
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    //add several products
    for(const product of PRODUCTSADD) {
        await page.getByTestId(product.idAdd).click();
      }
  }); 

  test("User can complete the checkout process", async ({ page }) => {
    //click the cart button
    await page.getByTestId("shopping-cart-link").click();

    //assert the cart page
    await expect(page.getByText("Your Cart")).toBeVisible();
    await expect(page.getByTestId("checkout")).toBeVisible();

    //click the checkout button
    await page.getByTestId("checkout").click();

    //assert the checkout information page
    await expect(page.getByText("Checkout: Your Information")).toBeVisible(); 

    //fill the checkout information
    await page.getByTestId("firstName").fill("Gupita");
    await page.getByTestId("lastName").fill("Viola");
    await page.getByTestId("postalCode").fill("55184");
    await page.getByTestId("continue").click();

    //assert the checkout overview page
    await expect(page.getByText("Checkout: Overview")).toBeVisible();
    await expect(page.getByText("SauceCard #31337")).toBeVisible();
    await expect(page.getByText("Free Pony Express Delivery!")).toBeVisible();
    
    //click the finish button
    await page.getByTestId("finish").click();

    //assert the checkout complete page
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
    await expect(page.getByText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")).toBeVisible();
    await expect(page.getByTestId("back-to-products")).toBeVisible();

    //assert the cart badge is empty
    const badgeText = await page.getByTestId("shopping-cart-badge");
    expect(await badgeText).not.toBeVisible();
  })

})