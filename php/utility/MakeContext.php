<?php
declare(strict_types=1);

// LatlngGeocoding SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LatlngGeocodingMakeContext
{
    public static function call(array $ctxmap, ?LatlngGeocodingContext $basectx): LatlngGeocodingContext
    {
        return new LatlngGeocodingContext($ctxmap, $basectx);
    }
}
