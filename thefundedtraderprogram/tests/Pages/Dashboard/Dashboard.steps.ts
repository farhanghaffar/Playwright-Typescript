import { Page, expect, test } from "@playwright/test";
import { Dashboard } from "./Dashboard.page";

var billingInformationphoneNumber=""
var billingInformationAddressLineOne=""
var billingInformationTownCity=""
var billingInformationPostalCode=""
var billingInformationAdditionalNotes=""

export const clickOnStartNewChallengeButton = (page: Page) =>
  test.step('Click on "Start New Challenge" Button on Sidebar', async () => {
  
    const checkModal = page.frameLocator(Dashboard.liveChatFrameHelloTraderTitle)
    await expect(checkModal.getByTestId(Dashboard.helloTraderPopUpModalId)).toBeVisible()
    await checkModal.locator(Dashboard.closeButtonOnHelloTraderPopUp).click()
    await expect(page.getByText(Dashboard.startNewChallenegeButtonMainText).first()).toBeVisible()
    await page.getByText(Dashboard.startNewChallenegeButtonMainText).first().click()

  });

  export const verifyValueFromOrderSummary = (page: Page) =>
  test.step('Read Values from Order Summary and Verify', async () => {
    const challengeType = await page.locator(Dashboard.challengeTypeXPath).first().textContent()
    const accountSize = await page.locator(Dashboard.accountSizeXPath).first().textContent()
    const accountType = await page.locator(Dashboard.accountTypeXPath).first().textContent()
    const platform = await page.locator(Dashboard.platformXPath).first().textContent()
    const broker = await page.locator(Dashboard.brokerXPath).first().textContent()
    const totalPrice = await page.getByTestId(Dashboard.totalPriceId).first().textContent()
    expect(challengeType).toEqual('Standard Challenge')
    expect(accountSize).toEqual('10000')
    expect(accountType).toEqual('regular')
    expect(platform).toEqual('MT4')
    expect(broker).toEqual('ThinkMarkets')
    expect(totalPrice).toEqual('$129.00')
  });

  export const chooseChallenege = (page: Page) =>
  test.step('Setup and choose the Funded Trade Challenge by selecting the following card container', async () => {
    await test.step('Challenge Type=> Standard Challenge', async()=>{
        await page.waitForTimeout(3000)
        await expect(page.getByTestId('plan3').getByTestId(Dashboard.standardChallengeId)).toBeVisible()
        await page.getByTestId('plan3').getByTestId(Dashboard.standardChallengeId).click()
    })
    await test.step('Account Size=> 10000', async()=>{
        await page.waitForTimeout(3000)
        await expect(page.getByTestId('plan1').getByTestId(Dashboard.acountSize10000Id)).toBeVisible()
        await page.getByTestId('plan1').getByTestId(Dashboard.acountSize10000Id).click()
    })
    await test.step('Platform=> planform 4', async()=>{
        await page.waitForTimeout(3000)
        await expect(page.getByTestId('plan1').getByTestId(Dashboard.platForm4Id)).toBeVisible()
        await page.getByTestId('plan1').getByTestId(Dashboard.platForm4Id).click()
    })
    await test.step('Broker=> ThinkMarketsId', async()=>{
        await page.waitForTimeout(3000)
        await expect(page.getByTestId('plan1').getByTestId(Dashboard.broker1ThinkMarketsId)).toBeVisible()
        await page.getByTestId('plan1').getByTestId(Dashboard.broker1ThinkMarketsId).click()
    })
    await test.step('Account Type=> Regular', async()=>{
        await page.waitForTimeout(3000)
        await expect(page.getByTestId('plan1').getByTestId(Dashboard.accountTypeRegular)).toBeVisible()
        await page.getByTestId('plan1').getByTestId(Dashboard.accountTypeRegular).click()
    })
    
  });

  export const fillBillingInformationForm = (page: Page) =>
  test.step('Fill out the Billing Information form with valid data', async () => {
    const billingInformationphoneNumber = "9103464893";
    const billingInformationAddressLineOne = `SAN DIEGO`;
    const billingInformationTownCity = `California`;
    const billingInformationPostalCode = `90080`;
    const billingInformationAdditionalNotes = `Test`;
    
    await page.waitForTimeout(5000)

    await page.locator(Dashboard.billingInformationFirstNameTxt).scrollIntoViewIfNeeded();

    await expect(page.locator(Dashboard.billingInformationFirstNameTxt)).toBeVisible();    
    
    await page
      .locator(Dashboard.billingInformationPhoneNumberTxt).fill(billingInformationphoneNumber);

    await expect(page.locator(Dashboard.billingInformationAddressLineOneTxt)).toBeVisible();
    
    await page
      .locator(Dashboard.billingInformationAddressLineOneTxt)
      .type(billingInformationAddressLineOne, { delay: 100 });

    await expect(page.locator(Dashboard.billingInformationTownCityTxt)).toBeVisible();
    await page
      .locator(Dashboard.billingInformationTownCityTxt)
      .type(billingInformationTownCity, { delay: 100 });

    await expect(page.locator(Dashboard.billingInformationPostalCodeTxt)).toBeVisible();
    await page.locator(Dashboard.billingInformationPostalCodeTxt).type(billingInformationPostalCode, { delay: 100 });

    await expect(page.locator(Dashboard.billingInformationAdditionalNotesTxt)).toBeVisible();
    await page.locator(Dashboard.billingInformationAdditionalNotesTxt).type(billingInformationAdditionalNotes, { delay: 100 });
  });

  export const VerifyValuesInsertedInBillingInformationForm = (page: Page) =>
  test.step('Verify Values Inserted In Billing Information Form', async () => {
    const billingInformationphoneNumber = "9103464893";
    const billingInformationAddressLineOne = `SAN DIEGO`;
    const billingInformationTownCity = `California`;
    const billingInformationPostalCode = `90080`;
    const billingInformationAdditionalNotes = `Test`;

    const element_1 =  page.locator(Dashboard.billingInformationPhoneNumberTxt)
    await element_1.scrollIntoViewIfNeeded();
    const phoneNumber = await page.locator(Dashboard.billingInformationPhoneNumberTxt).inputValue()
    const element_2 = page.locator(Dashboard.billingInformationAddressLineOneTxt)
    await element_2.scrollIntoViewIfNeeded();
    const addressLineOne = await page.locator(Dashboard.billingInformationAddressLineOneTxt).inputValue()
    const element_3 = page.locator(Dashboard.billingInformationTownCityTxt)
    await element_3.scrollIntoViewIfNeeded();
    const townCity = await page.locator(Dashboard.billingInformationTownCityTxt).inputValue()
    const element_4 = page.locator(Dashboard.billingInformationPostalCodeTxt)
    await element_4.scrollIntoViewIfNeeded();
    const postalCode = await page.locator(Dashboard.billingInformationPostalCodeTxt).inputValue()
    const element_5 = page.locator(Dashboard.billingInformationAdditionalNotesTxt)
    await element_5.scrollIntoViewIfNeeded();
    const additionalNotes = await page.locator(Dashboard.billingInformationAdditionalNotesTxt).inputValue()

    expect(phoneNumber).toEqual(billingInformationphoneNumber)
    expect(addressLineOne).toEqual(billingInformationAddressLineOne)
    expect(townCity).toEqual(billingInformationTownCity)
    expect(postalCode).toEqual(billingInformationPostalCode)
    expect(additionalNotes).toEqual(billingInformationAdditionalNotes)
  });

  export const scrollDownAndCheckTheTermsAndConditionCheckbox = (page: Page) =>
  test.step('Scroll down and Check the Terms and Condition checkbox', async () => {
    const iAgreeToTheProcessingOfPersonalDataAccordingToTermsAndConditions = await page.locator(Dashboard.iAgreeToTheProcessingOfPersonalDataAccordingToTermsAndConditionsCheckbox)
    iAgreeToTheProcessingOfPersonalDataAccordingToTermsAndConditions.scrollIntoViewIfNeeded();
    await page.locator(Dashboard.iAgreeToTheProcessingOfPersonalDataAccordingToTermsAndConditionsCheckbox).click();

    const iAgreeToTheCancellationAndRefundPolicy = await page.locator(Dashboard.iAgreeToTheCancellationAndRefundPolicyCheckbox)
    iAgreeToTheCancellationAndRefundPolicy.scrollIntoViewIfNeeded();
    await page.locator(Dashboard.iAgreeToTheCancellationAndRefundPolicyCheckbox).click();    
  });

  export const VerifyTermsAndConditionsCheckboxIsChecked = (page: Page) =>
  test.step('Verify that the Terms and Conditions checkbox is checked', async () => {
    await expect(page.locator(Dashboard.iAgreeToTheProcessingOfPersonalDataAccordingToTermsAndConditionsChecked)).toBeVisible();
    await expect(page.locator(Dashboard.iAgreeToTheCancellationAndRefundPolicyChecked)).toBeVisible();   
  });

  export const clickCompleteOrderButton = (page: Page) =>
  test.step('Click on the complete Order button', async () => {
    await page.locator(Dashboard.completeOrderBtn).click();
  });
  
  export const VerifyTheErrorMessageIndicatingThatcheckboxRequired = (page: Page) =>
  test.step('Verify the error message indicating that the checkbox is required.', async () => {
    await expect(page.locator(Dashboard.iAgreeToTheProcessingOfPersonalDataAccordingToTermsAndConditionsCheckboxErrorMsg)).toBeVisible();
    await expect(page.locator(Dashboard.iAgreeToTheCancellationAndRefundPolicyErrorMsg)).toBeVisible();   
  });