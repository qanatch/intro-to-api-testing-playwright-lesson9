import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('get order with symbols id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/i')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('post order with incorrect data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: ' ',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

//PUT
const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }

test('check PUT request with correct and API key data should receive code 200', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 8,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/8', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('check PUT request with correct API key and outside valid id should receive code 400', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 8,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 12,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/12', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check PUT request with correct API key and empty id should receive code 405', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    // id: 8,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('check PUT request with correct API key and not numeric id should receive code 400', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 'asd',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/asd', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check PUT request with invalid API key should receive code 401', async ({ request }) => {
  const requestHeadersInvalid = { api_key: '123456789012345' }

  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: '8',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/8', {
    data: requestBody,
    headers: requestHeadersInvalid,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('check PUT request with incorrect body  should receive code 400', async ({ request }) => {
  const requestBody = {
    status: '123',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 8,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/8', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
//DELETE

test('check DELETE request with valid order ID and API key should receive code 204', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/10', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('check DELETE request with ID outside valid and API key should receive code 400', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/101', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check DELETE request with empty ID and valid API key should receive code 405', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('check DELETE request with not numeric ID and valid API key should receive code 400', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/asd', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check DELETE request with invalid API key should receive code 401', async ({ request }) => {
  const requestHeadersInvalid = { api_key: '123456789012345' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/8', {
    headers: requestHeadersInvalid,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

//GET

test('check GET request to authenticate user with valid username and password should receive code 200 and return apiKey', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders?username=Alex&password=8888');

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK);
  expect(await response.json()).toHaveProperty('apiKey');
})


