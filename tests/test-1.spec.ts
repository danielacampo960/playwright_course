import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com/');
  await page.getByRole('link', { name: 'Colombia' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('iphone');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).press('Enter');
  await page.getByRole('link', { name: 'Apple iPhone 17 (256 GB) - Negro - Distribuidor Autorizado', exact: true }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
});


//The URL doesn't work, this is just an ex.
/*test('locators test', async ({page}) => {
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.pause();
  
  //css selector
  await page.locator('#name').fill('algo');
  await page.pause();

  //Xpath
  await page.locator('//input[class="form"]').fill('algo');
  await page.pause();
});*/

test('test locators 2', async({page}) => {
  
  await page.goto('https://www.mercadolibre.com.co/');
  //choose the selector according to the element's property
  /*await page.getByPlaceholder('foo').fill();
  await page.getByAltText('foo').click();*/

  //exact:true when there are two elements with the same description
  await page.getByRole('link', {name:'Mis compras',exact:true}).click();
  await page.pause();
});