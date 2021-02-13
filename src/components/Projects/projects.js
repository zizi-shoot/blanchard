import Swiper, { Navigation } from 'swiper';
import tippy from 'tippy.js';

Swiper.use([Navigation]);
const projectsSwiper = new Swiper('.projects__swiper', {
	navigation: {
		nextEl: '.projects__btn-next',
		prevEl: '.projects__btn-prev',
	},
	breakpoints: {
		767: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 34,
		},
		1024: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 50,
		},
		1366: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 50,
		},
	},
});
const tippySettings = {
	theme: 'tooltip',
	maxWidth: 264,
};

tippy('#tooltip-1', {
	content: 'Пример современных тенденций - современная методология разработки',
	...tippySettings,
});
tippy('#tooltip-2', {
	content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
	...tippySettings,
});
tippy('#tooltip-3', {
	content: 'В стремлении повысить качество',
	...tippySettings,
});
