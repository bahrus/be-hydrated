# be-hydrated [TODO]

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating the element it adorns.  

## Hemingway Notation

```html
<div be-scoped>
    <button>30</button>
</div>
<template be-hydrated='
    Affect previous element sibling.//Default setting.
    Target beScoped.scope.
    Observe previous element sibling.//Default setting.
    Scrutinize beScoped:scope.
    Derive count as number from button.
    On click of button do increment count.
    Share count to button as text content.
'>
</template>
```

Small short cut:

```html
<div be-scoped>
    <button>30</button>
</div>
<template be-hydrated='
    Hydrate beScoped:scope.
    Derive count as number from button.
    On click of button do increment count.
    Share count to button as text content.
'>
</template>
```

which can be broken down to:

```html
<div be-scoped>
    <button>30</button>
</div>
<template  
    be-derived='
    Target beScoped.scope.
    Derive count as number from button.
    ' 
    be-eventful='
    Target beScope.scope.
    On click of button do increment count.
    '
    be-sharing='
    Scrutinize beScope.scope.
    Share count to button as text content.
    '
>
</template>
```






