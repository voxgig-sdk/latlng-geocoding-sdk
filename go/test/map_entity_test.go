package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/latlng-geocoding-sdk/go"
	"github.com/voxgig-sdk/latlng-geocoding-sdk/go/core"

	vs "github.com/voxgig-sdk/latlng-geocoding-sdk/go/utility/struct"
)

func TestMapEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Map(nil)
		if ent == nil {
			t.Fatal("expected non-nil MapEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := mapBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "map." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LATLNG_GEOCODING_TEST_MAP_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		mapRef01Ent := client.Map(nil)
		mapRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "map"}), "map_ref01"))

		mapRef01DataResult, err := mapRef01Ent.Create(mapRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		mapRef01Data = core.ToMapAny(entityData(mapRef01DataResult))
		if mapRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		mapRef01MatchDt0 := map[string]any{}
		mapRef01DataDt0Loaded, err := mapRef01Ent.Load(mapRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if mapRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func mapBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "map", "MapTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read map test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse map test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"map01", "map02", "map03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LATLNG_GEOCODING_TEST_MAP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LATLNG_GEOCODING_TEST_MAP_ENTID": idmap,
		"LATLNG_GEOCODING_TEST_LIVE":      "FALSE",
		"LATLNG_GEOCODING_TEST_EXPLAIN":   "FALSE",
		"LATLNG_GEOCODING_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LATLNG_GEOCODING_TEST_MAP_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LATLNG_GEOCODING_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["LATLNG_GEOCODING_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewLatlngGeocodingSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LATLNG_GEOCODING_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LATLNG_GEOCODING_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
