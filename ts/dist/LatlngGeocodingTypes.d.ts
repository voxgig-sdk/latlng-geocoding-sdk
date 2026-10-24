export interface Api {
    geometry: Record<string, any>;
    properties: Record<string, any>;
    type: string;
}
export interface ApiListMatch {
    api_key?: string;
    lang?: string;
    lat?: number;
    limit?: number;
    lon?: number;
    q: string;
}
export interface Dataset {
    features: any[];
    id?: string;
    type: string;
}
export interface DatasetLoadMatch {
    id: string;
}
export interface DatasetCreateData {
    features: any[];
    type: string;
}
export interface DatasetRemoveMatch {
    id: string;
}
export interface MapType {
    features: any[];
    type: string;
}
export interface MapLoadMatch {
    center?: string;
    height?: number;
    key?: string;
    marker?: string;
    width?: number;
    zoom?: number;
}
export interface MapCreateData {
    key?: string;
    features: any[];
    type: string;
}
export interface Place {
    brand?: string;
    category?: string;
    confidence?: number;
    country?: string;
    distance_m?: number;
    id?: string;
    lat?: number;
    locality?: string;
    lon?: number;
    name?: string;
    region?: string;
}
export interface PlaceListMatch {
    api_key?: string;
    category?: string;
    lat: number;
    limit?: number;
    lon: number;
    radius?: number;
    type?: string;
    $action?: string;
    [action: string]: any;
}
export interface Reverse {
    geometry: Record<string, any>;
    properties: Record<string, any>;
    type: string;
}
export interface ReverseListMatch {
    api_key?: string;
    lang?: string;
    lat: number;
    limit?: number;
    lon: number;
}
export interface Utility {
    status?: string;
}
export interface UtilityLoadMatch {
    status?: string;
}
