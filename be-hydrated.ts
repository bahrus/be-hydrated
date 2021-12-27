import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeHydratedVirtualProps, BeHydratedProps, BeHydratedActions} from './types';

export class BeHydratedController implements BeHydratedActions{
    #mutationObserver: MutationObserver | undefined;
    #target!: Element
    intro(proxy: Element & BeHydratedVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        this.#target = target;
    }
    onDeferAttribs({deferAttribs, proxy}: this): void {
        if(!this.hasDeferAttrib(this)){
            proxy.noBlockingAttrib = true;
        }else{
            if(this.#mutationObserver !== undefined){
                this.#mutationObserver.disconnect();
            }
            const mutationObserverInit: MutationObserverInit = {
                attributes: true,
            };
            this.#mutationObserver = new MutationObserver(() => {
                if(!this.hasDeferAttrib(this)){
                    proxy.noBlockingAttrib = true;
                    this.#mutationObserver!.disconnect();
                }
            });
        }
    }

    linkReadyToMerge({noBlockingAttrib, scriptRef, scriptRefReady}: this){
        return {
            readyToMerge: noBlockingAttrib && (!scriptRef || scriptRefReady)
        };
    }

    hasDeferAttrib({deferAttribs}: this): boolean{
        return deferAttribs.some(attrib => this.proxy.hasAttribute(attrib));
    }

    async onReadyToMerge({props, deepMerge, complexProps, script}: this): Promise<void>{
        const src = {...props};
        
        if(complexProps !== undefined){
            const modExport = (<any>script)._modExport;
            for(const key in complexProps){
                const val = complexProps[key];
                const exp = modExport[val];
                if(exp !== undefined){

                }
                src[key] = exp;
            }
        }
        if(deepMerge){
            const {mergeDeep} = await import('trans-render/lib/mergeDeep.js');
            mergeDeep(this.#target, src);
        }else{
            Object.assign(this.#target, src);
        }
    }

    onScriptRef({scriptRef, proxy}: this): void {
        const script = (this.#target.getRootNode() as Document).querySelector('#' + scriptRef) as HTMLScriptElement;
        if(script === null) throw '404';
        proxy.script = script;
        if(script.dataset.loaded !== undefined){
            proxy.scriptRefReady = true;
        }else{
            script.addEventListener('load', e => {
                proxy.scriptRefReady = true;
            }, {once: true});
        }
    }
}

export interface BeHydratedController extends BeHydratedProps{};

const tagName = 'be-hydrated';

const ifWantsToBe = 'hydrated';

const upgrade = '*';

define<BeHydratedProps & BeDecoratedProps<BeHydratedProps, BeHydratedActions>, BeHydratedActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps: ['props', 'scriptRef', 'complexProps', 'deferAttribs', 'deepMerge', 'readyToMerge', 'noBlockingAttrib', 'scriptRefReady', 'script'],
        },
        actions:{
            onDeferAttribs: 'deferAttribs',
            linkReadyToMerge: {
                ifKeyIn: ['scriptRef', 'noBlockingAttrib', 'scriptRefReady']
            },
            onReadyToMerge: 'readyToMerge',
            onScriptRef: 'scriptRef',
        }
    }
});