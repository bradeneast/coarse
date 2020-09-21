export default class Coarse {
    constructor(
        carouselElement,
        {
            renderControls = true,
            renderDots = true,
            hookAttribute = 'data-coarse',
            selectedClass = 'selected',
            swipeSensitivity = .1,
            align = 'center',
            wrap = true,
        } = {}) {



        // Variables
        let next = 'next';
        let previous = 'previous';
        let controls = 'coarse-controls';
        let selectNext = `.${controls}.${next}`;
        let selectPrevious = `.${controls}.${previous}`;

        let maySwipe = false;
        let swipeStartPosition = 0;
        let currentIndex;
        let dots = [];

        let slides = Array.from(carouselElement.children);
        let slidesLength = slides.length;
        let selectedSlide = carouselElement.querySelector(`.${selectedClass}`);
        let wrapper = carouselElement.parentElement;



        // Functions
        let titleize = index => `slide ${index + 1} of ${slidesLength}`;
        let px = string => parseFloat(string.replace('px', ''));
        let getStyle = (element, property) => px(getComputedStyle(element)[property]);
        let getClosestCoarse = event => event.target.closest(`[${hookAttribute}]`);
        let listen = (eventType, callback, element = window) => element.addEventListener(eventType, callback);

        let select = index => {
            currentIndex = parseFloat(index);
            slides.map((slide, i) => slide.classList.toggle(selectedClass, i == index));
            dots.map((dot, i) => dot.classList.toggle(selectedClass, i == index));
        }

        let startSwipe = event => {
            let client = event.changedTouches ? event.changedTouches[0] : event;
            maySwipe = true;
            swipeStartPosition = client.clientX;
        }

        let endSwipe = event => {
            if (!maySwipe) return;
            let client = event.changedTouches ? event.changedTouches[0] : event;
            let change = client.clientX - swipeStartPosition;
            if (change < swipeSensitivity * 100 - 100) goTo(currentIndex + 1);
            if (change > 100 - swipeSensitivity * 100) goTo(currentIndex - 1);
        }

        let goTo = index => {

            maySwipe = false;

            let overflowEnd = index == slidesLength;
            let overflowStart = index < 0;
            if ((overflowStart || overflowEnd) && !wrap) return;
            if (overflowStart) index = slidesLength - 1;
            else if (overflowEnd) index = 0;

            let slide = slides[index];
            let nextButton = wrapper.querySelector(selectNext);
            let previousButton = wrapper.querySelector(selectPrevious);

            let slideWidth = getStyle(slide, 'width');
            let slideMarginL = getStyle(slide, 'marginLeft');
            let slideMarginR = getStyle(slide, 'marginRight');
            let wrapperWidth = getStyle(wrapper, 'width') - getStyle(wrapper, 'paddingLeft') - getStyle(wrapper, 'paddingRight');
            let carouselWidth = getStyle(carouselElement, 'width');

            let distance = index * (slideWidth + slideMarginL + slideMarginR);
            let offset = slideMarginL * -1;

            if (/center/i.test(align))
                offset = (wrapperWidth - slideWidth - slideMarginR - slideMarginR) * .5;

            if (/right/i.test(align))
                offset = (wrapperWidth - slideWidth - slideMarginR);

            // set appropriate controls to disabled
            if (!wrap) {
                nextButton.disabled = false;
                previousButton.disabled = false;
                if (index <= 0)
                    previousButton.disabled = true;
                if (index == slidesLength - 1)
                    nextButton.disabled = true;
            }

            // Select the appropriate slide
            select(index);

            // Transform the carousel track
            let translateAmount = (distance - offset) / carouselWidth;
            carouselElement.style.transform = `translate3d(${translateAmount * -100}%, 0, 0)`;

            // Update target index of lateral controls
            if (renderControls) {

                let nextIndex = currentIndex + 1;
                nextButton.setAttribute(hookAttribute, nextIndex);
                nextButton.title = `Go to ${titleize(nextIndex == slidesLength ? 0 : nextIndex)}`;

                let previousIndex = currentIndex - 1;
                previousButton.setAttribute(hookAttribute, previousIndex);
                previousButton.title = `Go to ${titleize(currentIndex ? previousIndex : slidesLength - 1)}`;
            }
        }



        // Make lateral navigation
        if (renderControls) {
            [previous, next].map((direction, i) => {
                let button = document.createElement('button');
                button.title = direction;
                button.classList.add(controls, direction);
                button.setAttribute(hookAttribute, currentIndex + (i || -1));
                wrapper.append(button);
            })
        }

        // Make dot navigation
        if (renderDots) {
            let nav = document.createElement('div');
            nav.classList.add('coarse-dot-navigation');

            slides.map((slide, index) => {
                let button = document.createElement('button');
                button.title = `Jump to ${titleize(index)}`;
                button.setAttribute(hookAttribute, index);
                dots.push(button);
                nav.append(button);
            })

            wrapper.append(nav);
        }

        // Go to selected slide if selected class is alread present
        selectedSlide ? goTo(slides.indexOf(selectedSlide)) : goTo(0);
        slides.map((slide, i) => slide.setAttribute(hookAttribute, i));



        // Event listeners
        listen('resize', () =>
            requestAnimationFrame(() => goTo(currentIndex))
        );

        listen('focusin', event => {
            let closestCoarse = getClosestCoarse(event);
            if (slides.indexOf(closestCoarse) > -1)
                goTo(closestCoarse.getAttribute(hookAttribute));
        }, wrapper);

        listen('click', event => {
            let closestCoarse = getClosestCoarse(event);
            if (closestCoarse)
                goTo(closestCoarse.getAttribute(hookAttribute));
        }, wrapper);

        if (swipeSensitivity > 0) {
            listen('mousedown', startSwipe, wrapper);
            listen('touchstart', startSwipe, wrapper);
            listen('mouseup', endSwipe, wrapper);
            listen('touchend', endSwipe, wrapper);
        }
    }
}
