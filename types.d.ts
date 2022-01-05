import {BeDecoratedProps} from 'be-decorated/types';

export interface BeHydratedVirtualProps {
    deferAttrib: string,
    deepMergeProps: any,
    props: any,
    scriptRef: string,
    complexProps:any,
    readyToMerge: boolean,
    scriptRefReady: boolean,
    script: HTMLScriptElement,
}

export interface BeHydratedProps extends BeHydratedVirtualProps{
    proxy: Element & BeHydratedVirtualProps;
}

export interface BeHydratedActions{
    intro(proxy: Element & BeHydratedVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onDeferAttrib(self: this): {readyToMerge: boolean};
    onScriptRef(self: this): void;
    onReadyToMerge(self: this): void;
}