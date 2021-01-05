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

	slidesPerView: 3,
	spaceBetween: 50,
	slidesPerGroup: 3,
});
