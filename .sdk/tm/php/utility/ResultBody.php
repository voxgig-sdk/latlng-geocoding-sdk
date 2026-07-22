<?php
declare(strict_types=1);

// LatlngGeocoding SDK utility: result_body

class LatlngGeocodingResultBody
{
    public static function call(LatlngGeocodingContext $ctx): ?LatlngGeocodingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
