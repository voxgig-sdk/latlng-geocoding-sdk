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


class ApiListMatchRequired(TypedDict):
    q: str


class ApiListMatch(ApiListMatchRequired, total=False):
    api_key: str
    lang: str
    lat: float
    limit: int
    lon: float


class Dataset(TypedDict, total=False):
    id: str


class DatasetLoadMatch(TypedDict):
    id: str


class DatasetCreateData(TypedDict, total=False):
    id: str


class DatasetRemoveMatch(TypedDict):
    id: str


class Map(TypedDict):
    features: list
    type: str


class MapLoadMatch(TypedDict, total=False):
    center: str
    height: int
    key: str
    marker: str
    width: int
    zoom: int


class MapCreateDataRequired(TypedDict):
    features: list
    type: str


class MapCreateData(MapCreateDataRequired, total=False):
    key: str


class Place(TypedDict, total=False):
    brand: str
    category: str
    confidence: float
    country: str
    distance_m: float
    id: str
    lat: float
    locality: str
    lon: float
    name: str
    region: str


class PlaceListMatchRequired(TypedDict):
    q: str


class PlaceListMatch(PlaceListMatchRequired, total=False):
    api_key: str
    category: str
    country: str
    lat: float
    limit: int
    lon: float
    type: str


class Reverse(TypedDict):
    geometry: dict
    properties: dict
    type: str


class ReverseListMatchRequired(TypedDict):
    lat: float
    lon: float


class ReverseListMatch(ReverseListMatchRequired, total=False):
    api_key: str
    lang: str
    limit: int


class Utility(TypedDict, total=False):
    status: str


class UtilityLoadMatch(TypedDict, total=False):
    status: str
