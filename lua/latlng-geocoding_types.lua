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
---@field geometry? table
---@field properties? table
---@field type? string

---@class Dataset

---@class DatasetLoadMatch
---@field id string

---@class DatasetCreateData

---@class DatasetRemoveMatch
---@field id string

---@class Map
---@field features table
---@field type string

---@class MapLoadMatch
---@field features? table
---@field type? string

---@class MapCreateData
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

---@class Reverse
---@field geometry table
---@field properties table
---@field type string

---@class ReverseListMatch
---@field geometry? table
---@field properties? table
---@field type? string

---@class Utility
---@field status? string

---@class UtilityLoadMatch
---@field status? string

local M = {}

return M
