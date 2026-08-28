-- Typed models for the LatlngGeocoding SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Api
---@field geometry table
---@field properties table
---@field type string

---@class ApiListMatch
---@field api_key? string
---@field lang? string
---@field lat? number
---@field limit? number
---@field lon? number
---@field q string

---@class Dataset
---@field id? string

---@class DatasetLoadMatch
---@field id string

---@class DatasetCreateData
---@field id? string

---@class DatasetRemoveMatch
---@field id string

---@class Map
---@field features table
---@field type string

---@class MapLoadMatch
---@field center? string
---@field height? number
---@field key? string
---@field marker? string
---@field width? number
---@field zoom? number

---@class MapCreateData
---@field key? string
---@field features table
---@field type string

---@class Place
---@field brand? string
---@field category? string
---@field confidence? number
---@field count? number
---@field country? string
---@field distance_m? number
---@field id? string
---@field lat? number
---@field locality? string
---@field lon? number
---@field name? string
---@field region? string

---@class PlaceListMatch
---@field api_key? string
---@field category? string
---@field country? string
---@field lat? number
---@field limit? number
---@field lon? number
---@field q string
---@field type? string

---@class Reverse
---@field geometry table
---@field properties table
---@field type string

---@class ReverseListMatch
---@field api_key? string
---@field lang? string
---@field lat number
---@field limit? number
---@field lon number

---@class Utility
---@field status? string

---@class UtilityLoadMatch
---@field status? string

local M = {}

return M
