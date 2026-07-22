# LatlngGeocoding Python SDK Reference

Complete API reference for the LatlngGeocoding Python SDK.


## LatlngGeocodingSDK

### Constructor

```python
from latlnggeocoding_sdk import LatlngGeocodingSDK

client = LatlngGeocodingSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LatlngGeocodingSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = LatlngGeocodingSDK.test()
```


### Instance Methods

#### `Api(data=None)`

Create a new `ApiEntity` instance. Pass `None` for no initial data.

#### `Dataset(data=None)`

Create a new `DatasetEntity` instance. Pass `None` for no initial data.

#### `Map(data=None)`

Create a new `MapEntity` instance. Pass `None` for no initial data.

#### `Place(data=None)`

Create a new `PlaceEntity` instance. Pass `None` for no initial data.

#### `Reverse(data=None)`

Create a new `ReverseEntity` instance. Pass `None` for no initial data.

#### `Utility(data=None)`

Create a new `UtilityEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ApiEntity

```python
api = client.Api()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `dict` | Yes |  |
| `property` | `dict` | Yes |  |
| `type` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Api().list()
for api in results:
    print(api)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DatasetEntity

```python
dataset = client.Dataset()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Dataset().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Dataset().load({"id": "dataset_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Dataset().remove({"id": "dataset_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatasetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MapEntity

```python
map = client.Map()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | `list` | Yes |  |
| `type` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Map().create({
    "feature": [],  # list
    "type": "example_type",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Map().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MapEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlaceEntity

```python
place = client.Place()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `brand` | `str` | No |  |
| `category` | `str` | No |  |
| `confidence` | `float` | No |  |
| `count` | `int` | No |  |
| `country` | `str` | No |  |
| `distance_m` | `float` | No |  |
| `id` | `str` | No |  |
| `lat` | `float` | No |  |
| `locality` | `str` | No |  |
| `lon` | `float` | No |  |
| `name` | `str` | No |  |
| `region` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Place().list()
for place in results:
    print(place)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReverseEntity

```python
reverse = client.Reverse()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | `dict` | Yes |  |
| `property` | `dict` | Yes |  |
| `type` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Reverse().list()
for reverse in results:
    print(reverse)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReverseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UtilityEntity

```python
utility = client.Utility()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Utility().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UtilityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = LatlngGeocodingSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

