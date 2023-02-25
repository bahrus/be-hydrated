# be-hydrated [TODO]

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating the element it adorns.  

## Zusammengesetzte Wörter Lingo

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-hydrated='{
        "affectAndObserve": "$.beScoped",
        "deriveCountAsNumberFrom": "button",
        "onClickOfButtonDoInc": "count",
        "shareCountToButtonAs": "textContent"
    }'>
    </script>
</div>
```

## Hemingway Prose Lingo

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-hydrated='
        Affect and observe beScoped of parent.
        Derive count as number from button.
        On click of button do inc count.
        Share count to button as text content.
    '>
    </script>
</div>
```

which can be broken down to:

```html
<div itemscope>
    <button>30</button>
    <script nomodule  
        be-derived='{
            "affect": "$.beScoped",
            "deriveCountAsNumberFrom": "button"
        }' 
        be-eventful='{
            "affect": "$.beScoped",
            "onClickOfButtonDoInc": "count"
        }'
        be-sharing='{
            "observe": "$.beScoped",
            "shareCountToButtonAs": "textContent"
        }'
    >
    </script>
</div>
```

Notation-wise, the triumvirate "plays favorites" with a particular class of components, so it is "cheating" as far as framework-neutrality goes.  This is most applicable to the be-sharing leg of the triumvirate.

The requirements for what it would take for any component library to play well with the triumvirate are fairly wide open, and is discussed below.

What makes things hum along well is to provide a "PropertyBag" EventTarget associated with the DOM element/ that [propagates property changes](https://github.com/bahrus/trans-render/blob/baseline/lib/PropertyBag.ts#L28) of an object thusly:

1.  It emits events with the same name as the property, every time a publicly accessible property changes.  The detail of the event contains the old value, the new value, and the name of the property that changed.
2.  It emits a common "prop-changed" event for all property changes, regardless of name, with the same detail payload.
3.  It causes the DOM element it adorns to emit a "connection established" event when the connection is established.
4.  Once the connection is established, the event target is accessible from the DOM element via dot notation.

Component classes that currently abide by this protocol are [xtal-element](https://github.com/bahrus/xtal-element) based web components, that includes declarative custom elements based on [be-definitive](https://github.com/bahrus/be-definitive), and the DOM elements that adorn themselves with the [be-scoped](https://github.com/bahrus/be-scoped) element decorator.

Component                               |Path to property bag              |Connection established event name
----------------------------------------|----------------------------------|---------------------------------
xtal-element base class web component   |oElement.xtalState                |xtal-state-resolved
be-scoped decorator                     |oElement.beDecorated.scoped.scope |be-decorated.scoped.resolved

To illustrate the advantage


First Param          | Second Param               | Home in on                                   | Observe statement
---------------------|----------------------------|----------------------------------------------| ---------------------------------------------------------
parent               |NA                          | beDecorated.beScoped.scope (after resolving) |  Observe beScoped of parent.
self                 |NA                          | .xtalState after resolving                   |  Observe xtalState of self.
closest              |[part ~= first-section]     | .myMobxStore after upgrade of custom element |  Observe my mobx store of parent after my mobx store changed event.
closest