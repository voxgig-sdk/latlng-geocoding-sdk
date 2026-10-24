

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LatlngGeocodingSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('DatasetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
  afterEach(liveDelay('LATLNG_GEOCODING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LatlngGeocodingSDK.test()
    const ent = testsdk.Dataset()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LatlngGeocodingSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Dataset().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dataset.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"features":{"a":true,"h":"Features","n":"features","r":true,"t":"`$ARRAY`","key$":"features","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":2}},"id":{"field":"id","name":"id"},"name":"dataset","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["features","type"],"co":{"id":"POST /v1/datasets","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/datasets","q":{},"r":{},"rb":{"alternatives":[{"binary":true,"kind":"raw","media":"application/octet-stream"}],"kind":"json","media":"application/geo+json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"datasets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/datasets/{datasetId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"datasetId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/datasets/{datasetId}","q":{"exist":["id"]},"r":{"param":{"datasetId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"datasets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/datasets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/datasets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"datasets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/datasets/{datasetId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"datasetId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/datasets/{datasetId}","q":{"exist":["id"]},"r":{"param":{"datasetId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"datasets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"dataset","name__orig":"dataset","Name":"Dataset","name_":"dataset","name-":"dataset","NAME":"DATASET","index$":1}, {"active":true,"entity":"dataset","key$":"BasicDatasetFlow","kind":"basic","name":"BasicDatasetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dataset_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"dataset_ref01","srcdatavar":"dataset_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dataset_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"dataset_ref01","suffix":"_rm0"},"m":{"id":"dataset01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'Dataset', {"POST /v1/datasets":{"protocol":"http","requestBody":{"required":true,"content":{"application/octet-stream":{"schema":{"type":"string","format":"binary"}},"application/geo+json":{"schema":{"type":"object","required":["type","features"],"properties":{"type":{"type":"string","enum":["FeatureCollection"],"key$":"type"},"features":{"type":"array","items":{"type":"object","required":["type","geometry","properties"],"properties":{"type":{"type":"string","enum":[],"key$":"type"},"geometry":{"type":"object","required":[],"properties":{},"key$":"geometry"},"properties":{"type":"object","additionalProperties":true,"key$":"properties"}},"x-ref":"#/components/schemas/GeoJsonFeature","index$":0},"key$":"features"}},"x-ref":"#/components/schemas/GeoJsonFeatureCollection","index$":1}}}},"parameters":[]},"GET /v1/datasets/{datasetId}":{"protocol":"http","parameters":[{"name":"datasetId","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v1/datasets":{"protocol":"http","parameters":[]},"DELETE /v1/datasets/{datasetId}":{"protocol":"http","parameters":[{"name":"datasetId","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const dataset_ref01_ent = client.Dataset()
    let dataset_ref01_data = setup.data.new.dataset['dataset_ref01']

    dataset_ref01_data = (await dataset_ref01_ent.create(dataset_ref01_data)).data()
    assert(null != dataset_ref01_data.id)


    // LOAD
    const dataset_ref01_match_dt0: any = {}
    dataset_ref01_match_dt0.id = dataset_ref01_data.id
    const dataset_ref01_data_dt0 = (await dataset_ref01_ent.load(dataset_ref01_match_dt0)).data()
    assert(dataset_ref01_data_dt0.id === dataset_ref01_data.id)


    // REMOVE
    const dataset_ref01_match_rm0: any = { id: dataset_ref01_data.id }
    await dataset_ref01_ent.remove(dataset_ref01_match_rm0)
  

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dataset/DatasetTestData.json')

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
    ['dataset01','dataset02','dataset03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LATLNG_GEOCODING_TEST_DATASET_ENTID': idmap,
    'LATLNG_GEOCODING_TEST_LIVE': 'FALSE',
    'LATLNG_GEOCODING_TEST_EXPLAIN': 'FALSE',
    'LATLNG_GEOCODING_APIKEY': '',
  })

  idmap = env['LATLNG_GEOCODING_TEST_DATASET_ENTID']

  const live = 'TRUE' === env.LATLNG_GEOCODING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LATLNG_GEOCODING_TEST_DATASET_ENTID']
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
  
