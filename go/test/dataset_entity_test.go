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

func TestDatasetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Dataset(nil)
		if ent == nil {
			t.Fatal("expected non-nil DatasetEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := datasetBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "dataset." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LATLNGGEOCODING_TEST_DATASET_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		datasetRef01Ent := client.Dataset(nil)
		datasetRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "dataset"}, setup.data), "dataset_ref01"))

		datasetRef01DataResult, err := datasetRef01Ent.Create(datasetRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		datasetRef01Data = core.ToMapAny(datasetRef01DataResult)
		if datasetRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		datasetRef01MatchDt0 := map[string]any{}
		datasetRef01DataDt0Loaded, err := datasetRef01Ent.Load(datasetRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if datasetRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		// REMOVE
		datasetRef01MatchRm0 := map[string]any{
			"id": datasetRef01Data["id"],
		}
		_, err = datasetRef01Ent.Remove(datasetRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func datasetBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "dataset", "DatasetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read dataset test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse dataset test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"dataset01", "dataset02", "dataset03"},
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
	entidEnvRaw := os.Getenv("LATLNGGEOCODING_TEST_DATASET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LATLNGGEOCODING_TEST_DATASET_ENTID": idmap,
		"LATLNGGEOCODING_TEST_LIVE":      "FALSE",
		"LATLNGGEOCODING_TEST_EXPLAIN":   "FALSE",
		"LATLNGGEOCODING_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LATLNGGEOCODING_TEST_DATASET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LATLNGGEOCODING_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LATLNGGEOCODING_APIKEY"],
			},
			extra,
		})
		client = sdk.NewLatlngGeocodingSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LATLNGGEOCODING_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LATLNGGEOCODING_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
