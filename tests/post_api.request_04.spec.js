// Load Playwright module
const { test, expect } = require('@playwright/test');

import { stringFormat } from '../utils/common';

// Load dynamic request body JSON
const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');

// Write a test
test('Create POST API request using dynamic JSON file', async ({ request }) => {
    
    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody),"David", "Smith", "N/A") 

    // Send POST request to the API
    const postAPIResponse = await request.post('/booking', {
        data: JSON.parse (dynamicRequestBody)
    })

     // Validate status code
     expect(postAPIResponse.ok()).toBeTruthy(); 
     expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

     // Validate JSON API response
     expect(postAPIResponseBody.booking).toHaveProperty("firstname", "David");
     expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Smith");
    
      // Validate nested JSON objects
      expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
      expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");
});
