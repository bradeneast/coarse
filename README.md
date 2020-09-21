![The Coarse.js Logo](./logo.png)

# Coarse.js
> A 1kb carousel library that's functional and satisfying to use, just like sandpaper.


## How it works
Schwifty preloads and caches same-origin HTML documents, using an asynchronous XHTTP request.


## Usage
To make a carousel, create a carousel element with children. Once you create a new instance of Coarse, it will automatically start listening for click and swipe events on the carousel element.

```html
<div class="carousel">
	<div>1</div>
	<div>2</div>
	<div>3</div>
</div>
```
```javascript
let carouselElement = document.querySelector('.carousel');

import Coarse from 'Coarse';
new Coarse(carouselElement, options);
```


## Options

### options.renderControls
- Type: `boolean`
- Default: `true`

Tells Coarse whether or not to render right and left navigation buttons in the carousel element.

### options.renderDots
- Type: `boolean`
- Default: `true`

### options.hookAttribute
- Type: `string`
- Default: `data-coarse`

### options.selectedClass
- Type: `string`
- Default: `selected`

### options.swipeSensitivity
- Type: `number`
- Default: `0.1`

### options.align
- Type: `string`
- Default: `center`

### options.wrap
- Type: `boolean`
- Default: `true`