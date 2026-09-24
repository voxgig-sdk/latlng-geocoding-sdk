

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


describe('DatasetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LATLNG_GEOCODING_TEST_LIVE=TRUE.
  afterEach(liveDelay('LATLNG_GEOCODING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LatlngGeocodingSDK.test()
    const ent = testsdk.Dataset()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LATLNG_GEOCODING_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dataset.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"dataset","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/datasets","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/datasets","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"datasets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/datasets/{datasetId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"dataset_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/datasets/{datasetId}","q":{"exist":["id"]},"r":{"param":{"datasetId":"id"}},"s":[{"lit":"v1"},{"lit":"datasets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/datasets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/datasets","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"datasets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/datasets/{datasetId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"dataset_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/datasets/{datasetId}","q":{"exist":["id"]},"r":{"param":{"datasetId":"id"}},"s":[{"lit":"v1"},{"lit":"datasets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"dataset","name__orig":"dataset","Name":"Dataset","name_":"dataset","name-":"dataset","NAME":"DATASET","index$":1}, {"active":true,"entity":"dataset","key$":"BasicDatasetFlow","kind":"basic","name":"BasicDatasetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dataset_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"dataset_ref01","srcdatavar":"dataset_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dataset_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"dataset_ref01","suffix":"_rm0"},"m":{"id":"dataset01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'Dataset', {"POST /v1/datasets":{"protocol":"http","operationId":"uploadDataset","requestBody":{"required":true,"content":{"application/octet-stream":{"schema":{"type":"string","format":"binary"}},"application/geo+json":{"schema":{"type":"object","required":["type","features"],"properties":{"type":{"enum":["FeatureCollection"],"key$":"type","type":"string"},"features":{"items":{"properties":{"geometry":{"properties":{"coordinates":{"items":{"type":"number"},"type":"array"},"type":{"example":"Point","type":"string"}},"required":["type","coordinates"],"type":"object","key$":"geometry"},"properties":{"additionalProperties":true,"type":"object","key$":"properties"},"type":{"enum":["Feature"],"type":"string","key$":"type"}},"required":["type","geometry","properties"],"type":"object","x-ref":"#/components/schemas/GeoJsonFeature","index$":0},"key$":"features","type":"array"}},"x-ref":"#/components/schemas/GeoJsonFeatureCollection"}}}},"responses":{"200":{"description":"Dataset upload accepted.","content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"index$":0}}}},"401":{"description":"Missing or invalid API key.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/Unauthorized"}},"parameters":[],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"GET /v1/datasets/{datasetId}":{"protocol":"http","operationId":"getDataset","responses":{"200":{"description":"Dataset details.","content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"401":{"description":"Missing or invalid API key.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/Unauthorized"},"404":{"description":"Resource not found.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"datasetId","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"GET /v1/datasets":{"protocol":"http","operationId":"listDatasets","responses":{"200":{"description":"Dataset list.","content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"401":{"description":"Missing or invalid API key.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/Unauthorized"}},"parameters":[],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"DELETE /v1/datasets/{datasetId}":{"protocol":"http","operationId":"deleteDataset","responses":{"200":{"description":"Dataset deleted.","content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"401":{"description":"Missing or invalid API key.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/Unauthorized"},"404":{"description":"Resource not found.","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"datasetId","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]},{"ApiKeyQuery":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
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
  
