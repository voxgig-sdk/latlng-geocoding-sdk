

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LatlngGeocodingSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MapEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
  afterEach(liveDelay('LATLNG_GEOCODING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LatlngGeocodingSDK.test()
    const ent = testsdk.Map()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'map.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"features":{"a":true,"h":"Features","n":"features","r":true,"t":"`$ARRAY`","key$":"features","index$":0},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":1}},"name":"map","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/static","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"latlng_xxxxx","k":"query","n":"key","or":"key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/static","q":{"exist":["key"]},"r":{},"s":[{"lit":"v1"},{"lit":"static"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/static","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"40.748,-73.985","k":"query","n":"center","or":"center","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":600,"k":"query","n":"height","or":"height","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"latlng_xxxxx","k":"query","n":"key","or":"key","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"40.748,-73.985","k":"query","n":"marker","or":"marker","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":800,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":12,"k":"query","n":"zoom","or":"zoom","r":false,"t":"`$INTEGER`","index$":5}]},"k":"http","m":"GET","o":"/v1/static","q":{"exist":["center","height","key","marker","width","zoom"]},"r":{},"s":[{"lit":"v1"},{"lit":"static"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"map","name__orig":"map","Name":"Map","name_":"map","name-":"map","NAME":"MAP","index$":2}, {"active":true,"entity":"map","key$":"BasicMapFlow","kind":"basic","name":"BasicMapFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"map_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"map_ref01","srcdatavar":"map_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-map_ref01"}}],"index$":1}]}, 'Map', {"POST /v1/static":{"protocol":"http","operationId":"postStaticMap","requestBody":{"required":false,"content":{"application/geo+json":{"schema":{"type":"object","required":["type","features"],"properties":{"type":{"enum":["FeatureCollection"],"key$":"type","type":"string"},"features":{"items":{"properties":{"geometry":{"properties":{"coordinates":{"items":{"type":"number"},"type":"array"},"type":{"example":"Point","type":"string"}},"required":["type","coordinates"],"type":"object","key$":"geometry"},"properties":{"additionalProperties":true,"type":"object","key$":"properties"},"type":{"enum":["Feature"],"type":"string","key$":"type"}},"required":["type","geometry","properties"],"type":"object","x-ref":"#/components/schemas/GeoJsonFeature","index$":0},"key$":"features","type":"array"}},"x-ref":"#/components/schemas/GeoJsonFeatureCollection"}},"application/json":{"schema":{"type":"object","required":["type","features"],"properties":{"type":{"enum":["FeatureCollection"],"key$":"type","type":"string"},"features":{"items":{"properties":{"geometry":{"properties":{"coordinates":{"items":{"type":"number"},"type":"array"},"type":{"example":"Point","type":"string"}},"required":["type","coordinates"],"type":"object","key$":"geometry"},"properties":{"additionalProperties":true,"type":"object","key$":"properties"},"type":{"enum":["Feature"],"type":"string","key$":"type"}},"required":["type","geometry","properties"],"type":"object","x-ref":"#/components/schemas/GeoJsonFeature","index$":0},"key$":"features","type":"array"}},"x-ref":"#/components/schemas/GeoJsonFeatureCollection","index$":1}}}},"responses":{"200":{"description":"Static map image.","content":{"image/png":{"schema":{"type":"string","format":"binary"}}}},"400":{"description":"Bad request or invalid parameters.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded.","headers":{"X-RateLimit-Limit":{"schema":{"type":"integer"}},"X-RateLimit-Remaining":{"schema":{"type":"integer"}},"X-Request-Id":{"schema":{"type":"string"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"key","in":"query","schema":{"type":"string"},"example":"latlng_xxxxx","index$":0}],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"GET /v1/static":{"protocol":"http","operationId":"getStaticMap","responses":{"200":{"description":"Static map image.","content":{"image/png":{"schema":{"type":"string","format":"binary"}}}},"400":{"description":"Bad request or invalid parameters.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded.","headers":{"X-RateLimit-Limit":{"schema":{"type":"integer"}},"X-RateLimit-Remaining":{"schema":{"type":"integer"}},"X-Request-Id":{"schema":{"type":"string"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"key","in":"query","schema":{"type":"string"},"example":"latlng_xxxxx","index$":0},{"name":"center","in":"query","schema":{"type":"string"},"example":"40.748,-73.985","description":"Map center as latitude,longitude.","index$":1},{"name":"zoom","in":"query","schema":{"type":"integer","minimum":0,"maximum":22},"example":12,"index$":2},{"name":"width","in":"query","schema":{"type":"integer","minimum":1,"maximum":2048},"example":800,"index$":3},{"name":"height","in":"query","schema":{"type":"integer","minimum":1,"maximum":2048},"example":600,"index$":4},{"name":"markers","in":"query","schema":{"type":"string"},"example":"40.748,-73.985","description":"Optional marker coordinates.","index$":5}],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const map_ref01_ent = client.Map()
    let map_ref01_data = setup.data.new.map['map_ref01']

    map_ref01_data = (await map_ref01_ent.create(map_ref01_data)).data()
    assert(null != map_ref01_data)


    // LOAD
    const map_ref01_match_dt0: any = {}
    const map_ref01_data_dt0 = (await map_ref01_ent.load(map_ref01_match_dt0)).data()
    assert(null != map_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/map/MapTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LatlngGeocodingSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['map01','map02','map03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LATLNG_GEOCODING_TEST_MAP_ENTID': idmap,
    'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
    'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
    'LATLNG_GEOCODING_APIKEY': '',
  })

  idmap = env['LATLNG_GEOCODING_TEST_MAP_ENTID']

  const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LATLNG_GEOCODING_TEST_MAP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LatlngGeocodingSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
