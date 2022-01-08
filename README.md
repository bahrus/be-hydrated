# be-hydrated [TODO]

be-hydrated is a DOM (custom) element decorator / behavior.   It assists with hydrating the element it adorns.  

It doesn't strive to replace server-side rendering utilizing attributes for cases where styling is positively impacted by the presence of the attribute.  Attribute away!

But for all other cases, it provides the ability to circumvent the somewhat chatty approach of using individual attributes, when it would be easier for everyone to skip all that and set the property values directly via a single object.assign (but deep merge is also supported).

Another benefit of this approach is that settings can be typed if using an mjs file to define HTML.

## Example 1:  Applied directly to an element: [TODO]

```html
<my-custom-element defer-hydration=4 be-hydrated='
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

After finishing, be-hydrated does the following to the defer-hydration attribute[TODO]:

1.  If the value is a number larger than 1, it decrements the value by 1.
2.  If the value is 1 or '', it removes the attribute.

## Example 2 The famous Vaadin Date Picker

In this example:  https://codesandbox.io/s/shy-tdd-8b4tq?file=/src/App.js we need to set some function callbacks within the property configuration.

We do that using the alternative setting "scriptRefProps", which recursively looks for settings whose values start with "import::".  So:

```html
<vaadin-date-picker be-hydrated='
{
    "scriptRefProps":{    
        "i18n": {
            "monthNames": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
            "weekdays": ["A", "B", "C", "D", "E", "F", "G", "H"],
            "weekdaysShort": ["A", "B", "C", "D", "E", "F", "G", "H"],
            "firstDayOfWeek": 0,
            "week": "Weekio",
            "calendar": "Calendario",
            "today": "NOWWW",
            "cancel": "Oh no",
            "formatDate": "import::formatDate",
            "parseDate": "import::parseDate",
            "formatTitle": "import::formatTitle"
        }
    },
    "scriptRef": "my-script",

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

From a performance point of view, it is better to use the "props" with pure JSON, and "complexProps" for properties that aren't JSON serializable.

But in scenarios where a prop is a combination of the two, "scriptRefProps" may be the best option.  The recursive search for values starting with "import::" certainly imposes a bit of a cost.

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
    <td>Any</td>
    <td>template</td>
    <td>template</td>
   </tr>
   <tr>
   <td>Can insert template into target</td>
    <td>No</td>
    <td>Yes</td>
    <td>Yes</td>
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


