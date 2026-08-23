# LatlngGeocoding SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "LatlngGeocoding",
            "slug": "latlng-geocoding",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.latlng.work",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "api": {},
                "dataset": {},
                "map": {},
                "place": {},
                "reverse": {},
                "utility": {},
            },
        },
        "entity": {
      "api": {
        "fields": [
          {
            "name": "geometry",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "properties",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 52.52,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 5,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 13.405,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "Berlin",
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api",
                "parts": [
                  "api",
                ],
                "select": {
                  "exist": [
                    "api_key",
                    "lang",
                    "lat",
                    "limit",
                    "lon",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.features`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dataset": {
        "fields": [],
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
                "parts": [
                  "v1",
                  "datasets",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/datasets/{datasetId}",
                "parts": [
                  "v1",
                  "datasets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/v1/datasets",
                "parts": [
                  "v1",
                  "datasets",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/datasets/{datasetId}",
                "parts": [
                  "v1",
                  "datasets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "datasetId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "map": {
        "fields": [
          {
            "name": "features",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/v1/static",
                "parts": [
                  "v1",
                  "static",
                ],
                "select": {
                  "exist": [
                    "key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": 600,
                      "kind": "query",
                      "name": "height",
                      "orig": "height",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "latlng_xxxxx",
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "40.748,-73.985",
                      "kind": "query",
                      "name": "marker",
                      "orig": "marker",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 800,
                      "kind": "query",
                      "name": "width",
                      "orig": "width",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 12,
                      "kind": "query",
                      "name": "zoom",
                      "orig": "zoom",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/static",
                "parts": [
                  "v1",
                  "static",
                ],
                "select": {
                  "exist": [
                    "center",
                    "height",
                    "key",
                    "marker",
                    "width",
                    "zoom",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "place": {
        "fields": [
          {
            "name": "brand",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "confidence",
            "type": "`$NUMBER`",
          },
          {
            "name": "count",
            "type": "`$INTEGER`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "distance_m",
            "type": "`$NUMBER`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "lat",
            "type": "`$NUMBER`",
          },
          {
            "name": "locality",
            "type": "`$STRING`",
          },
          {
            "name": "lon",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "type": "`$STRING`",
          },
        ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "cafe",
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "US",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 40.748,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 5,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": -73.985,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "Starbucks",
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "cafe",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/places/search",
                "parts": [
                  "v1",
                  "places",
                  "search",
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
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "cafe",
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 40.748,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": -73.985,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 500,
                      "kind": "query",
                      "name": "radius",
                      "orig": "radius",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "cafe",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/places/nearby",
                "parts": [
                  "v1",
                  "places",
                  "nearby",
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
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/v1/places/categories",
                "parts": [
                  "v1",
                  "places",
                  "categories",
                ],
                "select": {
                  "$action": "category",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.categories`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "reverse": {
        "fields": [
          {
            "name": "geometry",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "properties",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 52.517,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 5,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 13.389,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/reverse",
                "parts": [
                  "reverse",
                ],
                "select": {
                  "exist": [
                    "api_key",
                    "lang",
                    "lat",
                    "limit",
                    "lon",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.features`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "utility": {
        "fields": [
          {
            "name": "status",
            "type": "`$STRING`",
          },
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
                "parts": [
                  "health",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
