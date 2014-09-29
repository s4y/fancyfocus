# fancyfocus

An animated focus ring that can either:

- animate in and out of elements or
- animate between focused elements

![](https://sidnicious.github.io/fancyfocus/local.gif) ![](https://sidnicious.github.io/fancyfocus/global.gif)

## Usage

```js
fancyFocus.addLocalFocusRings(); // For individual focus rings
```

or

```js
fancyFocus.addGlobalFocusRing(); // For a single focus ring that moves between elements
```

or

```js
var focusRing = new fancyFocus.FocusRing;
focusRing.moveTo(element);
focusRing.show();
// Later…
focusRing.hide();
```

## Status

Fancyfocus is very much a prototype. I’ve literally only tried it in Chrome.
