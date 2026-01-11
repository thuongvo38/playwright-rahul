const {test, expect} = require('@playwright/test');


test.only('pop up validation', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Handle hidden elements - hide and shown box
    expect(await page.getByPlaceholder("Hide/Show Example")).toBeVisible();

    await page.locator("#hide-textbox").click();
    expect(await page.getByPlaceholder("Hide/Show Example")).toBeHidden();

    //handle alert pop up  - dialog  -- dialog.accept() - dialog.dismiss()

    // page.on("dialog", dialog => {
    //     expect(dialog.message()).toEqual("Hello , share this practice page and share your knowledge");
    //     dialog.accept();
    // });
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //Hover the tooltip
    await page.locator("#mousehover").hover();
    await page.getByRole("link", { name: "Top" }).click();


    //Handle child frame

    const framePage = await page.frameLocator("courses-iframe")
    await framePage.locator("a[href*='learning']:visible").click();




 
})