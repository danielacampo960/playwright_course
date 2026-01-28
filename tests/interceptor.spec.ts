import { test, expect } from '@playwright/test';
import { LoginPage } from './page_objects/login_page';

test('compra 1', async ({page}, testInfo) => {
    await page.on("request", req => {
        console.log(req.url());
    })

    await page.route("**/*.{png,jpg,jpeg,svg}",
                    (route) => route.abort());

    /*await page.route("https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5f0a35ed5931e.jpg",
                    (route) => route.abort());*/

    await page.goto('https://saucedemo.com');
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await loginPage.succesfulLogin();

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

    await page.screenshot({path:'login.png', fullPage: true})
})