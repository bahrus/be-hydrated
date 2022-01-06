# be-hydrated [TODO]

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating a built-in or imported custom element.  

It doesn't strive to replace server-side rendering utilizing attributes for cases where styling is positively impacted by the presence of the attribute.  Attribute away!

But for all other cases, it provides the ability to circumvent the somewhat chatty approach of using individual attributes, when it would be easier for everyone to skip all that and set the property values directly via a single object.assign (but deep merge is also supported).

Another benefit of this approach is that settings can be typed if using an mjs file to define HTML.

## Example 1:  Applied directly to an element: [TODO]

```html
<my-custom-element defer-hydration=7 be-hydrated='
{
    "props":{    
        "myStringProp": "supercalifragilisticexpialidocious",
        "myNumProp": 6.022140857E23,
        "myBool": false,
        "myObjectProp": {
            "mySubObj":{}
        },
    },
    "deepMergeProps": {
        "style": {
            "color": "red"
        }
    },
    "scriptRef": "my-script",
    "complexProps":{
        "myFunctionCallback": "callback"
    }

}'>
</my-custom-element>
<script nomodule id=my-script be-exportable>
    export function callback(e){
        console.log(e);
    }
</script>
```

## Example 2 The famous Vaadin Date Picker

In this example:  https://codesandbox.io/s/shy-tdd-8b4tq?file=/src/App.js we need to use deepComplexProp merging as well:

```html
<vaadin-date-picker be-hydrated='
{
    "props":{    
        "i18n": {
            "monthNames": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
            "weekdays": ["A", "B", "C", "D", "E", "F", "G", "H"],
            "weekdaysShort": ["A", "B", "C", "D", "E", "F", "G", "H"],
            "firstDayOfWeek": 0,
            "week": "Weekio",
            "calendar": "Calendario",
            "today": "NOWWW",
            "cancel": "Oh no"
        }
    },
    "scriptRef": "my-script",
    "complexProps":{
        "i18n": "i18n"
    }

}'></vaadin-date-picker>
<script nomodule id=my-script be-exportable>
    export const i18n = {
        formatDate: function(){
            return "hahaha";
        },
        parseDate: function(){
            return new Date();
        },
        formatTitle: function(){
            return "lol";
        }
    }
</script>
```

What this example demonstrates is we need to deep merge the complexProps into the props.

Some custom element libraries may provide the ability to prevent reacting while multiple set operations take place, only reacting after that is all done, based on the defer-hydration attribute.

When be-hydrated has finished, it reduces the number value of defer-hydration by 1.  If defer-hydration is value 2, the next value will just be defer-hydration = '1'.  If the value of defer-hydration is '' or '1' then it will be removed.


## Example 2:  Applied to the previous element, including adding light children [TODO]

```html
<html-include href="https://cdn.jsdelvr.net/my-ssr-web-component/my-ssr-web-component.html">
</html-include>
<template be-hydrated='{
    "upSearch": "*",
    "selectWithin": "my-ssr-web-component",
    "etc": "etc"
}'>
<my-light-children></my-light-children>
<template>
```

This is useful when loading a static html file that provides a SSR-d custom element, but the properties and light children then need to be passed in via the client.

## Fellow behaviors

be-hydrated serves a similar purpose to be-hydrating[TO-DO] and be-kibitzing[TO-DO], so it is easy to be confused about which one to use when. 

Basically, be-hydrated is intended to be applied on the decorator itself, whereas be-hydrating is intended to be applied to elements through the shadow DOM realm, and be-kibitzing pierces into shadow DOM realms.

The following table should help clarify which one to use when:

<table>
   <caption>Differences between be-hydrated, be-set, be-kibitzing</caption>
   <thead>
    <th>Feature</th>
    <th>be-hydrated</th>
    <th>be-hydrating</th>
    <th>be-kibitzing</th>
   </thead>
   <tr>
    <td>Limit in number of elements it applies to</td>
    <td>1</td>
    <td>Unlimited</td>
    <td>Unlimited</td>
   <tr>
    <td>Elements it can adorn</td>
    <td>Any, but use template if hydration includes setting light children</td>
    <td>template</td>
    <td>template</td>
   </tr>
   <tr>
    <td>Can Pierce Shadow DOM</td>
    <td>No</td>
    <td>No</td>
    <td>Yes</td>
   </tr>
   <tr>
    <td>Effect on defer-hydration attribute</td>
    <td>Decrements by 1 if 3 or more / sets to '' if 2 / removes if ''</td>
    <td>Decrements by 1 if 3 or more / sets to '' if 2 / removes if ''</td>
    <td>None</td>
</table>


