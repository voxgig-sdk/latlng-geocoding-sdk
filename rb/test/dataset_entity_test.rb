# Dataset entity test

require "minitest/autorun"
require "json"
require_relative "../LatlngGeocoding_sdk"
require_relative "runner"

class DatasetEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = LatlngGeocodingSDK.test(nil, nil)
    ent = testsdk.Dataset(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = LatlngGeocodingConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = LatlngGeocodingSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Dataset(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = dataset_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "dataset." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    dataset_ref01_ent = client.Dataset(nil)
    dataset_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.dataset"), "dataset_ref01"))

    dataset_ref01_data_result = dataset_ref01_ent.create(dataset_ref01_data, nil)
    dataset_ref01_data = Helpers.to_map(dataset_ref01_data_result.respond_to?(:data_get) ? dataset_ref01_data_result.data_get : dataset_ref01_data_result)
    assert !dataset_ref01_data.nil?
    assert !dataset_ref01_data["id"].nil?

    # LOAD
    dataset_ref01_match_dt0 = {
      "id" => dataset_ref01_data["id"],
    }
    dataset_ref01_data_dt0_loaded = dataset_ref01_ent.load(dataset_ref01_match_dt0, nil)
    dataset_ref01_data_dt0_load_result = Helpers.to_map(dataset_ref01_data_dt0_loaded.respond_to?(:data_get) ? dataset_ref01_data_dt0_loaded.data_get : dataset_ref01_data_dt0_loaded)
    assert !dataset_ref01_data_dt0_load_result.nil?
    assert_equal dataset_ref01_data_dt0_load_result["id"], dataset_ref01_data["id"]

    # REMOVE
    dataset_ref01_match_rm0 = {
      "id" => dataset_ref01_data["id"],
    }
    dataset_ref01_ent.remove(dataset_ref01_match_rm0, nil)

  end
end

def dataset_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "dataset", "DatasetTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LatlngGeocodingSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["dataset01", "dataset02", "dataset03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["LATLNG_GEOCODING_TEST_DATASET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LATLNG_GEOCODING_TEST_DATASET_ENTID" => idmap,
    "LATLNG_GEOCODING_TEST_LIVE" => "FALSE",
    "LATLNG_GEOCODING_TEST_EXPLAIN" => "FALSE",
    "LATLNG_GEOCODING_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LATLNG_GEOCODING_TEST_DATASET_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LATLNG_GEOCODING_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["LATLNG_GEOCODING_APIKEY"],
      },
      extra || {},
    ])
    client = LatlngGeocodingSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LATLNG_GEOCODING_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LATLNG_GEOCODING_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
