// @ts-check
import { test, expect } from "@playwright/test";
import { STANDARD_USER, PASSWORD } from '../config/env'; 
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const PRODUCTS = [
    {
      name: "Sauce Labs Backpack",
      price: '29.99',
    },
    {
      name: "Sauce Labs Bolt T-Shirt",
      price: '15.99',
    },
    {
      name: "Sauce Labs Bike Light",
      price: '9.99',
    }
  ]

test.describe("Checkout Process", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, PASSWORD);
    
    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();
  }); 

  test("User can complete the checkout process with several products", async ({ page }) => {
    //add several products
    const mainPage = new MainPage(page);
    for(const product of PRODUCTS) {
        await mainPage.cartAction("add", product.name);
      }

    //open the cart page  
    const cartPage = new CartPage(page);
    await cartPage.openCartPage();
    await expect(page).toHaveURL("/cart.html");
    await expect(page.getByText("Your Cart")).toBeVisible();

    //checkout process
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.checkoutProcess();

    //assert the checkout complete page
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
    await expect(page.getByText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")).toBeVisible();
    await expect(page.getByTestId("back-to-products")).toBeVisible();

    //assert the cart badge is empty
    const badgeText = await page.getByTestId("shopping-cart-badge");
    expect(await badgeText).not.toBeVisible();
  })

  /*
    Expected issue: the checkout button should be disabled when the cart is empty.
    This test confirms that users cannot proceed to checkout without adding items to the cart.
  */
  test("User cannot continue the checkout process if the cart is empty", async ({ page }) => {
    //open the cart page  
    const cartPage = new CartPage(page);
    await cartPage.openCartPage();
    await expect(page).toHaveURL("/cart.html");
    await expect(page.getByText("Your Cart")).toBeVisible();

    //assert the checkout button is disabled
    const checkoutButton = page.getByTestId("checkout");
    await expect (checkoutButton).toBeDisabled();
  })
})