import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "api",
    "accessor": "Api",
    "op": "list",
    "method": "GET",
    "path": "/api",
    "args": [],
    "select": {
      "api_key": "v1",
      "lang": "en",
      "lat": 52.52,
      "limit": 5,
      "lon": 13.405,
      "q": "Berlin"
    },
    "headers": [],
    "query": [
      "api_key",
      "q",
      "limit",
      "lang",
      "lat",
      "lon"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              13.3888599,
              52.5170365
            ]
          },
          "properties": {
            "name": "Berlin",
            "country": "Germany",
            "state": "Berlin",
            "osm_key": "place",
            "osm_value": "city"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "dataset",
    "accessor": "Dataset",
    "op": "create",
    "method": "POST",
    "path": "/v1/datasets",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "dataset",
    "accessor": "Dataset",
    "op": "load",
    "method": "GET",
    "path": "/v1/datasets/{datasetId}",
    "args": [
      {
        "name": "id",
        "wire": "datasetId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "dataset",
    "accessor": "Dataset",
    "op": "load",
    "method": "GET",
    "path": "/v1/datasets",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "dataset",
    "accessor": "Dataset",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/datasets/{datasetId}",
    "args": [
      {
        "name": "id",
        "wire": "datasetId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "map",
    "accessor": "Map",
    "op": "create",
    "method": "POST",
    "path": "/v1/static",
    "args": [],
    "select": {
      "key": "latlng_xxxxx"
    },
    "headers": [],
    "query": [
      "key"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "map",
    "accessor": "Map",
    "op": "load",
    "method": "GET",
    "path": "/v1/static",
    "args": [],
    "select": {
      "center": "40.748,-73.985",
      "height": 600,
      "key": "latlng_xxxxx",
      "marker": "v1",
      "width": 800,
      "zoom": 12
    },
    "headers": [],
    "query": [
      "key",
      "center",
      "zoom",
      "width",
      "height",
      "markers"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "place",
    "accessor": "Place",
    "op": "list",
    "method": "GET",
    "path": "/v1/places/search",
    "action": "search",
    "args": [],
    "select": {
      "api_key": "v1",
      "category": "cafe",
      "country": "US",
      "lat": 40.748,
      "limit": 5,
      "lon": -73.985,
      "q": "Starbucks",
      "type": "cafe"
    },
    "headers": [],
    "query": [
      "api_key",
      "q",
      "lat",
      "lon",
      "type",
      "category",
      "country",
      "limit"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "type": "nearby",
      "source": "latlng_places",
      "query": "x",
      "center": {
        "lat": 1,
        "lon": 1
      },
      "radius_m": 1,
      "count": 1,
      "places": [
        {
          "brand": "x",
          "category": "x",
          "confidence": 1,
          "country": "x",
          "distance_m": 1,
          "id": "x",
          "lat": 1,
          "locality": "x",
          "lon": 1,
          "name": "x",
          "region": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "place",
    "accessor": "Place",
    "op": "list",
    "method": "GET",
    "path": "/v1/places/nearby",
    "action": "nearby",
    "args": [],
    "select": {
      "api_key": "v1",
      "category": "cafe",
      "lat": 40.748,
      "limit": 10,
      "lon": -73.985,
      "radius": 500,
      "type": "cafe"
    },
    "headers": [],
    "query": [
      "api_key",
      "lat",
      "lon",
      "radius",
      "type",
      "category",
      "limit"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "type": "nearby",
      "source": "latlng_places",
      "query": "x",
      "center": {
        "lat": 1,
        "lon": 1
      },
      "radius_m": 1,
      "count": 1,
      "places": [
        {
          "brand": "x",
          "category": "x",
          "confidence": 1,
          "country": "x",
          "distance_m": 1,
          "id": "x",
          "lat": 1,
          "locality": "x",
          "lon": 1,
          "name": "x",
          "region": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "place",
    "accessor": "Place",
    "op": "list",
    "method": "GET",
    "path": "/v1/places/categories",
    "action": "category",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [],
    "status": 200,
    "sample": {
      "count": 1,
      "categories": [
        {
          "category": "x",
          "count": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "reverse",
    "accessor": "Reverse",
    "op": "list",
    "method": "GET",
    "path": "/reverse",
    "args": [],
    "select": {
      "api_key": "v1",
      "lang": "en",
      "lat": 52.517,
      "limit": 5,
      "lon": 13.389
    },
    "headers": [],
    "query": [
      "api_key",
      "lat",
      "lon",
      "limit",
      "lang"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "type": "FeatureCollection",
      "features": [
        {
          "geometry": {
            "coordinates": [
              1
            ],
            "type": "Point"
          },
          "properties": {},
          "type": "Feature"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "utility",
    "accessor": "Utility",
    "op": "load",
    "method": "GET",
    "path": "/health",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [],
    "status": 200,
    "sample": {
      "status": "ok"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
