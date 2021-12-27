import { define } from 'be-decorated/be-decorated.js';
export class BeHydratedController {
    #mutationObserver;
    #target;
    intro(proxy, target, beDecorProps) {
        this.#target = target;
    }
    onDeferAttribs({ deferAttribs, proxy }) {
        if (!this.hasDeferAttrib(this)) {
            proxy.noBlockingAttrib = true;
        }
        else {
            if (this.#mutationObserver !== undefined) {
                this.#mutationObserver.disconnect();
            }
            const mutationObserverInit = {
                attributes: true,
            };
            this.#mutationObserver = new MutationObserver(() => {
                if (!this.hasDeferAttrib(this)) {
                    proxy.noBlockingAttrib = true;
                    this.#mutationObserver.disconnect();
                }
            });
        }
    }
    linkReadyToMerge({ noBlockingAttrib, scriptRef, scriptRefReady }) {
        return {
            readyToMerge: noBlockingAttrib && (!scriptRef || scriptRefReady)
        };
    }
    hasDeferAttrib({ deferAttribs }) {
        return deferAttribs.some(attrib => this.proxy.hasAttribute(attrib));
    }
    async onReadyToMerge({ props, deepMerge, complexProps, script }) {
        const src = { ...props };
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
        if (deepMerge) {
            const { mergeDeep } = await import('trans-render/lib/mergeDeep.js');
            mergeDeep(this.#target, src);
        }
        else {
            Object.assign(this.#target, src);
        }
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
            virtualProps: ['props', 'scriptRef', 'complexProps', 'deferAttribs', 'deepMerge', 'readyToMerge', 'noBlockingAttrib', 'scriptRefReady', 'script'],
        },
        actions: {
            onDeferAttribs: 'deferAttribs',
            linkReadyToMerge: {
                ifKeyIn: ['scriptRef', 'noBlockingAttrib', 'scriptRefReady']
            },
            onReadyToMerge: 'readyToMerge',
            onScriptRef: 'scriptRef',
        }
    }
});
