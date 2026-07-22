
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LatlngGeocodingSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await LatlngGeocodingSDK.test()
    equal(null !== testsdk, true)
  })

})
