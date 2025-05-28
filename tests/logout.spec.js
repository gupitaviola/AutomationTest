// @ts-check
import { test, expect } from "@playwright/test";
import { BASE_URL, STANDARD_USER, PASSWORD } from '../config/env'; 

test.describe("Logout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText("Swag Labs")).toBeVisible()

    await page.getByTestId("username").fill(STANDARD_USER);
    await page.getByTestId("password").fill(PASSWORD);
    await page.getByTestId("login-button").click();
    
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();
    await expect(page.getByText("Open Menu")).toBeVisible();
  }); 

  test.only("User can logout successfully", async ({ page }) => {
    //open the hamburger menu
    await page.getByRole('button',{name: "Open Menu"}).click();

    //wait for the logout link to be visible
    await expect(page.locator("#logout_sidebar_link")).toBeVisible();

    //click the logout link
    await page.getByTestId("logout-sidebar-link").click();

    //assert redirect the login page
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByText("Swag Labs")).toBeVisible()
  })

})