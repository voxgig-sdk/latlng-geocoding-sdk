"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MapEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LATLNG_GEOCODING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LatlngGeocodingSDK.test();
        const ent = testsdk.Map();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'map.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "features", "req": true, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "type", "req": true, "type": "`$STRING`", "index$": 1 }], "name": "map", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "latlng_xxxxx", "kind": "query", "name": "key", "orig": "key", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /v1/static", "json": "{\"operationId\":\"postStaticMap\",\"parameters\":[{\"example\":\"latlng_xxxxx\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"properties\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"required\":[\"type\",\"geometry\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"required\":[\"type\",\"features\"],\"type\":\"object\"}},\"application/json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"properties\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"required\":[\"type\",\"geometry\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"required\":[\"type\",\"features\"],\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Static map image.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request or invalid parameters.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded.\",\"headers\":{\"X-RateLimit-Limit\":{\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"schema\":{\"type\":\"integer\"}},\"X-Request-Id\":{\"schema\":{\"type\":\"string\"}}}}},\"security\":[{\"ApiKeyAuth\":[]},{\"ApiKeyQuery\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/v1/static", "segments": [{ "lit": "v1" }, { "lit": "static" }], "select": { "exist": ["key"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "40.748,-73.985", "kind": "query", "name": "center", "orig": "center", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 600, "kind": "query", "name": "height", "orig": "height", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "latlng_xxxxx", "kind": "query", "name": "key", "orig": "key", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "40.748,-73.985", "kind": "query", "name": "marker", "orig": "marker", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": 800, "kind": "query", "name": "width", "orig": "width", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "example": 12, "kind": "query", "name": "zoom", "orig": "zoom", "reqd": false, "type": "`$INTEGER`", "index$": 5 }] }, "contract": { "id": "GET /v1/static", "json": "{\"operationId\":\"getStaticMap\",\"parameters\":[{\"example\":\"latlng_xxxxx\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Map center as latitude,longitude.\",\"example\":\"40.748,-73.985\",\"in\":\"query\",\"name\":\"center\",\"schema\":{\"type\":\"string\"}},{\"example\":12,\"in\":\"query\",\"name\":\"zoom\",\"schema\":{\"maximum\":22,\"minimum\":0,\"type\":\"integer\"}},{\"example\":800,\"in\":\"query\",\"name\":\"width\",\"schema\":{\"maximum\":2048,\"minimum\":1,\"type\":\"integer\"}},{\"example\":600,\"in\":\"query\",\"name\":\"height\",\"schema\":{\"maximum\":2048,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Optional marker coordinates.\",\"example\":\"40.748,-73.985\",\"in\":\"query\",\"name\":\"markers\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Static map image.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request or invalid parameters.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded.\",\"headers\":{\"X-RateLimit-Limit\":{\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"schema\":{\"type\":\"integer\"}},\"X-Request-Id\":{\"schema\":{\"type\":\"string\"}}}}},\"security\":[{\"ApiKeyAuth\":[]},{\"ApiKeyQuery\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/static", "segments": [{ "lit": "v1" }, { "lit": "static" }], "select": { "exist": ["center", "height", "key", "marker", "width", "zoom"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "map", "name__orig": "map", "Name": "Map", "name_": "map", "name-": "map", "NAME": "MAP", "index$": 2 }, { "active": true, "entity": "map", "key$": "BasicMapFlow", "kind": "basic", "name": "BasicMapFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "map_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "map_ref01", "srcdatavar": "map_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-map_ref01" } }], "index$": 1 }] }, 'Map');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const map_ref01_ent = client.Map();
        let map_ref01_data = setup.data.new.map['map_ref01'];
        map_ref01_data = (await map_ref01_ent.create(map_ref01_data)).data();
        (0, node_assert_1.default)(null != map_ref01_data);
        // LOAD
        const map_ref01_match_dt0 = {};
        const map_ref01_data_dt0 = (await map_ref01_ent.load(map_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != map_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/map/MapTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LatlngGeocodingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['map01', 'map02', 'map03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LATLNG_GEOCODING_TEST_MAP_ENTID': idmap,
        'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
        'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
        'LATLNG_GEOCODING_APIKEY': '',
    });
    idmap = env['LATLNG_GEOCODING_TEST_MAP_ENTID'];
    const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LATLNG_GEOCODING_TEST_MAP_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LatlngGeocodingSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LATLNG_GEOCODING_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LATLNG_GEOCODING_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=MapEntity.test.js.map