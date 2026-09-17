# frozen_string_literal: true

# Typed models for the LatlngGeocoding SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Api entity data model.
#
# @!attribute [rw] geometry
#   @return [Hash]
#
# @!attribute [rw] properties
#   @return [Hash]
#
# @!attribute [rw] type
#   @return [String]
Api = Struct.new(
  :geometry,
  :properties,
  :type,
  keyword_init: true
)

# Request payload for Api#list.
#
# @!attribute [rw] api_key
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] q
#   @return [String]
ApiListMatch = Struct.new(
  :api_key,
  :lang,
  :lat,
  :limit,
  :lon,
  :q,
  keyword_init: true
)

# Dataset entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Dataset = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Dataset#load.
#
# @!attribute [rw] id
#   @return [String]
DatasetLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Dataset#create.
#
# @!attribute [rw] id
#   @return [String, nil]
DatasetCreateData = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Dataset#remove.
#
# @!attribute [rw] id
#   @return [String]
DatasetRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Map entity data model.
#
# @!attribute [rw] features
#   @return [Array]
#
# @!attribute [rw] type
#   @return [String]
Map = Struct.new(
  :features,
  :type,
  keyword_init: true
)

# Request payload for Map#load.
#
# @!attribute [rw] center
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] marker
#   @return [String, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
#
# @!attribute [rw] zoom
#   @return [Integer, nil]
MapLoadMatch = Struct.new(
  :center,
  :height,
  :key,
  :marker,
  :width,
  :zoom,
  keyword_init: true
)

# Request payload for Map#create.
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] features
#   @return [Array]
#
# @!attribute [rw] type
#   @return [String]
MapCreateData = Struct.new(
  :key,
  :features,
  :type,
  keyword_init: true
)

# Place entity data model.
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] confidence
#   @return [Float, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] distance_m
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] locality
#   @return [String, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
Place = Struct.new(
  :brand,
  :category,
  :confidence,
  :country,
  :distance_m,
  :id,
  :lat,
  :locality,
  :lon,
  :name,
  :region,
  keyword_init: true
)

# Request payload for Place#list.
#
# @!attribute [rw] api_key
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
PlaceListMatch = Struct.new(
  :api_key,
  :category,
  :country,
  :lat,
  :limit,
  :lon,
  :q,
  :type,
  keyword_init: true
)

# Reverse entity data model.
#
# @!attribute [rw] geometry
#   @return [Hash]
#
# @!attribute [rw] properties
#   @return [Hash]
#
# @!attribute [rw] type
#   @return [String]
Reverse = Struct.new(
  :geometry,
  :properties,
  :type,
  keyword_init: true
)

# Request payload for Reverse#list.
#
# @!attribute [rw] api_key
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] lon
#   @return [Float]
ReverseListMatch = Struct.new(
  :api_key,
  :lang,
  :lat,
  :limit,
  :lon,
  keyword_init: true
)

# Utility entity data model.
#
# @!attribute [rw] status
#   @return [String, nil]
Utility = Struct.new(
  :status,
  keyword_init: true
)

# Request payload for Utility#load.
#
# @!attribute [rw] status
#   @return [String, nil]
UtilityLoadMatch = Struct.new(
  :status,
  keyword_init: true
)

