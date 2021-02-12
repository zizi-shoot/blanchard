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

const tooltips = document.querySelectorAll('[id*="tooltip-"]');
const isIOS = /iPhone|iPad|iPod/.test(navigator.platform);
tooltips.forEach((button) => {
	tippy(button, {
		onShow() {
			if (isIOS) {
				button.click();
				console.log(isIOS);
			}
		},
	});
	button.addEventListener('click', (ev) => {
		console.log(ev.currentTarget.getAttribute('id'));
	});
});
