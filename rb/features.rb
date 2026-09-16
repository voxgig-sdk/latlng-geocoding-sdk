# LatlngGeocoding SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LatlngGeocodingFeatures
  def self.make_feature(name)
    case name
    when "base"
      LatlngGeocodingBaseFeature.new
    when "ratelimit"
      LatlngGeocodingRatelimitFeature.new
    when "retry"
      LatlngGeocodingRetryFeature.new
    when "test"
      LatlngGeocodingTestFeature.new
    when "timeout"
      LatlngGeocodingTimeoutFeature.new
    else
      LatlngGeocodingBaseFeature.new
    end
  end
end
