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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.latlng.work",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-Api-Key",
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
						"title": "Geometry",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "api",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
								},
								"parts": []any{
									"api",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.features`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 52.52,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 13.405,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Berlin",
										},
									},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dataset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "dataset",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/datasets",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "datasets",
									},
								},
								"parts": []any{
									"v1",
									"datasets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/datasets/{datasetId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "dataset_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/datasets",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "datasets",
									},
								},
								"parts": []any{
									"v1",
									"datasets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/datasets/{datasetId}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "dataset_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Features",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "map",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v1/static",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "static",
									},
								},
								"parts": []any{
									"v1",
									"static",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latlng_xxxxx",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"key",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/static",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "static",
									},
								},
								"parts": []any{
									"v1",
									"static",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "center",
											"orig": "center",
											"type": "`$STRING`",
											"kind": "query",
											"example": "40.748,-73.985",
										},
										map[string]any{
											"name": "height",
											"orig": "height",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 600,
										},
										map[string]any{
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "latlng_xxxxx",
										},
										map[string]any{
											"name": "marker",
											"orig": "marker",
											"type": "`$STRING`",
											"kind": "query",
											"example": "40.748,-73.985",
										},
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 800,
										},
										map[string]any{
											"name": "zoom",
											"orig": "zoom",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 12,
										},
									},
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
						"title": "Brand",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "confidence",
						"title": "Confidence",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "distance_m",
						"title": "Distance M",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "locality",
						"title": "Locality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "place",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/places/search",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "places",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"v1",
									"places",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"example": "cafe",
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "US",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 40.748,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": -73.985,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Starbucks",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "cafe",
										},
									},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/places/nearby",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "places",
									},
									map[string]any{
										"lit": "nearby",
									},
								},
								"parts": []any{
									"v1",
									"places",
									"nearby",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "query",
											"example": "cafe",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 40.748,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": -73.985,
										},
										map[string]any{
											"name": "radius",
											"orig": "radius",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 500,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "cafe",
										},
									},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/places/categories",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "places",
									},
									map[string]any{
										"lit": "categories",
									},
								},
								"parts": []any{
									"v1",
									"places",
									"categories",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.categories`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "category",
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
						"title": "Geometry",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "properties",
						"title": "Properties",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "reverse",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/reverse",
								"segments": []any{
									map[string]any{
										"lit": "reverse",
									},
								},
								"parts": []any{
									"reverse",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.features`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 52.517,
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 13.389,
										},
									},
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
						"title": "Status",
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
								"kind": "http",
								"method": "GET",
								"orig": "/health",
								"segments": []any{
									map[string]any{
										"lit": "health",
									},
								},
								"parts": []any{
									"health",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
