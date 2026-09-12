import { LatlngGeocodingEntityBase } from '../LatlngGeocodingEntityBase';
import type { LatlngGeocodingSDK } from '../LatlngGeocodingSDK';
import type { Control } from '../types';
import type { Api, ApiListMatch } from '../LatlngGeocodingTypes';
declare class ApiEntity extends LatlngGeocodingEntityBase<Api> {
    constructor(client: LatlngGeocodingSDK, entopts: any);
    make(this: ApiEntity): ApiEntity;
    list(this: any, reqmatch?: ApiListMatch, ctrl?: Control): Promise<ApiEntity[]>;
}
export { ApiEntity };
