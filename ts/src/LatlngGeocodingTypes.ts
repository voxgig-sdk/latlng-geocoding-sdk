// Typed models for the LatlngGeocoding SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Api {
  geometry: Record<string, any>
  properties: Record<string, any>
  type: string
}

export interface ApiListMatch {
  api_key?: string
  lang?: string
  lat?: number
  limit?: number
  lon?: number
  q: string
}

export interface Dataset {
  id?: string
}

export interface DatasetLoadMatch {
  id: string
}

export interface DatasetCreateData {
  id?: string
}

export interface DatasetRemoveMatch {
  id: string
}

export interface MapType {
  features: any[]
  type: string
}

export interface MapLoadMatch {
  center?: string
  height?: number
  key?: string
  marker?: string
  width?: number
  zoom?: number
}

export interface MapCreateData {
  key?: string
  features: any[]
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
  api_key?: string
  category?: string
  country?: string
  lat?: number
  limit?: number
  lon?: number
  q: string
  type?: string

  // Selects a custom action instead of the plain list:
  //   'category' | 'nearby' | 'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Reverse {
  geometry: Record<string, any>
  properties: Record<string, any>
  type: string
}

export interface ReverseListMatch {
  api_key?: string
  lang?: string
  lat: number
  limit?: number
  lon: number
}

export interface Utility {
  status?: string
}

export interface UtilityLoadMatch {
  status?: string
}

