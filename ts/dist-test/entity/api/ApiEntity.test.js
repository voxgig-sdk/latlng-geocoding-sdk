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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LATLNG_GEOCODING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LatlngGeocodingSDK.test();
        const ent = testsdk.Api();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "geometry": { "a": true, "h": "Geometry", "n": "geometry", "r": true, "t": "`$OBJECT`", "key$": "geometry", "index$": 0 }, "properties": { "a": true, "h": "Properties", "n": "properties", "r": true, "t": "`$OBJECT`", "key$": "properties", "index$": 1 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 2 } }, "name": "api", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "api_key", "or": "api_key", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 52.52, "k": "query", "n": "lat", "or": "lat", "r": false, "t": "`$NUMBER`", "index$": 2 }, { "a": true, "ex": 5, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 13.405, "k": "query", "n": "lon", "or": "lon", "r": false, "t": "`$NUMBER`", "index$": 4 }, { "a": true, "ex": "Berlin", "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/api", "q": { "exist": ["api_key", "lang", "lat", "limit", "lon", "q"] }, "r": {}, "s": [{ "lit": "api" }], "t": { "req": "`reqdata`", "res": "`body.features`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api", "name__orig": "api", "Name": "Api", "name_": "api", "name-": "api", "NAME": "API", "index$": 0 }, { "active": true, "entity": "api", "key$": "BasicApiFlow", "kind": "basic", "name": "BasicApiFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_ref01" } }], "index$": 0 }] }, 'Api', { "GET /api": { "protocol": "http", "operationId": "forwardGeocode", "responses": { "200": { "description": "GeoJSON feature collection.", "content": { "application/json": { "schema": { "type": "object", "required": ["type", "features"], "properties": { "type": { "enum": ["FeatureCollection"], "key$": "type", "type": "string" }, "features": { "items": { "properties": { "geometry": { "properties": { "coordinates": { "items": { "type": "number" }, "type": "array" }, "type": { "example": "Point", "type": "string" } }, "required": ["type", "coordinates"], "type": "object", "key$": "geometry" }, "properties": { "additionalProperties": true, "type": "object", "key$": "properties" }, "type": { "enum": ["Feature"], "type": "string", "key$": "type" } }, "required": ["type", "geometry", "properties"], "type": "object", "x-ref": "#/components/schemas/GeoJsonFeature", "index$": 0 }, "key$": "features", "type": "array" } }, "x-ref": "#/components/schemas/GeoJsonFeatureCollection" }, "example": { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [13.3888599, 52.5170365] }, "properties": { "name": "Berlin", "country": "Germany", "state": "Berlin", "osm_key": "place", "osm_value": "city" } }] } } } }, "400": { "description": "Bad request or invalid parameters.", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequest" }, "429": { "description": "Rate limit exceeded.", "headers": { "X-RateLimit-Limit": { "schema": { "type": "integer" } }, "X-RateLimit-Remaining": { "schema": { "type": "integer" } }, "X-Request-Id": { "schema": { "type": "string" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/RateLimited" }, "503": { "description": "Upstream geocoding service unavailable.", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/Unavailable" } }, "parameters": [{ "name": "api_key", "in": "query", "required": false, "schema": { "type": "string" }, "description": "API key alternative to the X-Api-Key header.", "x-ref": "#/components/parameters/ApiKeyQuery", "index$": 0 }, { "name": "q", "in": "query", "required": true, "schema": { "type": "string" }, "example": "Berlin", "description": "Address or place name to geocode.", "index$": 1 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 50 }, "example": 5, "index$": 2 }, { "name": "lang", "in": "query", "schema": { "type": "string" }, "example": "en", "index$": 3 }, { "name": "lat", "in": "query", "schema": { "type": "number", "format": "double" }, "example": 52.52, "description": "Bias results near this latitude.", "index$": 4 }, { "name": "lon", "in": "query", "schema": { "type": "number", "format": "double" }, "example": 13.405, "description": "Bias results near this longitude.", "index$": 5 }], "security": [{ "ApiKeyAuth": [] }, { "ApiKeyQuery": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-Api-Key" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_ref01_data = Object.values(setup.data.existing.api)[0];
        // LIST
        const api_ref01_ent = client.Api();
        const api_ref01_match = {};
        const api_ref01_list = (await api_ref01_ent.list(api_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api/ApiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LatlngGeocodingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api01', 'api02', 'api03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LATLNG_GEOCODING_TEST_API_ENTID': idmap,
        'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
        'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
        'LATLNG_GEOCODING_APIKEY': '',
    });
    idmap = env['LATLNG_GEOCODING_TEST_API_ENTID'];
    const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LATLNG_GEOCODING_TEST_API_ENTID'];
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
//# sourceMappingURL=ApiEntity.test.js.map