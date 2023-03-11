import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, PPPP, CamelConfig} from './types';

export class BeHydrated extends EventTarget implements Actions{
    async onCamel(pp: PP, mold: PPP): PPPP {
        const {self, camelConfig} = pp;
        const {doBeHavings} = await import('trans-render/lib/doBeHavings.js');
        import('be-derived/be-derived.js');
        import('be-eventful/be-eventful.js');
        import('be-sharing/be-sharing.js');
        await doBeHavings(self, [
            {
                be: 'derived',
                having: {
                    camelConfig
                }
            },
            {
                be: 'eventful',
                having: {
                    camelConfig
                }
            },
            {
                be: 'sharing',
                having: {
                    camelConfig
                }
            }
        ]);
        return mold;
    }
}

const tagName = 'be-hydrated';
const ifWantsToBe = 'hydrated';
const upgrade = 'template,script';

define<Proxy & BeDecoratedProps<Proxy, Actions, CamelConfig>, Actions>({
    config:{
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: ['template', 'script'],
            virtualProps: ['camelConfig'],
            primaryProp: 'camelConfig',
            primaryPropReq: true,
            parseAndCamelize: true,
            camelizeOptions: {
                doSets: true,
                simpleSets: ['Affect', 'Capture', 'Derive', 'Itemize', 'Observe', 'On', 'Scrutinize', 'Share', 'Survey', 'Target']
            }
        },
        actions: {
            onCamel: {
                ifAllOf: ['camelConfig'],
                returnObjMold: {
                    resolved: true,
                }
            }
        }
    },
    complexPropDefaults: {
        controller: BeHydrated
    }
});

register(ifWantsToBe, upgrade, tagName);