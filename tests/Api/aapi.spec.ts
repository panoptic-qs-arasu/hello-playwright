import { test, expect, defineConfig } from '@playwright/test'

const token = 'eyJhbGciOiJSUzI1NiJ9.eyJyb29tU291cmNlSWQiOiI4YmUyNTU5Ny1jMjQwLTQ0YWQtODk5ZS03N2UyOTBlMzQwN2MiLCJzdWIiOiJQcmFjdGl0aW9uZXJcL2E2YmEzNWI3LTIyZDctNGJlYS1iODdiLWFmYmM5ZmYyZjJlZSIsInJvbGUiOiJQUkFDVElUSU9ORVIiLCJmaGlyIjp7ImZoaXJCYXNlVXJpIjoiaHR0cHM6XC9cL2xhdW5jaC5zbWFydGhlYWx0aGl0Lm9yZ1wvdlwvcjRcL2ZoaXIiLCJwYXRpZW50IjoiMzI2YjQ2NzUtMGJjOC00ZGJkLWI0MDYtYTU1NjRjMjgyNDAxIiwic2NvcGUiOiJsYXVuY2ggb3BlbmlkIGZoaXJVc2VyIiwiaWRUb2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp3Y205bWFXeGxJam9pVUhKaFkzUnBkR2x2Ym1WeUwyRTJZbUV6TldJM0xUSXlaRGN0TkdKbFlTMWlPRGRpTFdGbVltTTVabVl5WmpKbFpTSXNJbVpvYVhKVmMyVnlJam9pVUhKaFkzUnBkR2x2Ym1WeUwyRTJZbUV6TldJM0xUSXlaRGN0TkdKbFlTMWlPRGRpTFdGbVltTTVabVl5WmpKbFpTSXNJbUYxWkNJNkltVTJNekZoTVRCaUxUWXhObVF0TkdJNVpDMDVaVFF5TFRBellUZzBNalJtTjJJek9TSXNJbk4xWWlJNklqY3haalE1WldJMk5EQTRNVFE0TVRabE9EQTJaakpsTmpZMFpUWXpaamd5WldOa01XSTRNREJtT1RReVpEZ3dZamRpTWpJM09UZzBNalZsWldaak1UZ2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyeGhkVzVqYUM1emJXRnlkR2hsWVd4MGFHbDBMbTl5WnlJc0ltbGhkQ0k2TVRZeE5qUXhOak16TXl3aVpYaHdJam94TmpFMk5ERTVPVE16ZlEuRjZmS0hHaElsVzhRbENFV1Btb2VKWnBOT1FpQ0hURzNZNEFWSHZKbWotdU8wTDBablRMaEpWYjBvR1BWZWdibXNQeXJmb1R1VmNJc1E3OTkwdWlfb1NZSy1Gb04wOXNWU05QTFFJd1NEclZxS0xNaVlqRTJfQzR4aTcxaGhnaXdaclp1X2NkZFItTml2WHV4cFZXdFFycmdHWl9OMjRzRnhpQ0hCRThjNUpvdkhFMFVSakhHYS1QaFZQMHlxTDQxeFkwNDlYLUFTS1V6NGY3UVBDdnBGYVJ1d29nX1BDTUdoYmFwclliSENyS0k1ME0xZFFESVdZN1RJenRDQzdncmlDRm1kX0tEVmlSYU1UM0tndXVkbVp5Rk9acU5yZ0N1SGpBLXA3M045UmNVU29wYXBlSjJqZGxNOGwydWxZMGJiSHVmeE1NUl9kWC1RbUdJcHJtVm5BIiwiZW5jb3VudGVyIjoiOGJlMjU1OTctYzI0MC00NGFkLTg5OWUtNzdlMjkwZTM0MDdjIiwiYWNjZXNzVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdVpXVmtYM0JoZEdsbGJuUmZZbUZ1Ym1WeUlqcDBjblZsTENKemJXRnlkRjl6ZEhsc1pWOTFjbXdpT2lKb2RIUndjem92TDJ4aGRXNWphQzV6YldGeWRHaGxZV3gwYUdsMExtOXlaeTl6YldGeWRDMXpkSGxzWlM1cWMyOXVJaXdpY0dGMGFXVnVkQ0k2SWpNeU5tSTBOamMxTFRCaVl6Z3ROR1JpWkMxaU5EQTJMV0UxTlRZMFl6STRNalF3TVNJc0ltVnVZMjkxYm5SbGNpSTZJamhpWlRJMU5UazNMV015TkRBdE5EUmhaQzA0T1RsbExUYzNaVEk1TUdVek5EQTNZeUlzSW5SdmEyVnVYM1I1Y0dVaU9pSmlaV0Z5WlhJaUxDSnpZMjl3WlNJNklteGhkVzVqYUNCdmNHVnVhV1FnWm1ocGNsVnpaWElpTENKamJHbGxiblJmYVdRaU9pSmxOak14WVRFd1lpMDJNVFprTFRSaU9XUXRPV1UwTWkwd00yRTROREkwWmpkaU16a2lMQ0psZUhCcGNtVnpYMmx1SWpvek5qQXdMQ0pwWkY5MGIydGxiaUk2SW1WNVNqQmxXRUZwVDJsS1MxWXhVV2xNUTBwb1lrZGphVTlwU2xOVmVra3hUbWxLT1M1bGVVcDNZMjA1YldGWGVHeEphbTlwVlVoS2FGa3pVbkJrUjJ4MlltMVdlVXd5UlRKWmJVVjZUbGRKTTB4VVNYbGFSR04wVGtkS2JGbFRNV2xQUkdScFRGZEdiVmx0VFRWYWJWbDVXbXBLYkZwVFNYTkpiVnB2WVZoS1ZtTXlWbmxKYW05cFZVaEthRmt6VW5Ca1IyeDJZbTFXZVV3eVJUSlpiVVY2VGxkSk0weFVTWGxhUkdOMFRrZEtiRmxUTVdsUFJHUnBURmRHYlZsdFRUVmFiVmw1V21wS2JGcFRTWE5KYlVZeFdrTkpOa2x0VlRKTmVrWm9UVlJDYVV4VVdYaE9iVkYwVGtkSk5WcERNRFZhVkZGNVRGUkJlbGxVWnpCTmFsSnRUakpKZWs5VFNYTkpiazR4V1dsSk5rbHFZM2hhYWxFMVdsZEpNazVFUVRSTlZGRTBUVlJhYkU5RVFUSmFha3BzVG1wWk1GcFVXWHBhYW1kNVdsZE9hMDFYU1RSTlJFSnRUMVJSZVZwRVozZFphbVJwVFdwSk0wOVVaekJOYWxac1dsZGFhazFVWjJsTVEwcHdZek5OYVU5cFNtOWtTRkozWTNwdmRrd3llR2hrVnpWcVlVTTFlbUpYUm5sa1IyaHNXVmQ0TUdGSGJEQk1iVGw1V25sSmMwbHRiR2hrUTBrMlRWUlplRTVxVVhoT2FrMTZUWGwzYVZwWWFIZEphbTk0VG1wRk1rNUVSVFZQVkUxNlpsRXVSalptUzBoSGFFbHNWemhSYkVORlYxQnRiMlZLV25CT1QxRnBRMGhVUnpOWk5FRldTSFpLYldvdGRVOHdUREJhYmxSTWFFcFdZakJ2UjFCV1pXZGliWE5RZVhKbWIxUjFWbU5KYzFFM09Ua3dkV2xmYjFOWlN5MUdiMDR3T1hOV1UwNVFURkZKZDFORWNsWnhTMHhOYVZscVJUSmZRelI0YVRjeGFHaG5hWGRhY2xwMVgyTmtaRkl0VG1sMldIVjRjRlpYZEZGeWNtZEhXbDlPTWpSelJuaHBRMGhDUlRoak5VcHZka2hGTUZWU2FraEhZUzFRYUZaUU1IbHhURFF4ZUZrd05EbFlMVUZUUzFWNk5HWTNVVkJEZG5CR1lWSjFkMjluWDFCRFRVZG9ZbUZ3Y2xsaVNFTnlTMGsxTUUweFpGRkVTVmRaTjFSSmVuUkRRemRuY21sRFJtMWtYMHRFVm1sU1lVMVVNMHRuZFhWa2JWcDVSazlhY1U1eVowTjFTR3BCTFhBM00wNDVVbU5WVTI5d1lYQmxTakpxWkd4Tk9Hd3lkV3haTUdKaVNIVm1lRTFOVWw5a1dDMVJiVWRKY0hKdFZtNUJJaXdpYVdGMElqb3hOakUyTkRFMk16TXpMQ0psZUhBaU9qRTJNVFkwTVRrNU16TjkueHVJb1JKcEVXLUFiNEJmUHIzRjVxOXBMQ3JuQVpCUm9OREh1R0VsV2xtVSIsInJlZnJlc2hUb2tlbiI6bnVsbH0sInRlbmFudEtleSI6InNtYXJ0IiwiaXNzIjoiaHR0cHM6XC9cL2Rldi1uZXh0LmF1dGguZGV2LmFtd2VsbC5zeXN0ZW1zIiwiZWhySWQiOiJzdGFuZGFyZCIsImVuY291bnRlcklkIjoiOGJlMjU1OTctYzI0MC00NGFkLTg5OWUtNzdlMjkwZTM0MDdjIiwiYXVkIjoiZTYzMWExMGItNjE2ZC00YjlkLTllNDItMDNhODQyNGY3YjM5IiwibGF1bmNoSWQiOiJlOWM4OGMxOS05NTZlLTQ1NWEtODdhNy1jNzVlNDRjNjI2NzkiLCJlaHJUeXBlIjoic3RhbmRhcmQiLCJwYXJ0aWNpcGFudFNvdXJjZUlkIjoiUHJhY3RpdGlvbmVyXC9hNmJhMzViNy0yMmQ3LTRiZWEtYjg3Yi1hZmJjOWZmMmYyZWUiLCJleHAiOjE2MTY1MDI3MzMsImFkSG9jIjpmYWxzZSwiaWF0IjoxNjE2NDE2MzMzfQ.IFf8hKLjgHKQpbPrLdWbia8Hr5dC4u0-7q6-Vkqt4fKOEYd1mHZJjgwPk-FjrnnOvbTgfj31iTDb8vbVRDeuFclco8MMEQbBvQwqjdDe8jFP21gDvSGdzr78QrMR0-Da5_pu8OYNYGDlljWzaZvCF7Bea7L9PPkK4HLIU_QYJ4ZjYUXjfB7KJLihdrtTqNP_bhk1BwzGxuTTcU1pQ9kTD3JxaToZW2UJF28XE0ghzH8onrVm89Q43nfs9nyqkuKNYV3ettx7vGBJNqKjOc1PMWLZEVHiesZemUEk80Oda0zJq7sY0K93kEmi5brfHyqbXs5Z0NRrJLH_88h1dp7RgA'

export default defineConfig({
    use: {
        // All requests we send go to this API endpoint.
        extraHTTPHeaders: {
            // We set this header per GitHub guidelines.
            'Content-Type': 'application/x-www-form-urlencoded',
            // Add authorization token to all requests.
            // Assuming personal access token available in the environment.
            'Authorization': `Bearer ${token}`,
        },
    }
});

const baseUrl = 'https://reqres.in/api'
const tokenUrl = 'https://dev-next.keycloak.dev.amwell.systems/auth/realms/services/protocol/openid-connect/token'
const createEncounter = 'https://api.dev.amwell.systems/fhir-proxy/v2/cdr/Encounter'
const updateEncounter = 'https://api.dev.amwell.systems/fhir-proxy/v2/cdr/Encounter/f3f4924e-82a3-456a-a542-e0d4c0f4fa82'
const serviceRequest = 'https://api.dev.amwell.systems/fhir-proxy/v2/cdr/ServiceRequest'
const putVisit = 'https://dev-next.visit-request-processing.dev.amwell.systems/api/visit-requests'

test('Token Service Test', async ({request}) => {
    const response = await request.post(`${tokenUrl}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
            'grant_type': 'client_credentials',
            'client_id': 'abcdefg',
            'client_secret': 'JI5mwxzYvSkxkSv0Ub7PdyWupqlxSN4n'
        },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
})

test('Create Encounter Service', async ({request}) => {
    const response = await request.post(`${createEncounter}`, {
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
        data: {
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
        },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
})

test('Update Encounter Service', async ({request}) => {
    const response = await request.put(`${updateEncounter}`, {
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
        data: {
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
        },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
})

test('Create Service Request', async ({request}) => {
    const response = await request.post(`${serviceRequest}`, {
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
        data: {
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
        },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
})

test('Put Visit', async ({request}) => {
    const response = await request.put(`${putVisit}`, {
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
        data: {
            "encounterId": "f3f4924e-82a3-456a-a542-e0d4c0f4fa82",
            "tenantId": "CVSHI"
        },
    })
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
})
