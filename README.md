# be-hydrated [TODO]

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating the element it adorns.  

## Lingo

## Lingo

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