# LatlngGeocoding SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LatlngGeocodingFeatures
  def self.make_feature(name)
    case name
    when "base"
      LatlngGeocodingBaseFeature.new
    when "test"
      LatlngGeocodingTestFeature.new
    else
      LatlngGeocodingBaseFeature.new
    end
  end
end
