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
    public array $property;
    public string $type;
}

/** Request payload for Api#list. */
class ApiListMatch
{
    public ?array $geometry = null;
    public ?array $property = null;
    public ?string $type = null;
}

/** Dataset entity data model. */
class Dataset
{
}

/** Request payload for Dataset#load. */
class DatasetLoadMatch
{
    public ?string $id = null;
}

/** Request payload for Dataset#create. */
class DatasetCreateData
{
}

/** Request payload for Dataset#remove. */
class DatasetRemoveMatch
{
    public string $id;
}

/** Map entity data model. */
class Map
{
    public array $feature;
    public string $type;
}

/** Request payload for Map#load. */
class MapLoadMatch
{
    public ?array $feature = null;
    public ?string $type = null;
}

/** Request payload for Map#create. */
class MapCreateData
{
    public array $feature;
    public string $type;
}

/** Place entity data model. */
class Place
{
    public ?string $brand = null;
    public ?string $category = null;
    public ?float $confidence = null;
    public ?int $count = null;
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
    public ?string $brand = null;
    public ?string $category = null;
    public ?float $confidence = null;
    public ?int $count = null;
    public ?string $country = null;
    public ?float $distance_m = null;
    public ?string $id = null;
    public ?float $lat = null;
    public ?string $locality = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $region = null;
}

/** Reverse entity data model. */
class Reverse
{
    public array $geometry;
    public array $property;
    public string $type;
}

/** Request payload for Reverse#list. */
class ReverseListMatch
{
    public ?array $geometry = null;
    public ?array $property = null;
    public ?string $type = null;
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

