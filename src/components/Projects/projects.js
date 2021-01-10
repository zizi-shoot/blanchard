import Swiper, { Navigation } from 'swiper';
import tippy from 'tippy.js';

Swiper.use([Navigation]);

const projectsSwiper = new Swiper('.projects__swiper', {
	slidesPerView: 3,
	spaceBetween: 50,
	slidesPerGroup: 3,
	navigation: {
		nextEl: '.projects__btn-next',
		prevEl: '.projects__btn-prev',
	},
});

tippy('#tooltip-1', {
	content: 'Пример современных тенденций - современная методология разработки',
	theme: 'tooltip',
	maxWidth: 264,
	animation: 'perspective-extreme',
});
tippy('#tooltip-2', {
	content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
	theme: 'tooltip',
	maxWidth: 264,
	animation: 'perspective-extreme',
});
tippy('#tooltip-3', {
	content: 'В стремлении повысить качество',
	theme: 'tooltip',
	maxWidth: 264,
	animation: 'perspective-extreme',
});
