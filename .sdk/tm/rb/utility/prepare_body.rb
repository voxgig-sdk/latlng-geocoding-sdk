# LatlngGeocoding SDK utility: prepare_body
require_relative 'media'
module LatlngGeocodingUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return LatlngGeocodingUtilities.raw_body(ctx.reqdata) if LatlngGeocodingUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
