package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LatlngGeocoding",
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
						"active": true,
						"name": "geometry",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "property",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "api",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 52.52,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 5,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 13.405,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": "Berlin",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
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
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "create",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "dataset_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 1,
							},
						},
						"key$": "load",
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "dataset_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "remove",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"map": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "feature",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "map",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "latlng_xxxxx",
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "create",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "40.748,-73.985",
											"kind": "query",
											"name": "center",
											"orig": "center",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 600,
											"kind": "query",
											"name": "height",
											"orig": "height",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": "latlng_xxxxx",
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "40.748,-73.985",
											"kind": "query",
											"name": "marker",
											"orig": "marker",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 800,
											"kind": "query",
											"name": "width",
											"orig": "width",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 12,
											"kind": "query",
											"name": "zoom",
											"orig": "zoom",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "brand",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "category",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "confidence",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "count",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "country",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "distance_m",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "lat",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "locality",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "lon",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "region",
						"req": false,
						"type": "`$STRING`",
						"index$": 11,
					},
				},
				"name": "place",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "cafe",
											"kind": "query",
											"name": "category",
											"orig": "category",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "US",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 40.748,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 5,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": -73.985,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": "Starbucks",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "cafe",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "cafe",
											"kind": "query",
											"name": "category",
											"orig": "category",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 40.748,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": -73.985,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 500,
											"kind": "query",
											"name": "radius",
											"orig": "radius",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": "cafe",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
									"res": "`body`",
								},
								"index$": 2,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reverse": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "geometry",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "property",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "reverse",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 52.517,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 5,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 13.389,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"utility": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "status",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
				},
				"name": "utility",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
