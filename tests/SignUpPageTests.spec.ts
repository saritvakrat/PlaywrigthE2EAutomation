import { test, expect} from '@playwright/test';
import { SignUpPage } from '../src/Pages/SignUpPage.spec';
import { signUpUserData } from '../src/testsData';

//TODO: Add parallel support
test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.goToSignUpPage();
  await expect(page).toHaveURL(/.*identity/);
});

test.afterEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  // Only log out a connected user 
  signUpPage.logOut() 
});

test.afterAll(async ({ page }) => {
  await page.close();
});

test.describe('User Sign Up - Happy flows:', () =>  {

    test('@sanity should verify user can sign up with email', async  ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test_id', description: 'PROJ-1678' });
      const signUpPage = new SignUpPage(page);
      //Test
      await signUpPage.signUpWithEmail(signUpUserData.email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, signUpUserData.dayOfBirth,  signUpUserData.monthOfBirth,  signUpUserData.yearOfBirth);
      // Assert
      await signUpPage.userIsLoggedIn();
    });

    test('@sanity should verify user can sign up with Google', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test_id', description: 'PROJ-11239' });
      const signUpPage = new SignUpPage(page);
      //Verify Google button enabled in the page
      await expect.soft(signUpPage.googleButtonLocator).toBeEnabled();
      
      //Test
      await signUpPage.signUpWithGoogle();
      // Assert
      await signUpPage.userIsLoggedIn();
    });

    test('@sanity should verify user can sign up with Facebook', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test_id', description: 'PROJ-159' });
      const signUpPage = new SignUpPage(page);

      //Verify Google button enabled in the page
      await expect.soft(signUpPage.facebookButtonLocator).toBeEnabled();
      
      //Test
      await signUpPage.signUpWithFacebook();

      // Assert
      await signUpPage.userIsLoggedIn();
    });

    test('@sanity should verify user can sign up with apple', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test_id', description: 'PROJ-3452' });
      const signUpPage = new SignUpPage(page);

      //Verify Google button enabled in the page
      await expect.soft(signUpPage.appleButtonLocator).toBeEnabled();
      
      //Test
      await signUpPage.signUpWithApple();

      // Assert
      await signUpPage.userIsLoggedIn();
    });

});

test.describe('User Sign Up - Negative flows:', () => {
  
  test('@regression should verify user cant sign up with the same email address', async ({ page }, testInfo) => {
      testInfo.annotations.push({ type: 'test_id', description: 'PROJ-345' });
       const signUpPage = new SignUpPage(page);
       const email = signUpUserData.email;
       //sign up once
       await signUpPage.signUpWithEmail(email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, signUpUserData.dayOfBirth,  signUpUserData.monthOfBirth,  signUpUserData.yearOfBirth);
       //sign up again with the same email
       await signUpPage.goToSignUpPage();
       signUpPage.signUpWithEmail(email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, signUpUserData.dayOfBirth,  signUpUserData.monthOfBirth,  signUpUserData.yearOfBirth);
       // Assert
       await expect(signUpPage.page).toHaveURL(signUpPage.register_URL);
       await expect(signUpPage.invalidCredsErrorLocator).toHaveText(signUpPage.invalidCredsErrorText);
      });

  test('@regression should verify user under 16 cant sign up', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test_id', description: 'PROJ-143' });
    const signUpPage = new SignUpPage(page);
    //Test
    await signUpPage.signUpWithEmail(signUpUserData.email, signUpUserData.firstName, signUpUserData.lastName, signUpUserData.password, '4',  '5',  '2019');
    
    // Assert
    await expect(signUpPage.page).toHaveURL(signUpPage.register_URL);
  });

  test('@sanity should verify mandatory fields validations', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'test_id', description: 'PROJ-123' });
    const signUpPage = new SignUpPage(page);
    // Assert
    await expect(signUpPage.errorValidations).toBeTruthy();
    await expect(signUpPage.page).toHaveURL(signUpPage.register_URL);
  });

});

