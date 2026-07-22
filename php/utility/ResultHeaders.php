<?php
declare(strict_types=1);

// LatlngGeocoding SDK utility: result_headers

class LatlngGeocodingResultHeaders
{
    public static function call(LatlngGeocodingContext $ctx): ?LatlngGeocodingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
