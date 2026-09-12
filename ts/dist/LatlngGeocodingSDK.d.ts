import { ApiEntity } from './entity/ApiEntity';
import { DatasetEntity } from './entity/DatasetEntity';
import { MapEntity } from './entity/MapEntity';
import { PlaceEntity } from './entity/PlaceEntity';
import { ReverseEntity } from './entity/ReverseEntity';
import { UtilityEntity } from './entity/UtilityEntity';
export type * from './LatlngGeocodingTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LatlngGeocodingEntityBase } from './LatlngGeocodingEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LatlngGeocodingSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Api(entopts?: Record<string, any>): ApiEntity;
    Dataset(entopts?: Record<string, any>): DatasetEntity;
    Map(entopts?: Record<string, any>): MapEntity;
    Place(entopts?: Record<string, any>): PlaceEntity;
    Reverse(entopts?: Record<string, any>): ReverseEntity;
    Utility(entopts?: Record<string, any>): UtilityEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LatlngGeocodingSDK;
    tester(testopts?: any, sdkopts?: any): LatlngGeocodingSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LatlngGeocodingSDK;
export { stdutil, config, BaseFeature, LatlngGeocodingEntityBase, LatlngGeocodingSDK, SDK, };
