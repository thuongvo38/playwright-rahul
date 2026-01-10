const { test, expect } = require('@playwright/test');
const userEmail = ""
const userPassword = ""
let siteName;

test.only('sharepoint', async ({ page }) => {
   
    test.setTimeout(360000); 

    await page.goto('https://opswatmd.sharepoint.com/');
    await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill(userEmail);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('textbox', { name: 'Enter the password for thuong' }).fill(userPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    
    await expect(page.locator("[id='O365_AppName']").first()).toHaveText("SharePoint", { timeout: 60000 });

    for (let i = 215; i <= 230; i++) {
        siteName = `test-${i}`;
        console.log(`--- Starting site: ${siteName} ---`);

        try {
            
            await page.mouse.move(500, 500);
            const startPageButton = page.getByRole('button', { name: 'SharePoint start page' });
            await expect(startPageButton).toBeEnabled();
            await startPageButton.click();
            await page.mouse.move(500, 500);
            
           
            const createSiteButton = page.getByRole('button', { name: 'Create site' });
            await expect(createSiteButton).toBeEnabled();
            await createSiteButton.click();

            const frame = page.getByRole('dialog', { name: 'Create a new site' }).locator('iframe').contentFrame();

            const teamSiteButton = frame.getByRole('button', { name: 'Team site. Create a private' });
            await expect(teamSiteButton).toBeEnabled();
            await teamSiteButton.click();

            await frame.getByText('Standard team').click();
            await frame.getByRole('button', { name: 'Use template' }).click();

            await frame.getByRole('textbox', { name: 'Site name' }).fill(siteName);

            const nextButton = frame.getByRole('button', { name: 'Next' });
            await expect(nextButton).toBeEnabled({ timeout: 30000 });
            await nextButton.click();

            await frame.getByRole('button', { name: 'Privacy settings Private -' }).click();
            await frame.getByRole('option', { name: 'Public - anyone in the' }).click();

            const finalCreateButton = frame.getByRole('button', { name: 'Create site' });
            await expect(finalCreateButton).toBeEnabled();
            await finalCreateButton.click();

           
            const finishButton = frame.getByRole('button', { name: 'Finish' });
            await expect(finishButton).toBeEnabled();

            const closeButton = frame.locator("button[title='Close']");
            await expect(closeButton).toBeEnabled();
            
            

            
            await finishButton.click();

            console.log(`✓ Site ${siteName} created successfully`);

       
            await page.waitForTimeout(5000); 
        } catch (error) {
            console.log(`✗ Failed to create site ${siteName}: ${error.message}`);
           
            await page.screenshot({ path: `test-results/failure-${siteName}.png` });
        }

       
        console.log('Navigating back to home page to ensure clean state...');
        await page.goto('https://opswatmd.sharepoint.com/');
       
        await expect(page.locator("[id='O365_AppName']").first()).toHaveText("SharePoint", { timeout: 60000 });
    }
});