import { test, expect } from '@playwright/test';
import { LoginPage } from './page_objects/login_page';

test('compra', async ({page}, testInfo) => {
    await page.goto('https://saucedemo.com');

    /*await page.getByRole('textbox', {name:'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();*/

    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')

    //take a ss
    //await page.screenshot({path: 'screenshots/login.png', fullPage:true});

    //take a ss and attach it to the test
    await testInfo.attach('login', {
        body: await page.screenshot(), contentType: 'image/png'
    })

    //método de aserción
    await loginPage.succesfulLogin();

    //the "all" is used to catch all the elements that match the description
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

    const randomIndex = Math.floor(Math.random() * itemsContainer.length);
    const randomItem = itemsContainer[randomIndex];

    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

    console.log(`Name: ${expectedName} Description: ${expectedDescription} Price: ${expectedPrice}`)

    //We don't use "page" anymore as we're focusing on the item chosen previously
    await randomItem.getByRole('button', {name: 'Add to cart'}).click();
    await page.locator('a.shopping_cart_link').click();

    await expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible();

    //the .innerText takes the text from the element
    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();

    expect(actualName).toEqual(expectedName);
    expect(actualDescription).toEqual(expectedDescription);
    expect(actualPrice).toEqual(expectedPrice);

    await page.getByRole('button', {name:'Checkout'}).click();

    await page.getByRole('textbox', {name:'First Name'}).fill('Daniela');
    await page.getByRole('textbox', {name:'Last Name'}).fill('Campo');
    await page.getByRole('textbox', {name:'Zip/Postal Code'}).fill('169054');

    await page.getByRole('button', {name:'Continue'}).click();
    await page.getByRole('button', {name:'Finish'}).click();
    
    await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible();
    
    //await page.pause();
})