<?php
declare(strict_types=1);

// Dataset entity test

require_once __DIR__ . '/../latlnggeocoding_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DatasetEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LatlngGeocodingSDK::test(null, null);
        $ent = $testsdk->Dataset(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = dataset_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "dataset." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LATLNG_GEOCODING_TEST_DATASET_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $dataset_ref01_ent = $client->Dataset(null);
        $dataset_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.dataset"), "dataset_ref01"));

        $dataset_ref01_data_result = $dataset_ref01_ent->create($dataset_ref01_data, null);
        $dataset_ref01_data = Helpers::to_map(is_object($dataset_ref01_data_result) && method_exists($dataset_ref01_data_result, 'data_get') ? $dataset_ref01_data_result->data_get() : $dataset_ref01_data_result);
        $this->assertNotNull($dataset_ref01_data);

        // LOAD
        $dataset_ref01_match_dt0 = [];
        $dataset_ref01_data_dt0_loaded = $dataset_ref01_ent->load($dataset_ref01_match_dt0, null);
        $this->assertNotNull($dataset_ref01_data_dt0_loaded);


    }
}

function dataset_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/dataset/DatasetTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LatlngGeocodingSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["dataset01", "dataset02", "dataset03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LATLNG_GEOCODING_TEST_DATASET_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LATLNG_GEOCODING_TEST_DATASET_ENTID" => $idmap,
        "LATLNG_GEOCODING_TEST_LIVE" => "FALSE",
        "LATLNG_GEOCODING_TEST_EXPLAIN" => "FALSE",
        "LATLNG_GEOCODING_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LATLNG_GEOCODING_TEST_DATASET_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LATLNG_GEOCODING_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["LATLNG_GEOCODING_APIKEY"],
            ],
            $extra ?? [],
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
