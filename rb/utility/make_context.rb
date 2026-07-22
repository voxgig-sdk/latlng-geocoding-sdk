# LatlngGeocoding SDK utility: make_context
require_relative '../core/context'
module LatlngGeocodingUtilities
  MakeContext = ->(ctxmap, basectx) {
    LatlngGeocodingContext.new(ctxmap, basectx)
  }
end
