import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('verify patient in queue', async ({ page }) => {
  await page.goto('https://launch.smarthealthit.org/?launch_url=https%3A%2F%2Fdev-next.auth.dev.amwell.systems%2Fapp%2FSMART%2Fsmarthealthit%2Fpractitioner%2Flaunch%3Fvisittype%3Dpnp&launch=WzAsImIyMThjZWU5LTAxOWQtNDdhNC1iMTYxLWU5N2MwZmQ2ZjczNiIsIjUxMWFiNDViLWEwMjAtNGMyNC05M2ZmLTkxOTM2NDgzY2M1NSIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Launch', exact: true }).click();
  const page1 = await page1Promise;
  //await page1.goto('https://dev-next.auth.dev.amwell.systems/app/SMART/smarthealthit/practitioner/launch?visittype=pnp&iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=WzAsImIyMThjZWU5LTAxOWQtNDdhNC1iMTYxLWU5N2MwZmQ2ZjczNiIsIjUxMWFiNDViLWEwMjAtNGMyNC05M2ZmLTkxOTM2NDgzY2M1NSIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0');
  await page1.waitForNavigation();
  await page1.waitForTimeout(5000);
  await expect(page1.locator("h3.left m-0")).toContainText("Next Patient");
  await expect(page1.locator("h5.mb2 strong")).toContainText("Patients in Queue");
  await expect(page1.locator("p.count m-0")).toContainText("1");
});
