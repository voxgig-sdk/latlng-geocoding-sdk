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
(0, node_test_1.describe)('PlaceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LATLNG_GEOCODING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LatlngGeocodingSDK.test();
        const ent = testsdk.Place();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'place.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "brand", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "category", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "confidence", "req": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "name": "count", "req": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "country", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "distance_m", "req": false, "type": "`$NUMBER`", "index$": 5 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "lat", "req": false, "type": "`$NUMBER`", "index$": 7 }, { "active": true, "name": "locality", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "lon", "req": false, "type": "`$NUMBER`", "index$": 9 }, { "active": true, "name": "name", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "region", "req": false, "type": "`$STRING`", "index$": 11 }], "id": { "field": "id", "name": "id" }, "name": "place", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "api_key", "orig": "api_key", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "cafe", "kind": "query", "name": "category", "orig": "category", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "US", "kind": "query", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 40.748, "kind": "query", "name": "lat", "orig": "lat", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "example": 5, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "example": -73.985, "kind": "query", "name": "lon", "orig": "lon", "reqd": false, "type": "`$NUMBER`", "index$": 5 }, { "active": true, "example": "Starbucks", "kind": "query", "name": "q", "orig": "q", "reqd": true, "type": "`$STRING`", "index$": 6 }, { "active": true, "example": "cafe", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 7 }] }, "contract": { "id": "GET /v1/places/search", "json": "{\"operationId\":\"placesSearch\",\"parameters\":[{\"description\":\"API key alternative to the X-Api-Key header.\",\"in\":\"query\",\"name\":\"api_key\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"example\":\"Starbucks\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"example\":40.748,\"in\":\"query\",\"name\":\"lat\",\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"example\":-73.985,\"in\":\"query\",\"name\":\"lon\",\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"example\":\"cafe\",\"in\":\"query\",\"name\":\"type\",\"schema\":{\"type\":\"string\"}},{\"example\":\"cafe\",\"in\":\"query\",\"name\":\"category\",\"schema\":{\"type\":\"string\"}},{\"example\":\"US\",\"in\":\"query\",\"name\":\"country\",\"schema\":{\"type\":\"string\"}},{\"example\":5,\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"maximum\":50,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"center\":{\"properties\":{\"lat\":{\"type\":\"number\"},\"lon\":{\"type\":\"number\"}},\"type\":\"object\"},\"count\":{\"type\":\"integer\"},\"places\":{\"items\":{\"properties\":{\"brand\":{\"type\":\"string\"},\"category\":{\"type\":\"string\"},\"confidence\":{\"type\":\"number\"},\"country\":{\"type\":\"string\"},\"distance_m\":{\"type\":\"number\"},\"id\":{\"type\":\"string\"},\"lat\":{\"type\":\"number\"},\"locality\":{\"type\":\"string\"},\"lon\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"region\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"query\":{\"type\":\"string\"},\"radius_m\":{\"type\":\"integer\"},\"source\":{\"example\":\"latlng_places\",\"type\":\"string\"},\"type\":{\"example\":\"nearby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Search places response.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request or invalid parameters.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded.\",\"headers\":{\"X-RateLimit-Limit\":{\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"schema\":{\"type\":\"integer\"}},\"X-Request-Id\":{\"schema\":{\"type\":\"string\"}}}}},\"security\":[{\"ApiKeyAuth\":[]},{\"ApiKeyQuery\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/places/search", "segments": [{ "lit": "v1" }, { "lit": "places" }, { "lit": "search" }], "select": { "$action": "search", "exist": ["api_key", "category", "country", "lat", "limit", "lon", "q", "type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "api_key", "orig": "api_key", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "cafe", "kind": "query", "name": "category", "orig": "category", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 40.748, "kind": "query", "name": "lat", "orig": "lat", "reqd": true, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "example": -73.985, "kind": "query", "name": "lon", "orig": "lon", "reqd": true, "type": "`$NUMBER`", "index$": 4 }, { "active": true, "example": 500, "kind": "query", "name": "radius", "orig": "radius", "reqd": false, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "example": "cafe", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 6 }] }, "contract": { "id": "GET /v1/places/nearby", "json": "{\"operationId\":\"placesNearby\",\"parameters\":[{\"description\":\"API key alternative to the X-Api-Key header.\",\"in\":\"query\",\"name\":\"api_key\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"example\":40.748,\"in\":\"query\",\"name\":\"lat\",\"required\":true,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"example\":-73.985,\"in\":\"query\",\"name\":\"lon\",\"required\":true,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Search radius in meters.\",\"example\":500,\"in\":\"query\",\"name\":\"radius\",\"schema\":{\"default\":1000,\"maximum\":50000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Optional category filter. Alias of category.\",\"example\":\"cafe\",\"in\":\"query\",\"name\":\"type\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Optional category filter.\",\"example\":\"cafe\",\"in\":\"query\",\"name\":\"category\",\"schema\":{\"type\":\"string\"}},{\"example\":10,\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"maximum\":50,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"center\":{\"properties\":{\"lat\":{\"type\":\"number\"},\"lon\":{\"type\":\"number\"}},\"type\":\"object\"},\"count\":{\"type\":\"integer\"},\"places\":{\"items\":{\"properties\":{\"brand\":{\"type\":\"string\"},\"category\":{\"type\":\"string\"},\"confidence\":{\"type\":\"number\"},\"country\":{\"type\":\"string\"},\"distance_m\":{\"type\":\"number\"},\"id\":{\"type\":\"string\"},\"lat\":{\"type\":\"number\"},\"locality\":{\"type\":\"string\"},\"lon\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"region\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"query\":{\"type\":\"string\"},\"radius_m\":{\"type\":\"integer\"},\"source\":{\"example\":\"latlng_places\",\"type\":\"string\"},\"type\":{\"example\":\"nearby\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Nearby places response.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request or invalid parameters.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded.\",\"headers\":{\"X-RateLimit-Limit\":{\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"schema\":{\"type\":\"integer\"}},\"X-Request-Id\":{\"schema\":{\"type\":\"string\"}}}}},\"security\":[{\"ApiKeyAuth\":[]},{\"ApiKeyQuery\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/places/nearby", "segments": [{ "lit": "v1" }, { "lit": "places" }, { "lit": "nearby" }], "select": { "$action": "nearby", "exist": ["api_key", "category", "lat", "limit", "lon", "radius", "type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": {}, "contract": { "id": "GET /v1/places/categories", "json": "{\"operationId\":\"placesCategories\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"categories\":{\"items\":{\"properties\":{\"category\":{\"type\":\"string\"},\"count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"count\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Available place categories.\"}},\"security\":[],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/places/categories", "segments": [{ "lit": "v1" }, { "lit": "places" }, { "lit": "categories" }], "select": { "$action": "category" }, "transform": { "req": "`reqdata`", "res": "`body.categories`" }, "index$": 2 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "place", "name__orig": "place", "Name": "Place", "name_": "place", "name-": "place", "NAME": "PLACE", "index$": 3 }, { "active": true, "entity": "place", "key$": "BasicPlaceFlow", "kind": "basic", "name": "BasicPlaceFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "place_ref01" } }], "index$": 0 }] }, 'Place');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let place_ref01_data = Object.values(setup.data.existing.place)[0];
        // LIST
        const place_ref01_ent = client.Place();
        const place_ref01_match = {};
        const place_ref01_list = (await place_ref01_ent.list(place_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/place/PlaceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LatlngGeocodingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['place01', 'place02', 'place03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LATLNG_GEOCODING_TEST_PLACE_ENTID': idmap,
        'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
        'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
        'LATLNG_GEOCODING_APIKEY': '',
    });
    idmap = env['LATLNG_GEOCODING_TEST_PLACE_ENTID'];
    const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LATLNG_GEOCODING_TEST_PLACE_ENTID'];
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
//# sourceMappingURL=PlaceEntity.test.js.map