-- LatlngGeocoding SDK exists test

local sdk = require("latlng-geocoding_sdk")

describe("LatlngGeocodingSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
