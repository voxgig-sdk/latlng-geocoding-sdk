<?php
declare(strict_types=1);

// Reverse entity test

require_once __DIR__ . '/../latlnggeocoding_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ReverseEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LatlngGeocodingSDK::test(null, null);
        $ent = $testsdk->Reverse(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "reverse" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = LatlngGeocodingSDK::test($seed, null);
        $seen = iterator_to_array($base->Reverse(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = LatlngGeocodingConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = LatlngGeocodingSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Reverse(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = reverse_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "reverse." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LATLNG_GEOCODING_TEST_REVERSE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $reverse_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.reverse")));
        $reverse_ref01_data = null;
        if (count($reverse_ref01_data_raw) > 0) {
            $reverse_ref01_data = Helpers::to_map($reverse_ref01_data_raw[0][1]);
        }

        // LIST
        $reverse_ref01_ent = $client->Reverse(null);
        $reverse_ref01_match = [];

        $reverse_ref01_list_result = $reverse_ref01_ent->list($reverse_ref01_match, null);
        $this->assertIsArray($reverse_ref01_list_result);

    }
}

function reverse_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/reverse/ReverseTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LatlngGeocodingSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["reverse01", "reverse02", "reverse03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LATLNG_GEOCODING_TEST_REVERSE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LATLNG_GEOCODING_TEST_REVERSE_ENTID" => $idmap,
        "LATLNG_GEOCODING_TEST_LIVE" => "FALSE",
        "LATLNG_GEOCODING_TEST_EXPLAIN" => "FALSE",
        "LATLNG_GEOCODING_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LATLNG_GEOCODING_TEST_REVERSE_ENTID"]);
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
