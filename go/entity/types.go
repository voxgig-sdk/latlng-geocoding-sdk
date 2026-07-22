// Typed models for the LatlngGeocoding SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Api is the typed data model for the api entity.
type Api struct {
	Geometry map[string]any `json:"geometry"`
	Property map[string]any `json:"property"`
	Type string `json:"type"`
}

// ApiListMatch is the typed request payload for Api.ListTyped.
type ApiListMatch struct {
	Geometry *map[string]any `json:"geometry,omitempty"`
	Property *map[string]any `json:"property,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Dataset is the typed data model for the dataset entity.
type Dataset struct {
}

// DatasetLoadMatch is the typed request payload for Dataset.LoadTyped.
type DatasetLoadMatch struct {
	Id *string `json:"id,omitempty"`
}

// DatasetCreateData is the typed request payload for Dataset.CreateTyped.
type DatasetCreateData struct {
}

// DatasetRemoveMatch is the typed request payload for Dataset.RemoveTyped.
type DatasetRemoveMatch struct {
	Id string `json:"id"`
}

// Map is the typed data model for the map entity.
type Map struct {
	Feature []any `json:"feature"`
	Type string `json:"type"`
}

// MapLoadMatch is the typed request payload for Map.LoadTyped.
type MapLoadMatch struct {
	Feature *[]any `json:"feature,omitempty"`
	Type *string `json:"type,omitempty"`
}

// MapCreateData is the typed request payload for Map.CreateTyped.
type MapCreateData struct {
	Feature []any `json:"feature"`
	Type string `json:"type"`
}

// Place is the typed data model for the place entity.
type Place struct {
	Brand *string `json:"brand,omitempty"`
	Category *string `json:"category,omitempty"`
	Confidence *float64 `json:"confidence,omitempty"`
	Count *int `json:"count,omitempty"`
	Country *string `json:"country,omitempty"`
	DistanceM *float64 `json:"distance_m,omitempty"`
	Id *string `json:"id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Locality *string `json:"locality,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
}

// PlaceListMatch is the typed request payload for Place.ListTyped.
type PlaceListMatch struct {
	Brand *string `json:"brand,omitempty"`
	Category *string `json:"category,omitempty"`
	Confidence *float64 `json:"confidence,omitempty"`
	Count *int `json:"count,omitempty"`
	Country *string `json:"country,omitempty"`
	DistanceM *float64 `json:"distance_m,omitempty"`
	Id *string `json:"id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Locality *string `json:"locality,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
}

// Reverse is the typed data model for the reverse entity.
type Reverse struct {
	Geometry map[string]any `json:"geometry"`
	Property map[string]any `json:"property"`
	Type string `json:"type"`
}

// ReverseListMatch is the typed request payload for Reverse.ListTyped.
type ReverseListMatch struct {
	Geometry *map[string]any `json:"geometry,omitempty"`
	Property *map[string]any `json:"property,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Utility is the typed data model for the utility entity.
type Utility struct {
	Status *string `json:"status,omitempty"`
}

// UtilityLoadMatch is the typed request payload for Utility.LoadTyped.
type UtilityLoadMatch struct {
	Status *string `json:"status,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
