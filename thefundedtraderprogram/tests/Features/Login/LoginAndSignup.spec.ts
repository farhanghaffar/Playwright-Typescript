import { expect, test } from '@playwright/test';
import { readJsonFile } from '../../utils/testUtlis';
interface DataJson {
  currentEmailCount: number;
  emailToUser: string;
  registeredEmails: Array<string>;
  commonPassword: string;
  loginEmail: string;
}
import {
  checkAllTheAgreements,
  clickOnCancelButton,
  clickOnSignUpButton,
  fillFirstName,
  fillSignUpForm,
  getTextFromFieldsInRegistrationForm,
  goToHomePage,
  verifyAndClickSignUpButton,
  verifyInvalidFirstNameErrorIsNotVisible,
  verifyInvalidFirstNameErrorIsVisible,
  verifyLoginPage,
  verifySignUpPage,
  verifySuccessFulMsgOnSignup,
  verifyUserDashboard,
  clickLoginButton,
  verifyEmailRequiredError,
  verifyPasswordRequiredError,
  enterLoginEmail,
  enterLoginPassword,
  enterUnRegisteredLoginEmail,
  verifyInvalidCredentailsError,
  enterCharactersToLoginEmail,
  verifyEmailFieldHaveValue,
  verifyInvalidEmailError,
  verifyInvalidEmailErrorNotDisplayed,
  enterCharactersToLoginPassword,
  verifyPasswordFieldHaveValue,
  verifyPasswordFieldIsMasked,
  verifyPasswordFieldIsUnMasked,
  clickOnViewPasswordButton,
  clickOnForgotPasswordButton,
  verifyResetPasswordPageIsDisplayed,
  enterResetPasswordEmail,
  verifyResetPasswordEmailFieldHaveValue,
  clickOnSendRecoveryEmailButton,
  clickOnCancelResetPasswordButton
} from '../../Pages/LoginAndSignUp/LoginAndSignUp.steps';

test.describe('The Funded Trader - Login And Sign Up', () => {
  //Before Hook goto baseURL
  test.beforeEach(async ({ page }) => {
    await goToHomePage(page);
  });

  test('Verify that user is able land on login page ', async ({ page }) => {
    await verifyLoginPage(page);
  });
// started second test case
  test('DTFT-01: Verify that the user is able to land on the Sign Up page', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
  });

  test('DTFT-02: Verify that the user should be able to create new account and proceed to login page to Sign In', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    await page.waitForTimeout(5000);
    await fillSignUpForm(page);
    await checkAllTheAgreements(page);
    await clickOnSignUpButton(page);
    await verifySuccessFulMsgOnSignup(page);
  });
  
  test('Verify that the user will redirect to the login Page', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    await fillSignUpForm(page);
    await checkAllTheAgreements(page);
    await clickOnCancelButton(page);
    await verifyLoginPage(page);
  });
  test('Verify that the inputted data will not be saved and the creation of the account will not proceed', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    await fillSignUpForm(page);
    await checkAllTheAgreements(page);
    await clickOnCancelButton(page);
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    const formData = await getTextFromFieldsInRegistrationForm(page);
    if (formData) {
      expect(formData.firstName).toEqual('');
      expect(formData.lastName).toEqual('');
      expect(formData.userName).toEqual('');
      expect(formData.email).toEqual('');
    }
  });
  test('Verify that the inputted text characters are attached to the field with no error message', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    await fillFirstName(page, 'Input text characters on the First Name field');
    await clickOnSignUpButton(page);
    await page.waitForTimeout(5000);
    await verifyInvalidFirstNameErrorIsNotVisible(
      page,
      'Verify that the inputted text characters are attached to the field with no error message',
    );
  });
  test('Verify that the First Name field accepts a combination of alphanumeric characters', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    await fillFirstName(
      page,
      'Input a combination of alphanumeric characters on the First Name field',
      'TestUser121',
    );
    await clickOnSignUpButton(page);
    await page.waitForTimeout(5000);
    await verifyInvalidFirstNameErrorIsNotVisible(
      page,
      'Verify that the inputted numerical characters are attached to the field with no error message',
    );
  });
  test('Verify that a prompt message will appear as "Invalid first name" when user input only numbers', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    await fillFirstName(
      page,
      'Input numeric characters only on the First Name field',
      '12121',
    );
    await clickOnSignUpButton(page);
    await page.waitForTimeout(5000);
    await verifyInvalidFirstNameErrorIsVisible(page);
  });
  test('Verify that a prompt message will appear as "Invalid first name" when user input special characters', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
    await fillFirstName(
      page,
      'Input special characters on the First Name field',
      '@@@@',
    );
    await clickOnSignUpButton(page);
    await page.waitForTimeout(5000);
    await verifyInvalidFirstNameErrorIsVisible(page);
  });


  /* <---------------------Login Test Cases...........................> */

  test('DTFT-04 : Verify that the user can cancelled the Reset password', async ({
    page,
  }) => {
    const jsonObject: DataJson = await readJsonFile();
    await verifyLoginPage(page);
    await clickOnForgotPasswordButton(page);
    await verifyResetPasswordPageIsDisplayed(page);
    await enterResetPasswordEmail(page, jsonObject.loginEmail);
    await verifyResetPasswordEmailFieldHaveValue(page, jsonObject.loginEmail);
    await clickOnCancelResetPasswordButton(page);
    await verifyLoginPage(page);
  });

  test('DTFT-05: Verify that the user can sign in to the app using a registered credentials', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await enterLoginEmail(page);
    await enterLoginPassword(page);
    await clickLoginButton(page);
    await verifyUserDashboard(page);
  });

  test('DTFT-06: Verify that the user is unable to log in using an unregistered credentials', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await enterUnRegisteredLoginEmail(page);
    await enterLoginPassword(page);
    await clickLoginButton(page);
    await verifyInvalidCredentailsError(page);
  });


  test('DTFT-07: Verify that The user should not allow to login and notify that the Password is incorrect', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await enterUnRegisteredLoginEmail(page);
    await enterLoginPassword(page, true);
    await clickLoginButton(page);
    await verifyInvalidCredentailsError(page);
  });

  test('Verify that the user is unable to sign in without inputting the credentials first', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await clickLoginButton(page);
    await verifyEmailRequiredError(page);
    await verifyPasswordRequiredError(page);
  });

  test('Verify that the user is unable to log in providing the email address only', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await enterLoginEmail(page);
    await clickLoginButton(page);
    await verifyPasswordRequiredError(page);
  });

  test('Verify that the user is unable to log in providing the password only', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await enterLoginPassword(page);
    await clickLoginButton(page);
    await verifyEmailRequiredError(page);
  });

  

  test('Verify that the Email field accepts text characters', async ({
    page,
  }) => {
    const value = "ksjdla";
    await verifyLoginPage(page);
    await enterCharactersToLoginEmail(page, value);
    await verifyEmailFieldHaveValue(page, value);
  });

  test('Verify that the Email field accepts numerical characters', async ({
    page,
  }) => {
    const value = "4679876465";
    await verifyLoginPage(page);
    await enterCharactersToLoginEmail(page, value);
    await verifyEmailFieldHaveValue(page, value);
  });

  test('Verify that the Email field accepts special characters', async ({
    page,
  }) => {
    const value = "@#$%^&*";
    await verifyLoginPage(page);
    await enterCharactersToLoginEmail(page, value);
    await verifyEmailFieldHaveValue(page, value);
  });

  test('Verify that the system detects an invalid email', async ({
    page,
  }) => {
    const value = "ksjdla";
    await verifyLoginPage(page);
    await enterCharactersToLoginEmail(page, value);
    await verifyEmailFieldHaveValue(page, value);
    await clickLoginButton(page);
    await verifyInvalidEmailError(page);
  });

  test('Verify that the system accepts a valid email', async ({
    page,
  }) => {
    const value = "valid-email@address.com";
    await verifyLoginPage(page);
    await enterCharactersToLoginEmail(page, value);
    await verifyEmailFieldHaveValue(page, value);
    await clickLoginButton(page);
    await verifyInvalidEmailErrorNotDisplayed(page);
  });

  test('Verify that the Password field accepts text characters', async ({
    page,
  }) => {
    const value = "password";
    await verifyLoginPage(page);
    await enterCharactersToLoginPassword(page, value);
    await verifyPasswordFieldHaveValue(page, value);
  });

  test('Verify that the Password field accepts numerical characters', async ({
    page,
  }) => {
    const value = "12345678";
    await verifyLoginPage(page);
    await enterCharactersToLoginPassword(page, value);
    await verifyPasswordFieldHaveValue(page, value);
  });

  test('Verify that the Password field accepts special characters', async ({
    page,
  }) => {
    const value = "@#$%^&*";
    await verifyLoginPage(page);
    await enterCharactersToLoginPassword(page, value);
    await verifyPasswordFieldHaveValue(page, value);
  });

  test('Verify that the user can input a password', async ({
    page,
  }) => {
    const value = "Pass@#word";
    await verifyLoginPage(page);
    await enterCharactersToLoginPassword(page, value);
    await verifyPasswordFieldHaveValue(page, value);
    await verifyPasswordFieldIsMasked(page);
  });

  test('Verify that the user can view the inputted password', async ({
    page,
  }) => {
    const value = "Pass@#word";
    await verifyLoginPage(page);
    await enterCharactersToLoginPassword(page, value);
    await verifyPasswordFieldHaveValue(page, value);
    await clickOnViewPasswordButton(page);
    await verifyPasswordFieldIsUnMasked(page);
  });

  test('Verify that the user can hide the password that is showed', async ({
    page,
  }) => {
    const value = "Pass@#word";
    await verifyLoginPage(page);
    await enterCharactersToLoginPassword(page, value);
    await verifyPasswordFieldHaveValue(page, value);
    await clickOnViewPasswordButton(page);
    await verifyPasswordFieldIsUnMasked(page);
    await clickOnViewPasswordButton(page);
    await verifyPasswordFieldIsMasked(page);
  });

  test('Verify that the Forgot Password button is clickable and responsive when clicked', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await clickOnForgotPasswordButton(page);
    await verifyResetPasswordPageIsDisplayed(page);
  });

  test('Verify that the Reset Password Email field accepts text characters', async ({
    page,
  }) => {
    const value = "asdasdas";
    await verifyLoginPage(page);
    await clickOnForgotPasswordButton(page);
    await verifyResetPasswordPageIsDisplayed(page);
    await enterResetPasswordEmail(page, value);
    await verifyResetPasswordEmailFieldHaveValue(page, value);
  });

  test('Verify that the Reset Password Email field accepts numerical characters', async ({
    page,
  }) => {
    const value = "1234567";
    await verifyLoginPage(page);
    await clickOnForgotPasswordButton(page);
    await verifyResetPasswordPageIsDisplayed(page);
    await enterResetPasswordEmail(page, value);
    await verifyResetPasswordEmailFieldHaveValue(page, value);
  });

  test('Verify that the Reset Password Email field accepts special characters', async ({
    page,
  }) => {
    const value = "@#$%^&*";
    await verifyLoginPage(page);
    await clickOnForgotPasswordButton(page);
    await verifyResetPasswordPageIsDisplayed(page);
    await enterResetPasswordEmail(page, value);
    await verifyResetPasswordEmailFieldHaveValue(page, value);
  });

  test('Verify that the Sign Up text button is clickable and  user can view the sign up form', async ({
    page,
  }) => {
    await verifyLoginPage(page);
    await verifyAndClickSignUpButton(page);
    await verifySignUpPage(page);
  });
});
