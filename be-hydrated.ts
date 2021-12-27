import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeHydratedVirtualProps, BeHydratedProps, BeHydratedActions} from './types';

export class BeHydratedController implements BeHydratedActions{
    #mutationObserver: MutationObserver | undefined;
    onDeferAttribs({deferAttribs, proxy}: this): void {
        if(!this.checkAttribs(this)){
            proxy.readyToMerge = true;
        }else{
            if(this.#mutationObserver !== undefined){
                this.#mutationObserver.disconnect();
            }
            const mutationObserverInit: MutationObserverInit = {
                attributes: true,
            };
            this.#mutationObserver = new MutationObserver(() => {
                if(!this.checkAttribs(this)){
                    proxy.readyToMerge = true;
                    this.#mutationObserver!.disconnect();
                }
            });
        }
    }

    checkAttribs({deferAttribs}: this): boolean{
        return deferAttribs.some(attrib => this.proxy.hasAttribute(attrib));
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
            virtualProps: ['attribs', 'props', 'scriptRef', 'complexProps', 'deferAttribs', 'deepMerge'],
        },
        actions:{
            onDeferAttribs: 'deferAttribs',
        }
    }
});