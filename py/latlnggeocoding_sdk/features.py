# LatlngGeocoding SDK feature factory

from latlnggeocoding_sdk.feature.base_feature import LatlngGeocodingBaseFeature
from latlnggeocoding_sdk.feature.ratelimit_feature import LatlngGeocodingRatelimitFeature
from latlnggeocoding_sdk.feature.retry_feature import LatlngGeocodingRetryFeature
from latlnggeocoding_sdk.feature.test_feature import LatlngGeocodingTestFeature
from latlnggeocoding_sdk.feature.timeout_feature import LatlngGeocodingTimeoutFeature


_FEATURES = {
    "base": lambda: LatlngGeocodingBaseFeature(),
    "ratelimit": lambda: LatlngGeocodingRatelimitFeature(),
    "retry": lambda: LatlngGeocodingRetryFeature(),
    "test": lambda: LatlngGeocodingTestFeature(),
    "timeout": lambda: LatlngGeocodingTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
