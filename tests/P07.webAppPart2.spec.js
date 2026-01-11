const { test, expect } = require('@playwright/test');
let webContext; 


//section 11 - 59 - persistant login - storage state - .json file
test.beforeAll(async ({browser}) => 
    {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client');

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");

    await email.fill("anshikat@gmail.com");
    await password.fill("Iamking@000");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });


});

//Login UI -> .json
test('client app login webappPart2', async ({  }) => {



    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator(".card-body b").first().waitFor();

    const titlles = await page.locator(".card-body b").allTextContents();

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const count = await products.count()

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    //click on cart
    await page.locator("[routerlink*='cart']").click();

    //wait for cart page to load
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();


    //CHECKOUT PAGE

    const country = page.locator("[placeholder*='Country']");
    await country.pressSequentially("Ind", { delay: 100 });

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    console.log(await country.inputValue());
    await page.locator("a:has-text('Place Order')").click();

    //Thank you page 
    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //VERIFY ORDER IN ORDERS PAGE ------------------SECTION 7.35
    await page.locator("button[routerlink*='myorders']").click();

    //remember to wait for page load
    await page.locator("tbody tr").first().waitFor();
    const OrderIds = await page.locator("tbody tr ");
    const rowsCount = await OrderIds.count();

    for (let i = 0; i < rowsCount; i++) {
        //const rowOrderId = await OrderIds.locator("th").nth(i).textContent();
        const rowOrderId = await OrderIds.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await OrderIds.locator("button:has-text('View')").nth(i).click();
            break;
        }
    }

    //VERIFY ORDER DETAILS
    console.log( await page.locator(".email-title").textContent());
    const orderDetails = await page.locator(".col-text").textContent()
    expect(orderId.includes(orderDetails)).toBeTruthy() ;

})



// test browser , cart-order 