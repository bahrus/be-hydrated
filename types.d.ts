import {BeDecoratedProps} from 'be-decorated/types';

export interface BeHydratedVirtualProps {
    deferAttrib: string,
    /**
     * Props that need to be deep merged into the target element.
     */
    deepMergeProps: any,
    /**
     * JSON-serializable props
     */
    props: any,
    /**
     * Id of a script tag that uses be-exportable to export constants.
     */
    scriptRef: string,
    /**
     * Use this, sparingly, for properties that are a mixture of JSON serializable and non-JSON serializable.
     */
    scriptRefProps: any,
    /**
     * Non-JSON-serializable props
     */
    complexProps:any,
    /**
     * Internal setting that tracks if all the merge can begin.
     */
    readyToMerge: boolean,

    /**
     * Internal setting that tracks if the scriptRef is ready.
     */
    scriptRefReady: boolean,
    /**
     * Script element that exports some non-JSON-serializable props.
    */
    script: HTMLScriptElement,
    /**
     * Wait for the element being adorned to upgrade.
     */
    waitForUpgrade: boolean,
    /**
     * Internal setting that tracks if the element is upgraded.
     */
    upgraded: boolean,
}

export interface BeHydratedProps extends BeHydratedVirtualProps{
    proxy: Element & BeHydratedVirtualProps;
}

export interface BeHydratedActions{
    intro(proxy: Element & BeHydratedVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    checkConditions(self: this): {readyToMerge: boolean};
    onScriptRef(self: this): void;
    onReadyToMerge(self: this): void;
    onWaitForUpgrade(self: this): void;
}