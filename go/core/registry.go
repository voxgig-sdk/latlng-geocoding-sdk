package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApiEntityFunc func(client *LatlngGeocodingSDK, entopts map[string]any) LatlngGeocodingEntity

var NewDatasetEntityFunc func(client *LatlngGeocodingSDK, entopts map[string]any) LatlngGeocodingEntity

var NewMapEntityFunc func(client *LatlngGeocodingSDK, entopts map[string]any) LatlngGeocodingEntity

var NewPlaceEntityFunc func(client *LatlngGeocodingSDK, entopts map[string]any) LatlngGeocodingEntity

var NewReverseEntityFunc func(client *LatlngGeocodingSDK, entopts map[string]any) LatlngGeocodingEntity

var NewUtilityEntityFunc func(client *LatlngGeocodingSDK, entopts map[string]any) LatlngGeocodingEntity

