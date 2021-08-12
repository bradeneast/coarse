![The Coarse.js Logo](./logo.png)

# Coarse.js
> A 1kb carousel library that's functional and satisfying to use, just like sandpaper.


## How it works
Coarse uses event bubbling to minimize the number of event listeners used per carousel, so your DOM won't get bogged down.

Coarse also give its buttons accessible titles, and carousels are moved using a 3D transform for smooth performance.

While some carousel libraries are extremely robust, they can weigh a lot - some even 60kb+! Coarse is ~1kb minfied and gzipped.

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

That's it! It might be helpful to use the [starter stylesheet](./starter.css) initially.


## Options

### options.renderControls
- Type: `boolean`
- Default: `true`

Tells Coarse whether or not to render right and left navigation buttons. (These are rendered as a ***sibling*** of the carousel element).

### options.renderDots
- Type: `boolean`
- Default: `true`

Tells Coarse whether or not to render dot navigation buttons in the carousel element (These are rendered as a ***sibling*** of the carousel element).

### options.selectedClass
- Type: `string`
- Default: `selected`

This is the class that gets added on the selected slide and selected dot (if `renderDots` is enabled), to distinguish them for styling purposes.

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