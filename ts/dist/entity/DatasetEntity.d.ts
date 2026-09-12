import { LatlngGeocodingEntityBase } from '../LatlngGeocodingEntityBase';
import type { LatlngGeocodingSDK } from '../LatlngGeocodingSDK';
import type { Control } from '../types';
import type { Dataset, DatasetLoadMatch, DatasetCreateData, DatasetRemoveMatch } from '../LatlngGeocodingTypes';
declare class DatasetEntity extends LatlngGeocodingEntityBase<Dataset> {
    constructor(client: LatlngGeocodingSDK, entopts: any);
    make(this: DatasetEntity): DatasetEntity;
    load(this: any, reqmatch?: DatasetLoadMatch, ctrl?: Control): Promise<DatasetEntity>;
    create(this: any, reqdata?: DatasetCreateData, ctrl?: Control): Promise<DatasetEntity>;
    remove(this: any, reqmatch?: DatasetRemoveMatch, ctrl?: Control): Promise<DatasetEntity>;
}
export { DatasetEntity };
