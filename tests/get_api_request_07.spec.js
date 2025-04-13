// Load Playwright module
const { test, expect } = require('@playwright/test');

import { stringFormat } from '../utils/common';

const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');

const tokenRequestBody = require('../test-data/token_request_body.json');

const putRequestBody = require('../test-data/put_request_body.json')

// Write a test
test('Create PUT api request in playwright', async ({ request }) => {
    
    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody),"David", "Smith", "N/A") 
    
    console.log("==POST API==")
    // Send POST request to the API
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
    
    console.log("==GET API==")
    
    // GET api call
    const getAPIResponse = await request.get(`/booking/${bId}`);
    console.log(await getAPIResponse.json())
    
    // validate status code
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);
    
    // Generate Token
    const tokenResponse = await request.post(`/auth`,{
        data: tokenRequestBody
    })
    
    const tokenAPIResponseBody = await tokenResponse.json();
    const tokenNo = tokenAPIResponseBody.token;
    console.log("Token No is : "+tokenNo);
    
    console.log("==PUT API==")
    // PUT api call
    const putResponse = await request.put(`/booking/${bId}`, {
        headers:{
            "Content-Type":"application/json",
            "Cookie":`token=${tokenNo}`
        },
        data:putRequestBody
    })

    const putResponseBody = await putResponse.json();
    console.log(putResponseBody)

    //Validate status code
    expect(putResponse.status()).toBe(200);

})