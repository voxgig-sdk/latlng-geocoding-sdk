import { LatlngGeocodingEntityBase } from '../LatlngGeocodingEntityBase';
import type { LatlngGeocodingSDK } from '../LatlngGeocodingSDK';
import type { Control } from '../types';
import type { Place, PlaceListMatch } from '../LatlngGeocodingTypes';
declare class PlaceEntity extends LatlngGeocodingEntityBase<Place> {
    constructor(client: LatlngGeocodingSDK, entopts: any);
    make(this: PlaceEntity): PlaceEntity;
    list(this: any, reqmatch?: PlaceListMatch, ctrl?: Control): Promise<PlaceEntity[]>;
}
export { PlaceEntity };
