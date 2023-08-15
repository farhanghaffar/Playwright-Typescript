import { test } from "@playwright/test";
import { qase } from 'playwright-qase-reporter/dist/playwright';
import { clickLoginButton, enterLoginEmail, enterLoginPassword, goToHomePage, verifyLoginPage, verifyUserDashboard } from "../../Pages/LoginAndSignUp/LoginAndSignUp.steps";
import { chooseChallenege, clickOnStartNewChallengeButton, verifyValueFromOrderSummary, fillBillingInformationForm, VerifyValuesInsertedInBillingInformationForm, scrollDownAndCheckTheTermsAndConditionCheckbox, clickCompleteOrderButton, VerifyTheErrorMessageIndicatingThatcheckboxRequired, VerifyTermsAndConditionsCheckboxIsChecked } from "../../Pages/Dashboard/Dashboard.steps";

test.describe('The Funded Trader - Dashboard', () => {    
    test.beforeEach(async ({ page }) => {
        await goToHomePage(page);
    });

    test.only(qase(1, 'TC_08_Challenge Card Container > Verify that the user will setup Challenge type, account size, Platform, broker and account type'), async ({ page }) => {
        await verifyLoginPage(page);
        await enterLoginEmail(page);
        await enterLoginPassword(page);
        await clickLoginButton(page);
        await verifyUserDashboard(page);
        await page.waitForTimeout(5000);
        await clickOnStartNewChallengeButton(page)
        await chooseChallenege(page)
        await page.waitForTimeout(5000);
        await verifyValueFromOrderSummary(page)
    })

    test(qase(2, 'TC_09_Terms and Condition > Verify that the user should input all requried of the users Billing information'), async ({ page }) => {
        await verifyLoginPage(page);
        await enterLoginEmail(page);
        await enterLoginPassword(page);
        await clickLoginButton(page);
        await verifyUserDashboard(page);
        await page.waitForTimeout(5000);
        await clickOnStartNewChallengeButton(page)
        await fillBillingInformationForm(page)
        await page.waitForTimeout(5000);
        await VerifyValuesInsertedInBillingInformationForm(page)
    })

    test(qase(3, 'TC_10_Terms and Condition > Verify that the terms and condition checkbox should not allow  to proceed without checking it'), async ({ page }) => {
        await verifyLoginPage(page);
        await enterLoginEmail(page);
        await enterLoginPassword(page);
        await clickLoginButton(page);
        await verifyUserDashboard(page);
        await page.waitForTimeout(10000);
        await clickOnStartNewChallengeButton(page)
        await fillBillingInformationForm(page)
        await page.waitForTimeout(5000);
        await clickCompleteOrderButton(page)
        await VerifyTheErrorMessageIndicatingThatcheckboxRequired(page)
        await clickCompleteOrderButton(page)
        await scrollDownAndCheckTheTermsAndConditionCheckbox(page)
        await VerifyTermsAndConditionsCheckboxIsChecked(page)
    })
})