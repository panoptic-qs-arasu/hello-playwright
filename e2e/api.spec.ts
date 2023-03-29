import { test, expect } from '@playwright/test';

test('add patient to queue', async ({ request }) => {
    let response = await request.post('https://dev-next.keycloak.dev.amwell.systems/auth/realms/services/protocol/openid-connect/token', {
        form: {
            grant_type: "client_credentials",
            client_id: "test-automation-client",
            client_secret: "JI5mwxzYvSkxkSv0Ub7PdyWupqlxSN4n",
        },
    });
    expect(response.ok()).toBeTruthy();
    const { access_token } = JSON.parse(await response.text());
    console.log(access_token)

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
    `
    let reqPayLoad = JSON.parse(reqText);
    response = await request.post('https://api.dev.amwell.systems/fhir-proxy/v2/cdr/Encounter', {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
        data: reqPayLoad,
    });
    expect(response.ok()).toBeTruthy();
    console.log(await response.text());
});
