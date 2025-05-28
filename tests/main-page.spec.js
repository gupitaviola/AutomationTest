// @ts-check
import { test, expect } from "@playwright/test";
import { STANDARD_USER, PASSWORD } from '../config/env'; 
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';

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

test.describe("Main Page Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, PASSWORD);
    
    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();
  }); 

  test("User can add items to cart and get the total items in the cart badge", async ({ page }) => {
    const mainPage = new MainPage(page);

    //add several products
    for(const product of PRODUCTS) {
      await mainPage.cartAction("add", product.name);
    }

    //scroll to the top of the page
    await mainPage.scrollToTop();

    //assert the cart badge
    await expect(page.getByTestId("shopping-cart-badge")).toBeVisible();
    expect(await mainPage.getCartBadgeText()).toEqual(PRODUCTS.length);
  })

  test("User can remove items to cart and get the updated items in the cart badge", async ({ page }) => {
    const mainPage = new MainPage(page);

    //add several products
    for(const product of PRODUCTS) {
      await mainPage.cartAction("add", product.name);
    }

    //remove several products
    const removedProduct = 2;
    for(let i = 0; i < removedProduct; i++) {
      await mainPage.cartAction("remove", PRODUCTS[i].name);
    }

    //scroll to the top of the page
    await mainPage.scrollToTop();

    //assert the cart badge
    await expect(page.getByTestId("shopping-cart-badge")).toBeVisible();
    expect(await mainPage.getCartBadgeText()).toEqual(PRODUCTS.length - removedProduct);
  })
})