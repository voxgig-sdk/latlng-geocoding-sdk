-- LatlngGeocoding SDK error

local LatlngGeocodingError = {}
LatlngGeocodingError.__index = LatlngGeocodingError


function LatlngGeocodingError.new(code, msg, ctx)
  local self = setmetatable({}, LatlngGeocodingError)
  self.is_sdk_error = true
  self.sdk = "LatlngGeocoding"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LatlngGeocodingError:error()
  return self.msg
end


function LatlngGeocodingError:__tostring()
  return self.msg
end


return LatlngGeocodingError
