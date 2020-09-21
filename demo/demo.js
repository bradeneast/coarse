import Coarse from '../coarse.js';

document.querySelectorAll('.carousel__slides').forEach((carousel, i) => {
    let options = {};
    if (i == 0) {
        options.align = 'center';
    }
    if (i == 1) {
        options.align = 'left';
        options.wrap = false;
    }
    new Coarse(carousel, options);
})