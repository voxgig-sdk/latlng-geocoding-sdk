# LatlngGeocoding SDK exists test

require "minitest/autorun"
require_relative "../LatlngGeocoding_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LatlngGeocodingSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
