# LatlngGeocoding PHP SDK Reference

Complete API reference for the LatlngGeocoding PHP SDK.


## LatlngGeocodingSDK

### Constructor

```php
require_once __DIR__ . '/latlnggeocoding_sdk.php';

$client = new LatlngGeocodingSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LatlngGeocodingSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LatlngGeocodingSDK::test();
```


### Instance Methods

#### `Api($data = null)`

Create a new `ApiEntity` instance. Pass `null` for no initial data.

#### `Dataset($data = null)`

Create a new `DatasetEntity` instance. Pass `null` for no initial data.

#### `Map($data = null)`

Create a new `MapEntity` instance. Pass `null` for no initial data.

#### `Place($data = null)`

Create a new `PlaceEntity` instance. Pass `null` for no initial data.

#### `Reverse($data = null)`

Create a new `ReverseEntity` instance. Pass `null` for no initial data.

#### `Utility($data = null)`

Create a new `UtilityEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LatlngGeocodingUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ApiEntity

```php
$api = $client->Api();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `array` | Yes |  |
| `properties` | `array` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Api()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ApiEntity`

Create a new `ApiEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DatasetEntity

```php
$dataset = $client->Dataset();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Dataset()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Dataset()->load(["id" => "dataset_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Dataset()->remove(["id" => "dataset_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DatasetEntity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MapEntity

```php
$map = $client->Map();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `features` | `array` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Map()->create([
  "features" => null, // array
  "type" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Map()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MapEntity`

Create a new `MapEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlaceEntity

```php
$place = $client->Place();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `string` | No |  |
| `category` | `string` | No |  |
| `confidence` | `float` | No |  |
| `count` | `int` | No |  |
| `country` | `string` | No |  |
| `distance_m` | `float` | No |  |
| `id` | `string` | No |  |
| `lat` | `float` | No |  |
| `locality` | `string` | No |  |
| `lon` | `float` | No |  |
| `name` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Place()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlaceEntity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReverseEntity

```php
$reverse = $client->Reverse();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `array` | Yes |  |
| `properties` | `array` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Reverse()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReverseEntity`

Create a new `ReverseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UtilityEntity

```php
$utility = $client->Utility();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Utility()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UtilityEntity`

Create a new `UtilityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LatlngGeocodingSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

