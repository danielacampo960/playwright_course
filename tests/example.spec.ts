import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test 3', async ({page}) => {
  //.goto to navigate that URL
  await page.goto('https://www.mercadolibre.com.co/');

  //.locator to localize the feature we need
  await page.locator('input[id=\'cb1-edit\']').fill('iphone');

  //.keyboard.press to press a key, name it as a string
  await page.keyboard.press('Enter');

  //when finding something in the page, wait in there
  await expect(page.locator("//ol[contains(@class,'ui-search-layout')]")).toBeVisible();

  //adding a pause
  //await page.pause();

  //look for an element in the page, the last one mentioned and show up the text in there
  const titles = await page.locator('//ol[contains(@class,\'ui-search-layout\')]//li//h3').allInnerTexts();

  //show the total number of elements
  console.log('The total number of results is: ', titles.length);
  
  //print each title
  for (let title of titles){
    console.log('The title is: ', title);
  }
});