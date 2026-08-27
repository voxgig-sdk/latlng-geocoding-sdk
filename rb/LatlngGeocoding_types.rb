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
# @!attribute [rw] geometry
#   @return [Hash, nil]
#
# @!attribute [rw] properties
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ApiListMatch = Struct.new(
  :geometry,
  :properties,
  :type,
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
# @!attribute [rw] features
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
MapLoadMatch = Struct.new(
  :features,
  :type,
  keyword_init: true
)

# Request payload for Map#create.
#
# @!attribute [rw] features
#   @return [Array]
#
# @!attribute [rw] type
#   @return [String]
MapCreateData = Struct.new(
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
# @!attribute [rw] count
#   @return [Integer, nil]
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
  :count,
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
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] confidence
#   @return [Float, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
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
PlaceListMatch = Struct.new(
  :brand,
  :category,
  :confidence,
  :count,
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
# @!attribute [rw] geometry
#   @return [Hash, nil]
#
# @!attribute [rw] properties
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ReverseListMatch = Struct.new(
  :geometry,
  :properties,
  :type,
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

