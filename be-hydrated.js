import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeHydrated extends EventTarget {
    async onCamel(pp, mold) {
        const { self, camelConfig } = pp;
        const { doBeHavings } = await import('trans-render/lib/doBeHavings.js');
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
define({
    config: {
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
