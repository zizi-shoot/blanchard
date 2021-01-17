import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);
const editionsSwiper = new Swiper('.editions__swiper', {
	pagination: {
		el: '.editions__pagination',
		type: 'fraction',
	},
	navigation: {
		nextEl: '.editions__btn-next',
		prevEl: '.editions__btn-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		576: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 34,
		},
		1400: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 50,
		},
	},
});
