// @ts-check
import { test, expect } from "@playwright/test";
import { STANDARD_USER, PASSWORD } from '../config/env'; 
import { LoginPage } from '../pages/LoginPage';

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Swag Labs")).toBeVisible()
  })

  /*

  */
  test("User can login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, PASSWORD);
    await expect(page).toHaveURL("/inventory.html");
  })

  test("User cannot login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("invalid", "invalid");
    const errorMessage = "Epic sadface: Username and password do not match any user in this service";
    await loginPage.assertErrorMessage(errorMessage);
  })

})