# be-hydrated

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating the element it adorns.  

## Hemingway Notation

Configuring be-hydrated can be done as a combination of two notation styles:  JavaScriptObjectNotation, and/or what we refer to as ["Hemingway Notation"](https://bookanalysis.com/ernest-hemingway/writing-style/):

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

## Underneath the surface

The configuration above is shorthand for:

```html
<div be-scoped>
    <button>30</button>
</div>
<template be-hydrated='
    Affect previous element sibling.//Default setting.
    Target beScoped:scope. //Target is a second level setting sitting atop the Affect setting.
    Observe previous element sibling.//Default setting.
    Scrutinize beScoped:scope. //Scrutinize is a second level setting sitting atop the Observe setting.
    Derive count as number from button.
    On click of button do increment count.
    Share count to button as text content.
'>
</template>
```

The JSON equivalent, discussed later, may be more convenient for the JavaScript crowd who prefer editing a pre-build *.mts/*.mjs file that compiles to *.html, benefitting from TypeScript compile checks.  Hemingway notation is more optimized for regular Joe's and Jill's editing HTML files.  

Breaking down the (hidden) meaning further, the configuration above is shorthand for:

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

each of which is described in more detail:

1.  [be-derived](https://github.com/bahrus/be-derived)
2.  [be-eventful](https://github.com/bahrus/be-eventful)
3.  [be-sharing](https://github.com/bahrus/be-sharing)






