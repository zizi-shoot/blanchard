import Choices from 'choices.js';
import Swiper, { Navigation, Pagination } from 'swiper';

const element = document.getElementById('gallery-filter');
const choices = new Choices(element, {
	searchEnabled: false,
	itemSelectText: '',
});

Swiper.use([Navigation, Pagination]);

const gallerySwiper = new Swiper('.gallery__swiper', {
	spaceBetween: 50,
	slidesPerView: 3,
	slidesPerColumn: 2,
	slidesPerGroup: 3,
	slidesPerColumnFill: 'row',
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction',
	},
});
gallerySwiper.setGrabCursor();
