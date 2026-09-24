

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


describe('PlaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
  afterEach(liveDelay('LATLNG_GEOCODING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LatlngGeocodingSDK.test()
    const ent = testsdk.Place()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'place.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"brand":{"a":true,"h":"Brand","n":"brand","r":false,"t":"`$STRING`","key$":"brand","index$":0},"category":{"a":true,"h":"Category","n":"category","r":false,"t":"`$STRING`","key$":"category","index$":1},"confidence":{"a":true,"h":"Confidence","n":"confidence","r":false,"t":"`$NUMBER`","key$":"confidence","index$":2},"country":{"a":true,"h":"Country","n":"country","r":false,"t":"`$STRING`","key$":"country","index$":3},"distance_m":{"a":true,"h":"Distance M","n":"distance_m","r":false,"t":"`$NUMBER`","key$":"distance_m","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"lat":{"a":true,"h":"Lat","n":"lat","r":false,"t":"`$NUMBER`","key$":"lat","index$":6},"locality":{"a":true,"h":"Locality","n":"locality","r":false,"t":"`$STRING`","key$":"locality","index$":7},"lon":{"a":true,"h":"Lon","n":"lon","r":false,"t":"`$NUMBER`","key$":"lon","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":9},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$STRING`","key$":"region","index$":10}},"id":{"field":"id","name":"id"},"name":"place","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/places/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"cafe","k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"US","k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":40.748,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"ex":5,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":-73.985,"k":"query","n":"lon","or":"lon","r":false,"t":"`$NUMBER`","index$":5},{"a":true,"ex":"Starbucks","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":6},{"a":true,"ex":"cafe","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/v1/places/search","q":{"$action":"search","exist":["api_key","category","country","lat","limit","lon","q","type"]},"r":{},"s":[{"lit":"v1"},{"lit":"places"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/places/nearby","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"api_key","or":"api_key","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"cafe","k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":40.748,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":2},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":-73.985,"k":"query","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":4},{"a":true,"ex":500,"k":"query","n":"radius","or":"radius","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"ex":"cafe","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/v1/places/nearby","q":{"$action":"nearby","exist":["api_key","category","lat","limit","lon","radius","type"]},"r":{},"s":[{"lit":"v1"},{"lit":"places"},{"lit":"nearby"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /v1/places/categories","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/places/categories","q":{"$action":"category"},"r":{},"s":[{"lit":"v1"},{"lit":"places"},{"lit":"categories"}],"t":{"req":"`reqdata`","res":"`body.categories`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"place","name__orig":"place","Name":"Place","name_":"place","name-":"place","NAME":"PLACE","index$":3}, {"active":true,"entity":"place","key$":"BasicPlaceFlow","kind":"basic","name":"BasicPlaceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"place_ref01"}}],"index$":0}]}, 'Place', {"GET /v1/places/search":{"protocol":"http","operationId":"placesSearch","responses":{"200":{"description":"Search places response.","content":{"application/json":{"schema":{"type":"object","properties":{"type":{"example":"nearby","key$":"type","type":"string"},"source":{"example":"latlng_places","key$":"source","type":"string"},"query":{"key$":"query","type":"string"},"center":{"key$":"center","properties":{"lat":{"type":"number"},"lon":{"type":"number"}},"type":"object"},"radius_m":{"key$":"radius_m","type":"integer"},"count":{"key$":"count","type":"integer"},"places":{"items":{"properties":{"brand":{"type":"string","key$":"brand"},"category":{"type":"string","key$":"category"},"confidence":{"type":"number","key$":"confidence"},"country":{"type":"string","key$":"country"},"distance_m":{"type":"number","key$":"distance_m"},"id":{"type":"string","key$":"id"},"lat":{"type":"number","key$":"lat"},"locality":{"type":"string","key$":"locality"},"lon":{"type":"number","key$":"lon"},"name":{"type":"string","key$":"name"},"region":{"type":"string","key$":"region"}},"type":"object","x-ref":"#/components/schemas/Place","index$":0},"key$":"places","type":"array"}},"x-ref":"#/components/schemas/PlacesResponse"}}}},"400":{"description":"Bad request or invalid parameters.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded.","headers":{"X-RateLimit-Limit":{"schema":{"type":"integer"}},"X-RateLimit-Remaining":{"schema":{"type":"integer"}},"X-Request-Id":{"schema":{"type":"string"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"api_key","in":"query","required":false,"schema":{"type":"string"},"description":"API key alternative to the X-Api-Key header.","x-ref":"#/components/parameters/ApiKeyQuery","index$":0},{"name":"q","in":"query","required":true,"schema":{"type":"string"},"example":"Starbucks","index$":1},{"name":"lat","in":"query","schema":{"type":"number","format":"double"},"example":40.748,"index$":2},{"name":"lon","in":"query","schema":{"type":"number","format":"double"},"example":-73.985,"index$":3},{"name":"type","in":"query","schema":{"type":"string"},"example":"cafe","index$":4},{"name":"category","in":"query","schema":{"type":"string"},"example":"cafe","index$":5},{"name":"country","in":"query","schema":{"type":"string"},"example":"US","index$":6},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":50,"default":20},"example":5,"index$":7}],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"GET /v1/places/nearby":{"protocol":"http","operationId":"placesNearby","responses":{"200":{"description":"Nearby places response.","content":{"application/json":{"schema":{"type":"object","properties":{"type":{"example":"nearby","key$":"type","type":"string"},"source":{"example":"latlng_places","key$":"source","type":"string"},"query":{"key$":"query","type":"string"},"center":{"key$":"center","properties":{"lat":{"type":"number"},"lon":{"type":"number"}},"type":"object"},"radius_m":{"key$":"radius_m","type":"integer"},"count":{"key$":"count","type":"integer"},"places":{"items":{"properties":{"brand":{"type":"string","key$":"brand"},"category":{"type":"string","key$":"category"},"confidence":{"type":"number","key$":"confidence"},"country":{"type":"string","key$":"country"},"distance_m":{"type":"number","key$":"distance_m"},"id":{"type":"string","key$":"id"},"lat":{"type":"number","key$":"lat"},"locality":{"type":"string","key$":"locality"},"lon":{"type":"number","key$":"lon"},"name":{"type":"string","key$":"name"},"region":{"type":"string","key$":"region"}},"type":"object","x-ref":"#/components/schemas/Place","index$":0},"key$":"places","type":"array"}},"x-ref":"#/components/schemas/PlacesResponse"}}}},"400":{"description":"Bad request or invalid parameters.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded.","headers":{"X-RateLimit-Limit":{"schema":{"type":"integer"}},"X-RateLimit-Remaining":{"schema":{"type":"integer"}},"X-Request-Id":{"schema":{"type":"string"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"api_key","in":"query","required":false,"schema":{"type":"string"},"description":"API key alternative to the X-Api-Key header.","x-ref":"#/components/parameters/ApiKeyQuery","index$":0},{"name":"lat","in":"query","required":true,"schema":{"type":"number","format":"double"},"example":40.748,"index$":1},{"name":"lon","in":"query","required":true,"schema":{"type":"number","format":"double"},"example":-73.985,"index$":2},{"name":"radius","in":"query","schema":{"type":"integer","minimum":1,"maximum":50000,"default":1000},"example":500,"description":"Search radius in meters.","index$":3},{"name":"type","in":"query","schema":{"type":"string"},"example":"cafe","description":"Optional category filter. Alias of category.","index$":4},{"name":"category","in":"query","schema":{"type":"string"},"example":"cafe","description":"Optional category filter.","index$":5},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":50,"default":20},"example":10,"index$":6}],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"GET /v1/places/categories":{"protocol":"http","operationId":"placesCategories","responses":{"200":{"description":"Available place categories.","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"key$":"count","type":"integer"},"categories":{"items":{"properties":{"category":{"type":"string"},"count":{"type":"integer"}},"type":"object"},"key$":"categories","type":"array"}}}}}}},"parameters":[],"security":[],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let place_ref01_data = Object.values(setup.data.existing.place)[0] as any

    // LIST
    const place_ref01_ent = client.Place()
    const place_ref01_match: any = {}

    const place_ref01_list = (await place_ref01_ent.list(place_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/place/PlaceTestData.json')

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
    ['place01','place02','place03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LATLNG_GEOCODING_TEST_PLACE_ENTID': idmap,
    'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
    'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
    'LATLNG_GEOCODING_APIKEY': '',
  })

  idmap = env['LATLNG_GEOCODING_TEST_PLACE_ENTID']

  const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LATLNG_GEOCODING_TEST_PLACE_ENTID']
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
  
