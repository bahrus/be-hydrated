# be-hydrated [TODO]

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating the element it adorns.  

## Zusammengesetzte Wörter Lingo

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-hydrated='{
        "affect": "parent",
        "observingRealm": "parent",
        "homeInOn": {
            "pathOfObservingRealm": "beDecorated.beScoped.scope",
            "pathOfAffectedInstance": "beDecorated.beScoped.scope"
        },
        "affectAndObserve": {
            "target": "parent",
            "homeInOn": "beScoped"
        },
        "deriveCountAsNumberFrom": "button",
        "onClickOfButtonDoInc": "count",
        "shareCountToButtonAs": "textContent"
    }'>
    </script>
</div>
```

## Hemingway Notation

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-hydrated='
        Affect parent instance.
        Affect be scope:scope of said instance.
        Observe parent instance.
        Observe be scoped:scope of said instance.
        Derive count as number from button.
        On click of button do inc count.
        Share count to button as text content.
    '>
    </script>
</div>
```

Small short cut:

```html
<div itemscope>
    <button>30</button>
    <script nomodule  be-hydrated='
        Hydrate parent instance.
        Hydrate scope:scope of said instance.
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






