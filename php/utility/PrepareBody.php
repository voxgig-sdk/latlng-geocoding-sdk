<?php
declare(strict_types=1);

// LatlngGeocoding SDK utility: prepare_body

class LatlngGeocodingPrepareBody
{
    public static function call(LatlngGeocodingContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
