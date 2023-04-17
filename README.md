# be-hydrated

*be-hydrated* is a DOM (custom) element decorator / behavior.   It assists with hydrating the element it adorns. 

<!--[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/be-hydrated)-->
<!--[![Playwright Tests](https://github.com/bahrus/be-hydrated/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-hydrated/actions/workflows/CI.yml)-->
[![NPM version](https://badge.fury.io/js/be-hydrated.png)](http://badge.fury.io/js/be-hydrated)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-hydrated?style=for-the-badge)](https://bundlephobia.com/result?p=be-hydrated)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-hydrated?compression=gzip">

## Hemingway Notation

Configuring be-hydrated can be done as a combination of two notation styles:  JavaScriptObjectNotation, and/or what we refer to as ["Hemingway Notation"](https://bookanalysis.com/ernest-hemingway/writing-style/):

```html
<div be-scoped>
    <button>30</button>
</div>
<template be-hydrated='
    Hydrate beScoped:scope.
    Derive count as number from button.
    On click of button increment count.
    Share count to button as text content.
'>
</template>
```

*be-hydrated* can adorn both template and script elements, whichever is more convenient. 

The JSON equivalent, discussed later, may be more convenient for the JavaScript crowd who prefer editing a pre-build *.mts/*.mjs file that compiles to *.html, benefitting from TypeScript compile checks.  

Hemingway notation is more optimized for regular Joe's and Jill's editing HTML files.  It is the equivalent of markdown for JavaScript.

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
    On click of button increment count.
    Share count to button as text content.
'>
</template>
```

  

Breaking down the (hidden) meaning further, the configuration above is shorthand for:

```html
<div be-scoped>
    <button>30</button>
</div>
<template  
    be-derived='
    Target beScoped:scope.
    Derive count as number from button.
    ' 
    be-eventful='
    Target beScope:scope.
    On click of button increment count.
    '
    be-sharing='
    Scrutinize beScope:scope.
    Share count to button as text content.
    '
>
</template>
```

each of which is described in more detail:

1.  [be-derived](https://github.com/bahrus/be-derived)
2.  [be-eventful](https://github.com/bahrus/be-eventful)
3.  [be-sharing](https://github.com/bahrus/be-sharing)






