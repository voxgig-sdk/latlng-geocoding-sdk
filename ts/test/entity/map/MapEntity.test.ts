

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"features","req":true,"type":"`$ARRAY`","index$":0},{"active":true,"name":"type","req":true,"type":"`$STRING`","index$":1}],"name":"map","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"query":[{"active":true,"example":"latlng_xxxxx","kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /v1/static","json":"{\"operationId\":\"postStaticMap\",\"parameters\":[{\"example\":\"latlng_xxxxx\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/geo+json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"properties\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"required\":[\"type\",\"geometry\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"required\":[\"type\",\"features\"],\"type\":\"object\"}},\"application/json\":{\"schema\":{\"properties\":{\"features\":{\"items\":{\"properties\":{\"geometry\":{\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"properties\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"required\":[\"type\",\"geometry\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"required\":[\"type\",\"features\"],\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Static map image.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request or invalid parameters.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded.\",\"headers\":{\"X-RateLimit-Limit\":{\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"schema\":{\"type\":\"integer\"}},\"X-Request-Id\":{\"schema\":{\"type\":\"string\"}}}}},\"security\":[{\"ApiKeyAuth\":[]},{\"ApiKeyQuery\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/v1/static","segments":[{"lit":"v1"},{"lit":"static"}],"select":{"exist":["key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"40.748,-73.985","kind":"query","name":"center","orig":"center","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":600,"kind":"query","name":"height","orig":"height","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":"latlng_xxxxx","kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"40.748,-73.985","kind":"query","name":"marker","orig":"marker","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":800,"kind":"query","name":"width","orig":"width","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"example":12,"kind":"query","name":"zoom","orig":"zoom","reqd":false,"type":"`$INTEGER`","index$":5}]},"contract":{"id":"GET /v1/static","json":"{\"operationId\":\"getStaticMap\",\"parameters\":[{\"example\":\"latlng_xxxxx\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Map center as latitude,longitude.\",\"example\":\"40.748,-73.985\",\"in\":\"query\",\"name\":\"center\",\"schema\":{\"type\":\"string\"}},{\"example\":12,\"in\":\"query\",\"name\":\"zoom\",\"schema\":{\"maximum\":22,\"minimum\":0,\"type\":\"integer\"}},{\"example\":800,\"in\":\"query\",\"name\":\"width\",\"schema\":{\"maximum\":2048,\"minimum\":1,\"type\":\"integer\"}},{\"example\":600,\"in\":\"query\",\"name\":\"height\",\"schema\":{\"maximum\":2048,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Optional marker coordinates.\",\"example\":\"40.748,-73.985\",\"in\":\"query\",\"name\":\"markers\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Static map image.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request or invalid parameters.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded.\",\"headers\":{\"X-RateLimit-Limit\":{\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining\":{\"schema\":{\"type\":\"integer\"}},\"X-Request-Id\":{\"schema\":{\"type\":\"string\"}}}}},\"security\":[{\"ApiKeyAuth\":[]},{\"ApiKeyQuery\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/static","segments":[{"lit":"v1"},{"lit":"static"}],"select":{"exist":["center","height","key","marker","width","zoom"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"map","name__orig":"map","Name":"Map","name_":"map","name-":"map","NAME":"MAP","index$":2}, {"active":true,"entity":"map","key$":"BasicMapFlow","kind":"basic","name":"BasicMapFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"map_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"map_ref01","srcdatavar":"map_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-map_ref01"}}],"index$":1}]}, 'Map')
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
  
