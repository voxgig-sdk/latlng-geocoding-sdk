# LatlngGeocoding SDK utility: make_context

from latlnggeocoding_sdk.core.context import LatlngGeocodingContext


def make_context_util(ctxmap, basectx):
    return LatlngGeocodingContext(ctxmap, basectx)
