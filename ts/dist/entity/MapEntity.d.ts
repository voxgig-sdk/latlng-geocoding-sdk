import { LatlngGeocodingEntityBase } from '../LatlngGeocodingEntityBase';
import type { LatlngGeocodingSDK } from '../LatlngGeocodingSDK';
import type { Control } from '../types';
import type { MapType, MapLoadMatch, MapCreateData } from '../LatlngGeocodingTypes';
declare class MapEntity extends LatlngGeocodingEntityBase<MapType> {
    constructor(client: LatlngGeocodingSDK, entopts: any);
    make(this: MapEntity): MapEntity;
    load(this: any, reqmatch?: MapLoadMatch, ctrl?: Control): Promise<MapEntity>;
    create(this: any, reqdata?: MapCreateData, ctrl?: Control): Promise<MapEntity>;
}
export { MapEntity };
