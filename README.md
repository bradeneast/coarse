![The Coarse.js Logo](./logo.png)

# Coarse.js
> A 1kb carousel library that's functional and satisfying to use, just like sandpaper.


## How it works
Coarse uses event bubbling to minimize the number of event listeners used per carousel, so your DOM won't get bogged down. Carousels are moved using a simple 3D transform, and styles are computed ahead of time.

## Usage
To make a carousel, you need 2 things:
1. An HTML element (the carousel)
2. Children of the carousel (the slides)

Once you create a new instance of Coarse, it will automatically start listening for click and swipe events on the carousel element.

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

Tells Coarse whether or not to render dot navigation buttons in the carousel element.

### options.selectedClass
- Type: `string`
- Default: `selected`

This is the class that gets added on the selected slide, to distinguish it for styling purposes.

### options.swipeSensitivity
- Type: `number`
- Default: `0.2`

This is how exaggerated a swipe needs to be in order to trigger slide navigation. Lower values are more sensitive, higher values are less sensitive.

### options.align
- Type: `string`
- Default: `center`

Tells Coarse where to align the selected slide (horizontal alignment).

### options.wrap
- Type: `boolean`
- Default: `true`

Tells Coarse whether or not to "wrap" or "loop" the carousel slides. If set to `false`, forward navigation will be disabled on the last slide, and the backward navigation will be disabled on the first slide.