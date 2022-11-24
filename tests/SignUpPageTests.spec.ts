import { test, expect } from '@playwright/test';
import { SignUpPage } from '../src/Pages/SignUpPage.spec';
import { signUpUserData } from '../src/testsData';
import { BasePage } from '../src/Pages/BasePage.spec';

//TODO: Add parallel support
test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page); 
  basePage.getStarted();
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
      await signUpPage.signUpWithEmail(signUpUserData.email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, signUpUserData.dayOfBirth,  signUpUserData.monthOfBirth,  signUpUserData.yearOfBirth);
      // Assert
      await expect(signUpPage.userIsLoggedIn()).toBeTruthy();
    });

    test('should verify user can sign up with Google', async ({ page }) => {
      //Prepare
      const signUpPage = new SignUpPage(page);
      //Verify Google button enabled in the page
      await expect(signUpPage.googleButtonLocator).toBeEnabled();
      
      //Test
      await signUpPage.signUpWithGoogle();
      // Assert
      await expect(signUpPage.userIsLoggedIn()).toBeTruthy();
    });

    test('should verify user can sign up with Facebook', async ({ page }) => {
      //Prepare
      const signUpPage = new SignUpPage(page);
      //Verify Google button enabled in the page
      await expect(signUpPage.facebookButtonLocator).toBeEnabled();
      
      //Test
      await signUpPage.signUpWithGoogle();

      // Assert
      await expect(signUpPage.userIsLoggedIn()).toBeTruthy();
    });

    test('should verify user can sign up with apple', async ({ page }) => {
      //Prepare
      const signUpPage = new SignUpPage(page);
      //Verify Google button enabled in the page
      await expect(signUpPage.appleButtonLocator).toBeEnabled();
      
      //Test
      await signUpPage.signUpWithApple();

      // Assert
      await expect(signUpPage.userIsLoggedIn()).toBeTruthy();
    });

});

test.describe('User Sign Up - Negative flows:', () => {
  
  test('should verify user cant sign up with the same email address', async ({ page }) => {
       //Prepare
       const signUpPage = new SignUpPage(page);
       let email = signUpUserData.email;
       //Test
       await signUpPage.signUpWithEmail(email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, signUpUserData.dayOfBirth,  signUpUserData.monthOfBirth,  signUpUserData.yearOfBirth);
       
       await signUpPage.goToSignUpPage();
       signUpPage.signUpWithEmail(email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, signUpUserData.dayOfBirth,  signUpUserData.monthOfBirth,  signUpUserData.yearOfBirth);
       // Assert
       await expect(signUpPage.userIsLoggedIn()).toBeFalsy();
  });

  test('should verify user under 16 cant sign up', async ({ page }) => {
    //Prepare
    const signUpPage = new SignUpPage(page);
    //Test
    await signUpPage.signUpWithEmail(signUpUserData.email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, '4',  '5',  '2019');
    
    // Assert
    await expect(signUpPage.userIsLoggedIn()).toBeFalsy();
  });

  test('should verify mandatory fields validations', async ({ page }) => {
    //Prepare
    const signUpPage = new SignUpPage(page);
    // Assert
    await expect(signUpPage.errorValidations).toBeTruthy();
    await expect(signUpPage.userIsLoggedIn()).toBeFalsy();
  });

});

