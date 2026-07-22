<?php
declare(strict_types=1);

// LatlngGeocoding SDK exists test

require_once __DIR__ . '/../latlnggeocoding_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = LatlngGeocodingSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
