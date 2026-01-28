import { test, expect } from '@playwright/test';

test('test web table', async ({page}) =>{
    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    //Capture the whole table
    const tableContainer = await page.locator("//table[@id='countries']");

    //now it searchs INSIDE the container given
    const rows = await tableContainer.locator('xpath= .//tr').all();

    //[] these initialize a list
    const countries: Country[] = [];

    //save the rows(tr) found in rows
    console.log(rows.length);

    //for each line, it'll create an object "country" with the properties taken from the table.
    for(let row of rows){
        //add missing properties
        let country: Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            language: await row.locator('xpath=.//td[5]').innerText()
        }
        //add each created object to the countries list
        countries.push(country)
    }

    for(let country of countries){
        console.log(country);
    }

    //make operations with the table's values
    const countryWherePortuguese = countries.filter(country => country.language == 'French')
    console.log('Countries where people speak French', countryWherePortuguese)

    /*const row1 = rows.at(1);
    //? makes it an option
    const countryName = await row1?.locator('xpath=.//td[2]').innerText();
    const countryCapital = await row1?.locator('xpath=.//td[3]').innerText();
    const countryCurrency = await row1?.locator('xpath=.//td[4]').innerText();

    console.log(countryName,countryCapital,countryCurrency);*/
})

interface Country{
    name: string;
    capital: string;
    currency: string;
    language: string;
}

/*
container: //table[@id='countries']
.//tr -> filas
.//td -> columnas

//table[@id='countries']//tr[2]//td[1] -> Check
//table[@id='countries']//tr[2]//td[2] -> Country name
//table[@id='countries']//tr[2]//td[3] -> Capital
//table[@id='countries']//tr[2]//td[4] -> Currency
//table[@id='countries']//tr[2]//td[5] -> Language(s)
*/