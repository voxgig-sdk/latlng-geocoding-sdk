# LatlngGeocoding SDK feature factory

from latlnggeocoding_sdk.feature.base_feature import LatlngGeocodingBaseFeature
from latlnggeocoding_sdk.feature.test_feature import LatlngGeocodingTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LatlngGeocodingBaseFeature(),
        "test": lambda: LatlngGeocodingTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
