import Splide from '@splidejs/splide';
import tippy from 'tippy.js';

const projectsOptions = {
	classes: {
		arrows: 'projects__arrows splide__arrows',
		arrow: 'projects__arrow splide__arrow',
		prev: 'projects__arrow--prev splide__arrow--prev',
		next: 'projects__arrow--next splide__arrow--next',
	},
	pagination: false,
	gap: 50,
	perPage: 3,
	breakpoints: {
		1024: {
			perPage: 2,
			gap: 50,
		},
		768: {
			perPage: 2,
			gap: 34,
		},
		567: {
			perPage: 1,
			gap: 21,
		},
	},
};
const projectsSlider = new Splide('.projects__slider', projectsOptions);
projectsSlider.mount();

const tooltips = document.querySelectorAll('[id*="tooltip-"]');
tooltips.forEach((button) => {
	tippy(button, {
		theme: 'tooltip',
		maxWidth: 264,
		onShow() {
			const isIOS = /iPhone|iPad|iPod/.test(navigator.platform);
			if (isIOS) {
				button.click();
			}
			button.classList.add('projects__tooltip--active');
		},
		onHide() {
			button.classList.remove('projects__tooltip--active');
		},
	});
});
tooltips[0]._tippy.setContent('Пример современных тенденций - современная методология разработки');
tooltips[1]._tippy.setContent('Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции');
tooltips[2]._tippy.setContent('В стремлении повысить качество');
