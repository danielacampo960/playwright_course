import { test, expect, Locator, Page } from '@playwright/test';

export class LoginPage{
    //readonly: el elemento solo se crea una vez, no cambia
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;
    private readonly shoppingCartIcon: Locator;

    //locate the elements in the constructor
    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name:'Username'});
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.shoppingCartIcon = page.locator("//a[contains(@class, 'shopping_cart_link')]")
    }

    //now, the interaction
    async fillUsername(username: string){
        await this.usernameTextbox.fill(username);
    }

    async fillPassword(password: string){
        await this.passwordTextbox.fill(password);
    }

    async clickOnLogin(){
        await this.loginButton.click();
    }

    async loginWithCredentials(username:string, password:string){
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickOnLogin();
    }

    //método de aserción de Login
    async succesfulLogin(){
        await expect(this.shoppingCartIcon).toBeVisible();
    }
}