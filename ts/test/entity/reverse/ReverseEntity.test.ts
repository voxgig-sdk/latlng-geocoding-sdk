

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


describe('ReverseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
  afterEach(liveDelay('LATLNG_GEOCODING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LatlngGeocodingSDK.test()
    const ent = testsdk.Reverse()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reverse.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"geometry":{"a":true,"h":"Geometry","n":"geometry","r":true,"t":"`$OBJECT`","key$":"geometry","index$":0},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"t":"`$OBJECT`","key$":"properties","index$":1},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":2}},"name":"reverse","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /reverse","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":52.517,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":2},{"a":true,"ex":5,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":13.389,"k":"query","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":4}]},"k":"http","m":"GET","o":"/reverse","q":{"exist":["api_key","lang","lat","limit","lon"]},"r":{},"s":[{"lit":"reverse"}],"t":{"req":"`reqdata`","res":"`body.features`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"reverse","name__orig":"reverse","Name":"Reverse","name_":"reverse","name-":"reverse","NAME":"REVERSE","index$":4}, {"active":true,"entity":"reverse","key$":"BasicReverseFlow","kind":"basic","name":"BasicReverseFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"reverse_ref01"}}],"index$":0}]}, 'Reverse', {"GET /reverse":{"protocol":"http","operationId":"reverseGeocode","responses":{"200":{"description":"GeoJSON feature collection.","content":{"application/json":{"schema":{"type":"object","required":["type","features"],"properties":{"type":{"enum":["FeatureCollection"],"key$":"type","type":"string"},"features":{"items":{"properties":{"geometry":{"properties":{"coordinates":{"items":{"type":"number"},"type":"array"},"type":{"example":"Point","type":"string"}},"required":["type","coordinates"],"type":"object","key$":"geometry"},"properties":{"additionalProperties":true,"type":"object","key$":"properties"},"type":{"enum":["Feature"],"type":"string","key$":"type"}},"required":["type","geometry","properties"],"type":"object","x-ref":"#/components/schemas/GeoJsonFeature","index$":0},"key$":"features","type":"array"}},"x-ref":"#/components/schemas/GeoJsonFeatureCollection"}}}},"400":{"description":"Bad request or invalid parameters.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded.","headers":{"X-RateLimit-Limit":{"schema":{"type":"integer"}},"X-RateLimit-Remaining":{"schema":{"type":"integer"}},"X-Request-Id":{"schema":{"type":"string"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimited"},"503":{"description":"Upstream geocoding service unavailable.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/Unavailable"}},"parameters":[{"name":"api_key","in":"query","required":false,"schema":{"type":"string"},"description":"API key alternative to the X-Api-Key header.","x-ref":"#/components/parameters/ApiKeyQuery","index$":0},{"name":"lat","in":"query","required":true,"schema":{"type":"number","format":"double"},"example":52.517,"index$":1},{"name":"lon","in":"query","required":true,"schema":{"type":"number","format":"double"},"example":13.389,"index$":2},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":50},"example":5,"index$":3},{"name":"lang","in":"query","schema":{"type":"string"},"example":"en","index$":4}],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let reverse_ref01_data = Object.values(setup.data.existing.reverse)[0] as any

    // LIST
    const reverse_ref01_ent = client.Reverse()
    const reverse_ref01_match: any = {}

    const reverse_ref01_list = (await reverse_ref01_ent.list(reverse_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/reverse/ReverseTestData.json')

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
    ['reverse01','reverse02','reverse03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LATLNG_GEOCODING_TEST_REVERSE_ENTID': idmap,
    'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
    'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
    'LATLNG_GEOCODING_APIKEY': '',
  })

  idmap = env['LATLNG_GEOCODING_TEST_REVERSE_ENTID']

  const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LATLNG_GEOCODING_TEST_REVERSE_ENTID']
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
  
