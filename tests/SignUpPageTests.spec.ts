import { test, expect } from '@playwright/test';
import { SignUpPage } from '../Infra/Pages/SignUpPage.spec';
import { signUpUserData } from '../Infra/testsData';
import { ElementsHelper as elementHelper } from '../Infra/Utils/ElementsHelpers.spec';

//TODO: Add parallel support
test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.goToSignUpPage();
  await expect(page).toHaveURL(/.*identity/);
});

test.afterAll(async ({ page }) => {
  await page.close();
});

test.describe('User Sign Up - Happy flows:', () => {

    //TODO: Investigate if need new page instance per test
    test('should verify user can sign up with email', async ({ page }) => {
      //Prepare
      const signUpPage = new SignUpPage(page);
      //Test
      signUpPage.signUpWithEmail(signUpUserData.email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, signUpUserData.dayOfBirth,  signUpUserData.monthOfBirth,  signUpUserData.yearOfBirth);
      // Assert
      await expect(signUpPage.userIsLoggedIn).toBeTruthy();
    });

    test('should verify user can sign up with Google', async ({ page }) => {
      //Prepare
      const signUpPage = new SignUpPage(page);
      //Verify Google button enabled in the page
      await expect(signUpPage.googleButtonLocator).toBeEnabled();
      
      //Test
      signUpPage.signUpWithGoogle();
      // Assert
      await expect(signUpPage.userIsLoggedIn).toBeTruthy();
    });

    test('should verify user can sign up with Facebook', async ({ page }) => {
      //Prepare
      const signUpPage = new SignUpPage(page);
      //Verify Google button enabled in the page
      await expect(signUpPage.facebookButtonLocator).toBeEnabled();
      
      //Test
      signUpPage.signUpWithGoogle();

      // Assert
      await expect(signUpPage.userIsLoggedIn).toBeTruthy();
    });

    test('should verify user can sign up with apple', async ({ page }) => {
      //Prepare
      const signUpPage = new SignUpPage(page);
      //Verify Google button enabled in the page
      await expect(signUpPage.appleButtonLocator).toBeEnabled();
      
      //Test
      signUpPage.signUpWithApple();

      // Assert
      await expect(signUpPage.userIsLoggedIn).toBeTruthy();
    });

});

test.describe('User Sign Up - Negative flows:', () => {
  
  test('should verify user cant sign up email with inv', async ({ page }) => {
 
  });

});

