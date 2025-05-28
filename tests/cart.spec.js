// @ts-check
import { test, expect } from "@playwright/test";
import { BASE_URL, STANDARD_USER, PASSWORD } from '../config/env'; 
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';

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

test.describe("Cart Function", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, PASSWORD);
    
    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();

    //add several products
    const mainPage = new MainPage(page);
    for(const product of PRODUCTS) {
        await mainPage.cartAction("add", product.name);
      }
  }); 

  test("User can remove items from cart and get the updated items in the cart badge", async ({ page }) => {
      //open the cart page  
      const cartPage = new CartPage(page);
      await cartPage.openCartPage();
      await expect(page).toHaveURL("/cart.html");
      await expect(page.getByText("Your Cart")).toBeVisible();

      // remove several items
      const mainPage = new MainPage(page);
      const removedProduct = 1;
      for(let i = 0; i < removedProduct; i++) {
        await mainPage.cartAction("remove", PRODUCTS[i].name);
      }

      //assert the cart badge
      await expect(page.getByTestId("shopping-cart-badge")).toBeVisible();
      expect(await mainPage.getCartBadgeText()).toEqual(PRODUCTS.length - removedProduct);
  })

})