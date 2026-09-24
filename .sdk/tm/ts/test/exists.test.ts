
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LatlngGeocodingSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LatlngGeocodingSDK.test()
    equal(testsdk instanceof LatlngGeocodingSDK, true,
      'LatlngGeocodingSDK.test() must return a client synchronously')
  })

})
