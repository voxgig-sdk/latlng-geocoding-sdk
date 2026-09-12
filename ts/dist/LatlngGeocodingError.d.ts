import { Context } from './Context';
declare class LatlngGeocodingError extends Error {
    isLatlngGeocodingError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { LatlngGeocodingError };
