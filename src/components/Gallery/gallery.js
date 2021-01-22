import Choices from 'choices.js';
import Swiper, { Navigation, Pagination } from 'swiper';

const element = document.getElementById('gallery-filter');
const choices = new Choices(element, {
	searchEnabled: false,
	itemSelectText: '',
});
Swiper.use([Navigation, Pagination]);
const gallerySwiper = new Swiper('.gallery__swiper', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction',
	},
	breakpoints: {
		1024: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
			spaceBetween: 34,
		},
		1366: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'row',
			spaceBetween: 50,
		},
		// 	320: {
		// 		slidesPerView: 1,
		// 		slidesPerGroup: 1,
		// 	},
		// 	576: {
		// 		slidesPerView: 2,
		// 		slidesPerGroup: 2,
		// 		slidesPerColumnFill: 'row',
		// 		slidesPerColumn: 2,
		// 		spaceBetween: 34,
		// 	},
		// 	1400: {
		// 		slidesPerView: 3,
		// 		slidesPerGroup: 3,
		// 		slidesPerColumn: 2,
		// 		slidesPerColumnFill: 'row',
		// 		spaceBetween: 50,
		// 	},
	},
});
gallerySwiper.setGrabCursor();
