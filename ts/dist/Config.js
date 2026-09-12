"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'LatlngGeocoding',
        slug: "latlng-geocoding",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://api.latlng.work",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            api: {},
            dataset: {},
            map: {},
            place: {},
            reverse: {},
            utility: {},
        }
    };
    entity = {
        "api": {
            "fields": [
                {
                    "name": "geometry",
                    "req": true,
                    "type": "`$OBJECT`"
                },
                {
                    "name": "properties",
                    "req": true,
                    "type": "`$OBJECT`"
                },
                {
                    "name": "type",
                    "req": true,
                    "type": "`$STRING`"
                }
            ],
            "name": "api",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "api_key",
                                        "orig": "api_key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "en",
                                        "kind": "query",
                                        "name": "lang",
                                        "orig": "lang",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 52.52,
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 5,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 13.405,
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": "Berlin",
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api",
                            "segments": [
                                {
                                    "lit": "api"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "api_key",
                                    "lang",
                                    "lat",
                                    "limit",
                                    "lon",
                                    "q"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.features`"
                            },
                            "parts": [
                                "api"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "dataset": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "dataset",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/datasets",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "datasets"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "datasets"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "dataset_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/datasets/{datasetId}",
                            "rename": {
                                "param": {
                                    "datasetId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "datasets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "datasets",
                                "{id}"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/datasets",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "datasets"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "datasets"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "dataset_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/v1/datasets/{datasetId}",
                            "rename": {
                                "param": {
                                    "datasetId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "datasets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "datasets",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "map": {
            "fields": [
                {
                    "name": "features",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "type",
                    "req": true,
                    "type": "`$STRING`"
                }
            ],
            "name": "map",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "latlng_xxxxx",
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/static",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "static"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "key"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "static"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "40.748,-73.985",
                                        "kind": "query",
                                        "name": "center",
                                        "orig": "center",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 600,
                                        "kind": "query",
                                        "name": "height",
                                        "orig": "height",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "latlng_xxxxx",
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "40.748,-73.985",
                                        "kind": "query",
                                        "name": "marker",
                                        "orig": "marker",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 800,
                                        "kind": "query",
                                        "name": "width",
                                        "orig": "width",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 12,
                                        "kind": "query",
                                        "name": "zoom",
                                        "orig": "zoom",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/static",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "static"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "center",
                                    "height",
                                    "key",
                                    "marker",
                                    "width",
                                    "zoom"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "static"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "place": {
            "fields": [
                {
                    "name": "brand",
                    "type": "`$STRING`"
                },
                {
                    "name": "category",
                    "type": "`$STRING`"
                },
                {
                    "name": "confidence",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "country",
                    "type": "`$STRING`"
                },
                {
                    "name": "distance_m",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "lat",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "locality",
                    "type": "`$STRING`"
                },
                {
                    "name": "lon",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "region",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "place",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "api_key",
                                        "orig": "api_key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "cafe",
                                        "kind": "query",
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "US",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 40.748,
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 5,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": -73.985,
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": "Starbucks",
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "cafe",
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/places/search",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "places"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "api_key",
                                    "category",
                                    "country",
                                    "lat",
                                    "limit",
                                    "lon",
                                    "q",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "places",
                                "search"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "api_key",
                                        "orig": "api_key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "cafe",
                                        "kind": "query",
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 40.748,
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": -73.985,
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 500,
                                        "kind": "query",
                                        "name": "radius",
                                        "orig": "radius",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "cafe",
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/places/nearby",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "places"
                                },
                                {
                                    "lit": "nearby"
                                }
                            ],
                            "select": {
                                "$action": "nearby",
                                "exist": [
                                    "api_key",
                                    "category",
                                    "lat",
                                    "limit",
                                    "lon",
                                    "radius",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "places",
                                "nearby"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/places/categories",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "places"
                                },
                                {
                                    "lit": "categories"
                                }
                            ],
                            "select": {
                                "$action": "category"
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.categories`"
                            },
                            "parts": [
                                "v1",
                                "places",
                                "categories"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "reverse": {
            "fields": [
                {
                    "name": "geometry",
                    "req": true,
                    "type": "`$OBJECT`"
                },
                {
                    "name": "properties",
                    "req": true,
                    "type": "`$OBJECT`"
                },
                {
                    "name": "type",
                    "req": true,
                    "type": "`$STRING`"
                }
            ],
            "name": "reverse",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "api_key",
                                        "orig": "api_key",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "en",
                                        "kind": "query",
                                        "name": "lang",
                                        "orig": "lang",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 52.517,
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 5,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 13.389,
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/reverse",
                            "segments": [
                                {
                                    "lit": "reverse"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "api_key",
                                    "lang",
                                    "lat",
                                    "limit",
                                    "lon"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.features`"
                            },
                            "parts": [
                                "reverse"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "utility": {
            "fields": [
                {
                    "name": "status",
                    "type": "`$STRING`"
                }
            ],
            "name": "utility",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/health",
                            "segments": [
                                {
                                    "lit": "health"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "health"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map