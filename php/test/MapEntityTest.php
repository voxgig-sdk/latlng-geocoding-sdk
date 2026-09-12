<?php
declare(strict_types=1);

// Map entity test

require_once __DIR__ . '/../latlnggeocoding_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MapEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LatlngGeocodingSDK::test(null, null);
        $ent = $testsdk->Map(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = map_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "map." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LATLNG_GEOCODING_TEST_MAP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $map_ref01_ent = $client->Map(null);
        $map_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.map"), "map_ref01"));

        $map_ref01_data_result = $map_ref01_ent->create($map_ref01_data, null);
        $map_ref01_data = Helpers::to_map(is_object($map_ref01_data_result) && method_exists($map_ref01_data_result, 'data_get') ? $map_ref01_data_result->data_get() : $map_ref01_data_result);
        $this->assertNotNull($map_ref01_data);

        // LOAD
        $map_ref01_match_dt0 = [];
        $map_ref01_data_dt0_loaded = $map_ref01_ent->load($map_ref01_match_dt0, null);
        $this->assertNotNull($map_ref01_data_dt0_loaded);

    }
}

function map_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/map/MapTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LatlngGeocodingSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["map01", "map02", "map03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LATLNG_GEOCODING_TEST_MAP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LATLNG_GEOCODING_TEST_MAP_ENTID" => $idmap,
        "LATLNG_GEOCODING_TEST_LIVE" => "FALSE",
        "LATLNG_GEOCODING_TEST_EXPLAIN" => "FALSE",
        "LATLNG_GEOCODING_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LATLNG_GEOCODING_TEST_MAP_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LATLNG_GEOCODING_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["LATLNG_GEOCODING_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        $client = new LatlngGeocodingSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LATLNG_GEOCODING_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LATLNG_GEOCODING_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
