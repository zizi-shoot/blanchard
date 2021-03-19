import Choices from 'choices.js';
import Splide from '@splidejs/splide';
import Grid from '@splidejs/splide-extension-grid';
import { disableArrowPaginationA11y, displayFraction } from '../../js/lib';

const element = document.getElementById('gallery-filter');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
});
const galleryOptions = {
  accessibility: false,
  gap: 50,
  grid: {
    rows: 2,
    cols: 3,
    gap: {
      col: 50,
      row: 50,
    },
  },
  classes: {
    arrows: 'gallery__arrows splide__arrows',
    arrow: 'gallery__arrow splide__arrow',
    prev: 'gallery__arrow--prev splide__arrow--prev',
    next: 'gallery__arrow--next splide__arrow--next',
    pagination: 'gallery__pagination splide__pagination',
  },
  breakpoints: {
    1366: {
      heightRatio: 1,
      gap: '34px',
      grid: {
        cols: 2,
        rows: 2,
        gap: {
          col: '34px',
          row: '34px',
        },
      },
    },
    992: {
      heightRatio: 0.89,
      gap: '34px',
      grid: {
        cols: 2,
        rows: 2,
        gap: {
          col: '34px',
          row: '34px',
        },
      },
    },
    767: {
      heightRatio: 0.89,
      gap: '34px',
      grid: {
        cols: 2,
        rows: 2,
        gap: {
          col: '34px',
          row: '34px',
        },
      },
    },
    576: {
      gap: '30px',
      heightRatio: 1.26,
      grid: false,
    },
  },
};
const gallerySlider = new Splide('.gallery__slider', galleryOptions);
const gallerySection = document.querySelector('.gallery');
const choice = document.querySelector('.choices');
choice.setAttribute('aria-label', 'Список фильтров');
gallerySlider
  .mount({ Grid })
  .on('active', () => {
    disableArrowPaginationA11y(gallerySection);
    displayFraction('gallery');
  });
displayFraction('gallery');
