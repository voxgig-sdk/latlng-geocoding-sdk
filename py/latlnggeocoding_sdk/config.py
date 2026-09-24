# LatlngGeocoding SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.latlng.work",
            "auth": {
                "prefix": "",
                "name": "X-Api-Key",
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
            "title": "Geometry",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "api",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api",
                "segments": [
                  {
                    "lit": "api",
                  },
                ],
                "parts": [
                  "api",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.features`",
                },
                "args": {
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 52.52,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 5,
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 13.405,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "Berlin",
                    },
                  ],
                },
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dataset": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "dataset",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/datasets",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "datasets",
                  },
                ],
                "parts": [
                  "v1",
                  "datasets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/datasets/{datasetId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "dataset_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/datasets",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "datasets",
                  },
                ],
                "parts": [
                  "v1",
                  "datasets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/datasets/{datasetId}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "datasets",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "dataset_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
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
            "title": "Features",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "map",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/static",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "static",
                  },
                ],
                "parts": [
                  "v1",
                  "static",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latlng_xxxxx",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/static",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "static",
                  },
                ],
                "parts": [
                  "v1",
                  "static",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "center",
                      "orig": "center",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "40.748,-73.985",
                    },
                    {
                      "name": "height",
                      "orig": "height",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 600,
                    },
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "latlng_xxxxx",
                    },
                    {
                      "name": "marker",
                      "orig": "marker",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "40.748,-73.985",
                    },
                    {
                      "name": "width",
                      "orig": "width",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 800,
                    },
                    {
                      "name": "zoom",
                      "orig": "zoom",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 12,
                    },
                  ],
                },
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
            "title": "Brand",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
          },
          {
            "name": "confidence",
            "title": "Confidence",
            "type": "`$NUMBER`",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
          },
          {
            "name": "distance_m",
            "title": "Distance M",
            "type": "`$NUMBER`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "lat",
            "title": "Lat",
            "type": "`$NUMBER`",
          },
          {
            "name": "locality",
            "title": "Locality",
            "type": "`$STRING`",
          },
          {
            "name": "lon",
            "title": "Lon",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "place",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/places/search",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "places",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "v1",
                  "places",
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "cafe",
                    },
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "US",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 40.748,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 5,
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": -73.985,
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "Starbucks",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "cafe",
                    },
                  ],
                },
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
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/places/nearby",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "places",
                  },
                  {
                    "lit": "nearby",
                  },
                ],
                "parts": [
                  "v1",
                  "places",
                  "nearby",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "cafe",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 40.748,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": -73.985,
                    },
                    {
                      "name": "radius",
                      "orig": "radius",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 500,
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "cafe",
                    },
                  ],
                },
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
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/places/categories",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "places",
                  },
                  {
                    "lit": "categories",
                  },
                ],
                "parts": [
                  "v1",
                  "places",
                  "categories",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.categories`",
                },
                "args": {},
                "select": {
                  "$action": "category",
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
            "title": "Geometry",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "reverse",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/reverse",
                "segments": [
                  {
                    "lit": "reverse",
                  },
                ],
                "parts": [
                  "reverse",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.features`",
                },
                "args": {
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 52.517,
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 5,
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 13.389,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "api_key",
                    "lang",
                    "lat",
                    "limit",
                    "lon",
                  ],
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
            "title": "Status",
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
                "kind": "http",
                "method": "GET",
                "orig": "/health",
                "segments": [
                  {
                    "lit": "health",
                  },
                ],
                "parts": [
                  "health",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
