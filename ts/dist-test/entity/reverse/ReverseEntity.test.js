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
(0, node_test_1.describe)('ReverseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LATLNG_GEOCODING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LatlngGeocodingSDK.test();
        const ent = testsdk.Reverse();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('reverse hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.LatlngGeocodingSDK.test(offline).Reverse().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.LatlngGeocodingSDK.test(offline).Reverse()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.LatlngGeocodingSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Reverse().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.LatlngGeocodingSDK.test().Reverse().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.LatlngGeocodingSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Reverse().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Reverse().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.LatlngGeocodingSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Reverse().list({ "api_key": 1, "lat": 1, "lon": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reverse.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "geometry": { "a": true, "h": "Geometry", "n": "geometry", "r": true, "t": "`$OBJECT`", "key$": "geometry", "index$": 0 }, "properties": { "a": true, "h": "Properties", "n": "properties", "r": true, "t": "`$OBJECT`", "key$": "properties", "index$": 1 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 2 } }, "name": "reverse", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /reverse", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "api_key", "or": "api_key", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 52.517, "k": "query", "n": "lat", "or": "lat", "r": true, "t": "`$NUMBER`", "index$": 2 }, { "a": true, "ex": 5, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 13.389, "k": "query", "n": "lon", "or": "lon", "r": true, "t": "`$NUMBER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/reverse", "q": { "exist": ["lat", "lon"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "reverse" }], "t": { "req": "`reqdata`", "res": "`body.features`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "reverse", "name__orig": "reverse", "Name": "Reverse", "name_": "reverse", "name-": "reverse", "NAME": "REVERSE", "index$": 4 }, { "active": true, "entity": "reverse", "key$": "BasicReverseFlow", "kind": "basic", "name": "BasicReverseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "reverse_ref01" } }], "index$": 0 }] }, 'Reverse', { "GET /reverse": { "protocol": "http", "parameters": [{ "name": "api_key", "in": "query", "required": false, "schema": { "type": "string" }, "description": "API key alternative to the X-Api-Key header.", "x-ref": "#/components/parameters/ApiKeyQuery", "index$": 0 }, { "name": "lat", "in": "query", "required": true, "schema": { "type": "number", "format": "double" }, "example": 52.517, "index$": 1 }, { "name": "lon", "in": "query", "required": true, "schema": { "type": "number", "format": "double" }, "example": 13.389, "index$": 2 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 50 }, "example": 5, "index$": 3 }, { "name": "lang", "in": "query", "schema": { "type": "string" }, "example": "en", "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let reverse_ref01_data = Object.values(setup.data.existing.reverse)[0];
        // LIST
        const reverse_ref01_ent = client.Reverse();
        const reverse_ref01_match = {};
        const reverse_ref01_list = (await reverse_ref01_ent.list(reverse_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reverse/ReverseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LatlngGeocodingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reverse01', 'reverse02', 'reverse03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LATLNG_GEOCODING_TEST_REVERSE_ENTID': idmap,
        'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
        'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
        'LATLNG_GEOCODING_APIKEY': '',
    });
    idmap = env['LATLNG_GEOCODING_TEST_REVERSE_ENTID'];
    const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LATLNG_GEOCODING_TEST_REVERSE_ENTID'];
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
//# sourceMappingURL=ReverseEntity.test.js.map