import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, PPPP, CamelConfig} from './types';

export class BeHydrated extends EventTarget implements Actions{
    async onCamel(pp: PP, mold: PPP): PPPP {
        const {self, camelConfig} = pp;
        const {mount, hydrate} = camelConfig!;
        if(mount !== undefined){
            const {affect, survey, observe, capture} = camelConfig!;
            camelConfig!.affect = affect || mount;
            camelConfig!.survey = survey || mount;
            camelConfig!.observe = observe || mount;
            camelConfig!.capture = capture || (`${mount}Events`);
        }
        if(hydrate !== undefined){
            const {target, scrutinize} = camelConfig!;
            camelConfig!.target = target || hydrate;
            camelConfig!.scrutinize = scrutinize || hydrate;
        }
        const {doBeHavings} = await import('trans-render/lib/doBeHavings.js');
        import('be-derived/be-derived.js');
        import('be-eventful/be-eventful.js');
        import('be-sharing/be-sharing.js');
        await doBeHavings(self, [
            {
                be: 'derived',
                having: {
                    camelConfig
                },
                waitForResolved: true,
            },
            {
                be: 'eventful',
                having: {
                    camelConfig
                },
                waitForResolved: true,
            },
            {
                be: 'sharing',
                having: {
                    camelConfig
                },
                waitForResolved: true
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
                simpleSets: [
                    'Mount', 'Hydrate',
                    'Affect', 'Capture', 'Observe', 'Scrutinize', 'Target'
                ],
                booleans: ['Itemize']
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