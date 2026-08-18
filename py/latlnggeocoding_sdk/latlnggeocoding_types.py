# Typed models for the LatlngGeocoding SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Api(TypedDict):
    geometry: dict
    properties: dict
    type: str


class ApiListMatch(TypedDict, total=False):
    geometry: dict
    properties: dict
    type: str


class Dataset(TypedDict):
    pass


class DatasetLoadMatch(TypedDict):
    id: str


class DatasetCreateData(TypedDict):
    pass


class DatasetRemoveMatch(TypedDict):
    id: str


class Map(TypedDict):
    features: list
    type: str


class MapLoadMatch(TypedDict, total=False):
    features: list
    type: str


class MapCreateData(TypedDict):
    features: list
    type: str


class Place(TypedDict, total=False):
    brand: str
    category: str
    confidence: float
    count: int
    country: str
    distance_m: float
    id: str
    lat: float
    locality: str
    lon: float
    name: str
    region: str


class PlaceListMatch(TypedDict, total=False):
    brand: str
    category: str
    confidence: float
    count: int
    country: str
    distance_m: float
    id: str
    lat: float
    locality: str
    lon: float
    name: str
    region: str


class Reverse(TypedDict):
    geometry: dict
    properties: dict
    type: str


class ReverseListMatch(TypedDict, total=False):
    geometry: dict
    properties: dict
    type: str


class Utility(TypedDict, total=False):
    status: str


class UtilityLoadMatch(TypedDict, total=False):
    status: str
