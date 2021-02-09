import Choices from 'choices.js';
import Splide from '@splidejs/splide';
import Grid from '@splidejs/splide-extension-grid';

const element = document.getElementById('gallery-filter');
const choices = new Choices(element, {
	searchEnabled: false,
	itemSelectText: '',

});
const sliderList = document.querySelector('.gallery__list');
const galleryOptions = {
	pagination: false,
	gap: '50px',
	grid: {
		rows: 2,
		cols: 3,
		gap: {
			col: '50px',
			row: '50px',
		},
	},
	classes: {
		arrows: 'gallery__arrows splide__arrows',
		arrow: 'gallery__arrow splide__arrow',
		prev: 'gallery__arrow--prev splide__arrow--prev',
		next: 'gallery__arrow--next splide__arrow--next',
	},
	breakpoints: {
		1366: {
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

function calcFraction() {
	const activeSlide = document.querySelector('.splide__list > .splide__slide.is-active');
	const activeSlideIndex = Array.from(sliderList.children).indexOf(activeSlide);
	const sliderLength = sliderList.children.length;
	return {
		activeSlideIndex,
		sliderLength,
	};
}

function displayFraction() {
	const { activeSlideIndex: index, sliderLength: length } = calcFraction();
	const sliderArrows = document.querySelector('.gallery__arrows');
	sliderArrows.setAttribute('data-fractions', `${index + 1} / ${length}`);
}

gallerySlider
	.mount({ Grid })
	.on('active', () => {
		displayFraction();
	});
