// Load Playwright module
const { test, expect } = require('@playwright/test');

const bookingAPIRequestBody = require('../test-data/post_request_body.json')

// Write a test
test('Create POST API request using static JSON file', async ({ request }) => {
    
    // Send POST request to the API
    const postAPIResponse = await request.post('/booking', {
        data: bookingAPIRequestBody
    })

     // Validate status code
     expect(postAPIResponse.ok()).toBeTruthy(); 
     expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

     // Validate JSON API response
     expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Gary");
     expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Lee");
    
      // Validate nested JSON objects
      expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
      expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");
});
