# be-hydrated [TODO]

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating a built-in or imported custom element.  

It doesn't strive to replace server-side rendering utilizing attributes for cases where styling is positively impacted by the presence of the attribute.  Attribute away!

But for all other cases, it provides the ability to circumvent the somewhat chatty approach of using individual attributes, when it would be easier for everyone to skip all that and set the property values directly via a single object.assign (but deep merge is also supported).

## Example 1:  Applied directly to an element: [TODO]

```html
<my-custom-element defer-hydration be-hydrated='
{
    "deepMerge": true,
    "deferAttribs": ["defer-hydration"],
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

## Example 2:  Applied to the previous element, including adding light children [TODO]

```html
<html-include href="https://esm.run/my-ssr-web-component/my-ssr-web-component.html">
</html-include>
<template be-hydrated='{
    "upSearch": "*",
    "selectWithin": "my-ssr-web-component",
    "etc": "etc"
}'>
<my-light-children></my-light-children>
<template>
```

This is useful when loading a static html file that provides a self-registering custom element, but the properties and light children then need to be passed in via the client.

## Fellow behaviors

be-hydrated serves a similar purpose to be-set and be-kibitzing, so it is easy to be confused about which one to use when.  

The following table should help clarify which one to use when:

<table>
   <caption>Differences between be-hydrated, be-set, be-kibitzing</caption>
   <thead>
    <th>Feature</th>
    <th>be-hydrated</th>
    <th>be-set</th>
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
</table>


