```html
<div be-dehydrated>
    <div itemscope>
        <div itemprop=myProp>My value</div>
    </div>
</div>
```

Creates a weak map for each itemscope attribute contained within.  Maps to model based on itemprop values.

be-hydrated can specify a schema inline or by reference.

```html
<div be-dehydrated='{
    "propertis":{
        "myProp":{
            "type": "integer"
        }
    }
}'>
    <div itemscope>
        <div itemprop=myProp>1,300</div>
    </div>
</div>
```