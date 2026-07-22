
import { Context } from './Context'


class LatlngGeocodingError extends Error {

  isLatlngGeocodingError = true

  sdk = 'LatlngGeocoding'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LatlngGeocodingError
}

