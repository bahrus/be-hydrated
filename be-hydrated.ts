import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeHydratedVirtualProps, BeHydratedProps, BeHydratedActions} from './types';

export class BeHydratedController implements BeHydratedActions{

    #target!: Element
    intro(proxy: Element & BeHydratedVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        this.#target = target;
    }
    onDeferAttrib({proxy, scriptRef, scriptRefReady}: this): {readyToMerge: boolean} {
        return {readyToMerge: !scriptRef || scriptRefReady};
    }

    async onReadyToMerge({props, deepMergeProps, complexProps, script}: this): Promise<void>{
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
        if(deepMergeProps){
            const {mergeDeep} = await import('trans-render/lib/mergeDeep.js');
            mergeDeep(this.#target, deepMergeProps);
        }
        Object.assign(this.#target, src);
        //TODO:  decrement defer-hydration setting
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
            virtualProps: ['props', 'scriptRef', 'complexProps', 'deferAttrib', 'deepMergeProps', 'readyToMerge', 'scriptRefReady', 'script'],
            proxyPropDefaults:{
                deferAttrib: 'defer-hydration',
            }
        },
        actions:{
            onDeferAttrib: 'deferAttrib',
            onReadyToMerge: 'readyToMerge',
            onScriptRef: 'scriptRef',
        }
    }
});

register(ifWantsToBe, upgrade, tagName);