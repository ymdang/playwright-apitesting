// Load Playwright module
const { test, expect } = require('@playwright/test');

import { stringFormat } from '../utils/common';

// Load dynamic request body JSON
const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');

// Write a test
test('Query parameters in playwright', async ({ request }) => {
    
    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody),"David", "Smith", "N/A") 

    // Create POST api request
    const postAPIResponse = await request.post('/booking', {
        data: JSON.parse (dynamicRequestBody)
    })

     // Validate status code
     expect(postAPIResponse.ok()).toBeTruthy(); 
     expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const bId = postAPIResponseBody.bookingid

     // Validate JSON API response
     expect(postAPIResponseBody.booking).toHaveProperty("firstname", "David");
     expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Smith");
    
      // Validate nested JSON objects
      expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
      expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");

      console.log("===================")

      // GET api call
      const getAPIResponse = await request.get(`/booking/`,{
        params:{
            "firstname":"David",
            "lastname":"Smith"
        }
    })
    console.log(await getAPIResponse.json())

      // validate status code
      expect(getAPIResponse.ok()).toBeTruthy();
      expect(getAPIResponse.status()).toBe(200);


});
