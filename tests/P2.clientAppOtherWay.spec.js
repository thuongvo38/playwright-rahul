const { test, expect } = require('@playwright/test');



// section 8 END to end testing with playwright zara page product 

test('add cart E2E sec8', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');

    const email = page.getByPlaceholder("email@example.com");
    
    const loginBtn = page.getByRole("button", { name: "Login" });

    await email.fill("anshikat@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await loginBtn.click();
    
    await page.locator(".card-body b").first().waitFor();

    //START THE SECTION 8
     const productName = "ZARA COAT 3";
    
    //  const products = page.locator(".card-body");
    //  const count = await products.count()
    // for (let i = 0; i < count; i++) {
    //     if (await products.nth(i).locator("b").textContent() === productName) {
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }
    //------------USING THE FILTER METHOD -----------------
    await page.locator(".card-body").filter({hasText: productName}).getByRole("button", {name: "Add To Cart"}).click();

    //click on cart
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

    //wait for cart page to load
    await page.locator("div li").first().waitFor();
    expect( await page.getByText(productName)).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click();

    //CHECKOUT PAGE
    const country = page.getByPlaceholder("Select Country");
    await country.pressSequentially("Ind", { delay: 100 });

    await page.getByRole("button", {name: "India"}).nth(1).click();
    await page.getByText("Place Order").click();


    //Thank you page 
    expect(await page.getByText(" Thankyou for the order. ")).toBeVisible();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    // //VERIFY ORDER IN ORDERS PAGE ------------------SECTION 7.35
    // await page.locator("button[routerlink*='myorders']").click();

    // //remember to wait for page load
    // await page.locator("tbody tr").first().waitFor();
    // const OrderIds = await page.locator("tbody tr ");
    // const rowsCount = await OrderIds.count();

    // for (let i = 0; i < rowsCount; i++) {
    //     //const rowOrderId = await OrderIds.locator("th").nth(i).textContent();
    //     const rowOrderId = await OrderIds.nth(i).locator("th").textContent();
    //     if(orderId.includes(rowOrderId)){
    //         await OrderIds.locator("button:has-text('View')").nth(i).click();
    //         break;
    //     }
    // }

    // //VERIFY ORDER DETAILS
    // console.log( await page.locator(".email-title").textContent());
    // const orderDetails = await page.locator(".col-text").textContent()
    // expect(orderId.includes(orderDetails)).toBeTruthy() ;

})

//section 7 
