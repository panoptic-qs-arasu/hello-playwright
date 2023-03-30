import { test, expect } from '@playwright/test';

test.describe("Test add patient to queue", async () => {

  test.beforeAll(async ({ request }) => {
    const tokenEndPoint = 'https://dev-next.keycloak.dev.amwell.systems/auth/realms/services/protocol/openid-connect/token';

    // create token
    console.log('create token');
    let response = await request.post(tokenEndPoint, {
      form: {
        grant_type: "client_credentials",
        client_id: "test-automation-client",
        client_secret: "JI5mwxzYvSkxkSv0Ub7PdyWupqlxSN4n",
      },
    });
    expect(response.ok()).toBeTruthy();
    let resObject = await response.json();
    console.log(resObject)
    const accessToken = resObject.access_token;
    //const {access_token} = JSON.parse(await response.text());
    //console.log(access_token)

    const baseEndPoint = `https://api.dev.amwell.systems/fhir-proxy/v2/cdr`;

    // create encounter
    console.log('create encounter');
    let reqText = `
    {
    "class": {
        "code": "MAX",
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode"
    },
    "location": [
        {
            "location": {
                "display": "HARMELING PHYSICAL THERAPY AND SPORTS FITNESS INC",
                "reference": "Location/3dd1b9d9-2d36-449e-99a1-bd4735656576"
            }
        }   
    ],
    "status": "planned",
    "resourceType": "Encounter",
    "subject": {
        "display": "Mrs. Emily Brown",
        "reference": "Patient/ca2c1be2-23e8-4e68-8383-3aa2f6b3028d"
    }
    }
    `;
    let reqPayLoad = JSON.parse(reqText);
    response = await request.post(`${baseEndPoint}/Encounter`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: reqPayLoad,
    });
    expect(response.ok()).toBeTruthy();
    resObject = await response.json();
    console.log(resObject);
    const encounterId = resObject.id;

    // update encounter
    console.log('update encounter');
    reqText = `
{
    "id": "f3f4924e-82a3-456a-a542-e0d4c0f4fa82",
    "meta": {
        "versionId": "MTY3NDQwMzk2Mzk2Nzk2NjAwMA",
        "lastUpdated": "2023-01-22T16:12:43.967966+00:00"
    },
    "resourceType": "Encounter",
    "extension": [
        {
            "url": "https://CVSH.amwell.systems/brandingId",
            "valueString": "mc"
        },
        {
            "url": "https://converge.amwell.com/slsSelectedClassificationPath",
            "valueIdentifier": {
                "type": {
                    "coding": [
                        {
                            "system": "https://converge.amwell.com/slsOrder",
                            "code": "1"
                        },
                        {
                            "system": "https://converge.amwell.com/slsId",
                            "code": "34"
                        }
                    ]
                },
                "value": "General Medical"
            }
        },
        {
            "url": "https://converge.amwell.com/slsSelectedClassificationPath",
            "valueIdentifier": {
                "type": {
                    "coding": [
                        {
                            "system": "https://converge.amwell.com/slsOrder",
                            "code": "2"
                        },
                        {
                            "system": "https://converge.amwell.com/slsId",
                            "code": "37"
                        }
                    ]
                },
                "value": "Routine care & illness"
            }
        },
        {
            "url": "https://converge.amwell.com/slsSelectedClassificationPath",
            "valueIdentifier": {
                "type": {
                    "coding": [
                        {
                            "system": "https://converge.amwell.com/slsOrder",
                            "code": "3"
                        },
                        {
                            "system": "https://converge.amwell.com/slsId",
                            "code": "51"
                        }
                    ]
                },
                "value": "test"
            }
        },
        {
            "url": "https://converge.amwell.com/practitionerAdditionalContext",
            "valueString": "NPI=1821085143&providerConnectionExternalUserId=3432&location=9501020300"
        }
    ],
    "identifier": [
        {
            "type": {
                "text": "externalEncounterId"
            },
            "system": "https://SMART.amwell.com/externalEHRIdentifier",
            "value": "59b37ab1-b86a-4228-86db-dcf5951a23cd"
        }
    ],
    "status": "planned",
    "statusHistory": [
        {
            "status": "arrived",
            "period": {
                "start": "2023-01-22T16:12:25.315+00:00",
                "end": "2023-01-22T16:12:42.768+00:00"
            }
        },
        {
            "status": "triaged",
            "period": {
                "start": "2023-01-22T16:12:42.768+00:00",
                "end": "2023-01-22T17:12:42.768+00:00"
            }
        }
    ],
    "class": {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "MAX"
    },
    "type": [
        {
            "coding": [
                {
                    "system": "schedulingType",
                    "code": "amwell-on-demand"
                }
            ]
        }
    ],
    "subject": {
        "reference": "Patient/ca2c1be2-23e8-4e68-8383-3aa2f6b3028d",
        "display": "Mrs. Emily Brown"
    },
    "location": [
        {
            "location": {
                "reference": "Location/3dd1b9d9-2d36-449e-99a1-bd4735656576",
                "display": "HARMELING PHYSICAL THERAPY AND SPORTS FITNESS INC"
            }
        }
    ]
}
    `;
    reqPayLoad = JSON.parse(reqText);
    reqPayLoad.id = resObject.id;
    response = await request.put(`${baseEndPoint}/Encounter/${encounterId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: reqPayLoad,
    });
    expect(response.ok()).toBeTruthy();
    resObject = await response.json();
    console.log(resObject);

    // create service request
    console.log('create service request');
    reqText = `
{
    "resourceType": "ServiceRequest",
    "status": "active",
    "intent": "plan",
    "subject": {
        "reference": "Patient/ca2c1be2-23e8-4e68-8383-3aa2f6b3028d"
    },
    "encounter": {
        "reference": "Encounter/f3f4924e-82a3-456a-a542-e0d4c0f4fa82"
    },
    "performer": [
        {
            "reference": "HealthcareService/ed4c465d-ada9-4221-acf6-7cbdcf12359d"
        }
    ]
}
    `
    reqPayLoad = JSON.parse(reqText);
    reqPayLoad.encounter.reference = `Encounter/${encounterId}`;
    response = await request.post(`${baseEndPoint}/ServiceRequest`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: reqPayLoad,
    });
    expect(response.ok()).toBeTruthy();
    resObject = await response.json();
    console.log(resObject);

    // put visit
    console.log('put visit');
    const visitRequestEndPoint = "https://dev-next.visit-request-processing.dev.amwell.systems/api/visit-requests";
    reqText = `
{
  "encounterId": "f3f4924e-82a3-456a-a542-e0d4c0f4fa82",
  "tenantId": "CVSHI"
}
    `
    reqPayLoad = JSON.parse(reqText);
    reqPayLoad.encounterId = encounterId;
    response = await request.put(visitRequestEndPoint, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: reqPayLoad,
    });
    expect(response.ok()).toBeTruthy();
    resObject = await response.json();
    console.log(resObject);

  });

  test('verify patient in queue', async ({page}) => {
    await page.goto('https://launch.smarthealthit.org/?launch_url=https%3A%2F%2Fdev-next.auth.dev.amwell.systems%2Fapp%2FSMART%2Fsmarthealthit%2Fpractitioner%2Flaunch%3Fvisittype%3Dpnp&launch=WzAsImIyMThjZWU5LTAxOWQtNDdhNC1iMTYxLWU5N2MwZmQ2ZjczNiIsIjUxMWFiNDViLWEwMjAtNGMyNC05M2ZmLTkxOTM2NDgzY2M1NSIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0');

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', {name: 'Launch', exact: true}).click();
    const page1 = await page1Promise;

    await page1.waitForNavigation();
    //await page1.pause();
    await expect(page1.locator("div.info-block__patient p")).toContainText("1");
  });

});
