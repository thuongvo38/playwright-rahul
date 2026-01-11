import { test, expect } from '@playwright/test';


//section 7  - 35
test('Playwright Special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    //locator(css)


});


test.only('rerun practice -Playwright Special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    const checkedButton = page.getByLabel("Check me out if you Love IceCreams!");
    await checkedButton.click();

    expect(await checkedButton.isChecked()).toBeTruthy();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");


    await page.getByRole("textbox", { name: 'Password' }).fill("abc123");

    //cant not using because these element doesnt have the accessible name link with input tag
    // await page.getByRole("textbox", { name: 'Name' }).fill("abc123");
    // await page.getByRole("textbox", { name: 'Email' }).fill("abc123@gmail.com");
    await page.getByPlaceholder("Password").fill("2455");

    await page.getByRole("button", { name: 'Submit' }).click();


});


