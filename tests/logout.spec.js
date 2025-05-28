// @ts-check
import { test, expect } from "@playwright/test";
import { STANDARD_USER, PASSWORD } from '../config/env'; 
import { LogoutPage } from '../pages/LogoutPage';
import { LoginPage } from '../pages/LoginPage';

test.describe("Logout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(STANDARD_USER, PASSWORD);
    
    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();
  }); 

  test("User can logout successfully", async ({ page }) => {
    const logoutPage = new LogoutPage(page);
    await logoutPage.logout();

    //assert redirect the login page
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Swag Labs")).toBeVisible()
    await expect(page.getByTestId("login-button")).toBeVisible();
  })

})