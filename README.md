

```html
<my-custom-element defer-hydration be-hydrated='
{
    "deepMerge": true,
    "props":{    
        "myStringProp": "supercalifragilisticexpialidocious",
        "myNumProp": 6.022140857E23,
        "myBool": false,
        "myObjectProp": {
            "mySubObj":{}
        },
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

In contrast to be-set, be-kibitzing

<table>
   <caption>Differences between setting attributes</caption>
   <thead>
    <th>Feature</th>
    <th>be-hydrated</th>
    <th>be-set</th>
    <th>be-kibitzing</th>
   </thead>
   <tr>
    <td>Attributes that block setting the props</td>
    <td>defer-hydration, be-set</td>
    <td>defer-hydration</td>
    <td>?</td>
   </tr>
   <tr>
    <td>Elements it can adorn</td>
    <td>Any</td>
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
        <td>Selector support</td>
        <td>None</td>
        <td>Single</td>
        <td>Sequence</td>
    </tr>
    <tr>
        <td>Attribute(s) removed after setting</td>
        <td>None</td>
        <td>None</td>
        <td>defer-hydration</td>
    </tr>
</table>
