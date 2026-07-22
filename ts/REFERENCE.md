# LatlngGeocoding TypeScript SDK Reference

Complete API reference for the LatlngGeocoding TypeScript SDK.


## LatlngGeocodingSDK

### Constructor

```ts
new LatlngGeocodingSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LatlngGeocodingSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LatlngGeocodingSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LatlngGeocodingSDK` instance in test mode.


### Instance Methods

#### `Api(data?: object)`

Create a new `Api` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiEntity` instance.

#### `Dataset(data?: object)`

Create a new `Dataset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatasetEntity` instance.

#### `Map(data?: object)`

Create a new `Map` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MapEntity` instance.

#### `Place(data?: object)`

Create a new `Place` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlaceEntity` instance.

#### `Reverse(data?: object)`

Create a new `Reverse` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReverseEntity` instance.

#### `Utility(data?: object)`

Create a new `Utility` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UtilityEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LatlngGeocodingSDK.test()`.

**Returns:** `LatlngGeocodingSDK` instance in test mode.


---

## ApiEntity

```ts
const api = client.Api()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `Record<string, any>` | Yes |  |
| `property` | `Record<string, any>` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Api().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiEntity` instance with the same client and
options.

#### `client()`

Return the parent `LatlngGeocodingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatasetEntity

```ts
const dataset = client.Dataset()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Dataset().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Dataset().load({ id: 'dataset_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Dataset().remove({ id: 'dataset_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatasetEntity` instance with the same client and
options.

#### `client()`

Return the parent `LatlngGeocodingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MapEntity

```ts
const map = client.Map()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | `any[]` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Map().create({
  feature: [],
  type: 'example_type',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Map().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MapEntity` instance with the same client and
options.

#### `client()`

Return the parent `LatlngGeocodingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlaceEntity

```ts
const place = client.Place()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | No |  |
| `category` | `string` | No |  |
| `confidence` | `number` | No |  |
| `count` | `number` | No |  |
| `country` | `string` | No |  |
| `distance_m` | `number` | No |  |
| `id` | `string` | No |  |
| `lat` | `number` | No |  |
| `locality` | `string` | No |  |
| `lon` | `number` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Place().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `LatlngGeocodingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReverseEntity

```ts
const reverse = client.Reverse()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `Record<string, any>` | Yes |  |
| `property` | `Record<string, any>` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Reverse().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReverseEntity` instance with the same client and
options.

#### `client()`

Return the parent `LatlngGeocodingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UtilityEntity

```ts
const utility = client.Utility()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Utility().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UtilityEntity` instance with the same client and
options.

#### `client()`

Return the parent `LatlngGeocodingSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LatlngGeocodingSDK({
  feature: {
    test: { active: true },
  }
})
```

