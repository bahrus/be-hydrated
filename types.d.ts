import {BeDecoratedProps} from 'be-decorated/types';

export interface BeHydratedVirtualProps {
    deepMerge: boolean,
    deferAttribs: string[],
    props: any,
    scriptRef: string,
    complexProps:any,
    readyToMerge: boolean,
    noBlockingAttrib: boolean,
    scriptRefReady: boolean,
    script: HTMLScriptElement,
}

export interface BeHydratedProps extends BeHydratedVirtualProps{
    proxy: Element & BeHydratedVirtualProps;
}

export interface BeHydratedActions{
    intro(proxy: Element & BeHydratedVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onDeferAttribs(self: this): void;
    onScriptRef(self: this): void;
    linkReadyToMerge(self: this): {readyToMerge: boolean};
    onReadyToMerge(self: this): void;
}