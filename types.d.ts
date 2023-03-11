import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {QueryInfo, Scope, camelQry, JSONObject} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLTemplateElement | HTMLScriptElement>{
    //canonicalConfig?: CanonicalConfig;
}

