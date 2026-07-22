package core

type LatlngGeocodingError struct {
	IsLatlngGeocodingError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLatlngGeocodingError(code string, msg string, ctx *Context) *LatlngGeocodingError {
	return &LatlngGeocodingError{
		IsLatlngGeocodingError: true,
		Sdk:              "LatlngGeocoding",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LatlngGeocodingError) Error() string {
	return e.Msg
}
