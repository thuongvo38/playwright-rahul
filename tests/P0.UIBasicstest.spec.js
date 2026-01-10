const { test, expect } = require('@playwright/test');

test.only('first playwright test', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());

  //css and xpath selectors
  const username = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");
  const cardtitles = page.locator(".card-body a");

  await page.locator("#username").fill("rahulshetty");
  await page.locator("[type='password']").fill("learning");
  await page.locator("#signInBtn").click();
  //wait until this locator apperar
  const errorMsg = await page.locator("[style*='block']").textContent();
  console.log(errorMsg);
  await expect(await page.locator("[style*='block']")).toContainText('Incorrect');

  //type or fill
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInBtn.click();

  //assertion  
  console.log(await page.locator(".card-body a").first().textContent());
  console.log(await cardtitles.nth(1).textContent());
  console.log(await cardtitles.last().textContent());

  //all text contents
  const allTitles = await cardtitles.allTextContents();
  console.log(allTitles);


});

test('Page  playwright test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());

  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
});

test('UI control', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  //css and xpath selectors
  const username = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");
  const cardtitles = page.locator(".card-body a");

  // Section 5.18 Handling Dropdowns
  const dropDown = await page.locator("select.form-control");
  await dropDown.selectOption("consult");
  console.log(await dropDown.getAttribute('value'));


  //check mark 
  const radioBtn = await page.locator(".radiotextsty").last();
  await radioBtn.click();
  await page.locator("#okayBtn").click();

  //assertion to check radio button is checked
  expect(await page.locator(".radiotextsty").last()).toBeChecked();

  console.log(await page.locator(".radiotextsty").last().isChecked());

  await page.locator("#terms").click();
  expect(await page.locator("#terms")).toBeChecked();

  await page.pause();
  console.log("resssssssssssssssssssssssss")

  //check the box is unchecked
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();


  // verify the link attribute
  const link = await page.locator("[href*='documents-request']");
  await expect(link).toHaveAttribute('class', 'blinkingText');


});

//SECTION 5. 19 Handling child windows / tabs

test('Child window handling', async ({ browser }) => {

  //practied to handle child window / tab

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator("[href*='documents-request']");

  //handle the child page using wait for event - promise all
  // there are three promises status - pending, fullfilled, rejected
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click() //opens a new tab
  ]);

  //to get the text from child page
  const text = await newPage.locator(".red").textContent();
  //the split method will split the text from @ to array
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);

  //back to parent page
  const username = page.locator("#username");
  await username.fill(domain);
  //await page.pause();

  //to get the value filled in username
  console.log(await username.inputValue());






});