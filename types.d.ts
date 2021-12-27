import {BeDecoratedProps} from 'be-decorated/types';

export interface BeHydratedVirtualProps {
    deepMerge: boolean,
    deferAttribs: string[],
    props: any,
    attribs: {[key: string]: string | boolean | number | null},
    scriptRef: string,
    complexProps:any,
    readyToMerge: boolean,
}

export interface BeHydratedProps extends BeHydratedVirtualProps{
    proxy: Element & BeHydratedVirtualProps;
}

export interface BeHydratedActions{
    onDeferAttribs(self: this): void;
}