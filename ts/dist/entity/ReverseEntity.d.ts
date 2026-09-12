import { LatlngGeocodingEntityBase } from '../LatlngGeocodingEntityBase';
import type { LatlngGeocodingSDK } from '../LatlngGeocodingSDK';
import type { Control } from '../types';
import type { Reverse, ReverseListMatch } from '../LatlngGeocodingTypes';
declare class ReverseEntity extends LatlngGeocodingEntityBase<Reverse> {
    constructor(client: LatlngGeocodingSDK, entopts: any);
    make(this: ReverseEntity): ReverseEntity;
    list(this: any, reqmatch?: ReverseListMatch, ctrl?: Control): Promise<ReverseEntity[]>;
}
export { ReverseEntity };
