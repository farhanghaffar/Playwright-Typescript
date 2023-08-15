import { Page, expect, test } from '@playwright/test';
import { LoginPage } from './LoginAndSignUp.page';
import { readJsonFile, writeJsonFile } from '../../utils/testUtlis';

interface DataJson {
  currentEmailCount: number;
  emailToUser: string;
  registeredEmails: Array<string>;
  commonPassword: string;
  loginEmail: string;
}

export const goToHomePage = (page: Page) =>
  test.step('Goto App Url', async () => {
    await page.goto('https://dashboard.thefundedtraderprogram.com/');
  });

export const verifyLoginPage = (page: Page) =>
  test.step('Verify Login Page is Displaying', async () => {
    await expect(page.locator(LoginPage.loginComponentID)).toBeVisible();
  });
export const verifyAndClickSignUpButton = (page: Page) =>
  test.step('Click the Sign Up Hyperlink', async () => {
    await expect(page.getByText(LoginPage.signUpButtonMainText)).toBeVisible();

    await page.getByText(LoginPage.signUpButtonMainText).click();
  });

export const verifySignUpPage = (page: Page) =>
  test.step('Verify Sign Up Page is Displaying', async () => {
    await expect(page.locator(LoginPage.signUpComponentID)).toBeVisible();
  });

export const fillSignUpForm = (page: Page) =>
  test.step('Fill out the form with valid data', async () => {
    const jsonObject: DataJson = await readJsonFile();
    jsonObject.currentEmailCount += 1;
    const firstName = `TestUserFirstName${jsonObject.currentEmailCount}`;
    const lastName = `TestUserLastName${jsonObject.currentEmailCount}`;
    const username = `testusername${jsonObject.currentEmailCount}`;
    const email = `${jsonObject.emailToUser}+${jsonObject.currentEmailCount}@gmail.com`;
    const password = `${jsonObject.commonPassword}`;

    console.log(firstName, lastName, username, email, password);

    await expect(page.locator(LoginPage.firstNameInputFieldID)).toBeVisible();
    await page
      .locator(LoginPage.firstNameInputFieldID)
      .type(firstName, { delay: 100 });

    await expect(page.locator(LoginPage.lastNameInputFieldID)).toBeVisible();
    await page
      .locator(LoginPage.lastNameInputFieldID)
      .type(lastName, { delay: 100 });

    await expect(page.locator(LoginPage.userNameInputFieldID)).toBeVisible();
    await page
      .locator(LoginPage.userNameInputFieldID)
      .type(username, { delay: 100 });

    await expect(page.locator(LoginPage.emailInputFieldID)).toBeVisible();
    await page.locator(LoginPage.emailInputFieldID).type(email, { delay: 100 });

    await expect(page.locator(LoginPage.passwordInputFieldID)).toBeVisible();
    await page
      .locator(LoginPage.passwordInputFieldID)
      .type(password, { delay: 100 });

    await expect(
      page.locator(LoginPage.confirmPasswordInputFieldID),
    ).toBeVisible();
    await page
      .locator(LoginPage.confirmPasswordInputFieldID)
      .type(password, { delay: 100 });

    jsonObject.registeredEmails.push(email);
    await writeJsonFile(jsonObject);
  });

export const checkAllTheAgreements = (page: Page) =>
  test.step('Check all the agreements', async () => {
    await expect(
      page.locator(LoginPage.agreePrivacyPolicyCheckBox).first(),
    ).toBeVisible();
    await page.locator(LoginPage.agreePrivacyPolicyCheckBox).first().click();

    await expect(
      page.locator(LoginPage.agreeNewsLetterCheckBox).first(),
    ).toBeVisible();
    await page.locator(LoginPage.agreeNewsLetterCheckBox).first().click();

    await expect(
      page.locator(LoginPage.agreeIdentificationCheckBox).first(),
    ).toBeVisible();
    await page.locator(LoginPage.agreeIdentificationCheckBox).first().click();
  });

export const clickOnSignUpButton = (page: Page) =>
  test.step('Click the Sign Up button', async () => {
    await expect(
      page.getByRole('button', { name: LoginPage.signUpButtonMainText }),
    ).toBeVisible();

    await page
      .getByRole('button', { name: LoginPage.signUpButtonMainText })
      .click();
  });
export const verifySuccessFulMsgOnSignup = (page: Page) =>
  test.step('Verify that "Account Successfully Created" is displaying', async () => {
    await expect(
      page.getByText(LoginPage.accountCreatedSuccessMainText).first(),
    ).toBeVisible();
  });
export const fillFirstName = (
  page: Page,
  step: string,
  firstName = 'TestUserFirstName',
) =>
  test.step(step, async () => {
    await expect(page.locator(LoginPage.firstNameInputFieldID)).toBeVisible();
    await page
      .locator(LoginPage.firstNameInputFieldID)
      .type(firstName, { delay: 100 });
  });

export const verifyInvalidFirstNameErrorIsNotVisible = (
  page: Page,
  step: string,
) =>
  test.step(step, async () => {
    await expect(
      page.getByText(LoginPage.invalidFirstNameMainText),
    ).not.toBeVisible();
  });

export const verifyInvalidFirstNameErrorIsVisible = (page: Page) =>
  test.step('Verify that a prompt message will appear as "Invalid first name', async () => {
    await expect(
      page.getByText(LoginPage.invalidFirstNameMainText),
    ).toBeVisible();
  });

export const clickOnCancelButton = (page: Page) =>
  test.step('Click the Sign Up button', async () => {
    await expect(
      page.getByRole('button', { name: LoginPage.cancelMainText }),
    ).toBeVisible();

    await page.getByRole('button', { name: LoginPage.cancelMainText }).click();
  });

export const getTextFromFieldsInRegistrationForm = (page: Page) =>
  test.step('Verify that the inputted data will not be saved and the creation of the account will not proceed', async () => {
    await expect(page.locator(LoginPage.firstNameInputFieldID)).toBeVisible();
    const firstName = await page
      .locator(LoginPage.firstNameInputFieldID)
      .textContent();

    await expect(page.locator(LoginPage.lastNameInputFieldID)).toBeVisible();
    const lastName = await page
      .locator(LoginPage.lastNameInputFieldID)
      .textContent();

    await expect(page.locator(LoginPage.userNameInputFieldID)).toBeVisible();
    const userName = await page
      .locator(LoginPage.userNameInputFieldID)
      .textContent();

    await expect(page.locator(LoginPage.emailInputFieldID)).toBeVisible();
    const email = await page.locator(LoginPage.emailInputFieldID).textContent();

    return { firstName, lastName, userName, email };
  });


  export const verifyUserDashboard = (page: Page) =>
  test.step('Verify dashboard is displaying', async () => {
    await expect(
      page.getByText(LoginPage.profileMenuText),
    ).toBeVisible();
  });


  export const clickLoginButton = (page: Page) =>
  test.step('Click the sign in button', async () => {
    await page.getByRole('button', { name: LoginPage.btnSignInID }).click();
  });

  export const enterLoginEmail = (page: Page) =>
  test.step('Enter registered email address', async () => {
    const jsonObject: DataJson = await readJsonFile();
    await page.locator(LoginPage.userNameInputFieldID)
      .type(jsonObject.loginEmail);
  });

  export const enterUnRegisteredLoginEmail = (page: Page) =>
  test.step('Enter un-registered email address', async () => {
    await page.locator(LoginPage.userNameInputFieldID)
      .type('un-registered@email.com');
  });

  export const enterCharactersToLoginEmail = (page: Page, value: string) =>
  test.step('Enter characters in email address field', async () => {
    await page.locator(LoginPage.userNameInputFieldID)
      .type(value);
  });

  export const enterCharactersToLoginPassword = (page: Page, value: string) =>
  test.step('Enter characters in password field', async () => {
    await page.locator(LoginPage.passwordInputFieldID)
      .type(value);
  });

  export const verifyEmailFieldHaveValue = (page: Page, value: string) =>
  test.step('Verify email address have characters in value', async () => {
    await expect(
      page.locator(LoginPage.userNameInputFieldID),
    ).toHaveValue(value);
  });

  export const verifyPasswordFieldHaveValue = (page: Page, value: string) =>
  test.step('Verify password have characters in value', async () => {
    await expect(
      page.locator(LoginPage.passwordInputFieldID),
    ).toHaveValue(value);
  });

  export const verifyPasswordFieldIsMasked = (page: Page) =>
  test.step('Verify password field is masked', async () => {
    await expect(
      page.locator(LoginPage.passwordInputFieldID),
    ).toHaveAttribute('type','password');
  });

  export const clickOnViewPasswordButton = (page: Page) =>
  test.step('Click on view password button', async () => {
    await page.locator(LoginPage.viewPasswordButtonID).click();
  });
  export const verifyPasswordFieldIsUnMasked = (page: Page) =>
  test.step('Verify password field is un-masked', async () => {
    await expect(
      page.locator(LoginPage.passwordInputFieldID),
    ).toHaveAttribute('type','text');
  });

  export const enterLoginPassword = (page: Page, pass = false) =>
  test.step('Enter password', async () => {
    const jsonObject: DataJson = await readJsonFile();
    await page.locator(pass ? "123456abc" : LoginPage.passwordInputFieldID)
      .type(jsonObject.commonPassword);
  });

  export const verifyEmailRequiredError = (page: Page) =>
  test.step('Verify email field is required error', async () => {
    await expect(
      page.getByText(LoginPage.emailRequiredErrorMessage),
    ).toBeVisible();
  });

  export const verifyPasswordRequiredError = (page: Page) =>
  test.step('Verify password field is required error', async () => {
    await expect(
      page.getByText(LoginPage.passwordRequiredErrorMessage),
    ).toBeVisible();
  });

  export const verifyInvalidCredentailsError = (page: Page) =>
  test.step('Verify Invalid username/password pair error', async () => {
    await expect(
      page.getByText(LoginPage.invalidCredentialsMessage),
    ).toBeVisible();
  });

  export const verifyInvalidEmailError = (page: Page) =>
  test.step('Verify Invalid email address error', async () => {
    await expect(
      page.getByText(LoginPage.invalidEmailAddressError),
    ).toBeVisible();
  });

  export const verifyInvalidEmailErrorNotDisplayed = (page: Page) =>
  test.step('Verify Invalid email address error not displayed', async () => {
    await expect(
      page.getByText(LoginPage.invalidEmailAddressError),
    ).not.toBeAttached();
  });
  
  export const clickOnForgotPasswordButton = (page: Page) =>
  test.step('Click on forgot password button', async () => {
    await page.locator(LoginPage.forgotPasswordButton).click();
  });

  export const verifyResetPasswordPageIsDisplayed = (page: Page) =>
  test.step('Verify reset password page is displayed', async () => {
    await expect(
      page.getByText(LoginPage.resetPasswordHeading),
    ).toBeVisible();
  });

  export const enterResetPasswordEmail = (page: Page, email: string) =>
  test.step('Enter reset passworrd email', async () => {
    await page.locator(LoginPage.emailInputFieldID)
      .type(email);
  });

  export const verifyResetPasswordEmailFieldHaveValue = (page: Page, value: string) =>
  test.step('Verify reset password email have the value', async () => {
    await expect(
      page.locator(LoginPage.emailInputFieldID),
    ).toHaveValue(value);
  });

  export const clickOnSendRecoveryEmailButton = (page: Page) =>
  test.step('Click on send recovery email button', async () => {
    await page.locator(LoginPage.submitResetPasswordEmailButton).click();
  });

  export const clickOnCancelResetPasswordButton = (page: Page) =>
  test.step('Click on cancel reset password button', async () => {
    await page.getByRole('button', { name: LoginPage.cancelMainText }).click();
  });