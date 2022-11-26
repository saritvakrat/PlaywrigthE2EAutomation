import { Locator, Page, expect } from '@playwright/test';

export class SignUpPage {

//TODO: Separate page functionality from elements 
readonly page: Page;
readonly emailAddressField: Locator;
readonly myAccountText : Locator;
readonly welcomeToYourAccountLocator: Locator;
readonly googleButtonLocator: Locator;
readonly appleButtonLocator: Locator;
readonly facebookButtonLocator: Locator;
readonly invalidCredsErrorLocator : Locator;

constructor(page: Page) {
  this.page = page;
  this.emailAddressField = page.locator('.email');
  this.welcomeToYourAccountLocator = page.getByText('My Account');
  this.googleButtonLocator = page.getByRole('link', { name: 'google Google' });
  this.appleButtonLocator = page.getByRole('link', { name: 'apple Apple' });
  this.facebookButtonLocator = page.getByRole('link', { name: 'facebook Facebook' });
  this.invalidCredsErrorLocator = page.locator('.invalid');
}

welcomeToYourAccountText = 'WELCOME TO YOUR ACCOUNT';
register_URL = 'https://my.asos.com/identity/register?lang=en-GB&store=ROW&country=IL&keyStoreDataversion=ornjx7v-36&returnUrl=https%3A%2F%2Fwww.asos.com%2F'
invalidCredsErrorText = ""

async goToSignUpPage() {
  // TODO: investigate why nav to URL does not work
  await this.page.goto('/identity/register');
  // workaround
  await this.page.getByTestId('myAccountIcon').click();
  await this.page.getByTestId('signup-link').click();
  await this.page.getByText('Join').first().click();
  await this.page.locator('div').filter({ hasText: 'Join' }).nth(4).click();
}

//TODO: Extract to separate assertions
async userIsLoggedIn() {
  // Expects the URL to contain my account.
  await expect.soft(this.page).toHaveURL(/.*my-account/);
  await expect(this.welcomeToYourAccountLocator).toHaveText(this.welcomeToYourAccountText);
}

async logOut() {
  const userloggedIn = true;

  if (userloggedIn) {
    await this.page.getByTestId('logout').click();
  }
}

async signUpWithEmail(email: string, firstName: string, lastName: string, password: string, dayOfBirth: string, monthOfBirth: string, yearOfBirth: string ) {     
  //TODO: Extract to elements page in constructor 
  await this.page.getByLabel('Email address').click();
  await this.page.getByLabel('Email address').fill(email);
  await this.page.getByLabel('First name').fill(firstName);
  await this.page.getByLabel('Last name').fill(lastName);
  await this.page.getByLabel('Password').fill(password);
  await this.page.getByLabel('Password').scrollIntoViewIfNeeded();
  await this.page.getByRole('combobox', { name: 'Date of birth Day' }).scrollIntoViewIfNeeded();
  await this.page.getByRole('combobox', { name: 'Date of birth Day' }).selectOption(dayOfBirth);
  await this.page.getByRole('combobox', { name: 'Date of birth Month' }).selectOption(monthOfBirth);
  await this.page.getByRole('combobox', { name: 'Date of birth Year' }).selectOption(yearOfBirth);
  //TODO: Extract Contact Preferences to an enum
  await this.page.locator('label').filter({ hasText: 'New stuff' }).locator('span').click();
  await this.page.locator('label').filter({ hasText: 'ASOS partners' }).locator('span').click();
  await this.clickSignUpButton();
}

async clickSignUpButton() {
  await this.page.getByRole('button', { name: 'Join ASOS' }).click();
}

async errorValidations () {
  await this.page.getByLabel('Email address').click();
  await expect(this.page.getByText('Oops! You need to type your email here')).toHaveText('Oops! You need to type your email here');

  await this.page.getByLabel('First name').click();
  await this.page.getByText('We need your first name – it’s nicer that way').click();

  await this.page.getByLabel('Last name').click();
  await expect(this.page.getByText('Last name, too, please!')).toHaveText('Last name, too, please!');

  await this.page.getByLabel('Password').click();
  await expect(this.page.getByText('Hey, we need a password here')).toHaveText('Hey, we need a password here');
}

async signUpWithGoogle(){
  await this.googleButtonLocator.click();
  await expect(this.page).toHaveURL(/.*o/);
  await expect(this.page).toHaveTitle(/.*Google/);
}

async signUpWithApple(){
  await this.appleButtonLocator.click();
  await expect(this.page).toHaveURL(/.*auth/);
  await expect(this.page).toHaveTitle("Sign in with Apple ID");
}

async signUpWithFacebook(){
  await this.facebookButtonLocator.click();
  await expect(this.page).toHaveURL(/.*v12.0/);
}

}

