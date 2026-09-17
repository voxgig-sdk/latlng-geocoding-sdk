<?php
declare(strict_types=1);

// Typed models for the LatlngGeocoding SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Api entity data model. */
class Api
{
    public array $geometry;
    public array $properties;
    public string $type;
}

/** Request payload for Api#list. */
class ApiListMatch
{
    public ?string $api_key = null;
    public ?string $lang = null;
    public ?float $lat = null;
    public ?int $limit = null;
    public ?float $lon = null;
    public string $q;
}

/** Dataset entity data model. */
class Dataset
{
    public ?string $id = null;
}

/** Request payload for Dataset#load. */
class DatasetLoadMatch
{
    public string $id;
}

/** Request payload for Dataset#create. */
class DatasetCreateData
{
    public ?string $id = null;
}

/** Request payload for Dataset#remove. */
class DatasetRemoveMatch
{
    public string $id;
}

/** Map entity data model. */
class Map
{
    public array $features;
    public string $type;
}

/** Request payload for Map#load. */
class MapLoadMatch
{
    public ?string $center = null;
    public ?int $height = null;
    public ?string $key = null;
    public ?string $marker = null;
    public ?int $width = null;
    public ?int $zoom = null;
}

/** Request payload for Map#create. */
class MapCreateData
{
    public ?string $key = null;
    public array $features;
    public string $type;
}

/** Place entity data model. */
class Place
{
    public ?string $brand = null;
    public ?string $category = null;
    public ?float $confidence = null;
    public ?string $country = null;
    public ?float $distance_m = null;
    public ?string $id = null;
    public ?float $lat = null;
    public ?string $locality = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $region = null;
}

/** Request payload for Place#list. */
class PlaceListMatch
{
    public ?string $api_key = null;
    public ?string $category = null;
    public ?string $country = null;
    public ?float $lat = null;
    public ?int $limit = null;
    public ?float $lon = null;
    public string $q;
    public ?string $type = null;
}

/** Reverse entity data model. */
class Reverse
{
    public array $geometry;
    public array $properties;
    public string $type;
}

/** Request payload for Reverse#list. */
class ReverseListMatch
{
    public ?string $api_key = null;
    public ?string $lang = null;
    public float $lat;
    public ?int $limit = null;
    public float $lon;
}

/** Utility entity data model. */
class Utility
{
    public ?string $status = null;
}

/** Request payload for Utility#load. */
class UtilityLoadMatch
{
    public ?string $status = null;
}

