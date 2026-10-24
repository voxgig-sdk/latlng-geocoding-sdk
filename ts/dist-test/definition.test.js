"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "api",
        "accessor": "Api",
        "op": "list",
        "method": "GET",
        "path": "/api",
        "args": [],
        "select": {
            "q": "Berlin",
            "api_key": "v1",
            "lang": "en",
            "lat": 52.52,
            "limit": 5,
            "lon": 13.405
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "api_key",
            "q",
            "limit",
            "lang",
            "lat",
            "lon"
        ],
        "queryArgs": [
            {
                "name": "api_key",
                "wire": "api_key"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "lon",
                "wire": "lon"
            },
            {
                "name": "q",
                "wire": "q"
            }
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "image/png"
        ],
        "query": [
            "key"
        ],
        "queryArgs": [],
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
            "marker": "40.748,-73.985",
            "width": 800,
            "zoom": 12
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "image/png"
        ],
        "query": [
            "key",
            "center",
            "zoom",
            "width",
            "height",
            "markers"
        ],
        "queryArgs": [
            {
                "name": "center",
                "wire": "center"
            },
            {
                "name": "height",
                "wire": "height"
            },
            {
                "name": "key",
                "wire": "key"
            },
            {
                "name": "marker",
                "wire": "markers"
            },
            {
                "name": "width",
                "wire": "width"
            },
            {
                "name": "zoom",
                "wire": "zoom"
            }
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
        "path": "/v1/places/nearby",
        "action": "nearby",
        "args": [],
        "select": {
            "lat": 40.748,
            "lon": -73.985,
            "api_key": "v1",
            "category": "cafe",
            "limit": 10,
            "radius": 500,
            "type": "cafe"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "api_key",
            "lat",
            "lon",
            "radius",
            "type",
            "category",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "api_key",
                "wire": "api_key"
            },
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "lon",
                "wire": "lon"
            },
            {
                "name": "radius",
                "wire": "radius"
            },
            {
                "name": "type",
                "wire": "type"
            }
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
                    "id": "x",
                    "name": "x",
                    "category": "x",
                    "lat": 1,
                    "lon": 1,
                    "confidence": 1,
                    "country": "x",
                    "region": "x",
                    "locality": "x",
                    "brand": "x",
                    "distance_m": 1
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
        "path": "/v1/places/search",
        "action": "search",
        "args": [],
        "select": {
            "q": "Starbucks",
            "api_key": "v1",
            "category": "cafe",
            "country": "US",
            "limit": 5,
            "type": "cafe"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
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
        "queryArgs": [
            {
                "name": "api_key",
                "wire": "api_key"
            },
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "type",
                "wire": "type"
            }
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
                    "id": "x",
                    "name": "x",
                    "category": "x",
                    "lat": 1,
                    "lon": 1,
                    "confidence": 1,
                    "country": "x",
                    "region": "x",
                    "locality": "x",
                    "brand": "x",
                    "distance_m": 1
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
            "lat": 52.517,
            "lon": 13.389,
            "api_key": "v1",
            "lang": "en",
            "limit": 5
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "api_key",
            "lat",
            "lon",
            "limit",
            "lang"
        ],
        "queryArgs": [
            {
                "name": "api_key",
                "wire": "api_key"
            },
            {
                "name": "lang",
                "wire": "lang"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "lon",
                "wire": "lon"
            }
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
                            1
                        ]
                    },
                    "properties": {}
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "status": "ok"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map