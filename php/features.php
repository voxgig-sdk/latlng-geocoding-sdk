<?php
declare(strict_types=1);

// LatlngGeocoding SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LatlngGeocodingFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LatlngGeocodingBaseFeature();
            case "test":
                return new LatlngGeocodingTestFeature();
            default:
                return new LatlngGeocodingBaseFeature();
        }
    }
}
