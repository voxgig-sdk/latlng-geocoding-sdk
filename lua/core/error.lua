-- LatlngGeocoding SDK error

local json = require("dkjson")

local LatlngGeocodingError = {}
LatlngGeocodingError.__index = LatlngGeocodingError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function LatlngGeocodingError.new(code, msg, ctx)
  local self = setmetatable({}, LatlngGeocodingError)
  self.is_sdk_error = true
  self.sdk = "LatlngGeocoding"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function LatlngGeocodingError:context()
  return CONTEXT[self]
end


function LatlngGeocodingError:error()
  return self.msg
end


function LatlngGeocodingError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function LatlngGeocodingError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function LatlngGeocodingError:to_json()
  return json.encode(self:to_table())
end


function LatlngGeocodingError:__tostring()
  return self.msg
end


function LatlngGeocodingError.__tojson(self)
  return self:to_json()
end


return LatlngGeocodingError
