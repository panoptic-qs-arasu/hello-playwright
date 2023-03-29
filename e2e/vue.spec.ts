import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  //https://dev-next.auth.dev.amwell.systems/app/SMART/smarthealthit/practitioner/launch?visittype=pnp&iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=WzAsImIyMThjZWU5LTAxOWQtNDdhNC1iMTYxLWU5N2MwZmQ2ZjczNiIsIjUxMWFiNDViLWEwMjAtNGMyNC05M2ZmLTkxOTM2NDgzY2M1NSIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0
  await page.goto('https://dev-next.auth.dev.amwell.systems/app/SMART/smarthealthit/practitioner/launch?visittype=pnp&iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=WzAsImIyMThjZWU5LTAxOWQtNDdhNC1iMTYxLWU5N2MwZmQ2ZjczNiIsIjUxMWFiNDViLWEwMjAtNGMyNC05M2ZmLTkxOTM2NDgzY2M1NSIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0');
  //await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
})
