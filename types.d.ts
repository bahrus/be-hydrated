import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {QueryInfo, Scope, camelQry, JSONObject} from 'trans-render/lib/types';
import {CamelConfig as BeDerivedCamelConfig} from 'be-derived/types';
import {CamelConfig as BeEventfulCamelConfig } from 'be-eventful/types';
import {CamelConfig as BeSharingCamelConfig } from 'be-sharing/types';


export interface CamelConfig extends BeDerivedCamelConfig, BeEventfulCamelConfig, BeSharingCamelConfig{}
export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLTemplateElement | HTMLScriptElement>{
}

export type Proxy = (HTMLTemplateElement | HTMLScriptElement) & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export type PPPP = Promise<PPP>;

export interface Actions{
    onCamel(pp: PP, mold: PPP): PPPP;
}

