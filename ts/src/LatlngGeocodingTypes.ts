// Typed models for the LatlngGeocoding SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Api {
  geometry: Record<string, any>
  property: Record<string, any>
  type: string
}

export interface ApiListMatch {
  geometry?: Record<string, any>
  property?: Record<string, any>
  type?: string
}

export interface Dataset {
}

export interface DatasetLoadMatch {
  id?: string
}

export interface DatasetCreateData {
}

export interface DatasetRemoveMatch {
  id: string
}

export interface Map {
  feature: any[]
  type: string
}

export interface MapLoadMatch {
  feature?: any[]
  type?: string
}

export interface MapCreateData {
  feature: any[]
  type: string
}

export interface Place {
  brand?: string
  category?: string
  confidence?: number
  count?: number
  country?: string
  distance_m?: number
  id?: string
  lat?: number
  locality?: string
  lon?: number
  name?: string
  region?: string
}

export interface PlaceListMatch {
  brand?: string
  category?: string
  confidence?: number
  count?: number
  country?: string
  distance_m?: number
  id?: string
  lat?: number
  locality?: string
  lon?: number
  name?: string
  region?: string
}

export interface Reverse {
  geometry: Record<string, any>
  property: Record<string, any>
  type: string
}

export interface ReverseListMatch {
  geometry?: Record<string, any>
  property?: Record<string, any>
  type?: string
}

export interface Utility {
  status?: string
}

export interface UtilityLoadMatch {
  status?: string
}

