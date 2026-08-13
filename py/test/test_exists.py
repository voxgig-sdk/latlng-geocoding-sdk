# LatlngGeocoding SDK exists test

import pytest
from latlnggeocoding_sdk import LatlngGeocodingSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LatlngGeocodingSDK.test(None, None)
        assert testsdk is not None
