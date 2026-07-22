# LatlngGeocoding SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LatlngGeocodingUtility.registrar = ->(u) {
  u.clean = LatlngGeocodingUtilities::Clean
  u.done = LatlngGeocodingUtilities::Done
  u.make_error = LatlngGeocodingUtilities::MakeError
  u.feature_add = LatlngGeocodingUtilities::FeatureAdd
  u.feature_hook = LatlngGeocodingUtilities::FeatureHook
  u.feature_init = LatlngGeocodingUtilities::FeatureInit
  u.fetcher = LatlngGeocodingUtilities::Fetcher
  u.make_fetch_def = LatlngGeocodingUtilities::MakeFetchDef
  u.make_context = LatlngGeocodingUtilities::MakeContext
  u.make_options = LatlngGeocodingUtilities::MakeOptions
  u.make_request = LatlngGeocodingUtilities::MakeRequest
  u.make_response = LatlngGeocodingUtilities::MakeResponse
  u.make_result = LatlngGeocodingUtilities::MakeResult
  u.make_point = LatlngGeocodingUtilities::MakePoint
  u.make_spec = LatlngGeocodingUtilities::MakeSpec
  u.make_url = LatlngGeocodingUtilities::MakeUrl
  u.param = LatlngGeocodingUtilities::Param
  u.prepare_auth = LatlngGeocodingUtilities::PrepareAuth
  u.prepare_body = LatlngGeocodingUtilities::PrepareBody
  u.prepare_headers = LatlngGeocodingUtilities::PrepareHeaders
  u.prepare_method = LatlngGeocodingUtilities::PrepareMethod
  u.prepare_params = LatlngGeocodingUtilities::PrepareParams
  u.prepare_path = LatlngGeocodingUtilities::PreparePath
  u.prepare_query = LatlngGeocodingUtilities::PrepareQuery
  u.result_basic = LatlngGeocodingUtilities::ResultBasic
  u.result_body = LatlngGeocodingUtilities::ResultBody
  u.result_headers = LatlngGeocodingUtilities::ResultHeaders
  u.transform_request = LatlngGeocodingUtilities::TransformRequest
  u.transform_response = LatlngGeocodingUtilities::TransformResponse
}
