import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeHydratedController {
    #target;
    intro(proxy, target, beDecorProps) {
        this.#target = target;
    }
    checkConditions({ proxy, scriptRef, scriptRefReady, waitForUpgrade, upgraded }) {
        return { readyToMerge: (!scriptRef || scriptRefReady) && (!waitForUpgrade || upgraded) };
    }
    doRecursiveSearch(src, exports) {
        for (const key in src) {
            const val = src[key];
            switch (typeof val) {
                case 'object':
                    if (val) {
                        this.doRecursiveSearch(val, exports);
                    }
                    break;
                case 'string':
                    if (val.startsWith('import::')) {
                        const importPath = val.substring('import::'.length);
                        src[key] = exports[importPath];
                    }
            }
        }
    }
    async onReadyToMerge({ props, deepMergeProps, complexProps, scriptRefProps, script }) {
        let evaluatedProps;
        if (scriptRefProps !== undefined) {
            const modExport = script._modExport;
            this.doRecursiveSearch(scriptRefProps, modExport);
        }
        let src = { ...props, ...scriptRefProps };
        if (complexProps !== undefined) {
            const modExport = script._modExport;
            for (const key in complexProps) {
                const val = complexProps[key];
                const exp = modExport[val];
                if (exp !== undefined) {
                }
                src[key] = exp;
            }
        }
        if (deepMergeProps) {
            const { mergeDeep } = await import('trans-render/lib/mergeDeep.js');
            mergeDeep(this.#target, deepMergeProps);
        }
        Object.assign(this.#target, src);
        //TODO:  decrement defer-hydration setting
    }
    onScriptRef({ scriptRef, proxy }) {
        const script = this.#target.getRootNode().querySelector('#' + scriptRef);
        if (script === null)
            throw '404';
        proxy.script = script;
        if (script.dataset.loaded !== undefined) {
            proxy.scriptRefReady = true;
        }
        else {
            script.addEventListener('load', e => {
                proxy.scriptRefReady = true;
            }, { once: true });
        }
    }
    async onWaitForUpgrade({ proxy }) {
        const localName = this.#target.localName;
        if (!localName.includes('-')) {
            proxy.upgraded = true;
            return;
        }
        await customElements.whenDefined(localName);
        proxy.upgraded = true;
    }
}
;
const tagName = 'be-hydrated';
const ifWantsToBe = 'hydrated';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            virtualProps: [
                'deferAttrib',
                'deepMergeProps',
                'props',
                'scriptRef',
                'scriptRefProps',
                'complexProps',
                'readyToMerge',
                'scriptRefReady',
                'script',
                'waitForUpgrade',
                'upgraded'
            ],
            proxyPropDefaults: {
                deferAttrib: 'defer-hydration',
            },
            intro: 'intro',
        },
        actions: {
            checkConditions: {
                ifAllOf: ['deferAttrib'],
                ifKeyIn: ['scriptRef', 'scriptRefReady', 'waitForUpgrade', 'upgraded'],
            },
            onReadyToMerge: 'readyToMerge',
            onScriptRef: 'scriptRef',
            onWaitForUpgrade: 'waitForUpgrade',
        }
    },
    complexPropDefaults:{
        controller: BeHydratedController,
    }
});
register(ifWantsToBe, upgrade, tagName);
