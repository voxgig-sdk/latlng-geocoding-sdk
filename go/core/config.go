package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LatlngGeocoding",
			"slug": "latlng-geocoding",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.latlng.work",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"api": map[string]any{},
				"dataset": map[string]any{},
				"map": map[string]any{},
				"place": map[string]any{},
				"reverse": map[string]any{},
				"utility": map[string]any{},
			},
		},
		"entity": map[string]any{
			"api": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "geometry",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "properties",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "api",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 52.52,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 5,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 13.405,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "Berlin",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api",
								"parts": []any{
									"api",
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"lang",
										"lat",
										"limit",
										"lon",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.features`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dataset": map[string]any{
				"fields": []any{},
				"name": "dataset",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/datasets",
								"parts": []any{
									"v1",
									"datasets",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "dataset_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/datasets/{datasetId}",
								"parts": []any{
									"v1",
									"datasets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/datasets",
								"parts": []any{
									"v1",
									"datasets",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "dataset_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/datasets/{datasetId}",
								"parts": []any{
									"v1",
									"datasets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"datasetId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"map": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "features",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "map",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "latlng_xxxxx",
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/static",
								"parts": []any{
									"v1",
									"static",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "40.748,-73.985",
											"kind": "query",
											"name": "center",
											"orig": "center",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 600,
											"kind": "query",
											"name": "height",
											"orig": "height",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "latlng_xxxxx",
											"kind": "query",
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "40.748,-73.985",
											"kind": "query",
											"name": "marker",
											"orig": "marker",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 800,
											"kind": "query",
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 12,
											"kind": "query",
											"name": "zoom",
											"orig": "zoom",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/static",
								"parts": []any{
									"v1",
									"static",
								},
								"select": map[string]any{
									"exist": []any{
										"center",
										"height",
										"key",
										"marker",
										"width",
										"zoom",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "brand",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "confidence",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "distance_m",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "locality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
				},
				"name": "place",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "cafe",
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "US",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 40.748,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 5,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": -73.985,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "Starbucks",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "cafe",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/places/search",
								"parts": []any{
									"v1",
									"places",
									"search",
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"api_key",
										"category",
										"country",
										"lat",
										"limit",
										"lon",
										"q",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "cafe",
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 40.748,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": -73.985,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 500,
											"kind": "query",
											"name": "radius",
											"orig": "radius",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "cafe",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/places/nearby",
								"parts": []any{
									"v1",
									"places",
									"nearby",
								},
								"select": map[string]any{
									"$action": "nearby",
									"exist": []any{
										"api_key",
										"category",
										"lat",
										"limit",
										"lon",
										"radius",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/places/categories",
								"parts": []any{
									"v1",
									"places",
									"categories",
								},
								"select": map[string]any{
									"$action": "category",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.categories`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reverse": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "geometry",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "properties",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "reverse",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 52.517,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 5,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 13.389,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/reverse",
								"parts": []any{
									"reverse",
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"lang",
										"lat",
										"limit",
										"lon",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.features`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"utility": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "utility",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/health",
								"parts": []any{
									"health",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
